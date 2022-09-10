import React, { useContext } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ThemeContext } from ".";
import TableRow from "../Components/TableRow";
import style from "../css/ProcessContainer.css";

const ProcessContainer = (props) => {
  // const singlePhase = useSelector((state) => state.singlePhase);
const value = useContext(ThemeContext)
  console.log("???????????????????????????????????????????????????????????????",props?.value)
// console.log(singlePhase.wipTv)
  return (
    <>
      {/* <Container fluid style={{marginTop:10}}>
        <Row >
            <Col style={{marginRight:6,background:"#2a0064",color:"#f0f0f0",textAlign:"center"}}>Process</Col>
            <Col style={{background:"#2a0064",color:"#f0f0f0",textAlign:"center"}}>VIP</Col>
        </Row>
        <span class="border-bottom" style={{color:"red",backgroundColor:"red"}}></span>
        <Row style={{borderColor:"red",border:2}}>
            <Col style={{background:"#1f0047",color:"#f0f0f0",textAlign:"center"}}>LI</Col>
            <Col style={{background:"#1f0047",color:"#f0f0f0",borderColor:"#2a0064",textAlign:"center"}}>1</Col>
        </Row>
        
        <Row>
            <Col style={{background:"#1f0047",color:"#f0f0f0",borderColor:"#2a0064",textAlign:"center"}}>LI</Col>
            <Col style={{background:"#1f0047",color:"#f0f0f0",borderColor:"#2a0064",textAlign:"center"}}>1</Col>
        </Row>
        
        <Row>
            <Col style={{background:"#1f0047",color:"#f0f0f0",borderColor:"#2a0064",textAlign:"center"}}>LI</Col>
            <Col style={{background:"#1f0047",color:"#f0f0f0",borderColor:"#2a0064",textAlign:"center"}}>1</Col>
        </Row>
        
    </Container> */}

      <Table style={{ background: "#2a0064", color: "#f0f0f0",height:"auto" ,fontSize:"2vh"}}>
        <thead style={{ background: "#2a0064", borderColor: "#2a0064" ,height:"4vh"}}>
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
            <TableRow processData={data} key={index}/>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProcessContainer;
