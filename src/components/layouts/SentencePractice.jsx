import { useEffect, useState } from "react";
import { LeftHand, RightHand } from "../partials/Hand";
import { Lesson } from "../partials/Lesson";
import Modal from "../partials/Modal";
import TaskComplete from "../partials/TaskComplete";
import KeyboardLayout from "./Keyboard";
import { Link, useNavigate, useParams } from "react-router-dom";

const SentencePractice = ({
  lesson,
  keyPressed,
  completionMessage,
  direction,
}) => {
  // console.log(incorrect);
  const navigate = useNavigate();
  const { id, task } = useParams();
  const [hits, setHits] = useState(0); // storing the count of keyhits
  const [missed, setMissed] = useState([]); // characters that missed
  const [current, setCurrent] = useState(0); // to know which is currect character tha is to be enterred
  const [incorrect, setIncorrect] = useState(new Set()); // to store index of incorrect character in lesson
  const [difficultKeys, setDifficultKeys] = useState(new Set()); // to store missed keys assuming that is difficult
  const [textLimit, setTextLimit] = useState({ start: 0, end: 20 }); // setting limit on how much characters to display at time
  const [hintKey, setHintKey] = useState({}); // to give hint on keyboard
  const [begin, setBegin] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    setTaskCompleted(false);
    setMissed([]);
    setIncorrect(new Set());
    setCurrent(0);
  }, [task]);
  useEffect(() => {
    //calling hint key method
    handleHintKey();

    if (keyPressed && keyPressed.key.length === 1) {
      let key = keyPressed.key;

      if (!begin && !taskCompleted && key === " ") {
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
        start: textLimit.start + 20,
        end: textLimit.end + 20,
      };
      setTextLimit(newTextLimit);
    }
    if (begin && hits >= lesson.length && current === lesson.length) {
      setBegin(false);
      setTaskCompleted(true);
    }
  }, [keyPressed, task, id]);

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
    <div className=" playground space-between">
      <div className="space-between">
        <div>
          {id && direction && !begin && !taskCompleted && (
            <button className="btn" onClick={() => navigate(direction.prev)}>
              Go Back
            </button>
          )}
          {id && direction && !begin && !taskCompleted && (
            <button
              className="btn"
              style={{ float: "right" }}
              onClick={() => navigate(direction.next)}
            >
              Next
            </button>
          )}
        </div>
        {!begin && taskCompleted ? (
          <TaskComplete
            analytics={{
              missed: missed,
              incorrect: incorrect,
              hits: hits,
              total: lesson.length,
              difficultKeys: difficultKeys,
            }}
            message={
              (id && completionMessage) ||
              "Well done! You have completed the word drill"
            }
            links={direction}
            title={{ prev: "Go Back", next: "Next" }}
          ></TaskComplete>
        ) : !begin && !taskCompleted ? (
          <Modal message="Press space key to begin drill"></Modal>
        ) : (
          <Lesson
            lesson={lesson}
            incorrect={incorrect}
            textLimit={textLimit}
            current={current}
          ></Lesson>
        )}
      </div>
      {!taskCompleted && (
        <div className="row">
          <LeftHand hintKey={hintKey}></LeftHand>
          <KeyboardLayout
            keyPressed={keyPressed}
            hintKey={hintKey}
          ></KeyboardLayout>
          <RightHand hintKey={hintKey}></RightHand>
        </div>
      )}
    </div>
  );
};

export default SentencePractice;
