import { useState, useEffect } from "react";
import ParagraphPractice from "./ParagraphPractice";
import SentencePractice from "./SentencePractice";
import { paragraph } from "txtgen";
import { createLesson } from "../../services/LessonsGenerator";
const Playground = ({ layout }) => {
  const [keyPressed, setKeyPressed] = useState({ key: "" });
  const [lesson, setLesson] = useState([]);
  const [para, setPara] = useState([]);

  useEffect(() => {
    // console.log(paragraph());
    const text =
      "This is a Rjjjjjj u Ox Poe Tor text This is a Rju Ox Poe Tor text This is a Rju Ox Poe Tor text This is a Rju Ox Poe Tor text";

    setLesson(createLesson(['as df', 'jk l;', "asdf jkl;"], 5).split(''));
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

  return layout === "paragraph" ? (
    <ParagraphPractice para={para} keyPressed={keyPressed}></ParagraphPractice>
  ) : layout === "sentence" ? (
    <SentencePractice
      lesson={lesson}
      keyPressed={keyPressed}
    ></SentencePractice>
  ) : (
    ""
  );
};

export default Playground;
