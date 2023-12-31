const { User, Post, Content, Pet, Attendance, Memo } = require('../models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const { Op } = require('sequelize');

//출석일자 저장
exports.attendance = async (req, res, next) => {
  const { userId, id } = req.body;
  console.log(id);
  const checkInTime = new Date();
  const dateString = checkInTime.toISOString().split('T')[0]; // T00:29:19.902Z 부분 삭제

  try {
    const attendanceDate = await User.findOne({ where: { id: id }, attributes: ['isAttendance'] });
    console.log(attendanceDate);

    if (attendanceDate.checkInTime === true) {
      console.log('이미 출석');
      return;
    }

    await User.update({ isAttendance: true }, { where: { userId: userId } });
    console.log('출석하였습니다.');
    res.status(200).json({ message: '출석하였습니다.' });

    await Attendance.create({
      checkInTime: checkInTime,
      UserId: id,
    });
    const user = await User.findOne({ where: { userId: userId } });
    if (user) {
      user.attendanceNumber += 1;
      await user.save();
    } else {
      console.log('User not found');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.isAttendance = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return;
  }
  const isAttendance = await User.findOne({ where: { userId: userId }, attributes: ['isAttendance'] });
  const confirmAttendance = isAttendance.dataValues.isAttendance;
  res.status(200).json(confirmAttendance);
};

// 체크 여부 초기화 함수
const resetCheckStatus = async () => {
  try {
    // 모든 유저의 체크 여부를 false로 초기화
    await User.update({ isAttendance: false }, { where: {} });
    console.log('출석여부 초기화 진행');
  } catch (error) {
    console.error(error);
  }
};

// 매일 자정에 체크 여부 초기화 작업 실행
cron.schedule('36 9 * * *', resetCheckStatus); // '분 시 * * *'는 매일 자정을 의미합니다

exports.getAttendance = async (req, res, next) => {
  const { id } = req.body;
  try {
    const data = await Attendance.findAll({ where: { UserId: id } });
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

exports.checkUser = async (req, res) => {
  try {
    if (Object.keys(req.query)[0] == 'userId') {
      const userId = req.query.userId;
      const user = await User.findOne({ where: { userId: userId } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    } else if (Object.keys(req.query)[0] == 'nickname') {
      const nickname = req.query.nickname;
      const user = await User.findOne({ where: { nickname: nickname } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPost = async (req, res, next) => {
  console.log(req.user.id);
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
          where: { id: req.user.id },
        },
        {
          model: Content,
          attributes: ['content'],
        },
      ],
    });
    res.json({
      posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.findId = async (req, res, next) => {
  const { nickname, phone } = req.body;
  try {
    if (nickname) {
      const userId = await User.findOne({ where: { nickname }, attributes: ['userId', 'email'] });
      if (userId === null) {
        res.status(200).json();
        return;
      }
      res.status(200).json(userId);
    } else if (phone) {
      const userId = await User.findOne({ where: { phone }, attributes: ['userId', 'email'] });
      if (userId === null) {
        res.status(200).json();
        return;
      }
      res.status(200).json(userId);
    }
    console.log('이메일 성공적 전송');
  } catch (error) {
    console.log(error);
  }
};

exports.userIdConfirm = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const findUser = await User.findOne({ where: { userId }, attributes: ['userId', 'nickname', 'phone', 'email'] });
    res.status(200).json(findUser);
  } catch (e) {
    console.log(e);
  }
};

exports.findPwdEmail = async (req, res, next) => {
  const { email, nickname } = req.body;
  console.log(email, nickname);

  const response = await User.findOne({ where: { email: email, nickname: nickname } });
  if (response) {
    try {
      //랜덤문자 생성(문자와 숫자가 섞인 6자리 랜덤문자 생성)
      const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
        return code;
      };
      const generatedCode = generateCode();

      //이메일 생성 전달 부분
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "antjd0419@gmail.com",
      //     pass: process.env.MYEMAILPASSWORD,
      //   },
      // });

      // const mailOptions = {
      //   from: "antjd0419@gmail.com",
      //   to: email,
      //   subject: "안녕하세요. 펫프렌즈입니다.",
      //   text: `인증번호 ${generatedCode} 입니다.`,
      // };

      // await transporter.sendMail(mailOptions);
      // console.log("이메일이 성공적으로 전송되었습니다.");
      console.log(generatedCode);
      res.status(200).json(generatedCode);
    } catch (error) {
      console.log(error);
    }
  }
};

exports.findPwdPhone = async (req, res, next) => {
  const { phone } = req.body;
};

exports.changePwd = async (req, res, next) => {
  const { pwd, findEmail } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    await User.update({ password: hashedPwd }, { where: { email: findEmail } });
    res.status(200).json({ success: true, message: '패스워드가 업데이트되었습니다.' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

exports.editUser = async (req, res, next) => {
  const { id, nickname, userId, email, address1, address2, address3, pet, petName, petType, petKind, petAge, petEtc } =
    req.body;
  console.log(id, nickname, userId, email, address1);
  try {
    await User.update(
      {
        nickname,
        userId,
        email,
        address1,
        address2,
        address3,
        pet,
      },
      {
        where: { id: id },
      },
    );
    await Pet.update(
      {
        name: petName,
        type: petType,
        kind: petKind,
        age: Number(petAge),
        etc: petEtc,
      },
      {
        where: { id: id },
      },
    );

    return res.redirect('/page/mypage');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러 발생' });
  }
};

exports.saveMemo = async (req, res, next) => {
  const { content, id } = req.body;
  if (id) {
    try {
      await Memo.create({
        content: content,
        UserId: id,
      });
      console.log('등록 성공!');
      return res.status(200);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(500);
    console.log('로그인 필요');
  }
};

exports.memos = async (req, res, next) => {
  const { id, search } = req.body;

  if (!id) {
    return res.status(400).json({ error: '로그인 필요' });
  }

  try {
    let response;

    if (search !== undefined) {
      response = await Memo.findAll({
        where: {
          UserId: id,
          content: {
            [Op.like]: `%${search}%`,
          },
        },
        order: [['createdAt', 'DESC']],
      });
    } else {
      response = await Memo.findAll({
        where: { UserId: id },
        order: [['createdAt', 'DESC']],
      });
    }

    return res.json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: '서버에러' });
  }
};

exports.memo = async (req, res, next) => {
  const { id, userId } = req.body;
  try {
    const response = await Memo.findOne({ where: { id: id, UserId: userId } });
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

exports.memoUpdate = async (req, res, next) => {
  const { id, content } = req.body;

  try {
    const updatedMemo = await Memo.update({ content: content }, { where: { id: id } });

    if (updatedMemo[0] === 0) {
      return res.status(404).json({ message: '메모를 찾을 수 없습니다.' });
    }
    return res.json(updatedMemo);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '서버 오류로 인해 메모를 업데이트하지 못했습니다.' });
  }
};

exports.memoDelete = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  try {
    await Memo.destroy({ where: { id: id } });
    return res.json({ message: '메모가 삭제되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '서버 오류로 인해 메모를 업데이트하지 못했습니다.' });
  }
};
