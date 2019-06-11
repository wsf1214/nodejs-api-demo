const { app } = require("./connect");
var Color = require('colors');
const test = require("./test");
app.use("/api", test);//请求test中的接口是 需要加上/api  比如 /api/getlistdetl 

app.listen(4000, () => {
  console.log('正在监听端口4000\n'.red + 'http://127.0.0.1:4000'.green + '\n' + ('http://' + getIPAdress() + ":4000").green);
})
// 获取本机ip地址
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}