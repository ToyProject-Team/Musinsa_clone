const express = require('express')

const router = express.Router()
const authJWT = require('../utils/authJWT')

router.get('/favorite_goods', authJWT, (req, res) => {
    console.log("??")
    res.status(200).send({ message: "success" })
})

module.exports = router