import React, { useContext } from "react";
import { Container, Image, Navbar } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { ThemeContext } from "./index";
import factorylogo from "../assets/factorylogo.png";

const HeaderNavbar = () => {
  // const singlePhase = useSelector((state) => state.singlePhase);
  const value = useContext(ThemeContext);
  console.log("9999999999999999999", value);
  return (
    <>
      <Navbar
        expand="sm"
        variant="dark"
        style={{ background: "#2a0064", color: "#f0f0f0" }}
      >
        <Navbar.Brand>
          <Image src={factorylogo} height="100wh" />
        </Navbar.Brand>

        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5vh",
          }}
        >
          {value.line}          
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderNavbar;
