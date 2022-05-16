import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <Link to="/"> Hem</Link>
      <Link to="/compete"> Tävla </Link>
      <Link to="/galleri"> Galleri </Link>
      <Link to="/stats"> Statistik </Link>
      <Link to="/history"> Historik </Link>
    </nav>
  );
}

export default NavBar;
