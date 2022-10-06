const { Request, Response, NextFunction } = require('express');
const HttpException = require('../exceptions/HttpException');

/**
 * 통합 오류 처리 미들웨어
 * @param {Error | HttpException} err
 * @param {Request} req
 * @param {Responce} res
 * @param {NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
    if (err.status) {
        // 시스템 오류가 아닌 경우
        res.status(err.status).send({ message: err.message });
    } else {
        // 시스템 오류인 경우
        console.error(err.stack);
        res.status(500).send({ message: err.message });
    }
};

module.exports = errorHandler;
