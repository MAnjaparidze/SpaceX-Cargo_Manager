import shipmentsData from "./shipments.json";

class ShipmentsSerivce {
  getShipments = () => {
    return new Promise((resolve, reject) => {
      let randInt = Math.round(Math.random() * 10);
      if (randInt > 8) {
        reject({ status: 400, message: "Something went wrong!" });
      }
      resolve({
        status: 200,
        data: shipmentsData,
        message: "Got Shipments Successfully",
      });
    });
  };

  getShipment = (shipmentID) => {
    return new Promise((resolve, reject) => {
      let randInt = Math.round(Math.random() * 10);

      if (randInt > 9) {
        reject({ status: 400, message: "Something went wrong!" });
      }

      let shipment = shipmentsData.find((item) => item.id === shipmentID);
      resolve({
        status: 200,
        data: shipment,
        message: "Got Shipment Successfully",
      });
    });
  };

  filterShipments = (shipmentName) => {
    return new Promise((resolve, reject) => {
      let filteredShipments = shipmentsData.filter((item) =>
        item.name.toLowerCase().includes(shipmentName.toLowerCase())
      );
      resolve({ status: 200, data: filteredShipments });
    });
  };
}

export default new ShipmentsSerivce();
