import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import profileImg from "../assets/profileImg.jpg";
import "../css/ProcessContainer.css";
import "../App.css";
// import "../../src/index.css"

const ShiftTragetContainer = (props) => {
  return (
    <Container fluid style={{ color: "#f0f0f0", height: "35%" }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Col
          style={{
            textAlign: "center",
            paddingLeft: 0,
            paddingRight: 0,
            height: "100%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
          }}
        >
          <div
            style={{
              background: "#ffd61d",
              color: "black",
              height: "15%",
              fontSize: "4vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Segoe UI",
            }}
            // fluid
          >
            {props?.value?.shift?.shift}
          </div>
          <div
            style={{
              // fontSize: "3vh",
              height: "25%",
              fontFamily: "Bebas Neue",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              fontSize: "6vh",
            }}
          >
          {props?.value?.target}
          </div>
          <div
            style={{
              background: "#00aa8d",
              height: "15%",
              fontSize: "4vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Segoe UI",
            }}
          >
            Actual
          </div>

          <Row style={{ height: "25%" }}>
            <Col xs={4}></Col>
            <Col
              xs={4}
              style={{
                // fontSize: "3vh",
                height: "5vh",
                fontFamily: "Bebas Neue",
                fontSize: "6vh",
              }}
              className="totalnumber"
            >
              <span>{props.value.actual}</span>
            </Col>
            <Col
              xs={4}
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                color: "#c40013",
                fontFamily: "Bebas Neue",
                fontSize: "4vh",
              }}
            >
              {props?.value?.varience}
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
