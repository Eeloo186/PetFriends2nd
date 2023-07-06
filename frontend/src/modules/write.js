////////////////
// write post //
////////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

// define action type
const CHANGE_INPUT = 'write/CHANGE_INPUT';
const INIT_INPUT = 'write/INIT_INPUT';

const CREATE_POST = 'write/CREATE_POST';
const CREATE_POST_SUCCESS = 'write/CREATE_POST_SUCCESS';
const CREATE_POST_FAILURE = 'write/CREATE_POST_FAILURE';

// const UPDATE_POST = 'write/UPDATE_POST';
// const UPDATE_POST_SUCCESS = 'write/UPDATE_POST_SUCCESS';
// const UPDATE_POST_FAILURE = 'write/UPDATE_POST_FAILURE';

// const DELETE_POST = 'write/DELETE_POST';
// const DELETE_POST_SUCCESS = 'write/DELETE_POST_SUCCESS';
// const DELETE_POST_FAILURE = 'write/DELETE_POST_FAILURE';

// action creator
export const changeInput = createAction(CHANGE_INPUT, (key, value) => ({ key, value }));
export const initInput = createAction(INIT_INPUT);
export const createPost = createAction(CREATE_POST, ({ boardName, title, content }) => ({ boardName, title, content }));

// define saga
const createPostSaga = createRequestSaga(CREATE_POST, postAPI.createPost);
export function* writeSaga() {
  yield takeLatest(CREATE_POST, createPostSaga);
}

// init
const initialState = {
  title: '',
  content: '',
  post: null,
  postError: null,
};

// reducer
const write = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    [INIT_INPUT]: () => initialState,
    [CREATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [CREATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
  },
  initialState,
);

export default write;