const express = require('express')
const Product = require('../models/product')
const User = require('../models/user')
const ProductImg = require('../models/productImg')
const CustomCategory = require('../models/customCategory')
const Comment = require('../models/comment')
const AWS = require('aws-sdk');
const fs = require('fs');
const {sequelize, Op} = require('sequelize')

const router = express.Router()

function checkParams (bigCategory, price) {
    if (!bigCategory) {

    }
}

require('dotenv')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region : 'ap-northeast-2'
});

router.get('/productList', async (req, res, next) => {
    try {
        const startIndx = Number(req.query.page)*100
        console.log(req.query.dsadas)
        const productData = await Product.findAll({
            
            where: {
                [Op.and]: [
                    {
                       productPrice: {
                            [Op.between]: 
                                [req.query.priceMin ? Number(req.query.priceMin) : 
                                    req.query.price ? 
                                    req.query.price==1 ? 0:
                                    req.query.price==2 ? 50000:
                                    req.query.price==3 ? 100000:
                                    req.query.price==4 ? 200000:
                                    300000 
                                    : 0 
                                    , 
                                req.query.priceMax ? Number(req.query.priceMax) : 
                                    req.query.price ? 
                                    req.query.price==1 ? 50000: 
                                    req.query.price==2 ? 100000:
                                    req.query.price==3 ? 200000:
                                    req.query.price==4 ? 300000:
                                    700000
                                    :700000]
                       }
                    },
                    {
                        bigCategoryId: {
                            [Op.gt]: [req.query.bigCategoryId ? Number(req.query.bigCategoryId)-1 : 0 ]
                        }
                    },
                    {
                        smallCategoryId: {
                            [Op.gt]: [req.query.smallCategoryId ? Number(req.query.smallCategoryId)-1 : 0 ]
                        }
                    }
                ]
            },
            include: [
                {
                    model: ProductImg,
                    attributes: ["src"]
                }
            ],
            limit: 100,
            offset: startIndx,
            attributes: ['id', 'productTitle', 'productPrice', 'likes', 'comments']
        })
        //a
        if (!productData) {
            return res.status(400).json({ message: "상품 조회 결과가 없습니다 입력값을 다시 확인해주세요" })
        }

        res.status(200).json({ productData })
    } catch(e) {
        console.error(e)
        next(e)
    }
})

router.get('/productDetail', async (req, res) => {
    console.log(req.query.productId)
    let product = await Product.findOne({
        include: [
            {
                model: CustomCategory,
                attributes: ["id"],
                through: {attributes: []}
            }
        ],
        where: {
            id: req.query.productId
        },
        attributes: {exclude: ['productInfo', "createdAt", "updatedAt", "deletedAt", ]},
    })

        
    if (!product) {
        return res.status(400).json({ message: '상품 조회 결과가 없습니다'})
    }
    const comment = await Comment.findAndCountAll({
        raw: true,
        where: {
            ProductId: product.id
        },
    })
    sum = 0
    for (let i = 0; i < comment.count; i++) {
        sum += comment.rows[i].ValueBrightness
        sum += comment.rows[i].ValueColorSense
        sum += comment.rows[i].ValueStorageSpace
    }
    rated = (sum / (comment.count * 3)).toFixed(1)
    product.setDataValue('commentCount', comment.count)
    product.setDataValue('rated', rated)
    
    res.status(200).json({ product })
})


module.exports = router