import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as Find from '../lib/api/find';
import { takeLatest } from 'redux-saga/effects';

//액션 정의
const CHANGE_INPUT = 'find/CHANGE_INPUT';
const CHANGE_ERROR = 'find/CHANGE_ERROR';
const NEXT_STEP = 'find/NEXT_STEP';
const CHANGE_STEP = 'find/CHANGE_STEP';
const INITIALIZE = 'find/INITIALIZE_FORM';
const INITNUMBER = 'find/INITNUMBER';
const [EMAIL, EMAIL_SUCCESS, EMIAL_FAILURE] = createRequestActionTypes('find/EMAIL');
const FINDUSER = 'find/FINDUSER';
const [PHONE, PHONE_SUCCESS, PHONE_FAILURE] = createRequestActionTypes('find/PHONE');

//액션 생성
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({
  form,
  key,
  value,
}));
export const initialize = createAction(INITIALIZE, (form) => form);
export const checkEmail = createAction(EMAIL, ({ email, nickname }) => ({
  email,
  nickname,
}));

export const changeError = createAction(CHANGE_ERROR, ({ form, key, value }) => ({
  key,
  value,
  form,
}));

export const checkPhone = createAction(PHONE, (phone) => phone);

export const findUser = createAction(FINDUSER, (user) => user);

//인증번호 초기화
export const initNumber = createAction(INITNUMBER);

//스텝 변경
export const nextStep = createAction(NEXT_STEP);
export const changeStep = createAction(CHANGE_STEP, (number) => number);

//초기값생성
const initialState = {
  findId: {
    nickname: '',
    phone: '',
    certification: '',
    certificationNumber: '',
    error: {
      nicknameError: null,
      emailError: null,
      errorPhone: null,
      errorConfirm: null,
    },
  },
  findPwd: {
    step: 1,
    userId: '',
    email: '',
    nickname: '',
    phone: '',
    certification: '',
    password: '',
    passwordConfirm: '',
    error: {
      userIdError: null,
      notUserError: null,
      emailError: null,
      nicknameError: null,
      phoneError: null,
      passwordError: null,
      passwordConfirmError: null,
    },
    findUser: null,
  },
  certificationNumber: null,
  emailError: null,
};

//사가생성
const checkEmailSaga = createRequestSaga(EMAIL, Find.checkEmail);
const checkPhoneSaga = createRequestSaga(PHONE, Find.checkPhone);

export function* emailSage() {
  yield takeLatest(EMAIL, checkEmailSaga);
  yield takeLatest(PHONE, checkPhoneSaga);
}
//액션 기능
const find = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [CHANGE_ERROR]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form].error = {
          ...draft[form].error,
          [key]: value,
        };
      }),
    [NEXT_STEP]: (state) => ({
      ...state,
      findPwd: {
        ...state.findPwd,
        step: state.findPwd.step + 1,
      },
    }),
    [CHANGE_STEP]: (state, { payload: number }) => ({
      ...state,
      findPwd: {
        ...state.findPwd,
        step: number,
      },
    }),
    [INITNUMBER]: (state) => ({
      ...state,
      certificationNumber: null,
      findPwd: {
        ...state.findPwd,
        certification: '',
      },
    }),
    [FINDUSER]: (state, { payload: user }) => ({
      ...state,
      findPwd: {
        ...state.findPwd,
        findUser: user,
      },
    }),
    [INITIALIZE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [EMAIL_SUCCESS]: (state, { payload: email }) => ({
      ...state,
      certificationNumber: email,
      emailError: null,
    }),
    [EMIAL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      emailError: error,
    }),
    [PHONE_SUCCESS]: (state, { payload: phone }) => ({
      ...state,
      certificationNumber: phone,
    }),
    [PHONE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      sendPhone: null,
    }),
  },
  initialState,
);

export default find;
