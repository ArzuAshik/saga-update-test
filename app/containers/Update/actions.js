/*
 *
 * Update actions
 *
 */

import { DEFAULT_ACTION, GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getList() {
  return {
    type: GET_LIST,
  };
}
export function getListSuccess(list) {
  return {
    type: GET_LIST_SUCCESS,
    list
  };
}
export function getListError(error) {
  return {
    type: GET_LIST_ERROR,
    error
  };
}

export function updateRequest(updateData) {
  
  return {
    type: UPDATE_REQUEST,
    updateData,
  };
}
export function updateSuccess(updateData, list) {
  return {
    type: UPDATE_SUCCESS,
    updateData,
    list
  };
}
export function updateError(updateMessage) {
  return {
    type: UPDATE_ERROR,
    updateMessage
  };
}
