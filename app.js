var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/projects'); // Assuming projects.js is the correct file for projects
var usersRouter = require('./routes/users');

var app = express();

// EJS Layouts 설정
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projects', usersRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // menu.json 읽기
  const menuData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data', 'menu.json'), 'utf-8')
  );

  // 로컬 변수 설정
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.status = err.status || 500;

  // 에러 페이지 렌더링 (layout.ejs 사용)
  res.status(res.locals.status);
  res.render('error', {
    layout: 'layout',         // layout.ejs 사용 명시
    menu: menuData.mainMenu   // 네비게이션 메뉴 전달
  });
});

module.exports = app;