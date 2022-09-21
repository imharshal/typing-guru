import { useState, useEffect } from "react";
import ParagraphPractice from "./ParagraphPractice";
import SentencePractice from "./SentencePractice";
import { paragraph } from "txtgen";
import { createLesson, getLesson } from "../../services/LessonsGenerator";
import Wordris from "../Game/layout/Wordris";
import { useParams } from "react-router-dom";
import { getCourse } from "../../services/Course";

const Playground = ({ layout, pattern }) => {
  const [keyPressed, setKeyPressed] = useState({ key: "" });
  const [lesson, setLesson] = useState([]);
  const [para, setPara] = useState([]);
  const { id, task } = useParams();
  const [lessonTitle, setLessonTitle] = useState("");
  const [direction, setDirection] = useState({});
  useEffect(() => {
    if (id) {
      const course = getCourse()[id];
      const message = `Well done! Now you know ${course.title.toLowerCase()}`;
      setLessonTitle(message);
      if (task === "learn") {
        // setLesson("Hello".split(""));
        setDirection({ prev: `/course/lesson/${id}`, next: "./../practice" });
        setLesson(createLesson(course[task], 5).split(""));
      } else if (task === "practice") {
        setDirection({
          prev: `/course/lesson/${id}`,
          next: `/course/lesson/${1 + Number(id)}`,
        });

        setLesson(
          createLesson(
            getLesson({ count: 10, wordLength: 4, includes: course[task] }),
            3
          ).split("")
        );
      }
    } else {
      setLesson(getLesson({ count: 5, wordLength: 8, return: "char" }));
      setPara(paragraph().split(" "));
      // setPara(
      //   "Hello friend asdf asdfa qwer trytyu cxv,ndjaqopadf kjsf knm,cx".split(
      //     " "
      //   )
      // );
    }
  }, [id, task]);

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
        completionMessage={lessonTitle}
        direction={direction}
      ></SentencePractice>
    );
  else if (layout === "tetris")
    return <Wordris keyPressed={keyPressed}></Wordris>;
  else return "";
};

export default Playground;
