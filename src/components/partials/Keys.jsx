import React, { useEffect, useRef } from "react";
// #B9AA87
function addActiveClass(base, key) {
  // console.log(key);

  return key && base === key.key ? "key-pressed" : "";
}
function addActiveSpecialClass(base, key) {
  return key && key.key.includes(base.substring(0, 4)) ? "key-pressed" : "";
}
function addHintKeyClass(info, hint, keyPressed) {
  // return hint.shift && info.code && keyPressed.code == info.code
  //   ? "hint-key"
  //   : "";
  if (hint.hint && hint.hint == info.base) return "hint-key";
  return hint.hint && info.base == hint.hint.toLowerCase() ? "hint-key" : "";
}

function addShiftKeyHintClass(info, hint, keyPressed) {
  const ShiftRight = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "A",
    "S",
    "D",
    "F",
    "G",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "!",
    "@",
    "$",
    "%",
  ];
  const ShiftLeft = [
    "Y",
    "U",
    "I",
    "O",
    "P",
    "{",
    "}",
    "|",
    "H",
    "J",
    "K",
    "L",
    ":",
    '"',
    "N",
    "M",
    "<",
    ">",
    "?",
  ];
  if (hint.hint && ShiftRight.includes(hint.hint) && info.code == "ShiftRight")
    return "hint-key";
  if (hint.hint && ShiftLeft.includes(hint.hint) && info.code == "ShiftLeft")
    return "hint-key";
  return "";
}

const Key = React.memo(
  ({ info, keyPressed, hint, isHint, wasPressed }) => {
    console.log("from key component", keyPressed);
    const { base, shift, finger } = info;
    return (
      <span
        className={`key key-square ${finger} 
        ${isHint ? "hint-key" : ""} 
       
       `}
      >
        {base}
      </span>
    );
  },
  (prevProp, nextProp) => {
    if (
      prevProp.info.base === nextProp.isHint ||
      prevProp.wasPressed === nextProp.wasPressed
    )
      return true;
  }
);

const KeyBroad = React.memo(({ info, keyPressed, hint }) => {
  const { base, shift, finger, type } = info;
  return (
    <span
      className={`key key-broad ${
        base.length < 2 ? "backslash-key" : "key-special"
      } ${finger} ${addActiveClass(base, keyPressed)}`}
    >
      {base}
    </span>
  );
});

const KeyBroader = React.memo(({ info, keyPressed, hint }) => {
  const { base, shift, finger, special } = info;
  return (
    <span
      className={`key key-broader key-special ${finger} 
      ${addActiveSpecialClass(base, keyPressed)}`}
    >
      {base}
    </span>
  );
});

const KeyBroadest = React.memo(({ info, keyPressed, hint }) => {
  const ref = useRef(null);

  const { base, shift, finger, special } = info;
  return (
    <span
      id={info.code}
      ref={ref}
      className={`key key-broadest ${finger} key-special 
      ${addActiveSpecialClass(base, keyPressed, finger)}
      ${addShiftKeyHintClass(info, hint, keyPressed)}`}
    >
      {base}
    </span>
  );
});

const KeySpaceBar = React.memo(({ info, keyPressed, hint }) => {
  const { base, shift, finger } = info;
  return (
    <span
      className={`key key-spacebar
    ${addActiveClass(base, keyPressed)} ${addHintKeyClass(info, hint)}`}
    >
      Spacebar
    </span>
  );
});

export { Key, KeyBroad, KeyBroader, KeyBroadest, KeySpaceBar };
