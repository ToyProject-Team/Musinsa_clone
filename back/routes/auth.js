const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const axios = require('axios')
const qs = require('qs')
const CryptoJS = require('crypto-js');
const request = require('request'); 

const { Op } = require('sequelize')
const jwt = require("../utils/jwt-utils");
const { sequelize, User } = require('../models')
const redisClient = require("../utils/redis");
const authJWT = require('../utils/authJWT')
const { smtpTransport } = require('../utils/email');
const { promisify } = require("util");

dotenv.config();
router.post('/signup', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
          where: {
              loginId: req.body.loginId
          }
        })
        
        if (req.headers.encryptioncode) {
          bytes  = CryptoJS.AES.decrypt(req.headers.encryptioncode, 'secret key 123');
          req.headers.encryptioncode = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        const client = redisClient
        const getAsync = promisify(client.get).bind(client);
        const checkSMS = await getAsync(req.headers.phonecheck? req.headers.phonecheck: -111)
        const checkEmail = await getAsync(req.headers.emailcheck? req.headers.emailcheck: -111)
        const checkSocialEmail = await getAsync(req.headers.encryptioncode? req.headers.encryptioncode: -111)
        if (!checkSMS && !checkEmail) {
          return res.status(400).send({ message: "이메일 인증 또는 휴대폰 인증이 완료되지 않은 사용자입니다" })
        }
        
        if (exUser) {
            return res.status(401).send({ message: "이미 사용중인 아이디 입니다" })
        }

        const overlapEmail = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (overlapEmail) {
            return res.status(402).send({ message: "이미 사용중인 이메일 입니다"})
        }
        if (checkSMS) {    
          if (req.body.phoneNumber !== checkSMS) {
            return res.status(403).send({ message: "휴대폰 인증이 완료된 번호를 보내야합니다" })
          }
        } else {
          if (req.body.email !== checkEmail) {
            return res.status(405).send({ message: "이메일 인증이 완료된 이메일을 보내야합니다" })
          }
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
          loginId: req.body.loginId,
          password: hashedPassword,
          email: checkEmail ? checkEmail: null ,
          agreement: req.body.agreement== 1 ? 1: 0,
          address: req.body.address,
          phoneNumber: checkSMS ? checkSMS: null,
          socialEmail: checkSocialEmail ? checkSocialEmail: null
        })

        return res.status(200).send({ success: true })
    }catch (error) {
        console.error(error)
        next(error)
    }
})

router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    if (req.headers.encryptioncode) {
      const client = redisClient
      const getAsync = promisify(client.get).bind(client);
      bytes  = CryptoJS.AES.decrypt(req.headers.encryptioncode, 'secret key 123');
      req.headers.encryptioncode = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const checkEmail = await getAsync(req.headers.encryptioncode? req.headers.encryptioncode: -111)
      
      const userData = await User.findOne({
        where: {
          socialEmail: checkEmail
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
      })

      if (!userData) {
        return res.status(401).send({
          message: "유저가 존재하지 않습니다!",
        });
      }
      const accessToken = jwt.sign(userData);
      const refreshToken = jwt.refresh(userData);
      redisClient.set(userData.id, refreshToken);
      return res.status(200).send({
        userData,
        refreshToken,
        accessToken,
      });
    }
    const user = await User.findOne({
      where: {
        loginId: req.body.loginId,
      },
    });
    if (!user) {
      return res.status(401).send({
        message: "유저가 존재하지 않습니다!",
      });
    }
    const chk = await bcrypt.compare(password, user.password);
    if (!chk) {
      return res.status(402).send({
        message: "패스워드가 일치하지 않습니다!",
      });
    }
    const accessToken = jwt.sign(user);
    const refreshToken = jwt.refresh(user);
    redisClient.set(user.id, refreshToken);
    const userData = await User.findOne({
      where: { email: user.email },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });
    return res.status(200).send({
      userData,
      refreshToken,
      accessToken,
    });
  });

router.post("/logout", authJWT, async (req, res, next) => {
  const client = redisClient;
  client.get(req.myId, function (err, clientCheck) {
    if (!clientCheck) {
      return res.status(405).send({ message: "유효하지 않은 토큰입니다." });
    }
    client.del(req.myId);
    return res.status(200).send({ success: true });
  });
});
  
