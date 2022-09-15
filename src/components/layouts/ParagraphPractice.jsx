import { useEffect, useRef, useState } from "react";
import { QuestionBox } from "../partials/QuestionBox";
import { ResponseBox } from "../partials/ResponseBox";
import KeyboardLayout from "./Keyboard";
import Modal from "../partials/Modal";
const ParagraphPractice = ({ para, keyPressed }) => {
  const [incorrect, setIncorrect] = useState(new Set());
  const [response, setResponse] = useState([]);
  const [current, setCurrent] = useState(0);
  const [hintKey, setHintKey] = useState({});
  const lastWord = useRef("");
  const [lastChar, setlastChar] = useState("");
  const responseBox = useRef(null);
  const [begin, setBegin] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setlastChar(value.charAt(value.length - 1));
  };
  useEffect(() => {
    handleHintKey();
    if (!begin && keyPressed && keyPressed.key === " ") {
      setBegin(true);
      setFocus(true);
    }
  }, [keyPressed]);

  useEffect(() => {
    handleHintKey();
    // console.log(hintKey);
    if (lastChar && keyPressed != undefined) {
      const { key } = keyPressed;
      if (begin) {
        const lastWordValue = lastWord.current;
        if (key === "Backspace") {
          lastWord.current = lastWordValue.slice(0, -1);
        }
        if (key.length == 1) {
          if (lastChar === " ") {
            //if space key detected go to next word
            setCurrent((cur) => cur + 1);
            // if word typed is incorrect store it's index
            if (para[current] !== lastWordValue) {
              setIncorrect((prevState) => prevState.add(current));
            }
            //Experimental: storing enterred word for analytics
            setResponse((prevResp) => [...prevResp, lastWordValue]);
            lastWord.current = ""; // resetting last enterred word
          } else {
            if (hintKey.key == lastChar)
              setIncorrect((prevState) => prevState.add(current));
            lastWord.current = lastWordValue + key;
          }
          // console.log(lastWord.current);
        }
      }
    }
  }, [lastChar]);

  const handleHintKey = () => {
    if (begin && para && para[current]) {
      let word = para[current];
      let char = word.split("");
      char.push(" ");
      let hintKeyChar = char[lastWord.current.length];
      console.log(word, hintKeyChar, current);
      if (hintKeyChar >= "A" && hintKeyChar <= "Z")
        setHintKey({ hint: hintKeyChar, shift: true });
      else setHintKey({ hint: hintKeyChar, shift: false });
    } else {
      setHintKey({ hint: " ", shift: false });
    }
  };

  return (
    <div className="paragraph-playground">
      {!begin ? (
        <Modal message="Press space key to begin drill"></Modal>
      ) : (
        <div className="row">
          <QuestionBox
            para={para}
            current={current}
            incorrect={incorrect}
          ></QuestionBox>
          <ResponseBox focus={focus} onChange={handleChange}></ResponseBox>
        </div>
      )}
      <div className="row">
        <div id="hand-box"></div>
        <KeyboardLayout
          keyPressed={keyPressed}
          hintKey={hintKey}
        ></KeyboardLayout>
      </div>
    </div>
  );
};

export default ParagraphPractice;
