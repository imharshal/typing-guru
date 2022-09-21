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
    setCourse(getCourse()[id]);
    // console.log(course);
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
      <h2 className="menu-heading">{id && `Lesson ${id} : ${course.title}`}</h2>
      {course.video && (
        <div className="flex-center">
          <video
            className="lesson-video"
            src={course.video}
            controls
            width="600"
          ></video>
        </div>
      )}
      <div className="row">
        {course.learn && (
          <Link to={`/course/lesson/${id}/learn`} className="lesson-item">
            <h1 className="menu-item-title">Learn Keys Practically</h1>
          </Link>
        )}
        {course.practice && (
          <Link to={`/course/lesson/${id}/practice`} className="lesson-item">
            <h1 className="menu-item-title">Practice words</h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonMenu;
