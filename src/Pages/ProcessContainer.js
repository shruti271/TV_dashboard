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
        }}
      >
        <thead
          style={{
            background: mainLayOverColor,
            borderColor: mainLayOverColor,
            height: "4vh",
          }}
        >
          <tr>
            <th
              style={{
                width: "40%",
                marginRight: 6,
                textAlign: "center",
                borderRight: "10px solid #1f0047",
              }}
            >
              Process
            </th>
            {/* <hr /> */}
            <th style={{ textAlign: "center" }}>WIP</th>
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
