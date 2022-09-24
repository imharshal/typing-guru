import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <NavLink exact="true" className="nav-link" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" className="nav-link" to="/course">
            Course
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" className="nav-link" to="/word">
            Word Drill
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" className="nav-link" to="/paragraph">
            Paragraph Drill
          </NavLink>
        </li>

        <li>
          <NavLink exact="true" className="nav-link" to="/test">
            Typing test
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" className="nav-link" to="/game">
            Game
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" className="nav-link" to="/logout">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
