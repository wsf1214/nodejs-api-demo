const express = require('express');
const app = express();
const router = express.Router();

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))


//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '127.0.0.1',//数据库地址
  user: 'root',//账号
  password: '1214',//密码
  database: 'my_database',//库名
  // host: '47.103.58.12',//数据库地址
  // user: '23work_area',//账号
  // password: 'vertrigo',//密码
  // database: '23work_area',//库名
  multipleStatements: true //允许执行多条语句
})

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") {
    res.send(200);/*让options请求快速返回*/
  }
  else {
    next()
  }
})



module.exports = { router, app, conn };