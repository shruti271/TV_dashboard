import React, { createContext, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadShiftStart } from "../Redux/ducks/Shift";
import { format, isBefore } from "date-fns";
import isAfter from "date-fns/isAfter";
import { loadshiftTarget } from "../Redux/ducks/ShiftTarget";
import { loadWip } from "../Redux/ducks/Wip";
// import { loadShift } from "../Redux/ducks/Shift";
// import { loadshiftTarget } from "../Redux/ducks/ShiftTarget";
// import { loadWip } from "../Redux/ducks/Wip";
import HeaderNavbar from "./HeaderNavbar";
import ProcessContainer from "./ProcessContainer";
import ShiftTragetContainer from "./ShiftTragetContainer";
// export const ThemeContext = React.createContext();

const DashboardPage = () => {
  const ws = useRef(null);
  const dispatch = useDispatch();

  const wipReducer = useSelector((state) => state.wipReducer);
  const shiftTargetReducer = useSelector((state) => state.shiftTargetReducer);
  const shiftReducer = useSelector((state) => state.shiftReducer);

  const [curtrentWip, setCurrentWip] = React.useState(null);
  const [curtrentTarget, setCurrentTarget] = React.useState(null);
  const [curtrentLine, setCurrentLine] = React.useState(null);
  const [cuurentShift, setCurrentShift] = React.useState(null);

  console.log("wip", wipReducer?.data);
  console.log("wip", shiftTargetReducer?.data);
  console.log("wip", shiftReducer?.data);

  const updatedShift = useMemo(() => cuurentShift, [cuurentShift]);

  const checkForCurrentShift = () => {
    const date = new Date();
    const showTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let p = shiftReducer?.data?.filter((e) => {
      if (e.end === "00:00:00") {
        return e.start <= showTime && true;
      } else {
        return e.start <= showTime && e.end > showTime;
      }
    });
    setCurrentShift(p[0].shift);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkForCurrentShift();
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    setTableData({
      Wip: wipReducer.data,
      shiftTarget: shiftTargetReducer.data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftReducer, updatedShift]);

  const setTableData = ({ Wip, shiftTarget }) => {
    const date = new Date();
    const showTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let p = shiftReducer?.data?.filter((e) =>
      {
        if(e.end === "00:00:00")
        {
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& comeeeeeeeeeeeeeeeeeeeeeee")
          return e.start <= showTime && true}
        else return e.start <= showTime && e.end > showTime
      }
        // e.end === "00:00:00"
      //   ? e.start <= showTime && true
      //   : e.start <= showTime && e.end > showTime}
    );

    switch (window.location.pathname) {
      case "/single":
        setCurrentLine("Single Phase");

        setCurrentTarget(
          shiftTarget?.filter(
            (data) =>
              data?.line?.line === "single phase" &&
              data?.shift?.shift === p[0].shift
          )[0]
        );
        let SingleWipData = [];
        Wip?.map((data) => {
          if (
            data?.line?.line === "single phase" &&
            data?.shift?.shift === p[0].shift
          )
            SingleWipData.push(data);
        });
        setCurrentWip(SingleWipData);
        break;
      case "/small":
        setCurrentLine("Small/Medium");
        setCurrentTarget(
          shiftTarget?.filter(
            (data) =>
              data.line.line === "small/medium" &&
              data.shift.shift === p[0].shift
          )[0]
        );
        let smallWipData = [];
        Wip?.map((data) => {
          if (
            data.line.line === "small/medium" &&
            data.shift.shift === p[0].shift
          )
            smallWipData.push(data);
        });
        setCurrentWip(smallWipData);
        break;
      case "/large":
        setCurrentLine("Large");

        setCurrentTarget(
          shiftTarget?.filter(
            (data) =>
              data.line.line === "large" && data.shift.shift === p[0].shift
          )[0]
        );
        let largeWipData = [];
        Wip?.map((data) => {
          if (data.line.line === "large" && data.shift.shift === p[0].shift)
            largeWipData.push(data);
        });
        setCurrentWip(largeWipData);
        setCurrentLine(largeWipData[0].line.line);
        break;
      case "/industrial":
        setCurrentLine("Industrial");

        setCurrentTarget(
          shiftTarget?.filter(
            (data) =>
              data.line.line === "industrial" && data.shift.shift === p[0].shift
          )[0]
        );
        let inudtryWipData = [];
        Wip?.map((data) => {
          if (
            data.line.line === "industrial" &&
            data.shift.shift === p[0].shift
          )
            inudtryWipData.push(data);
        });
        setCurrentWip(inudtryWipData);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    ws.current = new WebSocket(
      `ws://192.168.1.16:8003/ws/api/singlephaseline/`
    );
    ws.current.onopen = (event) => {
      console.log("connection established");
    };
    ws.current.onmessage = function (event) {
      const json = JSON.parse(event.data);

      try {
        dispatch(loadshiftTarget(json?.data?.shifttargets));
        dispatch(loadWip(json?.data?.wipTv));
        setTableData({
          Wip: json?.data?.wipTv,
          shiftTarget: json?.data?.shifttargets,
        });
      } catch (err) {
        console.log("err", err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, shiftReducer]);

  return (
    <>
      {curtrentLine && <HeaderNavbar value={curtrentLine} />}
      {curtrentTarget && <ShiftTragetContainer value={curtrentTarget} />}
      {curtrentWip && <ProcessContainer value={curtrentWip} />}
    </>
  );
};

export default DashboardPage;
