const Word = ({
  word,
  currentLetter,
  bottom,
  isMissed,
  isCorrect,
  active,
  incorrect,
}) => {
  //   console.log(word);
  return (
    <div
      className={`tetris-word ${isCorrect ? "d-none" : ""} ${
        isMissed ? "tetris-word-missed" : ""
      }`}
      style={{ bottom: bottom + "px" }}
    >
      {word &&
        word.split("").map((c, k) => (
          <span
            key={k}
            className={`tetris-char text-white ${
              !isMissed && k < currentLetter ? "text-success" : ""
            }`}
          >
            {c}
          </span>
        ))}
      {/* {word} */}
    </div>
  );
};

export default Word;
