import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Playground from "./components/layouts/Playground";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div id="App">
        <Routes>
          <Route
            path="/paragraph"
            element={<Playground layout="paragraph"></Playground>}
          ></Route>
          <Route
            path="/sentence"
            element={<Playground layout="sentence"></Playground>}
          ></Route>
          <Route path="*"></Route>
        </Routes>
        <Navbar></Navbar>
      </div>
    </BrowserRouter>
  );
}

export default App;
