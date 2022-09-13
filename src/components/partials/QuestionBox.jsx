import { Word } from "./Word";

const QuestionBox = ({ para, current, incorrect }) => {
  // para.length > 0 && console.log(para);
  // console.log(incorrect);
  return (
    <div id="question-box">
      {para.map((w, k) => (
        <Word
          key={k}
          isCurrent={k === current}
          isIncorrect={incorrect && incorrect.has(k)}
          word={w}
        >
          {" "}
        </Word>
      ))}
    </div>
  );
};

export { QuestionBox };
