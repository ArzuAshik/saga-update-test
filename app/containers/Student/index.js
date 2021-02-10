/**
 *
 * Student
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectData, makeSelectLoading, makeSelectError } from '../App/selectors';
import { loadData } from '../App/actions';

export const Student = ({loading, error, onGetData, data}) => {
  useInjectReducer({ key: 'student', reducer });
  useInjectSaga({ key: 'student', saga });

  const [keys, setKeys] = useState([]);

  useEffect(() => {
    !data && onGetData();
    data.length && setKeys(Object.keys(data[0]));
  }, [data])

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              keys.map((key, i) => <th key={key + i} style={{textAlign: 'center', border: '1px solid gray', padding: '10px 15px', textTransform: 'uppercase'}}>{key}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 && data.map(d => <tr>{keys.map(key => <td style={{textAlign: 'center', border: '1px solid gray', padding: '10px 5px'}} >{d[key]}</td>)}</tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

Student.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onGetData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // student: makeSelectStudent(),
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

function mapDispatchToProps(dispatch) {
  return {
    onGetData: () => dispatch(loadData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Student);
