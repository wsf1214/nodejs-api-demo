const { app, router, conn } = require("./connect");
// 按条件查询
router.post('/getlistdetl', (req, res) => {
  let { page_size, page_index, keyword } = req.body || {};
  if (!page_size) {
    page_size = 20;
  }
  if (!page_index) {
    page_index = 1
  }
  if (!keyword) {
    keyword = ""
  }
  const sqlStr = `select * from \`order\`  where customer like '%${keyword}%' limit ` + (page_index - 1) * page_size + `, ${page_size}`;
  let countSql = `select count(*) as count from \`order\` where customer like '%${keyword}%'`;
  let start = new Date().getTime();
  conn.query(sqlStr + ";" + countSql, (err, results) => {
    if (err) {
      return res.json(err)
    }
    let count = results[1][0].count;
    let list = results[0];
    let end = new Date().getTime()
    res.json({
      code: 10200,
      data: {
        count,
        list
      },
      t: end - start,
      msg: "请求成功",
    })
  })
})
//获取表单数据
router.get('/getlist', (req, res) => {
  const sqlStr = 'select * from `order` '
  conn.query(sqlStr, (err, results) => {
    if (err) {
      return res.json(err)
    }
    res.json({
      code: 10200,
      data: {
        list: results
      },
      msg: "请求成功",
      affextedRows: results.affextedRows
    })
  })
})
module.exports = router;