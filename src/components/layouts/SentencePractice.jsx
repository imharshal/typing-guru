import { useEffect, useState } from "react";
import { Lesson } from "../partials/Lesson";
import Modal from "../partials/Modal";
import KeyboardLayout from "./Keyboard";

const SentencePractice = ({ lesson, keyPressed }) => {
  // console.log(incorrect);
  const [hits, setHits] = useState(); // storing the count of keyhits
  const [missed, setMissed] = useState([]); // characters that missed
  const [current, setCurrent] = useState(0); // to know which is currect character tha is to be enterred
  const [incorrect, setIncorrect] = useState(new Set()); // to store index of incorrect character in lesson
  const [difficultKeys, setDifficultKeys] = useState(new Set()); // to store missed keys assuming that is difficult
  const [textLimit, setTextLimit] = useState({ start: 0, end: 15 }); // setting limit on how much characters to display at time
  const [hintKey, setHintKey] = useState({}); // to give hint on keyboard
  const [begin, setBegin] = useState(false);

  useEffect(() => {
    //calling hint key method
    handleHintKey();

    if (keyPressed && keyPressed.key.length === 1) {
      let key = keyPressed.key;

      if (!begin && key === " ") {
        setBegin(true);
      }
      if (begin) {
        //setting characters clicked
        setHits(hits + 1);

        if (lesson) {
          if (lesson[current] === key) {
            //If keypressed is correct character then highlighting next character
            setCurrent(current + 1);
          } else {
            //If keypressed is incorrect
            setMissed(missed + 1);
            setIncorrect((prevState) => prevState.add(current));
            setDifficultKeys((prevState) => prevState.add(lesson[current]));
          }
        }
      }
    }

    //Setting character limit to be displayed as a lesson
    if (current > textLimit.end) {
      const newTextLimit = {
        start: textLimit.start + 15,
        end: textLimit.end + 15,
      };
      setTextLimit(newTextLimit);
    }
  }, [keyPressed]);

  //method to set hintkey
  const handleHintKey = () => {
    if (lesson && begin) {
      let char = lesson[current];
      if (char >= "A" && char <= "Z")
        setHintKey({ hint: lesson[current], shift: true });
      else setHintKey({ hint: lesson[current], shift: false });
      // console.log(hintKey);
    } else if (lesson) {
      setHintKey({ hint: " ", shift: false });
    }
  };

  return (
    <div className="lesson-playground">
      {!begin ? (
        <Modal message="Press space key to begin drill"></Modal>
      ) : (
        <Lesson
          lesson={lesson}
          incorrect={incorrect}
          textLimit={textLimit}
          current={current}
        ></Lesson>
      )}
      <KeyboardLayout
        keyPressed={keyPressed}
        hintKey={hintKey}
      ></KeyboardLayout>
    </div>
  );
};

export default SentencePractice;
