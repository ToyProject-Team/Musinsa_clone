//외부모듈
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const hpp = require("hpp");
const helmet = require("helmet");
const path = require("path");
const { createServer } = require('http')
const morgan = require('morgan')
const multer = require('multer');
const nunjucks = require('nunjucks');

//내부모듈
const webSocket = require('./socket')
const db = require('./models')
const alertRouter = require('./routes/alert')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const myPageRouter = require('./routes/mypage')
const shoppingBasketRouter = require('./routes/shoppingBasket')
const orderRouter = require('./routes/order')

//swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerSpec = YAML.load(path.join(__dirname, "swagger.yaml"));

//서버 가동
dotenv.config();
const app = express();
// const httpServer = createServer(app)
db.sequelize
  // .sync()
  .sync(
    { alter: false }
    )
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

// if (process.env.NODE.ENV === 'production') {
  app.use(morgan('combined'))
//   app.use(hpp());
//   app.use(helmet());
// } else {
//   app.use(morgan('dev'))
// }
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/alert', alertRouter)
app.use('/api/shoppingBasket', shoppingBasketRouter)
app.use('/api/mypage', myPageRouter)
app.use('/api/product', productRouter)
app.use('/api/auth', authRouter)
app.use('/api/order', orderRouter)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }) //검색 허용가능
);
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});


var AWS = require('aws-sdk');
var fs = require('fs');
require('dotenv')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region : 'ap-northeast-2'
});



app.use('/S3upload', (req, res) => {
  const category = 'Bag'
  defaultStart = 1
  defaultI = 180
  for (i = defaultStart; i<= defaultI; i ++) {
    function isJpg(i) {
      try {
      check = fs.existsSync('../prepare/'+ category + '/' + category + String(i)+'.jpg')
      if (check) {
        return 'jpg'
      } else {
        return 'png'
      }
      } catch (e) {
        return 'png'
      }
    }
    fileExt = isJpg(i)
    console.log(fileExt)
    s3.upload({
      'Bucket':'musinsa-s3',
      'Key': 'image/'+ category + '/' + category + String(i),
      'ACL':'public-read',
      'Body':fs.createReadStream('../prepare/'+ category + '/' + category + String(i)+'.'+ fileExt),
      'ContentType':'image/'+ fileExt
    }, function(err, data){
      if(err) {
          console.log(err);
      }
      console.log(data);
    });
  }
  for (i= defaultStart; i <= defaultI; i++) {
    s3.getObject({ Bucket: 'musinsa-s3', Key: 'image/'+ category + '/' + category + String(i)}, (err, data) => {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else  {
        console.log(data);           // successful response
      }
    })
  }
  res.send({ message: "Hello, express" })
})

// for( var i = Idx; i <= productData.length; i++ ) {
        //     // console.log("?")
        //     const file = await s3
        //         .getObject({ Bucket: 'musinsa-s3', Key: 'image/'+ category + '/' + category + String(i)})
        //         .promise();
        //     console.log(file)
        // } 

app.use('/temp', (req, res) => {
  const category = 'Accessory'
  for (i= 1; i<= 179; i++) {
    s3.getObject({ Bucket: 'musinsa-s3', Key: 'image/'+ category + '/' + category + String(i)}, (err, data) => {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else  {
          console.log(data);           // successful response
      }
    })
  }
  res.json("success")
})

//포트 설정
// const server = httpServer.listen(80);
const server = app.listen(80);
webSocket(server)