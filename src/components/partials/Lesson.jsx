import { Character } from "./Character";

const Lesson = ({ lesson, incorrect, textLimit, current }) => {
  return (
    <>
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
      </div>
      <div style={{ marginTop: "50px" }}>
        <h3>Note: </h3>
        <ul className="notes">
          <li>Type the key sequences, follow the highlighted box</li>
          <li>
            Look at the on-screen keyboard and hands for hints, when needed
          </li>
        </ul>
      </div>
    </>
  );
};

export { Lesson };
