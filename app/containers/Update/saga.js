import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { getListError, getListSuccess, updateSuccess, updateError } from './actions';
import { GET_LIST, UPDATE_REQUEST } from './constants';
import makeSelectUpdate from './selectors';


export function* load(){
  // debugger;
  const requestURL = `http://192.168.0.7:8081/dress-info/list?cmsId=4`;

  try {
    // Call our request helper (see 'utils/request')
    const list = yield call(request, requestURL);
    // console.log(list.item);
    yield put(getListSuccess(list.item));
  } catch (err) {
    console.log("catch");
    yield put(getListError(err));
  }
}


export function* update(){
  const updateData = yield select(makeSelectUpdate());
  console.log(updateData.updateData);
  const requestURL = `http://192.168.0.7:8081/dress-info/update`;
  try {
    // Call our request helper (see 'utils/request')
    const list = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData.updateData)
    });
    console.log(list);
    window.alert(list.message);
    yield put(updateSuccess(updateData.updateData, updateData.list));
  } catch (err) {
    console.log(err);
    yield put(updateError(err));
  }
}

// Individual exports for testing
export default function* updateSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST, load)
  yield takeLatest(UPDATE_REQUEST, update)
}
