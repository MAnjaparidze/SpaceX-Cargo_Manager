import React from "react";

import WebsiteLogo from "../../Assets/Images/Logo.svg";
import MenuIcon from "../../Assets/Icons/menu_icon.png";
import CloseIcon from "../../Assets/Icons/close_icon.png";

import SearchInput from "../SearchInput/Index";

import "./HeaderStyle.css";

export default function Index({menuOpen, handleToggleMenu}) {
  return (
    <div className="header_container">
      <div className="website-logo_wrapper">
        <img src={WebsiteLogo} alt="Website Logo" />
        <button className="mobile-menu_btn" onClick={handleToggleMenu}>
          <img src={menuOpen ? CloseIcon : MenuIcon} alt="" />
        </button>
      </div>
      <SearchInput menuOpen={menuOpen} />
    </div>
  );
}
