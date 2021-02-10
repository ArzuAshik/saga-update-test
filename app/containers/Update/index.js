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
// import {load} from './saga';

export function Update({handleLoadData, updateReq, data}) {
  useInjectReducer({ key: 'update', reducer });
  useInjectSaga({ key: 'update', saga });

  useEffect(() => {
    !data.list && handleLoadData();
  }, [])


  function handleUpdate(e){
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
    console.log(info);
    updateReq(info);
  }

  console.log(data.list);
  return <div>
    <h1>Update Page</h1>
    <table style={{width: '100%', border: '1px solid gray'}}>
      <thead>
        <tr>
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
          data.list && data.list.map(data => <tr key={data.dressId}>
            <td style={{border: '1px solid gray'}}><input name="dressId" style={{border: 'none', padding: '7px', width: '100%'}} type="text" readOnly defaultValue={data.dressId}/></td>
            <td style={{border: '1px solid gray'}}><input name="classRange" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.classRange}/></td>
            <td style={{border: '1px solid gray'}}><input name="gender" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.gender}/></td>
            <td style={{border: '1px solid gray'}}><input name="dressDetails" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.dressDetails}/></td>
            <td style={{border: '1px solid gray'}}><input name="dressSerial" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.dressSerial}/></td>
            <td style={{padding: "5px", border: '1px solid gray'}}><button onClick={(e) => handleUpdate(e)}>OK</button></td>
          </tr>)
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
