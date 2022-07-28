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

//내부모듈
const db = require('./models')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')

//swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerSpec = YAML.load(path.join(__dirname, "swagger.yaml"));

//서버 가동
dotenv.config();
const app = express();
const httpServer = createServer(app)
db.sequelize
  // .sync()
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

if (process.env.NODE.ENV === 'production') {
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'))
}
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

app.use('/api/product', productRouter)
app.use('/api/auth', authRouter)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }) //검색 허용가능
);
app.use('/', (req, res) => {
  res.send({ message: "Hello, express" })
})

//포트 설정
httpServer.listen(80);