import React from "react";
import { Table } from "react-bootstrap";
import TableRow from "../Components/TableRow";

const mainLayOverColor="#2a0064"
const TextColor="#f0f0f0"

const ProcessContainer = (props) => {  
  return (
    <>
      <Table
        style={{
          color: TextColor,
          fontSize: "2vh",
          fontFamily:"Segoe UI",
          height:"55%",
          textAlign: "center",
        }}
        size="sm"
      >
        <thead
          style={{
            background: mainLayOverColor,
            borderColor: mainLayOverColor,
            fontSize: "160%",
          }}
        >
          <tr>
            <th
              style={{
                width: "40%",
                marginRight: 4,
                borderRight: "10px solid #1f0047",
              }}
            >
              <span>Process</span>
            </th>
            <th>WIP</th>
          </tr>
        </thead>
        <tbody
          style={{            
            color: TextColor,
            borderColor: mainLayOverColor,            
            textAlign: "center",
          }}
        >
          {props?.value?.map((data, index) => (
            <TableRow processData={data} key={index} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProcessContainer;
