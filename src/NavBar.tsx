import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {
  const [isActive, setIsActive] = useState("false");
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Hem
      </NavLink>
      <NavLink
        to="/compete"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Tävla
      </NavLink>
      <NavLink
        to="/galleri"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Galleri
      </NavLink>
      <NavLink
        to="/stats"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Statistik
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Historik
      </NavLink>
    </nav>
  );
}

export default NavBar;
