const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const axios = require('axios')
const qs = require('qs')

const jwt = require("../utils/jwt-utils");
const { sequelize, User } = require('../models')
const redisClient = require("../utils/redis");
const authJWT = require('../utils/authJWT')

dotenv.config();
router.post('/signup', async (req, res, next) => {
    try {
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
            email: req.body.email
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
  
router.get('/kakao', (req,res) => {
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

module.exports = router