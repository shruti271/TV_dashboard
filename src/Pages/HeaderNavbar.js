import React from "react";
import { Container, Image, Navbar } from "react-bootstrap";
import factorylogo from "../assets/factorylogo.png";

const HeaderNavbar = (props) => {
  return (
    <>
      <Navbar
        expand="sm"
        variant="dark" height="5wh"
        style={{ background: "#2a0064", color: "#f0f0f0" }}
      >
        <Navbar.Brand>
          {/* <Image src={factorylogo} height="100vh"  /> */}
          <img src={factorylogo} height="1%" />
        </Navbar.Brand>

        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5vh",
          }}
        >
          {props.value}
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderNavbar;
