import React, { createContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import HeaderNavbar from "./HeaderNavbar";
import ProcessContainer from "./ProcessContainer";
import ShiftTragetContainer from "./ShiftTragetContainer";
export const ThemeContext = React.createContext();

const DashboardPage = () => {
  const ws = useRef(null);
  const dispatch = useDispatch();

  const [curtrentWip, setCurrentWip] = React.useState(null);
  const [curtrentTarget, setCurrentTarget] = React.useState({});

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://192.168.1.16:8003/ws/api/singlephaseline/`
    );
    ws.current.onopen = (event) => {
      console.log("connection established");
      //   console.log("mydata", event);
    };
    ws.current.onmessage = function (event) {
      const json = JSON.parse(event.data);
      console.log("data ininytailllll", json);
      try {
        // add data in redux
        console.log(window.location.pathname);
        switch (window.location.pathname) {
          case "/single":
            console.log(
              Object.entries(json.data.shifttargets)?.map((data) => {
                console.log("99", data[1].line.line === "single phase");
              })
            );
            console.log(
              Object.entries(json.data.shifttargets)?.filter(
                (data) =>
                  data[1].line.line === "single phase" &&
                  data[1].shift.shift === "shift1"
              )
            );
            // ?.shifttargets?.filter((data)=>data.line.line==="single phase" && data.shift.shift==="shift1")
            // setCurrentTarget(json?.data?.shifttargets?.filter((data)=>data.line.line==="single phase" && data.shift.shift==="shift1")[0])
            // setCurrentWip(json?.data?.wipTv?.filter((data)=>data.line.line==="single phase" && data.shift.shift==="shift1"))
            // console.log(json.data.wipTv.filter((data)=>data.line.line==="single phase" && data.shift.shift==="shift1"))
            //   dispatch(updateSinglePhrase(json?.data));
            break;
          case "/small":
            //   dispatch(updateSinglePhrase(json?.data));
            break;
          case "/large":
            //   dispatch(updateLargeLine(json?.data));
            break;
          case "/industrial":
            //   dispatch(loadIndustryLineStart());
            break;

          default:
            break;
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    // return () => {
    //   ws.current?.close();
    //   console.log("connection closed");
    // };
  }, [ws]);

  //   const ws = useRef(null);
  //   useEffect(() => {
  //     ws.current = new WebSocket(
  //       `ws://192.168.1.16:8003/ws/api/singlephaseline/`
  //     );
  //     ws.current.onopen = (event) => {
  //       console.log("connection established");
  //     };
  //     ws.current.onmessage = function (event) {
  //       const json = JSON.parse(event.data);
  //       console.log("jason data", json);
  //       try {
  //         // add data in redux
  //         // console.log(window.location.pathname)
  //         if(json.data.shifttargets.line.line === "single phase" && window.location.pathname==="/single"){
  //             console.log("????????????????????????????????????????????????????")

  //         }
  //       } catch (err) {
  //         console.log("err", err);
  //       }
  //     };
  //   }, [ws]);
  return (
    <>
      {/* <ThemeContext.Provider value={""}> */}
      {/* <HeaderNavbar /> */}
      <ShiftTragetContainer value={curtrentTarget} />
      {curtrentWip && <ProcessContainer value={curtrentWip} />}
      {/* </ThemeContext.Provider> */}
    </>
  );
};

export default DashboardPage;
