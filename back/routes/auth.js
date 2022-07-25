const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const { sequelize, User } = require('../models')

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

module.exports = router