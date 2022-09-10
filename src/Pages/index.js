import React, { createContext, useEffect, useRef } from "react";
import HeaderNavbar from "./HeaderNavbar";
import ProcessContainer from "./ProcessContainer";
import ShiftTragetContainer from "./ShiftTragetContainer";
export const ThemeContext= React.createContext();

const DashboardPage = (props) => {
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket(
      `ws://192.168.1.16:8003/ws/api/singlephaseline/`
    );
    ws.current.onopen = (event) => {
      console.log("connection established");
    };
    ws.current.onmessage = function (event) {
      const json = JSON.parse(event.data);
      console.log("jason data", json);
      try {
        // add data in redux
        // console.log(window.location.pathname)
        if(json.data.shifttargets.line.line === "single phase" && window.location.pathname==="/single"){
            console.log("????????????????????????????????????????????????????")
            
        }
      } catch (err) {
        console.log("err", err);
      }
    };
  }, [ws]);
  return (
    <>
    <ThemeContext.Provider value={props.value}>
      <HeaderNavbar />
      <ShiftTragetContainer />
      <ProcessContainer />
      </ThemeContext.Provider>
    </>
  );
};

export default DashboardPage;
