const express = require('express')

const User = require('../models/user')
const router = express.Router()
const authJWT = require('../utils/authJWT')
const ProductImg = require('../models/productImg')

router.get('/favoriteGoods', authJWT, async (req, res) => {
    const me = await User.findOne({
        where: {
            id: req.myId
        }
    })

    if (!me) {
        res.status(400).send({ message: "유저의 조회 결과가 없습니다"})
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
})

module.exports = router