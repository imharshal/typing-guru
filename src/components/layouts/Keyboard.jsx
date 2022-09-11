import.meta.hot;

import { useEffect, useState } from "react";
import {
  Key,
  KeyBroad,
  KeyBroader,
  KeyBroadest,
  KeySpaceBar,
} from "../partials/Keys";
const shiftRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}"];
const shiftRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"'];
const shiftRow3 = ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"];
const COLORS = {
  ll: "blue",
  lr: "skyblue",
  lm: "green",
  lf: "orange",
  rf: "yellow",
  rm: "green",
  rr: "skyblue",
  rl: "blue",
};
const KEYS = [
  [
    { base: "`", shift: "~", finger: "ll" },
    { base: "1", shift: "!", finger: "ll" },
    { base: "2", shift: "@", finger: "lr" },
    { base: "3", shift: "#", finger: "lm" },
    { base: "4", shift: "$", finger: "lf" },
    { base: "5", shift: "%", finger: "lf" },
    { base: "6", shift: "^", finger: "rf" },
    { base: "7", shift: "&", finger: "rf" },
    { base: "8", shift: "*", finger: "rm" },
    { base: "9", shift: "(", finger: "rr" },
    { base: "0", shift: ")", finger: "rl" },
    { base: "-", shift: "_", finger: "rl" },
    { base: "=", shift: "+", finger: "rl" },
    {
      base: "Backspace⌫",
      shift: "Backspace &larr;",
      finger: "rl",
      type: "special",
    },
  ],
  [
    { base: "tab ↹", shift: "tab ↹", finger: "ll", type: "special" },
    { base: "q", shift: "Q", finger: "ll" },
    { base: "w", shift: "W", finger: "lr" },
    { base: "e", shift: "E", finger: "lm" },
    { base: "r", shift: "R", finger: "lf" },
    { base: "t", shift: "T", finger: "lf" },
    { base: "y", shift: "Y", finger: "rf" },
    { base: "u", shift: "U", finger: "rf" },
    { base: "i", shift: "I", finger: "rm" },
    { base: "o", shift: "O", finger: "rr" },
    { base: "p", shift: "P", finger: "rl" },
    { base: "[", shift: "{", finger: "rl" },
    { base: "]", shift: "}", finger: "rl" },
    { base: "\\", shift: "|", finger: "rl", type: "special" },
  ],
  [
    { base: "Caps Lock ⇪", shift: "Enter", finger: "rl", type: "special" },
    { base: "a", shift: "A", finger: "ll" },
    { base: "s", shift: "S", finger: "lr" },
    { base: "d", shift: "D", finger: "lm" },
    { base: "f", shift: "F", finger: "lf" },
    { base: "g", shift: "G", finger: "lf" },
    { base: "h", shift: "H", finger: "rf" },
    { base: "j", shift: "J", finger: "rf" },
    { base: "k", shift: "K", finger: "rm" },
    { base: "l", shift: "L", finger: "rr" },
    { base: ";", shift: ":", finger: "rl" },
    { base: "'", shift: '"', finger: "rl" },
    { base: "Enter", shift: "Enter", finger: "rl", type: "special" },
  ],
  [
    { base: "Shift ⇧", code: "ShiftLeft", finger: "ll", type: "special" },
    { base: "z", shift: "Z", finger: "ll" },
    { base: "x", shift: "X", finger: "lr" },
    { base: "c", shift: "C", finger: "lm" },
    { base: "v", shift: "V", finger: "lf" },
    { base: "b", shift: "B", finger: "lf" },
    { base: "n", shift: "N", finger: "rf" },
    { base: "m", shift: "M", finger: "rf" },
    { base: ",", shift: "<", finger: "rm" },
    { base: ".", shift: ">", finger: "rr" },
    { base: "/", shift: "?", finger: "rl" },
    { base: "Shift ⇧", code: "ShiftRight", finger: "rl", type: "special" },
  ],
  [
    { base: "Ctrl", shift: "Ctrl", type: "special" },
    { base: "Win", shift: "Win", type: "special" },
    { base: "Alt", shift: "Alt", type: "special" },
    { base: " ", shift: "", type: "spacebar" },
    { base: "Alt", shift: "Alt", type: "special" },
    { base: "Ctrl", shift: "Ctrl", type: "special" },
    // { base: "☰", shift: "☰", type: "special" },
    // { base: "Arrow", shift: "Arrow", type: "special" },
  ],
];

let handleHighlight = () => {};
const KeyboardLayout = ({ keyPressed, hintKey }) => {
  return (
    <div className="keyboard">
      <div className="row">
        {KEYS[0].map((info, k) =>
          info.type == "special" ? (
            <KeyBroader
              key={k}
              info={info}
              keyPressed={keyPressed}
            ></KeyBroader>
          ) : (
            <Key
              key={k}
              info={info}
              hint={hintKey}
              keyPressed={keyPressed}
            ></Key>
          )
        )}
      </div>
      <div className="row">
        {KEYS[1].map((info, k) =>
          info.type == "special" ? (
            <KeyBroad
              key={k}
              info={info}
              hint={hintKey}
              keyPressed={keyPressed}
            ></KeyBroad>
          ) : (
            <Key
              key={k}
              info={info}
              hint={hintKey}
              keyPressed={keyPressed}
            ></Key>
          )
        )}
      </div>
      <div className="row">
        {KEYS[2].map((info, k) =>
          info.type == "special" ? (
            <KeyBroader
              key={k}
              info={info}
              keyPressed={keyPressed}
            ></KeyBroader>
          ) : (
            <Key
              key={k}
              info={info}
              hint={hintKey}
              keyPressed={keyPressed}
            ></Key>
          )
        )}
      </div>
      <div className="row">
        {KEYS[3].map((info, k) =>
          info.type == "special" ? (
            <KeyBroadest
              key={k}
              info={info}
              keyPressed={keyPressed}
              hint={hintKey}
            ></KeyBroadest>
          ) : (
            <Key
              key={k}
              info={info}
              keyPressed={keyPressed}
              hint={hintKey}
            ></Key>
          )
        )}
      </div>
      <div className="row">
        {KEYS[4].map((info, k) =>
          info.type == "spacebar" ? (
            <KeySpaceBar
              key={k}
              info={info}
              hint={hintKey}
              keyPressed={keyPressed}
            ></KeySpaceBar>
          ) : (
            <KeyBroad key={k} info={info}></KeyBroad>
          )
        )}
      </div>
    </div>
  );
};

export default KeyboardLayout;
