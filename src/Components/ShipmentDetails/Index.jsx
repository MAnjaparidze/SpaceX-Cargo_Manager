import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useShipments from "../../Helpers/useShipments";

import "./ShipmentDetailsStyle.css";

export default function Index() {
  const [requiredBays, setRequiredBays] = useState(0);
  const [cargoBoxes, setCargoBoxes] = useState("");
  const { handleGetShipment, shipment } = useShipments();
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
    console.log(cargo, "SPLIT");
    // Creating Number Array and Reverse Sorting It
    let cargoINT = cargo
      .map((item) => {
        let num = parseFloat(item);
        console.log(isNaN(num), num);
      })
      .sort(function (a, b) {
        return a - b;
      })
      .reverse();
    let cargoBay = 0;
    while (cargoINT.length > 0) {
      let result = countCargoBay(cargoINT);
      cargoBay += result;
    }
    setRequiredBays(cargoBay);
  };

  const countCargoBay = (array) => {
    if (array.length === 0) {
      return 0;
    }
    if (array.length === 1) {
      array.pop();
      return 1;
    }
    for (let a = 0; a < array.length; a++) {
      for (let b = array.length - 1; b > 0; b--) {
        let sum = array[a] + array[b];
        if (sum === 10) {
          array.pop();
          array.shift();
          return 1;
        }
        if (sum > 10) {
          array.shift();
          return 1;
        }

        let c = b - 1;
        while (c !== a) {
          let additionalSum = sum + array[c];
          if (additionalSum === 10) {
            array.splice(c, 1);
            array.pop();
            array.shift();
            return 1;
          }
          if (additionalSum < 10) {
            sum = additionalSum;
          } else {
            array.pop();
            array.shift();
            return 1;
          }
          c--;
        }
      }
    }
  };

  const demoCountCargoBat = (array) => {
    // for
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
