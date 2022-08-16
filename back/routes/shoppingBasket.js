const express = require('express')
const { User } = require('../models')
const authJWT = require('../utils/authJWT')
const router = express.Router()

router.get('/shoppingList', authJWT, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                id: req.myId
            }
        })
        if (!exUser) {
            return res.status(400).send({ message: "유저의 조회 결과가 없습니다"})
        }
        const exCart = await exUser.getProduct({
            joinTableAttributes: [],
            attributes: ["id", "productTitle", "productPrice", "nonMemberPrice", "deliveryFrom", "deliveryWay","deliveryCompany"]
        })
        res.status(200).send({ exCart })
    } catch(e) {
        console.error(e)
        next(e)
    }
})

router.delete('/delshoppingList', authJWT, async (req, res, next) => {
    try {
        if (!req.body.productId) {
            return res.status(400).send({ message: "입력값을 다시 확인해주세요"})
        }

        const delProductLength = req.body.productId.length
        const me = await User.findOne({
            where: {
                id: req.myId
            }
        })

        if (!me) {
            return res.status(401).send({ message: "유저의 조회 결과가 없습니다"})
        }

        const checkLength = []
        for (let i = 0; i < delProductLength; i++) {
            let checkList = await me.getProduct({
                where: {   
                    id: req.body.productId[i]
                }
            })
            if (checkList.length == 0) {
                return res.status(402).send({ message: "장바구니에 없는 상품을 삭제 시도하셨습니다" })
            }
            checkLength.push(checkList)
        }

        for (let i = 0; i < delProductLength; i++) {
            temp = await me.removeProduct(checkLength[i])
        }
        res.status(200).send({ success: true })
    } catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router