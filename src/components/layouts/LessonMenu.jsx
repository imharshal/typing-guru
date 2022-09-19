import { useState, useEffect } from "react";
import { useParams, Link, Route } from "react-router-dom";
import { getCourse } from "../../services/Course";
import Modal from "../partials/Modal";
import Playground from "./Playground";
const LessonMenu = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(0);
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    setCourse(getCourse());
    console.log(course);
  }, [course]);
  //   useEffect(() => {
  //     if (course && id > course.length) return " not found";
  //   }, [id]);
  function wordDrill() {
    setLayout(<Playground layout="sentence"></Playground>);
  }
  return (
    <div className="playground">
      {/* If the lesson does not exist */}
      {id > course.length && (
        <div className="flex-center">
          <Modal message="You are lost!"></Modal>
          <Link to="/course">Click here to go to course</Link>
        </div>
      )}
      {/* If lesson exist display menu */}
      <Link to="/course">Go Back</Link>
      <h2 className="menu-heading">
        {id < course.length && `Lesson ${id} : ${course[id].title}`}
      </h2>
      <Link to={`/course/lesson/${id}/learn`} className="menu-item">
        <h1 className="menu-item-title">Learn</h1>
      </Link>
      {/* {course.map((c, k) => (
        <NavLink key={k} to={`/course/lesson/${k}`} className="menu-item">
          <h1 className="menu-item-title">
            Lesson {k} :{" " + c.title}
          </h1>
          {c.duration && (
            <span className="menu-item-duration">
              Est. duration {c.duration}
            </span>
          )}
        </NavLink>
      ))} */}
    </div>
  );
};

export default LessonMenu;
