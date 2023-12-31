const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const boardRouter = require('./board');
const postsRouter = require('./posts');
const userRouter = require('./user');
const commentRouter = require('./comments');
const usersRouter = require('./users');
const apiRouter = require('./api');

router.use('/auth', authRouter);
router.use('/board', boardRouter);
router.use('/posts', postsRouter);
router.use('/user', userRouter);
router.use('/comments', commentRouter);
router.use('/users', usersRouter);
router.use('/api', apiRouter);

///////////////////////////////
// 캐시를 위한 미들웨어 설정 //
///////////////////////////////
// 모든 GET 요청에 대해서 캐시 검사
// router.use((req, res, next) => {
//   console.log("캐시 미들 웨어 진입");
//   // 캐시 검사할 요청 주소 정의 배열
//   // 많아지면 .env 파일로 따로 빼기
//   const cacheableRoutes = ["/api/weather"];

//   // /api/weather로 시작하는 모든 요청에 대해서 캐시 사용함
//   if (req.url.startsWith(cacheableRoutes[0])) {
//     console.log("캐시 사용함");
//     // 캐시가 있는 경우
//     if (req.fresh) {
//       console.log("캐시가 있음");
//       return res.sendStatus(304);
//     }
//     // 캐시가 없는 경우 헤더 설정 추가
//     else {
//       console.log("캐시가 없음");
//       res.set("Cache-Control", "public, max-age=3600");
//       next();
//     }
//   }
//   // 캐시를 사용하지 않을 리소스의 경우 바로 다음 미들웨어로 이동
//   else {
//     console.log("캐시 사용하지 않음");
//     next();
//   }
// });
///////////////////////////////
///////////////////////////////
///////////////////////////////

module.exports = router;
