import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { wsContext } from "..";
import { loadLineStart } from "../Redux/ducks/Line";
import { loadshiftTarget } from "../Redux/ducks/ShiftTarget";
import { loadWip } from "../Redux/ducks/Wip";
import { requestGetLine } from "../Redux/sagas/requests/Line";
import { requestLineData } from "../Services/Services";
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
  // const {data} = useSelector((state) => state.lineReducer);

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

    const showTime =
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0");

    let p = shiftReducer?.data?.filter((e) => {
      return (
        e.start <= showTime &&
        (e.end === "23:59:59" ? e.end >= showTime : e.end > showTime)
      );
    });
    setCurrentShift(p[0]?.shift);
  };

  //check after evry 1 sec for checking requirement for chnaging shift
  useEffect(() => {
    const checkingShiftInterval = setInterval(() => {
      checkForCurrentShift();
    }, 1000);

    return () => clearInterval(checkingShiftInterval);
  });
  //check after evry 5 min for checking requirement for chnaging shift
  useEffect(() => {
    const reFetchDataInterval = setInterval(() => {
      // dispatch(loadLineStart())
      ReFetchData();
    }, 300000);
    return () => clearInterval(reFetchDataInterval);
  });
  
  const ReFetchData = () => {
    requestLineData().then((e) => {
        setCurrentTarget(
          e?.data?.data?.shift_targets?.filter(
            (data) =>
              data?.line?.line === curtrentLine?.toLowerCase() &&
              data?.shift?.shift === cuurentShift
          )[0]
        );
        setCurrentWip(
          e.data.data?.wipTv?.filter(
            (data) =>
              data?.line?.line === curtrentLine?.toLowerCase() &&
              data?.shift?.shift === cuurentShift
          )
        );
      });
  };

  useEffect(() => {
    console.log("cuurentShift UseEffect", cuurentShift);
    console.log("curtrentLine UseEffect", curtrentLine);
    ReFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curtrentLine, shiftReducer, cuurentShift]);

  useEffect(() => {
    switch (window.location.pathname) {
      case "/single":
        setCurrentLine(TotalLines.SINGLELINE);
        break;
      case "/small":
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
  }, []);

  // useEffect(() => {
  //   console.log(curtrentLine);
  //   console.log(curtrentTarget);
  //   console.log(curtrentWip);
  // }, [curtrentLine, curtrentTarget, curtrentWip]);

  return (
    <>
      {curtrentLine && <HeaderNavbar value={curtrentLine} />}
      {curtrentTarget && <ShiftTragetContainer value={curtrentTarget} />}
      {curtrentWip && <ProcessContainer value={curtrentWip} />}
    </>
  );
};

export default DashboardPage;
