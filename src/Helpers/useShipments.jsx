import { useEffect, useState } from "react";
import ShipmentsService from "../API/shipmentsService";

export default function useShipments() {
  const [shipments, setShipments] = useState([]);
  const [shipment, setShipment] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  }, [message]);

  const handleGetShipments = async () => {
    const { status, message, data } =
      await ShipmentsService.getShipments().catch((err) => {
        return err;
      });
    if (status !== 200) {
      return setMessage({ status: status, message: message });
    }
    setMessage({ status: status, message: message });
    setShipments(data);
  };

  const handleGetShipment = async (shipmentID) => {
    const { status, message, data } = await ShipmentsService.getShipment(
      shipmentID
    ).catch((err) => {
      return err;
    });
    if (status !== 200) {
      return setMessage({ status: status, message: message });
    }
    setMessage({ status: status, message: message });
    setShipment(data);
  };

  const filterShipments = async (shipmentName) => {
    let response = await ShipmentsService.filterShipments(shipmentName);
    setShipments(response.data);
  };

  useEffect(() => {
    handleGetShipments();
  }, []);

  return { shipments, shipment, handleGetShipment, filterShipments, message };
}
