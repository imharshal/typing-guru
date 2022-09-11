import { Character } from "../partials/Character";
const Lesson = ({ lesson, inCorrect, current, startFrom, endTo }) => {
  // console.log(inCorrect);
  return (
    <div>
      {lesson &&
        lesson.map((c, k) => (
          <Character
            key={k}
            isError={inCorrect.has(k)}
            wasCorrect={k < current}
            isCurrent={k == current}
            show={k >= startFrom && k <= endTo + 1}
            char={c}
          ></Character>
        ))}
    </div>
  );
};

export { Lesson };
