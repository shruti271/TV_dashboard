import React, { useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { wsContext } from "..";
import { loadLineStart } from "../Redux/ducks/Line";
import { loadshiftTarget } from "../Redux/ducks/ShiftTarget";
import { loadWip } from "../Redux/ducks/Wip";
import HeaderNavbar from "./HeaderNavbar";
import ProcessContainer from "./ProcessContainer";
import ShiftTragetContainer from "./ShiftTragetContainer";

const TotalLines = {
  SINGLELINE: "Single Phase",
  SMALLMEDIUMLINE: "Small/Medium",
  LARGELINE: "Large",
  INDUSTRIALLINE: "Industrial",
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  // const wsConn = useContext(wsContext);

  // const wipReducer = useSelector((state) => state.wipReducer);
  // const shiftTargetReducer = useSelector((state) => state.shiftTargetReducer);
  const shiftReducer = useSelector((state) => state.shiftReducer);
  const {data} = useSelector((state) => state.lineReducer);

  const [curtrentWip, setCurrentWip] = React.useState(null);
  const [curtrentTarget, setCurrentTarget] = React.useState(null);
  const [curtrentLine, setCurrentLine] = React.useState(null);
  const [cuurentShift, setCurrentShift] = React.useState(null);

  // Set WIP Process & Target Info when some change in database
  // wsConn.onmessage = function (event) {
  //   const json = JSON.parse(event.data);
  //   try {
  //     dispatch(loadshiftTarget(json?.data?.shift_targets));
  //     dispatch(loadWip(json?.data?.wip
  //       ));
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  //check for current shift
  const checkForCurrentShift = () => {
    const date = new Date();
  
    const showTime =String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":" +
    String(date.getSeconds()).padStart(2, "0");

    let p = shiftReducer?.data?.filter((e) => {
      return (e.start <= showTime && (e.end === "23:59:59"? e.end >= showTime : e.end > showTime));
    });
console.log(showTime)
    setCurrentShift(p[0]?.shift);
  }; 

  //check after evry 1 sec for checking requirement for chnaging shift
  useEffect(() => {
    const interval = setInterval(() => {
      checkForCurrentShift();
    }, 1000);

    return () => clearInterval(interval);
  });
  //check after evry 5 min for checking requirement for chnaging shift
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(loadLineStart())
    }, 300000);

    return () => clearInterval(interval);
  });

useEffect(()=>{
  dispatch(loadLineStart())
},[])

  useEffect(()=>{
    console.log("cuurentShift UseEffect",cuurentShift);
    console.log("curtrentLine UseEffect",curtrentLine);
    console.log("9999999",data.Traget);
    console.log("9999999--- wip",data.Wip);
    console.log("Filtered shiftTargetReducer :",data?.Traget?.filter(
      (data) =>
        data?.line?.line === curtrentLine.toLowerCase() &&
        data?.shift?.shift === cuurentShift
    )[0])
    setCurrentTarget(
      data?.Traget?.filter(
        (data) =>
          data?.line?.line === curtrentLine.toLowerCase() &&
          data?.shift?.shift === cuurentShift
      )[0]
    );
    setCurrentWip(
      data?.Wip?.filter(
        (data) =>
          data?.line?.line === curtrentLine.toLowerCase() &&
          data?.shift?.shift === cuurentShift
      )
    );

  },[curtrentLine, shiftReducer, cuurentShift, data.Wip,data.Traget])

  useEffect(()=>{
    switch (window.location.pathname) {
      case "/single":
        setCurrentLine(TotalLines.SINGLELINE);
        break;
      case "/small&medium":
        setCurrentLine(TotalLines.SMALLMEDIUMLINE);
        break;
      case "/large":
        setCurrentLine(TotalLines.LARGELINE);
        break;
      case "/industrial":
        setCurrentLine(TotalLines.INDUSTRIALLINE);
        break;
      default:
        break;
    }
  },[window.location.pathname])

  useEffect(()=>{
    console.log(curtrentLine);
    console.log(curtrentTarget);
    console.log(curtrentWip);
  },[curtrentLine, curtrentTarget, curtrentWip])


  return (
    <>
      {curtrentLine && <HeaderNavbar value={curtrentLine} />}
      {curtrentTarget && <ShiftTragetContainer value={curtrentTarget} />}
      {curtrentWip && <ProcessContainer value={curtrentWip} />}
    </>
  );
};

export default DashboardPage;
