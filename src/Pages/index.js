import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadshiftTarget } from "../Redux/ducks/ShiftTarget";
import { loadWip } from "../Redux/ducks/Wip";
import HeaderNavbar from "./HeaderNavbar";
import ProcessContainer from "./ProcessContainer";
import ShiftTragetContainer from "./ShiftTragetContainer";

const TotalLines = {
  SINGLELINE: "single phase",
  SMALLMEDIUMLINE: "small/medium",
  LARGELINE: "large",
  INDUSTRIALLINE: "industrial",
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  const ws = useRef(null);

  const wipReducer = useSelector((state) => state.wipReducer);
  const shiftTargetReducer = useSelector((state) => state.shiftTargetReducer);
  const shiftReducer = useSelector((state) => state.shiftReducer);

  const [curtrentWip, setCurrentWip] = React.useState(null);
  const [curtrentTarget, setCurrentTarget] = React.useState(null);
  const [curtrentLine, setCurrentLine] = React.useState(null);
  const [cuurentShift, setCurrentShift] = React.useState(null);

  const updatedShift = useMemo(() => cuurentShift, [cuurentShift]);

  const checkForCurrentShift = () => {
    const date = new Date();
    const showTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let p = shiftReducer?.data?.filter((e) =>
      e.end === "00:00:00"
        ? e.start <= showTime && true
        : e.start <= showTime && e.end > showTime
    );
    setCurrentShift(p[0]?.shift);
  };//check for current shift

  useEffect(() => {
    const interval = setInterval(() => {
      checkForCurrentShift();
    }, 1000);

    return () => clearInterval(interval);
  });//check after evry 1 sec for checking requirement for chnaging shift

  useEffect(() => {
    wipReducer?.data &&
      setTableData({
        Wip: wipReducer.data,
        shiftTarget: shiftTargetReducer.data,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedShift]);//if new shift begin , it will render page

  const setTableData = ({ Wip, shiftTarget }) => {
    const date = new Date();
    const showTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let p = shiftReducer?.data?.filter((e) =>
      e.end === "00:00:00"
        ? e.start <= showTime && true
        : e.start <= showTime && e.end > showTime
    );

    const setCurrentLineData = ({ currentLine, currentShift }) => {
      setCurrentTarget(
        shiftTarget?.filter(
          (data) =>
            data?.line?.line === currentLine &&
            data?.shift?.shift === currentShift
        )[0]
      );
      setCurrentWip(
        Wip.filter(
          (data) =>
            data?.line?.line === currentLine &&
            data?.shift?.shift === currentShift
        )
      );
    };

    switch (window.location.pathname) {
      case "/single":
        setCurrentLine("Single Phase");
        setCurrentLineData({
          currentLine: TotalLines.SINGLELINE,
          currentShift: p[0]?.shift,
        });
        break;
      case "/small":
        setCurrentLine("Small/Medium");
        setCurrentLineData({
          currentLine: TotalLines.SMALLMEDIUMLINE,
          currentShift: p[0]?.shift,
        });
        break;
      case "/large":
        setCurrentLine("Large");
        setCurrentLineData({
          currentLine: TotalLines.LARGELINE,
          currentShift: p[0]?.shift,
        });
        break;
      case "/industrial":
        setCurrentLine("Industrial");
        setCurrentLineData({
          currentLine: TotalLines.INDUSTRIALLINE,
          currentShift: p[0]?.shift,
        });
        break;

      default:
        break;
    }
  };//set data to page

  useEffect(() => {
    ws.current = new WebSocket(
      `${process.env.REACT_APP_WEB_SOCKET_URL}/ws/api/singlephaseline/`
    );
    ws.current.onopen = (event) => {
      console.log("connection established");
    };
    ws.current.onmessage = function (event) {
      const json = JSON.parse(event.data);

      try {
        dispatch(loadshiftTarget(json?.data?.shifttargets));
        dispatch(loadWip(json?.data?.wipTv));
        shiftReducer.data &&
          setTableData({
            Wip: json?.data?.wipTv,
            shiftTarget: json?.data?.shifttargets,
          });
      } catch (err) {
        console.log("err", err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, shiftReducer]);//will call whenever web socket send data

  return (
    <>
      {curtrentLine && <HeaderNavbar value={curtrentLine} />}
      {curtrentTarget && <ShiftTragetContainer value={curtrentTarget} />}
      {curtrentWip && <ProcessContainer value={curtrentWip} />}
    </>
  );
};

export default DashboardPage;
