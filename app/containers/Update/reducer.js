/*
 *
 * Update reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  list: false,
  updateData: false,
  updateError: false,
  updateMessage: false,
};


function handleUpdate(updateData, list){
  // debugger;
  const index = list.findIndex((item) => item.dressId === updateData.dressId);
  list[index] = updateData;
  return list;
}

/* eslint-disable default-case, no-param-reassign */
const updateReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case GET_LIST:
        // debugger;
        draft.loading = true;
        draft.error = false;
        draft.list = false;
        break;

      case GET_LIST_SUCCESS:
        // debugger;
        draft.loading = false;
        draft.error = false;
        draft.list = action.list;
        break;

      case GET_LIST_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.list = false;
        break;

      case UPDATE_REQUEST:
        // debugger;
        draft.updateData = action.updateData;
        draft.updateError = false;
        draft.updateMessage = false;
        break;

      case UPDATE_SUCCESS:
        // debugger;
        draft.list = handleUpdate(action.updateData, action.list);
        draft.updateError = false;
        draft.updateMessage = false;
        draft.updateMessage = action.updateMessage;
        break;

      case UPDATE_ERROR:
        draft.updateError = true;
        draft.updateMessage = action.updateMessage;
        break;
    }
  });

export default updateReducer;
