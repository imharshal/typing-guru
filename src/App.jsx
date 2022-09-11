import { useEffect, useState } from "react";
import "./App.css";

import KeyboardLayout from "./components/layouts/KeyBoard";
import { Lesson } from "./components/layouts/Lesson";

function App() {
  const [event, setEvent] = useState();
  const [lesson, setLesson] = useState([]);
  const [hits, setHits] = useState([]);
  const [missed, setMissed] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [inCorrect, setInCorrect] = useState(new Set());
  const [difficultKeys, setDifficultKeys] = useState(new Set());
  const [textLimit, setTextLimit] = useState({ start: 0, end: 20 });
  const [hintKey, setHintKey] = useState({});

  useEffect(() => {
    setLesson(
      "This is a Rju Ox Poe Tor text This is a \
      Rju Ox Poe Tor text This is a Rju Ox Poe Tor text This is a Rju Ox Poe Tor text".split(
        ""
      )
    );
  }, []);

  useEffect(() => {
    const onPress = (e) => {
      setEvent(e);
      if (e && e.key.length == 1) {
        setHits([...hits, e.key]);
      }
    };
    if (
      hits.length &&
      lesson &&
      event &&
      event.key.length === 1 &&
      lesson[correct] == event.key
    ) {
      setCorrect(correct + 1);
    } else if (event && event.key.length === 1 && lesson && hits.length) {
      setMissed(missed + 1);
      setInCorrect((prevState) => prevState.add(correct));
      setDifficultKeys((prevState) => prevState.add(lesson[correct]));
    }

    window.addEventListener("keydown", onPress);
    if (correct > textLimit.end) {
      const newTextLimit = {
        start: textLimit.start + 20,
        end: textLimit.end + 20,
      };
      setTextLimit(newTextLimit);
    }
    if (event && event.key != "") {
      setTimeout(function () {
        setEvent({ key: "" });
      }, 300);
    }
    handleHintKey();
    return () => {
      window.removeEventListener("keydown", onPress);
    };
  }, [event]);

  const handleHintKey = () => {
    if (lesson) {
      let char = lesson[correct];
      if (char >= "A" && char <= "Z")
        setHintKey({ hint: lesson[correct], shift: true });
      else setHintKey({ hint: lesson[correct], shift: false });
      // console.log(hintKey);
    }
  };
  // useEffect(function () {
  //   handleHintKey();
  // }, []);
  // function getLesson() {
  //   if (correct == 0 || correct % 20 == 0) {
  //     let str =
  //       "This is a text This is a text This is a text This is a text This is a text This is a text This is a text ".split(
  //         ""
  //       );
  //     return str.slice(correct, correct + 20) || str.slice(correct, arr.length);
  //   }
  //   return lesson;
  // }
  // useEffect(() => {
  //   setLesson(getLesson());
  //   console.log(lesson);
  // }, [correct]);

  return (
    <div id="App">
      <div>{correct}</div>
      <div>{difficultKeys}</div>
      <div>
        Accuracy=
        {((100 * lesson.length) / hits.length).toFixed(2)}
      </div>
      {/* <div>{correct}</div> */}
      <Lesson
        lesson={lesson}
        difficultKeys={difficultKeys}
        current={correct}
        startFrom={textLimit.start}
        endTo={textLimit.end}
        inCorrect={inCorrect}
      ></Lesson>
      <KeyboardLayout
        // getData={getFromTwo}
        lesson={lesson}
        keyPressed={event}
        hintKey={hintKey}
      ></KeyboardLayout>
    </div>
  );
}

export default App;
