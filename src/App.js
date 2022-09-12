import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages";
import "./App.css";
import { loadShiftStart } from "./Redux/ducks/Shift";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadShiftStart());//load only first time when website open
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/large" exact element={<DashboardPage />} />
        <Route path="/small" exact element={<DashboardPage />} />
        <Route path="/single" exact element={<DashboardPage />} />
        <Route path="/industrial" exact element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
