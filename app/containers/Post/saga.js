import { call, put, select, takeLatest } from 'redux-saga/effects';
import { POST_DATA } from 'containers/App/constants';
import { postDataSuccess, postDataError } from 'containers/App/actions';
import { makeSelectInputData } from '../App/selectors';
import request from 'utils/request';



export function* postDatas(){
  const input = yield select(makeSelectInputData());
  const requestURL = `http://192.168.0.7:8081/dress-info/save`;
  console.log(input);
  
  try {
    // Call our request helper (see 'utils/request')
    const postResult = yield call(request, requestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    yield put(postDataSuccess(postResult));
  } catch (err) {
    yield put(postDataError(err));
  }
}

// Individual exports for testing
export default function* postSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(POST_DATA, postDatas)
}
