import React, { useEffect } from "react";

import SearchIcon from "../../Assets/Icons/search_icon.png";

import "./InputStyle.css";

export default function Index({ menuOpen, filterShipments }) {

  const handleChange = (e) => {
    const { value } = e.target;
    filterShipments(value);
  };
  return (
    <div
      className={`search-input_container ${
        menuOpen ? "search-input--active" : ""
      }`}
    >
      <img src={SearchIcon} alt="Search" />
      <input type="text" placeholder="Search" onChange={handleChange} />
    </div>
  );
}
