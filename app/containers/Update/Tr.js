import React, { useState } from 'react';

const Tr = ({data, handleUpdate}) => {
    const [checkbox, setCheckbox] = useState(true);
    return (
        <tr className={checkbox ? "not-editable" : "editable"}>
            <td style={{border: '1px solid gray'}}><input onClick={() => setCheckbox(!checkbox)} type="checkbox"/></td>
            <td style={{border: '1px solid gray'}}><input name="dressId" style={{border: 'none', padding: '7px', width: '100%'}} type="text" readOnly defaultValue={data.dressId}/></td>
            <td style={{border: '1px solid gray'}}><input readOnly={checkbox} name="classRange" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.classRange}/></td>
            <td style={{border: '1px solid gray'}}><input readOnly={checkbox} name="gender" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.gender}/></td>
            <td style={{border: '1px solid gray'}}><input readOnly={checkbox} name="dressDetails" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.dressDetails}/></td>
            <td style={{border: '1px solid gray'}}><input readOnly={checkbox} name="dressSerial" style={{border: 'none', padding: '7px', width: '100%'}} type="text" defaultValue={data.dressSerial}/></td>
            <td style={{padding: "5px", border: '1px solid gray'}}><button disabled={checkbox} onClick={(e) => handleUpdate(e, checkbox)}>{checkbox ? "No" : "Ok"}</button></td>
        </tr>
    );
};

export default Tr;