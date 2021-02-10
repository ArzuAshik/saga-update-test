import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { dataLoaded, dataLoadingError } from '../App/actions';
import { LOAD_DATA } from '../App/constants';




export function* getStudent(){
  const url = "https://api.neticms.com/admisia/class/config/info/list?cmsId=2";
  try {
    const data = yield call(request, url);
    yield put(dataLoaded(data));
  } catch (err){
    yield put(dataLoadingError(err));
  }
}

// Individual exports for testing
export default function* studentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_DATA, getStudent)
}

