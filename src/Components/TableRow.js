import React from "react";
const cellStyle={
  padding:"0.5%"
}
const TableRow=(props)=> {
  return (
    <>
      <tr >
        <td style={cellStyle}>{props.processData.process}</td>
        <td style={cellStyle}>{props.processData.wip}</td>
      </tr>
    </>
  );
}

export default TableRow;
