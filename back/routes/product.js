const express = require('express')
const router = express.Router()

const Product = require('../models/product')
const User = require('../models/user')

router.get('/productList', async (req, res, next) => {
    try {
        const startIndx = Number(req.query.page) * 10
        console.log(startIndx)
        const productData = await Product.findAll({
            limit: 10,
            offset: startIndx,
            attributes: ['id', 'productTitle', 'productPrice', 'likes', 'comments',]
        })
        res.json({ productData })
    } catch(e) {
        console.error(e)
        next(e)
    }
})

// router.get('/product', authJWT, (req, res) => {
//     const product = await Product.findOne({
//         where: req.query.productId,
//         attributes: ['id', 'productTitle', 'productPrice', 'likes', 'comments',]
//     })
    
//     if (!product) {
//         return res.status(400).json({ message: '상품 조회 결과가 없습니다'})
//     }
// })

module.exports = router