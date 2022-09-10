import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "./index";
import shruti from "../assets/shruti.jpg";
import "../css/ProcessContainer.css";
// import { loadSinglePhraseStart } from "../Redux/ducks/SinglePhrase";
const ShiftTragetContainer = () => {

  // const dispatch = useDispatch();
  // const ws = useRef(null);
const value = useContext(ThemeContext)
  
  // const singlePhase = useSelector((state) => state.singlePhase);

  
  // const abc = async () => {
  //   const data = await axios.get(
  //     // `http://192.168.1.16:8003/tvapi/singlephaseline/`
  //     `http://192.168.1.16:8003/tvapi/singlephaseline/`
  //   );
  //   console.log(data);
  // };
  // useEffect(() => {
  //   abc();
  // });
  // useEffect(()=>{
  //   // dispatch(loadSinglePhraseStart());
  // },[dispatch]);

  // useEffect(() => {
  //   ws.current = new WebSocket(
  //     // `ws://192.168.1.16:8003/tvapi/singlephaseline/?shift=shift1`
  //     // http://127.0.0.1:8003/tvapi/singlephaseline/?shift=shift1
  //     `ws://192.168.1.16:8003/ws/api/singlephaseline/`
  //   );
  //   ws.current.onopen = (event) => {
  //     console.log("connection established");
  //   };
  //   ws.current.onmessage = function (event) {
  //     const json = JSON.parse(event.data);
  //     console.log("hyyy data", json);
  //     try {
  //       // add data in redux
  //       // if()
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //   };
  //   // return () => {
  //   //   ws.current?.close();
  //   //   console.log("connection closed");
  //   // };
  // }, [ws]);

  return (
    <Container fluid style={{ color: "#f0f0f0",height:"30vh" }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height:"100%"
        }}
      >
        <Col style={{ textAlign: "center", paddingLeft: 0, paddingRight: 0 }}>
          <Container
            style={{ background: "#ffd61d", color: "black" ,height:"5vh",fontSize:"4vh", display:"flex",justifyContent:"center",alignItems:"center"}}
            fluid
          >
            {" "}
            {value.shift}
            {/* Shift Target */}
          </Container>
          <Container style={{ fontSize: "3vh" ,height:"5vh"}} className="totalnumber" fluid>
            {/* {singlePhase.target} */}
            {value.target}
          </Container>
          <Container style={{ background: "#00aa8d" ,height:"5vh",fontSize:"3vh"}} fluid>
            Actual
          </Container>

          <Row>
            <Col xs={4}></Col>
            <Col xs={4} style={{ fontSize: "3vh" ,height:"5vh"}} className="totalnumber">
            {/* {singlePhase.actual} */}
            {value.actual}
            </Col>
            <Col
              xs={4}
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                color: "#c40013",
                // fontSize: "20px",
                fontSize:"2vh"
              }}
            >
              {/* {singlePhase.varience} */}
              {value.varience}
            </Col>
          </Row>
        </Col>

        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:"100%"
          }}
        >
          <Image src={shruti} height="100%"/>
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftTragetContainer;
