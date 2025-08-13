var express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();

// 메뉴 데이터 로드
const menuData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data', 'menu.json'))
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { layout: 'layout', menu: menuData.mainMenu });
});

module.exports = router;
