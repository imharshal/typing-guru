import { useState, useEffect } from "react";
import ParagraphPractice from "./ParagraphPractice";
import SentencePractice from "./SentencePractice";
import { paragraph } from "txtgen";
import { createLesson } from "../../services/LessonsGenerator";
import Wordris from "../Game/layout/Wordris";
const Playground = ({ layout }) => {
  const [keyPressed, setKeyPressed] = useState({ key: "" });
  const [lesson, setLesson] = useState([]);
  const [para, setPara] = useState([]);

  useEffect(() => {
    setLesson(createLesson(["as df", "jk l;", "asdf jkl;"], 5).split(""));
    setPara(paragraph().split(" "));
  }, []);

  useEffect(() => {
    const onPress = (e) => {
      setKeyPressed(e);
    };
    window.addEventListener("keydown", onPress);

    if (keyPressed && keyPressed.key != "") {
      setTimeout(function () {
        setKeyPressed({ key: "" });
      }, 300);
    }
    // handleHintKey();
    return () => {
      window.removeEventListener("keydown", onPress);
    };
  }, [keyPressed]);
  if (layout === "paragraph")
    return (
      <ParagraphPractice
        para={para}
        keyPressed={keyPressed}
      ></ParagraphPractice>
    );
  if (layout === "sentence")
    return (
      <SentencePractice
        lesson={lesson}
        keyPressed={keyPressed}
      ></SentencePractice>
    );
  else if (layout === "tetris")
    return <Wordris keyPressed={keyPressed}></Wordris>;
  else return "";
};

export default Playground;
