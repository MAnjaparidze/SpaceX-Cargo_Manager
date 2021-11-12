import React from "react";
import { Link } from "react-router-dom";

export default function Index({item, activeTab, handleItemClick}) {
  return (
    <div className={`sidebar-list_item ${activeTab === item.id ? "sidebar-list_item--active" : ""}`} onClick={() => handleItemClick(item.id)}>
      <Link to={`/shipment/${item.id}`}>
        <span>{item.name}</span>
      </Link>
    </div>
  );
}
