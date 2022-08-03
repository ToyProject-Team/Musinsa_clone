const express = require('express')

const User = require('../models/user')
const Product = require('../models/product')
const router = express.Router()
const authJWT = require('../utils/authJWT')
const ProductImg = require('../models/productImg')

router.get('/favoriteGoods', authJWT, async (req, res, next) => {
    try {
        const me = await User.findOne({
            where: {
                id: req.myId
            }
        })

        if (!me) {
            return res.status(400).send({ message: "유저의 조회 결과가 없습니다"})
        }

        const likeProduct = await me.getLiker({
            joinTableAttributes: [],
            attributes: ["productPrice", "likes", "productTitle"],
            include: [
                {
                    model: ProductImg,
                    attributes: ["src"]
                }
            ],
            limit: 100
        })
        
        res.status(200).send({ likeProduct })
    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.delete('/favoriteGoods/del', authJWT, async (req, res, next) => {
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
            checkLength.push(await me.getLiker({
                where: {   
                    id: req.body.productId[i]
                }
            }))
        }

        if (checkLength.length !== delProductLength) {
            return res.status(402).send({ message: "좋아요하지 않은 상품을 삭제 시도하셨습니다" })
        }


        for (let i = 0; i < delProductLength; i++) {
            temp = await me.removeLiker(checkLength[i])
        }
        res.status(200).send({ success: true })
    } catch (e) {
        console.error(e)
        next(e)
    }
    // const 
})

module.exports = router