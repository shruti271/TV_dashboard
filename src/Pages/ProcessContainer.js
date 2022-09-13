import React from "react";
import { Table } from "react-bootstrap";
import TableRow from "../Components/TableRow";

const ProcessContainer = (props) => {
  return (
    <>
      <Table
        style={{
          background: "#2a0064",
          color: "#f0f0f0",
          height: "auto",
          fontSize: "2vh",
        }}
      >
        <thead
          style={{
            background: "#2a0064",
            borderColor: "#2a0064",
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
            background: "#1f0047",
            color: "#f0f0f0",
            borderColor: "#2a0064",
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
