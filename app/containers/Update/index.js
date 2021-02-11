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
import { keys } from 'lodash';

import { jsPDF } from "jspdf";
import 'jspdf-autotable';

import image from './flower.jpg';


export function Update({handleLoadData, updateReq, data}) {
  useInjectReducer({ key: 'update', reducer });
  useInjectSaga({ key: 'update', saga });

  let doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: 'a4'
  });

  /*======================
  table from html
  ======================
  */
  // function handleDownload(){
  //   const source = window.document.getElementById("table");

  //   doc.html(source, {
  //     callback: function (doc) {
  //       doc.save("arzu.pdf");
  //     },
      
  //  })
  // };

  /*======================
  table from row data
  ======================
  */
  // function handleDownload(){
  //   const dressInfo = data.list.map(item => {
  //     return {
  //       dressId: item.dressId,
  //       classRange: item.classRange,
  //       gender: item.gender,
  //       dressDetails: item.dressDetails,
  //       dressSerial: item.dressSerial
  //     }
  //   })

  //   const header = ["dressId", "classRange","gender", "dressDetails", "dressSerial"];

  //   doc.table(1, 1, dressInfo, header, { autoSize: true });

  //   doc.save("a4.pdf");
  // }

  /*======================
  table using auto table
  ======================
  */
  function handleDownload(){

    function addWaterMark(doc, img) {
      var totalPages = doc.internal.getNumberOfPages();
    
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        // doc.setTextColor(150);
        // doc.text(80, 80, 'Watermark');
        doc.addImage(img, 'JPEG', 0, 0, 300, 250);

      }
    
      return doc;
    }
    // without colSpan
    // let body = data.list.map(item => {
    //   return [
    //     item.dressId,
    //     item.classRange,
    //     item.gender,
    //     item.dressDetails,
    //     item.dressSerial
    //   ]
    // })

    // with colSpan
    let body = data.list.map(item => {
      return [
        {content: item.dressId},
        {content:item.classRange},
        {content:item.gender},
        {content:item.dressDetails, colSpan: 2},
        {content:item.dressSerial}
      ]
    })

    const head = [{content: "Dress ID", styles: {textColor: [0, 0, 0]}}, {content: "class Range"}, {content: "Gender"}, {content: "Dress Details", /*colSpan: 2 */}, {content: "Dress Serial"}, "sl"];
    
    
    function makeTable(docx){
      docx.setPage(1);
      var finalY = 0
      docx.text('From javascript arrays', 14, finalY + 15);
      docx.autoTable({
        startY: finalY + 20,
        theme: 'grid',
        headStyles: {halign: 'center', valign: 'middle', cellPadding: 2},
        columnStyles:{
          0: { cellWidth: 20, halign: 'center', fillColor: null },
          1: { cellWidth: 30, halign: 'center', fillColor: null},
          2: { cellWidth: 20, halign: 'center', fillColor: null},
          3: { cellWidth: 'auto', colSpan: 2, fillColor: null},
          4: { cellWidth: 20, halign: 'center', fillColor: null},
          5: { cellWidth: 20, halign: 'center', fillColor: null},
        },
        head: [head],
        body: body,
      })
      return docx;
    }

    const docTable = makeTable(doc);
    doc = addWaterMark(docTable, image);
    doc = makeTable(doc);




    doc.save("Dress Info.pdf");
    body = [];
  }

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
    <table style={{width: '100%', border: '1px solid gray'}} id="table" >
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

    <button onClick={handleDownload}>Download PDF</button>
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
