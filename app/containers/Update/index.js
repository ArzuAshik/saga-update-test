/**
 *
 * Update
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUpdate from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getList, updateRequest } from './actions';
import Tr from './Tr';

import "./update.css";

export function Update({handleLoadData, updateReq, data}) {
  useInjectReducer({ key: 'update', reducer });
  useInjectSaga({ key: 'update', saga });


  useEffect(() => {
    !data.list && handleLoadData();
  }, [])


  function handleUpdate(e, checked){
    const info = {cmsId: 4, fileSaveOrEditable: false};
    const tr = e.target.parentNode.parentNode.childNodes;
    tr.forEach(item => {
      if(item.childNodes[0].name){
        if(item.childNodes[0].name === "dressId" || item.childNodes[0].name === "dressSerial"){
          info[item.childNodes[0].name] = parseInt(item.childNodes[0].value);
        } else{
          info[item.childNodes[0].name] = item.childNodes[0].value;
        }
      }
    })
    // console.log(info);
    !checked && updateReq(info);
  }

  console.log(data.list);
  return <div>
    <h1>Update Page</h1>
    <table style={{width: '100%', border: '1px solid gray'}}>
      <thead>
        <tr>
          <th>Check</th>
          <th>Dress ID</th>
          <th>Class Range</th>
          <th>Gender</th>
          <th>Dress Details</th>
          <th>Dress Serial</th>
          <th>Save</th>
        </tr>
      </thead>
      <tbody style={{textAlign: 'center'}}>
        {
          data.list && data.list.map(data => <Tr key={data.dressId} data={data} handleUpdate={handleUpdate} />)
        }
      </tbody>
    </table>
  </div>;
}

Update.propTypes = {
  handleLoadData: PropTypes.func,
  updateReq: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectUpdate(),
  
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadData: () => dispatch(getList()),
    updateReq: (data) => dispatch(updateRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  // memo,
)(Update);
