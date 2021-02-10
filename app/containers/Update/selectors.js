import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the update state domain
 */

const selectUpdateDomain = state => state.update || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Update
 */

const makeSelectUpdate = () =>
  createSelector(
    selectUpdateDomain,
    substate => substate ,
  );



export default makeSelectUpdate;
export { selectUpdateDomain };
