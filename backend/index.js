// import module
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models'); // sequelize
const session = require('express-session');

//////////////////////////////////////////////
////////////////// init //////////////////////
//////////////////////////////////////////////
const app = express();

// port set
app.set('port', 3030);

// .env
dotenv.config();

// passport
const passportConfig = require('./passport');
passportConfig();

// sequelize
sequelize
  .sync({ force: false }) // sequelize db-model sync(true -> recreate)
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev')); // 배포시 dev 수정 해야함
app.use(express.static(path.join(__dirname, 'public'))); // static 경로 설정
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // '/'로 접근시 public으로, '/img'로 접근시 uploads로

// app.use(express.static('public', { maxAge: '1d', immutable: true })); //뒤로가기 했을 때 캐시 제어 후 바뀐 데이터 가져오는 코드
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store');
//   next();
// });

// body-parser 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie-parser, session 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

// passport 설정
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////
////////////////// init end //////////////////
//////////////////////////////////////////////

// router
app.use(require('./routes'));

// router not found
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json('server error');
});

// port listen
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
