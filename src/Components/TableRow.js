import React from "react";
// import "../index.css";

const cellStyle={
  padding:"1vh",
}
const TableRow=(props)=> {
  return (
    <>
      <tr style={{borderBottom:2,borderColor:"#2a0064",borderWidth:"0.1vh"}}>
        <td style={cellStyle}>{props.processData.process}</td>
        <td style={cellStyle}>{props.processData.wip}</td>
      </tr>
    </>
  );
}

export default TableRow;
