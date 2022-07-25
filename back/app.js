//외부모듈
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const hpp = require("hpp");
const helmet = require("helmet");
const path = require("path");
const { createServer } = require('http')
const httpServer = createServer(app)

//내부모듈
const db = require('./models')

//swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerSpec = YAML.load(path.join(__dirname, "swagger.yaml"));

//서버 가동
dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
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

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }) //검색 허용가능
);

//포트 설정
httpServer.listen(80);