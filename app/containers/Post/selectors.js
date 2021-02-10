import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the post state domain
 */

const selectPostDomain = state => state.post || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Post
 */

const makeSelectPost = () =>
  createSelector(
    selectPostDomain,
    substate => substate,
  );

export default makeSelectPost;
export { selectPostDomain };
