import { Link } from "react-router-dom";
import Modal from "../partials/Modal";

const Home = () => {
  return (
    <div className="playground flex-center">
      <h1 className="" style={{ color: "burlywood" }}>
        Hello there, <br />
        <br /> Lets start journey to excel your typing skills
      </h1>
      <div className="">
        <Link className="btn" to="/course">
          Click here to explore course
        </Link>
      </div>
    </div>
  );
};

export default Home;
