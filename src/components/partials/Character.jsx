import React from "react";

const Character = ({ char, isError, isCurrent, wasCorrect, show }) => {
  function addClasses() {
    let classes = "";
    classes += char == " " && show ? " space-box " : " d-none ";
    classes += char != " " && show ? " char-box " : " d-none ";
    classes += !isError && wasCorrect ? " correct-border " : "";
    classes += isError ? " wrong-border " : "";
    classes += isCurrent ? " current-box " : "";
    if (show == true) classes = classes.replaceAll("d-none", "");
    return classes;
  }
  function formatChar() {
    if (show && char == " ") return "Space";
    else if (show) return char;
    return "";
  }
  // console.log(isError);
  return <span className={addClasses()}>{formatChar()}</span>;
};

export { Character };
