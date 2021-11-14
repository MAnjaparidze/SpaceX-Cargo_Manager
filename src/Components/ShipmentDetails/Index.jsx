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
    let result = demoCountCargoBay(cargoINT);
    setRequiredBays(result);
  };

  const demoCountCargoBay = (array) => {
    let cargoBayCount = 0;
    let cargoSum = 0;

    for (let item in array) {
      if (cargoSum + array[item] > 10) {
        cargoBayCount++;
        cargoSum = 0;
      }
      cargoSum += array[item];
      if (item == array.length - 1 && cargoSum > 0) {
        cargoBayCount++;
        break;
      }
    }

    return cargoBayCount;
  };

  const handleCargoChange = (e) => {
    const { value } = e.target;
    const lastChar = value[value.length - 1];
    let lastCharFloat = parseFloat(value[value.length - 1]);
    // Validation for lastCharacter to Be a Number otherwise Calc Function will not fire
    if (!isNaN(lastCharFloat) || lastChar === "," || lastChar === ".") {
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
