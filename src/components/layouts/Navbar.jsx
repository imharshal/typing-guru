import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <NavLink exact="true" className="nav-link" to="/course">
            Course
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" className="nav-link" to="/paragraph">
            Paragraph
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" className="nav-link" to="/sentence">
            Sentence
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
      </ul>
    </nav>
  );
};

export default Navbar;
