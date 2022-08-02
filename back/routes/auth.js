const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const jwt = require("../utils/jwt-utils");
const { sequelize, User } = require('../models')
const redisClient = require("../utils/redis");

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

module.exports = router