import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ShiftTragetContainer from "./Pages/ShiftTragetContainer";
import HeaderNavbar from "./Pages/HeaderNavbar";
import ProcessContainer from "./Pages/ProcessContainer";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSinglePhraseStart,
  updateSinglePhrase,
} from "./Redux/ducks/SinglePhrase";
import { loadSmallMeduimStart } from "./Redux/ducks/SmallMeduim";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages";
import { loadLargeLineStart } from "./Redux/ducks/LargeLine";
import { loadIndustryLineStart } from "./Redux/ducks/IndustrialLine";

function App() {
  const dispatch = useDispatch();
  const singlePhase = useSelector((state) => state.singlePhase);
  const smallMeduim = useSelector((state) => state.smallMeduim);
  const largeLineReducer = useSelector((state) => state.largeLineReducer);
  const IndustryLineSagas = useSelector((state) => state.IndustryLineSagas);

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
      console.log("hyyy data", json);
      try {
        // add data in redux
        if (json?.data?.shifttargets?.line?.line === "single phase") {
          dispatch(updateSinglePhrase(json?.data));
        }
        switch (json?.data?.shifttargets?.line?.line) {
          case "single phase":
            dispatch(updateSinglePhrase(json?.data));
            break;
          case "small/medium":
            dispatch(updateSinglePhrase(json?.data));
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

  useEffect(() => {
    dispatch(loadSinglePhraseStart());
    dispatch(loadSmallMeduimStart());
    dispatch(loadLargeLineStart());
    dispatch(loadIndustryLineStart());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/large"
          exact
          element={<DashboardPage value={largeLineReducer} />}
        />
        <Route
          path="/small"
          exact
          element={<DashboardPage value={smallMeduim} />}
        />
        <Route
          path="/single"
          exact
          element={<DashboardPage value={singlePhase} />}
        />
        <Route
          path="/industrial"
          exact
          element={<DashboardPage value={IndustryLineSagas} />}
        />
      </Routes>
    </>
  );
}

export default App;
