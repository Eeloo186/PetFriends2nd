import { combineReducers } from 'redux';
import posts, { postsSaga } from './posts';
import sort from './sort';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import find, { emailSage } from './find';
import theme from './theme';
import post, { postSaga } from './post';
import write, { writeSaga } from './write';
import main, { mainSaga } from './main';
import search from './search';
import pagination from './pagination';

const rootReducer = combineReducers({
  posts,
  sort,
  loading,
  auth,
  user,
  find,
  theme,
  post,
  write,
  main,
  search,
  pagination,
});

export function* rootSaga() {
  yield all([postsSaga(), authSaga(), userSaga(), emailSage(), postSaga(), mainSaga(), writeSaga()]);
}

export default rootReducer;
