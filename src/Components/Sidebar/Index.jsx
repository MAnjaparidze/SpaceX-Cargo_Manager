import React, { useState } from "react";

import SidebarItem from "./SidebarItem/Index";

import useShipments from "../../Helpers/useShipments";

import "./SidebarStyle.css";

export default function Index({ menuOpen, handleToggleMenu }) {
  const [activeTab, setActiveTab] = useState("");
  const { shipments } = useShipments();

  const handleItemClick = (shipmentID) => {
    setActiveTab(shipmentID);
    handleToggleMenu();
  };

  return (
    <div className={`sidebar-container ${menuOpen ? "sidebar--active" : ""}`}>
      <h4>SHIPMENT LIST</h4>

      <div className="sidebar-list">
        {shipments.map((item) => {
          return (
            <SidebarItem
              key={item.id}
              item={item}
              activeTab={activeTab}
              handleItemClick={handleItemClick}
            />
          );
        })}
      </div>
    </div>
  );
}
