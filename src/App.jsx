import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Playground from "./components/layouts/Playground";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import { Routes } from "react-router-dom";
import CourseMenu from "./components/layouts/CourseMenu";
import LessonMenu from "./components/layouts/LessonMenu";
// import { sentence } from "txtgen";
// import { getCourse } from './services/Course'
function App() {
  // console.log(words({ exactly: 5, wordsPerString: 9 }));
  // console.log(getCourse())
  // console.log(sentence());
  return (
    <BrowserRouter>
      <div id="App">
        <Routes>
          <Route
            path="/course/lesson/:id/:task"
            element={<div>task</div>}
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
            path="/sentence"
            element={<Playground layout="sentence"></Playground>}
          ></Route>
          <Route
            path="/game"
            element={<Playground layout="tetris"></Playground>}
          ></Route>
          <Route path="*" element={<div className="playground"></div>}></Route>
        </Routes>

        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
