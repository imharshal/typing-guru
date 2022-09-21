import { useEffect, useRef, useState } from "react";
import { QuestionBox } from "../partials/QuestionBox";
import { ResponseBox } from "../partials/ResponseBox";
import KeyboardLayout from "./Keyboard";
import Modal from "../partials/Modal";
import KEYS from "../../services/KeysInfo";
import { LeftHand, RightHand } from "../partials/Hand";
import TaskComplete from "../partials/TaskComplete";

const ParagraphPractice = ({ para, keyPressed }) => {
  const [hits, setHits] = useState(0); // storing the count of keyhits
  const [correct, setCorrect] = useState(0); // storing the count of keyhits
  const [incorrect, setIncorrect] = useState(new Set());
  const [response, setResponse] = useState([]);
  const [current, setCurrent] = useState(0);
  const [hintKey, setHintKey] = useState({});
  const [taskCompleted, setTaskCompleted] = useState(false);

  const lastWord = useRef("");
  const [difficultKeys, setDifficultKeys] = useState(new Set()); // to store missed keys assuming that is difficult

  // const [lastChar, setlastChar] = useState("");
  const [begin, setBegin] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    handleHintKey();
    if (!begin && keyPressed && keyPressed.key === " ") {
      setBegin(true);
      setFocus(true);
    }
    if (begin && response.length >= para.length && current === para.length) {
      setBegin(false);
      setTaskCompleted(true);
      setFocus(false);
    }
  }, [keyPressed]);

  const handleChange = (e) => {
    const value = e.target.value;
    // setlastChar(value.charAt(value.length - 1));
    let lastChar = value.charAt(value.length - 1);
    if (lastChar && keyPressed != undefined) {
      const { key } = keyPressed;
      if (begin) {
        const lastWordValue = lastWord.current;
        if (key === "Backspace") {
          lastWord.current = lastWordValue.slice(0, -1);
        }
        if (key.length == 1) {
          setHits((ps) => ps + 1);
          if (key !== " " && hintKey !== key)
            setDifficultKeys((prevState) => prevState.add(hintKey.hint));
          if (hintKey.hint === key) {
            setCorrect((ps) => ps + 1);
          }

          if (lastChar === " ") {
            //if space key detected go to next word
            setCurrent((cur) => cur + 1);
            // if word typed is incorrect store it's index
            // console.log(lastWordValue);
            if (para[current] !== lastWordValue) {
              setIncorrect((prevState) => prevState.add(current));
            }
            //Experimental: storing enterred word for analytics
            setResponse((prevResp) => [...prevResp, lastWordValue]);
            lastWord.current = ""; // resetting last enterred word
          } else {
            // if (hintKey.key == lastChar)
            //   setIncorrect((prevState) => prevState.add(current));
            // temp.current = temp.current + lastChar;
            // console.log(key);

            lastWord.current = lastWord.current + key;
          }
        }
      }
    }
  };

  const handleHintKey = () => {
    if (begin && para && para[current]) {
      let word = para[current];
      let char = word.split("");
      char.push(" ");
      let hintKeyChar = char[lastWord.current.length];
      if (hintKeyChar >= "A" && hintKeyChar <= "Z")
        setHintKey({ hint: hintKeyChar, shift: true });
      else setHintKey({ hint: hintKeyChar, shift: false });
    } else {
      setHintKey({ hint: " ", shift: false });
    }
  };

  return (
    <div className="playground space-between">
      {/* <div className="space-between"> */}
      {!begin && !taskCompleted ? (
        <Modal message="Press space key to begin drill"></Modal>
      ) : (
        !taskCompleted && (
          <div className="row">
            <QuestionBox
              para={para}
              current={current}
              incorrect={incorrect}
            ></QuestionBox>
            <ResponseBox focus={focus} onChange={handleChange}></ResponseBox>
          </div>
        )
      )}
      {/* </div> */}
      {!taskCompleted ? (
        <div className="row">
          <LeftHand hintKey={hintKey}></LeftHand>
          <KeyboardLayout
            keyPressed={keyPressed}
            hintKey={hintKey}
          ></KeyboardLayout>
          <RightHand hintKey={hintKey}></RightHand>
        </div>
      ) : (
        <TaskComplete
          analytics={{
            incorrect: incorrect,
            hits: hits,
            total: correct,
            difficultKeys: difficultKeys,
          }}
          message="Well done! You have completed the paragraph drill"
          // links={direction}
          // title={{ prev: "Go Back", next: "Next" }}
        ></TaskComplete>
      )}
    </div>
  );
};

export default ParagraphPractice;
