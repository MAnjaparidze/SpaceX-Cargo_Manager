import { useEffect, useState } from "react";
import ShipmentsService from "../API/shipmentsService";

export default function useShipments() {
  const [shipments, setShipments] = useState([]);
  const [shipment, setShipment] = useState(null);

  const handleGetShipments = async () => {
    let response = await ShipmentsService.getShipments();
    
    setShipments(response.data);
  };

  const handleGetShipment = async (shipmentID) => {
    let response = await ShipmentsService.getShipment(shipmentID);
    setShipment(response.data);
  };

  const filterShipments = async (shipmentName) => {
    let response = await ShipmentsService.filterShipments(shipmentName);
    setShipments(response.data);
  };

  useEffect(() => {
    handleGetShipments();
  }, []);

  return { shipments, shipment, handleGetShipment, filterShipments };
}
