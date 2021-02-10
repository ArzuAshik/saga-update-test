/*
 * Student Messages
 *
 * This contains all the text for the Student container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Student';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Student container!',
  },
});
