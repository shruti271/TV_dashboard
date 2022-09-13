import React from "react";
import factorylogo from "../assets/FlyOnTech_rectandle.jpg";

const HeaderNavbar = (props) => {
  return (
    <>
      <div
        style={{
          background: "#2a0064",
          color: "#f0f0f0",
          paddingLeft: 3,
          height: "10%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", paddingLeft: "5vh" }}
        >
          <div style={{ marginRight: "5vh" }}>
            <img
              src={factorylogo}
              alt="logo"
              style={{ height: "8vh", width: "100%" }}
            />
          </div>
          <div
            style={{
              fontSize: "6vh",
              fontFamily: "Segoe UI",
            }}
          >
            {props.value}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(HeaderNavbar); // it will not render component if there is no change in current route
