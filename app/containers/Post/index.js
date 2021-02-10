/**
 *
 * Post
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectPost from './selectors';

import reducer from './reducer';
import saga from './saga';
import { postData, input } from '../App/actions';
import { makeSelectPostData } from '../App/selectors';

export function Post({setInput, postHandle, postResult}) {
  useInjectReducer({ key: 'post', reducer });
  useInjectSaga({ key: 'post', saga });

  const [inputs, setInputs] = useState({});
  console.log(postResult);

  function handleInput(e){
    const newInput = inputs;
    if(e.target.name == "cmsID" || e.target.name == "dressSerial"){
      newInput[e.target.name] = parseInt(e.target.value);
    } else{
      newInput[e.target.name] = e.target.value;
    }
    setInputs(newInput);
  }

  useEffect( ()=>{
    setInputs({});
  } , [inputs])

  function handleSubmit(){
    setInput(inputs);
    postHandle();
    setInputs({});
  }
  const style = {
    width: "100%",
    padding: "5px",
    margin: "5px 0",
  }
  return <div>
    <h1>Post Page</h1>
    <input value={inputs.classRange} style={style} onBlur={(e) => handleInput(e)} type="text" placeholder="classRange" name="classRange"/>
    <br/>
    <input value={inputs.cmsId} style={style} onBlur={(e) => handleInput(e)} type="text" placeholder="cmsID" name="cmsId"/>
    <br/>
    <input value={inputs.dressDetails} style={style} onBlur={(e) => handleInput(e)} type="text" placeholder="dressDetails" name="dressDetails"/>
    <br/>
    <input value={inputs.dressSerial} style={style} onBlur={(e) => handleInput(e)} type="text" placeholder="dressSerial" name="dressSerial"/>
    <br/>
    <input value={inputs.gender} style={style} onBlur={(e) => handleInput(e)} type="text" placeholder="gender" name="gender"/>
    <br/>
    <button style={style} onClick={handleSubmit}>Button</button>
    </div>;
}

Post.propTypes = {
  postHandle: PropTypes.func,
  setInput: PropTypes.func,
  postResult: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

const mapStateToProps = createStructuredSelector({
  postResult: makeSelectPostData(),  
});

function mapDispatchToProps(dispatch) {
  return {
    postHandle: () => dispatch(postData()),
    setInput: (v) => dispatch(input(v)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Post);
