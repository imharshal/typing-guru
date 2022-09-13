const Word = ({ isCurrent, isIncorrect, word }) => {
  //   console.log(isIncorrect);
  function getClasses() {
    let classes = "word ";
    classes += isCurrent ? " current-word " : "";
    classes += isIncorrect ? " wrong-word " : "";
    return classes;
  }
  return <span className={getClasses()}>{word}</span>;
};

export { Word };
