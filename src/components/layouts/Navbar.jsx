import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <Link to="paragraph">Paragraph</Link>
        </li>
        <li>
          <Link to="sentence">Sentence</Link>
        </li>
        <li>
          <Link to="test">Typing Test</Link>
        </li>
        <li>
          <Link to="game">Game</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
