const express = require('express')
const authJWT = require('../utils/authJWT')
const router = express.Router()

router.get('shoppingList', authJWT, (req, res, next) => {
    try {

    } catch(e) {

    }
})

module.export = router