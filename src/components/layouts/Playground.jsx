import { useState, useEffect } from "react";
import ParagraphPractice from "./ParagraphPractice";
import SentencePractice from "./SentencePractice";
const Playground = ({ layout }) => {
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
