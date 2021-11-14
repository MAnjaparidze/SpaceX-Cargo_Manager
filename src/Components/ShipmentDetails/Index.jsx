import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useShipments from "../../Helpers/useShipments";

import "./ShipmentDetailsStyle.css";

export default function Index({ handleGetShipment, shipment }) {
  const [requiredBays, setRequiredBays] = useState(0);
  const [cargoBoxes, setCargoBoxes] = useState("");
  const { shipmentID } = useParams();

  useEffect(() => {
    handleGetShipment(shipmentID);
  }, [shipmentID]);

  useEffect(() => {
    if (shipment) {
      setCargoBoxes(shipment.boxes);
    }
  }, [shipment]);

  useEffect(() => {
    if (cargoBoxes) {
      calcRequiredBays();
    } else {
      setRequiredBays(0);
    }
  }, [cargoBoxes]);

  const calcRequiredBays = () => {
    // Getting String Array

    let cargo = cargoBoxes.split(",");
    // Creating Number Array and Reverse Sorting It
    let cargoINT = cargo
      .map((item) => {
        let num = parseFloat(item);
        if (!isNaN(num)) {
          return num;
        } else {
          return 0;
        }
      })
      .sort(function (a, b) {
        return a - b;
      })
      .reverse();
    let result = countCargoBay(cargoINT);
    setRequiredBays(result);
  };

  const countCargoBay = (array) => {
    let cargoBayCount = 0;
    let spreadArr = [...array];
  
    while (spreadArr.length > 0) {
      let sum = spreadArr.shift();
      let nextIndex = 0;
  
      for (nextIndex; nextIndex < spreadArr.length; nextIndex++) {
        let item = spreadArr[nextIndex];
        if (sum + item > 10) {
          continue;
        }
  
        if (sum + item === 10) {
          break;
        }
  
        if (sum + item < 10) {
          sum = sum + item;
          let numIndex = spreadArr.indexOf(item);
          spreadArr.splice(numIndex, 1);
          nextIndex--;
          continue;
        }
      }
      cargoBayCount++;
    }
    return cargoBayCount;
  };

  const handleCargoChange = (e) => {
    const { value } = e.target;
    const lastChar = value[value.length - 1];
    let lastCharFloat = parseFloat(value[value.length - 1]);
    // Validation for lastCharacter to Be a Number otherwise Calc Function will not fire
    if (
      !isNaN(lastCharFloat) ||
      lastChar === "," ||
      lastChar === "." ||
      value === ""
    ) {
      setCargoBoxes(value);
    }
  };

  return (
    <div className="shipment-details_container">
      <div className="company-name">{shipment?.name}</div>
      <div className="company-email">{shipment?.email}</div>

      <div className="cargo-box_label">CARGO BOXES</div>
      <input
        type="text"
        className="cargo-box"
        onChange={handleCargoChange}
        value={cargoBoxes}
      />

      <div className="num-required-cargo_label">
        Number of Required Cargo Bays
      </div>

      <div className="required-cargo-bays">{requiredBays}</div>
    </div>
  );
}
