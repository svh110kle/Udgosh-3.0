import React, { useState } from "react";
import { Outlet } from "react-router";
import MenuBar from "./MenuBar";

export default function Layout() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <MenuBar isVisible={isMenuVisible} onToggle={toggleMenu} />
      <Outlet />
    </>
  );
}

