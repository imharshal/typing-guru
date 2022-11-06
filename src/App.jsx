import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Playground from "./components/layouts/Playground";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./components/layouts/Home";
import CourseMenu from "./components/layouts/CourseMenu";
import LessonMenu from "./components/layouts/LessonMenu";
import Modal from "./components/partials/Modal";
// import { sentence } from "txtgen";
// import { getCourse } from './services/Course'
function App() {
  // console.log(words({ exactly: 5, wordsPerString: 9 }));
  // console.log(getCourse())
  // console.log(sentence());
  return (
    <BrowserRouter>
      <div id="App">
        <Navbar />
        <Routes>
          <Route
            path="/course/lesson/:id/:task"
            element={<Playground layout="sentence"></Playground>}
          ></Route>

          <Route
            path="/course/lesson/:id"
            element={<LessonMenu></LessonMenu>}
          ></Route>
          <Route
            path="/course"
            element={<CourseMenu layout="course"></CourseMenu>}
          ></Route>
          <Route
            path="/paragraph"
            element={<Playground layout="paragraph"></Playground>}
          ></Route>
          <Route
            path="/word"
            element={<Playground layout="sentence"></Playground>}
          ></Route>
          <Route
            path="/game"
            element={<Playground layout="tetris"></Playground>}
          ></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/test"
            element={
              <div className="playground">
                <Modal message="Coming Soon"></Modal>
              </div>
            }
          ></Route>
          <Route path="*" element={<div className="playground"></div>}></Route>
        </Routes>
      </div>
      <div id="mobile">
        <h2>
          Hello there, Glad to know you want to improve your typing skills.
        </h2>
        <br />
        This app is intentionally designed to be used on desktop or laptop.
        <br /> <br />
        <h5>Please swich to larger screen, you will ❤ it!</h5>
      </div>
    </BrowserRouter>
  );
}

export default App;
