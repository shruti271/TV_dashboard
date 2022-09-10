import React from "react";

const TableRow=(props)=> {
  return (
    <>
      <tr >
        <td style={{padding:"0.5%"}}>{props.processData.process}</td>
        <td style={{padding:"0.5%"}}>{props.processData.wip}</td>
      </tr>
    </>
  );
}

export default TableRow;
