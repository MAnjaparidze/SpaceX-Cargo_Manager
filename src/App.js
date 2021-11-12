import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Index";
import Sidebar from "./Components/Sidebar/Index";
import ShipmentDetails from "./Components/ShipmentDetails/Index";
import loader from "./Components/Loader/index";

import useMenu from "./Helpers/useMenu";

import "./App.css";

function App() {
  const { menuOpen, handleToggleMenu } = useMenu();

  return (
    <Router>
      <div className="App">
        <Header menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />
        <div className="main-container">
          <Sidebar menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />
          <Routes>
            <Route path="/shipment/:shipmentID" element={<ShipmentDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