router.post('/kakao', (req,res) => {
  const kakao = {
    clientID: process.env.KAKAO_ID,
    redirectUri: 'http://localhost:80/api/auth/kakao/callback'
  }
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_nickname,account_email`;
  return res.status(200).send({ url :kakaoAuthURL })
})

router.get('/kakao/callback', async (req, res, next) => {
  console.log(req.query)
  try {
    const kakao = {
      clientID: process.env.KAKAO_ID,
      redirectUri: 'http://localhost:80/api/auth/kakao/callback'
    }
    token = await axios({//token
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers:{
          'content-type':'application/x-www-form-urlencoded'
      },
      data:qs.stringify({
          grant_type: 'authorization_code',//특정 스트링
          client_id:kakao.clientID,
          // client_secret:kakao.clientSecret,
          redirectUri:kakao.redirectUri,
          code:req.query.code,//결과값을 반환했다. 안됐다.
      })//객체를 string 으로 변환
    })
    const user = await axios({
      method:'get',
      url:'https://kapi.kakao.com/v2/user/me',
      headers:{
          Authorization: `Bearer ${token.data.access_token}`
      }//헤더에 내용을 보고 보내주겠다.
    })
    const randNum =  Math.floor(Math.random() * (10000 - 1 + 1)) + 1
    await redisClient.set(randNum, user.data.kakao_account.email);
    await redisClient.expire(randNum, 1200)
    const encryptionCode = await CryptoJS.AES.encrypt(JSON.stringify(randNum ), 'secret key 123').toString()

    let userInfo = await User.findOne({
      where: {
        socialEmail : user.data.kakao_account.email
    }
    })
    if (userInfo) {
      res.status(200).send({ alreadyMember: true, encryptionCode })
    } else {
      res.status(200).send({ alreadyMember: false, encryptionCode })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/authEmail', async (req, res, next) => {
    
  /* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */ 
  try {
    var generateRandom = function (min, max) {
        var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
        return ranNum;
    }
    const number = generateRandom(111111,999999)

    const overlapCheck = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    console.log(overlapCheck)
    const sendEmail = req.body.email;

    const mailOptions = {
        from: "sola2014@naver.com",
        to: sendEmail,
        subject: "[무신사]인증 관련 이메일 입니다",
        text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
    };
    await smtpTransport.sendMail(mailOptions, async (error, responses) => {
        if (error) {
            console.error(error)
            return res.status(400).send({ message: "유효하지 않은 이메일입니다" })
        } else {
        /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
          await redisClient.set(req.body.email, number);
          await redisClient.expire(req.body.email, 180)
          return res.status(200).send({ success: true })
        }
        smtpTransport.close();
    });
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/checkEmail', async (req, res, next) => {
  try {
    console.log("?")
    const client = redisClient
    const getAsync = promisify(client.get).bind(client);
    const checkEmail = await getAsync(req.body.email)
    if (!checkEmail) {
      return res.status(400).send({ message: "이메일 인증 번호를 요청해야합니다" })
    }
    if (checkEmail != req.body.number) {
      return res.status(401).send({ message: '이메일 인증 번호가 일치하지 않습니다' })
    }
    console.log("?")
    let emailCheck = CryptoJS.AES.encrypt(JSON.stringify(req.body.email), 'secret key 123').toString();
    console.log(emailCheck)
    emailcheck = emailCheck.substr(1)
    emailcheck = emailcheck.slice(0, -1);
    console.log(emailCheck)
    await redisClient.set(emailCheck, req.body.email);
    await redisClient.expire(emailCheck, 300)
    res.status(200).send({ emailCheck: emailCheck })

  } catch (e) {
    console.error(e)
    next(e)
  }
}) 

router.post('/sendSMS', async (req, res, next) => {
  try {
    const user_phone_number = req.body.phoneNumber;//수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = process.env.SERVICE_ID; //서비스 ID
    const secretKey = process.env.NCP_SECRET_KEY;// Secret Key
    const accessKey = process.env.NCP_KEY;//Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    request({
      method: method,
      json: true,
      uri: url,
      headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      body: {
        type: "SMS",
        countryCode: "82",
        from: '01062077206',
        content: `인증 번호입니다 ${code}`,
        messages: [
          { to: `${user_phone_number}`, },],
      },
    },
    );
    // console.log(user_phone_number)
    await redisClient.set(user_phone_number, code);
    await redisClient.expire(user_phone_number, 180)
    res.status(200).send({ success: true })
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/checkSMS', async (req, res, next) => {
  try {
    const { phoneNumber, code } = req.body;
    console.log(req.body)
    const client = await redisClient;
    client.get(phoneNumber, async function (err, clientCheck) {
      console.log(clientCheck)
      console.log(req.body.code)
      if (!clientCheck) {
        console.log("?")
        return res.status(400).send({ message: "인증 시간이 만료됐습니다" });
      }
      if (code != clientCheck) {
      return res.status(401).send({ message: "인증 번호가 틀리셨습니다" })
      }
      phoneCheck = CryptoJS.AES.encrypt(JSON.stringify(req.body.phoneNumber), 'secret key 123').toString();
      phoneCheck = phoneCheck.substr(1)
      phoneCheck = phoneCheck.slice(0, -1);
      await redisClient.set(phoneCheck, req.body.phoneNumber);
      await redisClient.expire(phoneCheck, 1200)
      return res.status(200).send({ phoneCheck });
    });
    // console.log(phoneNum);
    // console.log(code, typeof(code))
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/findPassword', async (req, res, next) => {
  if (!req.body.loginId) {
    return res.status(400).send({ message: "로그인 아이디가 전달되지 않았습니다" })
  }

  console.log(req.body.loginId)
  const exUser = await User.findOne({
    where: {
      loginId: req.body.loginId
    }
  })
  // console.log(exUser)
  if (!exUser) {
    return res.status(401).send({ message: "해당 로그인 아이디에 대한 유저 조회 결과가 없습니다"})
  }
  // console.log(req.headers)
  const client = redisClient
  const getAsync = promisify(client.get).bind(client);
  const userInfo = await getAsync(req.headers.phonecheck? req.headers.phonecheck: req.headers.emailcheck ? req.headers.emailcheck: -111)

  if (!userInfo) {
    return res.status(402).send({ message: "SMS 인증 시도하셔야합니다. 시도하셨다면 세션 스토리지의 phoneCheck가 headers로 전달됐는지 확인해주세요" })
  }

  if (exUser.email != req.body.email && req.body.email != undefined ) {
    return res.status(405).send({ message: "로그인 아이디로 조회된 유저에 대한 이메일이 아닙니다"})
  }
  if (exUser.phoneNumber != req.body.phoneNumber && req.body.phoneNumber != undefined ) {
    return res.status(403).send({ message: "로그인 아이디로 조회된 유저에 대한 전화번호가 아닙니다" })
  }
  const userId = exUser.loginId
  const changePasswordToken = new Date().valueOf() 
  await redisClient.set(changePasswordToken, req.body.loginId);
  await redisClient.expire(changePasswordToken, 300)
  res.status(200).send({ changePasswordToken, userId })
})

router.post('/changePassword', async (req, res, next) => {
  try {
    const client = redisClient
    
    const getAsync = promisify(client.get).bind(client);
    const tokenId = await getAsync(req.headers.changepasswordtoken? req.headers.changepasswordtoken: -111)
    if (!tokenId ) {
      return res.status(400).send({ message: '토큰을 입력하지 않거나 인증 번호가 만료되었습니다' })
    }

    if (!req.body.password) {
      return res.status(401).send({ message: '암호가 전달되지 않았습니다' })
    }
    const exUser = await User.findOne({
      where: {
        loginId: tokenId
      }
    })
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await exUser.update({
      password: hashedPassword
    })
    res.status(200).send({ success: true })
  } catch (e) {
    console.error(e)
    next(e) 
  }
})

router.post('/findId', async (req, res, next) => {
  try {
    console.log(req.headers)
    console.log(req.headers.emailcheck)
    const client = redisClient
    const getAsync = promisify(client.get).bind(client);
    const checkSMS = await getAsync(req.headers.phonecheck? req.headers.phonecheck: -111)
    const checkEmail = await getAsync(req.headers.emailcheck? req.headers.emailcheck: -111)
    console.log(checkEmail)
    if (!checkSMS && !checkEmail) {
      return res.status(400).send({ message: '인증번호를 입력하지 않거나 인증 번호가 만료되었습니다' })
    }
    const exUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: checkEmail },
          { phoneNumber: checkSMS }
        ],
      },
      attributes: ["loginId"]
    })

    if (!exUser && checkSMS) {
      res.status(401).send({ message: "해당 휴대폰 번호를 가진 유저의 조회 결과가 없습니다" })
    }

    if (!exUser && checkEmail) {
      res.status(402).send({ message: "해당 이메일을 가진 유저의 조회 결과가 없습니다" })
    }

    res.status(200).send({ loginId: exUser.loginId })
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/isExistedLoginId', async (req, res, next) => {
  try {
    if (!req.body.loginId) {
      return res.status(400).send({ message: "로그인 아이디가 지급되지 않았습니다" })
    }
    const exUser = await User.findOne({
      where: {
        loginId: req.body.loginId
      }
    })
    
    if (!exUser) {
      return res.status(401).send({ message: "해당 아이디에 대한 유저 조회 결과가 없습니다" })
    } 
    
    const userData = exUser.email ? exUser.email : exUser.phoneNumber
    loginIdCheckToken = await CryptoJS.AES.encrypt(JSON.stringify(userData), 'secret key 123').toString();
    await redisClient.set(loginIdCheckToken, userData);
    await redisClient.expire(loginIdCheckToken, 1200)
    res.status(200).send({ userData, loginIdCheckToken })
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/checkIsLoginIdCheckUser', (req, res, next) => {
  try {
    a = req.headers.loginidchecktoken
    console.log(a)
    if (!req.headers.loginidchecktoken) {
      return res.status(400).send({ message: "헤더로 토큰이 지급되지 않았습니다" })
    }
    var bytes  = CryptoJS.AES.decrypt(req.headers.loginidchecktoken, 'secret key 123');
    var userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!userData) {
      return res.status(401).send({ message: "토큰을 복호화한 결과가 없습니다 입력을 다시 확인해주세요" })
    }
    res.status(200).send({ userData })
  } catch (e) {
    console.log(e)
    next(e)
  }
})
module.exports = router