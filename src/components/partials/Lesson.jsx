import { Character } from "./Character";

const Lesson = ({ lesson, incorrect, textLimit, current }) => {
  return (
    <div id="lesson">
      {lesson &&
        lesson.map((c, k) => (
          <Character
            key={k}
            isError={incorrect.has(k)}
            wasCorrect={k < current}
            isCurrent={k == current}
            show={k >= textLimit.start && k <= textLimit.end + 1}
            char={c}
          ></Character>
        ))}
      <p>Type highlighted element</p>
    </div>
  );
};

export { Lesson };
