import { useEffect, useState } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import { getCourse } from "../../services/Course";

const CourseMenu = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    setCourse(getCourse());
  }, []);
  return (
    <div className="playground">
      <div>
        <h2 className="menu-heading">Typing Mastery Course</h2>
        {course.map((c, k) => (
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
        ))}
      </div>
    </div>
  );
};

export default CourseMenu;
