/**
 *
 * Asynchronously loads the component for Student
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
