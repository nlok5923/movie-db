import "./Navigation.scss";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Movie DB</Link>
      </div>
      <ul className="navLink">
        <li>
          <Link to="/login">
            <Button basic color="green">
              Login
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <Button basic color="green">
              Register
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
