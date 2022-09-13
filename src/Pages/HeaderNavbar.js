import React from "react";
import { Container, Navbar } from "react-bootstrap";
import factorylogo from "../assets/factorylogo.png";

const HeaderNavbar = (props) => {
  console.log("11111111111111111111111 in header");
  return (
    <>
      <Navbar
        expand="sm"
        variant="dark"
        height="1wh"
        style={{
          background: "#2a0064",
          color: "#f0f0f0",
          paddingLeft: 3,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {/* <Navbar.Brand>
          <img src={factorylogo} height="40vh" alt="logo" style={{paddingLeft:"20px"}}/>
        </Navbar.Brand> */}
        <img
          src={factorylogo}
          height="30vh"        
          alt="logo"
          style={{ paddingLeft: "20px" }}
        />
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5vh",
            fontfamily: "Segoe UI",
            // fontFamily:"Bebas Neue"
          }}
        >
          {props.value}
        </Container>
      </Navbar>
    </>
  );
};

export default React.memo(HeaderNavbar); // it will not render component if there is no change in current route
