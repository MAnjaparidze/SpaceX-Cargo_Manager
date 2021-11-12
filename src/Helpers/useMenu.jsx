import { useState, useEffect} from "react";

export default function useShipments() {
  const [menuOpen, toggleMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    toggleMenuOpen(!menuOpen);
  }

  return { menuOpen, handleToggleMenu };
}
