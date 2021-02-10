/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR, LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR, POST_DATA, POST_DATA_SUCCESS, POST_DATA_ERROR, SET_INPUT_VALUE } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  data: false,
  postResult: false,
  input: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos.item;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        break;
      
      case LOAD_DATA_SUCCESS:
        draft.data = action.data.item;
        draft.loading = false;
        draft.error = false;
        break;

      case LOAD_DATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case POST_DATA:
        draft.loading = true;
        draft.error = false;
        draft.postResult = false;
        break;

      case POST_DATA_SUCCESS:
        draft.error = false;
        draft.postResult = action.result;
        draft.loading = false;
        break;

      case POST_DATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SET_INPUT_VALUE:
        draft.input = action.value;
        break;
    }
  });

export default appReducer;
