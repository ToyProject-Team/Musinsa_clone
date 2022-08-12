const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const axios = require('axios')
const qs = require('qs')
const CryptoJS = require('crypto-js');
const request = require('request'); 

const jwt = require("../utils/jwt-utils");
const { sequelize, User } = require('../models')
const redisClient = require("../utils/redis");
const authJWT = require('../utils/authJWT')
const { smtpTransport } = require('../utils/email');

dotenv.config();
router.post('/signup', async (req, res, next) => {
    try {
        console.log(req.body)
        const exUser = await User.findOne({
          where: {
              LoginId: req.body.loginId
        }
        })
        console.log(exUser)
        if (exUser) {
            return res.status(401).send({ message: "이미 사용중인 아이디 입니다" })
        }

        const checkEmail = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (checkEmail) {
            return res.status(402).send({ message: "이미 사용중인 이메일 입니다"})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            loginId: req.body.loginId,
            password: hashedPassword,
            email: req.body.email,
            agreement: req.body.agreement== 1 ? 1: 0 
        })
        return res.status(200).send({ success: true })
    }catch (error) {
        console.error(error)
        next(error)
    }
})

router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
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
    return res.status(200).send({ message: "ok" });
  });
});
  
router.post('/kakao', (req,res) => {
  const kakao = {
    clientID: process.env.KAKAO_ID,
    redirectUri: 'http://localhost/api/auth/kakao/callback'
  }
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_nickname,account_email`;
  return res.status(200).send({ url :kakaoAuthURL })
})

router.get('/kakao/callback', async (req, res, next) => {
  try {
    const kakao = {
      clientID: process.env.KAKAO_ID,
      redirectUri: 'http://localhost/api/auth/kakao/callback'
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
    
    let userInfo = await User.findOne({
      where: {
        socialEmail : user.data.kakao_account.email
    }
    })

    if (userInfo) {
      const accessToken = jwt.sign(user);
      const refreshToken = jwt.refresh(user);
      redisClient.set(userInfo.id, refreshToken);
      return res.status(200).send({
        refreshToken,
        accessToken,
      })
    }
    userInfo = await User.create({
      socialEmail : user.data.kakao_account.email
    })

    const accessToken = jwt.sign(userInfo);
    const refreshToken = jwt.refresh(userInfo);
    res.status(200).send({
      refreshToken,
      accessToken,
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/authEmail', async (req, res) => {
    
  /* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */ 
  try {
    var generateRandom = function (min, max) {
        var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
        return ranNum;
    }
    const number = generateRandom(111111,999999)

    const sendEmail = req.body.email;

    const mailOptions = {
        from: "sola2014@naver.com",
        to: sendEmail,
        subject: "[무신사]인증 관련 이메일 입니다",
        text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
    };
    await smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
            console.error(error)
            return res.status(400).send({ message: "유효하지 않은 이메일입니다" })
        } else {
        /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
            return res.status(200).send({ number: number })
        }
        smtpTransport.close();
    });
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
    await redisClient.set(user_phone_number, code);
    await redisClient.expire(user_phone_number, 180)
    res.status(200).send({ message: "success" })
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/checkSMS', async (req, res, next) => {
  try {
    const { phoneNum, code } = req.body;

    const client = await redisClient;
    client.get(phoneNum, function (err, clientCheck) {
      
      console.log(clientCheck)
      console.log(req.body.code)
      if (!clientCheck) {
        console.log("?")
        return res.status(400).send({ message: "인증 시간이 만료됐습니다" });
      }
      if (code != clientCheck) {
      return res.status(401).send({ message: "인증 번호가 틀리셨습니다" })
    }
      return res.status(200).send({ success: true });
    });
    // console.log(phoneNum);
    // console.log(code, typeof(code))
  } catch (e) {
    console.error(e)
    next(e)
  }
})
module.exports = router