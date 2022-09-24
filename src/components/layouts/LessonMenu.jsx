import { useState, useEffect } from "react";
import { useParams, Link, Route, useNavigate } from "react-router-dom";

import { getCourse } from "../../services/Course";
import Modal from "../partials/Modal";
import Playground from "./Playground";
const LessonMenu = () => {
  const { id } = useParams();
  const [totalLessons, setTotalLessons] = useState(0);
  const [course, setCourse] = useState([]);
  const [layout, setLayout] = useState(null);
  const [direction, setDirection] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const courseArray = getCourse();
      setTotalLessons(courseArray.length);
      setCourse(courseArray[id]);
      // if (id >= 0 && id <= totalLessons - 1) {
      //   const prevPage = id != 0 ? `/course/lesson/${id - 1}` : "/course";
      //   const nextPage = `/course/lesson/${1 + +id}`;
      //   setDirection({
      //     prev: prevPage,
      //     next: nextPage,
      //   });
      //   console.log(direction, totalLessons);
      // }
    } catch (error) {
      setCourse(0);
      console.log(error);
    }
    console.log(id);
    if (!id) navigate("/course");
  }, [id]);
  // useEffect(() => {
  //   if (course && id > course.length) return " not found";
  // }, [id]);
  useEffect(() => {
    if (id >= 0 || id <= totalLessons) {
      const prevPage = id == "0" ? "/course" : `/course/lesson/${+id - 1}`;
      const nextPage = `/course/lesson/${1 + +id}`;
      setDirection({
        prev: prevPage,
        next: nextPage,
      });
      console.log(direction, totalLessons);
    }
  }, [id]);
  return (
    <div className="playground">
      {/* If the lesson does not exist */}
      {!course && (
        <div className="flex-center">
          <Modal message="You are lost!"></Modal>
          <Link to="/course">Click here to go to course</Link>
        </div>
      )}

      <div>
        {course && direction && (
          <button className="btn" onClick={() => navigate(direction.prev)}>
            Previous
          </button>
        )}
        {course && direction && id < totalLessons - 1 && (
          <button
            className="btn"
            style={{ float: "right" }}
            onClick={() => navigate(direction.next)}
          >
            Next
          </button>
        )}
      </div>

      {/* If lesson exist display menu */}
      {course && (
        <>
          {/* <Link to="/course">Go Back</Link> */}
          <h2 className="menu-heading ">
            {id && `Lesson ${id} : ${course.title}`}
          </h2>
        </>
      )}

      {course && course.video && (
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
        {course && course.learn && (
          <Link to={`/course/lesson/${id}/learn`} className="lesson-item">
            <h1 className="menu-item-title">Learn Keys Practically</h1>
          </Link>
        )}
        {course && course.practice && (
          <Link to={`/course/lesson/${id}/practice`} className="lesson-item">
            <h1 className="menu-item-title">Practice words</h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonMenu;
