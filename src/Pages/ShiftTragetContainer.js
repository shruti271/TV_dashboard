import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import profileImg from "../assets/profileImg.jpg";
import "../css/ProcessContainer.css";
import "../App.css";
// import "../../src/index.css"

const ShiftTragetContainer = (props) => {
  return (
    <Container fluid style={{ color: "#f0f0f0", height: "30vh",fontFamily:"Segoe UI" }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Col style={{ textAlign: "center", paddingLeft: 0, paddingRight: 0 }}>
          <Container
            style={{
              background: "#ffd61d",
              color: "black",
              height: "5vh",
              fontSize: "4vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily:"Bebas Neue !important"
            }}
            fluid
          >
            {props?.value?.shift?.shift}
          </Container>
          <Container
  
            style={{ fontSize: "3.5vh", height: "5vh"}}
            className="totalnumber"
            fluid
          >
            <b>{props?.value?.target}</b>
          </Container>
          <Container
            style={{ background: "#00aa8d", height: "5vh", fontSize: "3vh" ,
            // fontFamily: "Segoe UI !important"
          }}
            fluid
          >
            Actual
          </Container>

          <Row>
            <Col xs={4}></Col>
            <Col
              xs={4}
              style={{ fontSize: "4vh", height: "5vh",                fontFamily:"Bebas Neue !important"
            }}
              className="totalnumber"
            >
              <span  >{props.value.actual}</span>
            </Col>
            <Col
              xs={4}
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                color: "#c40013",
                fontSize: "2.8vh",
                // fontfamily: "Bebas Neue  !important"
                fontFamily:"Bebas Neue !important"
              }}
            >
              <b>{props?.value?.varience}</b>
            </Col>
          </Row>
        </Col>

        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Image src={profileImg} height="80%" />
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftTragetContainer;
