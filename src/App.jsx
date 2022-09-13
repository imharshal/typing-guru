import { useEffect, useState } from "react";
import "./App.css";

import { SentencePractice } from "./components/layouts/SentencePractice.jsx.jsx";
import TypingTest from "./components/layouts/ParagraphPractice";

import ParagraphPractice from "./components/layouts/ParagraphPractice";

function App() {
  const [keyPressed, setEvent] = useState();
  const [lesson, setLesson] = useState([]);
  const [para, setPara] = useState([]);

  useEffect(() => {
    const text =
      "This is a Rju Ox Poe Tor text This is a Rju Ox Poe Tor text This is a Rju Ox Poe Tor text This is a Rju Ox Poe Tor text";
    setLesson(text.split(""));
    setPara(text.split(" "));
  }, []);

  useEffect(() => {
    const onPress = (e) => {
      setEvent(e);
    };

    window.addEventListener("keydown", onPress);

    if (keyPressed && keyPressed.key != "") {
      setTimeout(function () {
        setEvent({ key: "" });
      }, 300);
    }
    // handleHintKey();
    return () => {
      window.removeEventListener("keydown", onPress);
    };
  }, [keyPressed]);

  return (
    <div id="App">
      <ParagraphPractice
        para={para}
        keyPressed={keyPressed}
        // paraInChar={lesson}
      ></ParagraphPractice>

      {/* <SentencePractice
        lesson={lesson}
        keyPressed={keyPressed}
      ></SentencePractice> */}
    </div>
  );
}

export default App;
