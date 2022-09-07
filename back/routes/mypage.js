const express = require('express')

const User = require('../models/user')
const Product = require('../models/product')
const router = express.Router()
const authJWT = require('../utils/authJWT')
const ProductImg = require('../models/productImg')

router.get('/favoriteGoods', authJWT, async (req, res, next) => {
    try {
        console.log(req.myId)
        const me = await User.findOne({
            where: {
                id: req.myId
            }
        })
        console.log(me)
        if (!me) {
            return res.status(400).send({ message: "유저의 조회 결과가 없습니다"})
        }

        const likeProduct = await me.getLikeIt({
            joinTableAttributes: [],
            attributes: ["id", "productPrice", "likes", "productTitle"],
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
        console.log(me)
        const checkLength = []
        for (let i = 0; i < delProductLength; i++) {
            let checkList = await me.getLikeIt({
                where: {   
                    id: req.body.productId[i]
                }
            })
            if (checkList.length == 0) {
                return res.status(402).send({ message: "좋아요하지 않은 상품을 삭제 시도하셨습니다" })
            }
            checkLength.push(checkList)
        }

        // if (checkLength.length !== delProductLength) {
        //     return res.status(402).send({ message: "좋아요하지 않은 상품을 삭제 시도하셨습니다" })
        // }


        for (let i = 0; i < delProductLength; i++) {
            temp = await me.removeLikeIt(checkLength[i])
        }
        res.status(200).send({ success: true })
    } catch (e) {
        console.error(e)
        next(e)
    }
    // const 
})

module.exports = router