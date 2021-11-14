import React, {useEffect} from "react";

import CheckIcon from "../../Assets/Icons/check-circle.png";
import ErrorIcon from "../../Assets/Icons/error-circle.png";

import "./AlertStyle.css";

export default function Index({ message }) {
  return (
    <div
      className={`alert-container ${message && "alert-active"} ${message?.status === 200 ? "alert-success" : "alert-error"
      }`}
    >
      <img src={message?.status === 200 ? CheckIcon : ErrorIcon} alt="Status" />
      <span>{message?.message}</span>
    </div>
  );
}
