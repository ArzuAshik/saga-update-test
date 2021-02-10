import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the student state domain
 */

const selectStudentDomain = state => state.student || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Student
 */

const makeSelectStudent = () =>
  createSelector(
    selectStudentDomain,
    substate => substate,
  );

export default makeSelectStudent;
export { selectStudentDomain };
