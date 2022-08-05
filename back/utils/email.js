const nodemailer = require('nodemailer');
const dotenv = require('dotenv')

dotenv.config()
const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports={
      smtpTransport
  }