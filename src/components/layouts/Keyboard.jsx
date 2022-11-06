import KEYS from "../../services/KeysInfo.js";

import {
  Key,
  KeyBroad,
  KeyBroader,
  KeyBroadest,
  KeySpaceBar,
} from "../partials/Keys";
import React from "react";
import { useMemo } from "react";
const KeyboardLayout = React.memo(
  ({ keyPressed, hintKey }) => {
    // console.log("from keyboard component ", keyPressed, "hintKey", hintKey);

    function addActiveClass(base) {
      // console.log(key);
      return base === hintKey.hint ? true : false;
    }
    function addKeyPressedClass(base) {
      // console.log(key);
      return base === keyPressed.key ? true : false;
    }
    return (
      <div id="keyboard">
        <div className="key-row">
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
                isHint={addActiveClass(info.base)}
                wasPressed={addKeyPressedClass(info.base)}
              ></Key>
            )
          )}
        </div>
        <div className="key-row">
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
                isHint={addActiveClass(info.base)}
                wasPressed={addKeyPressedClass(info.base)}
              ></Key>
            )
          )}
        </div>
        <div className="key-row">
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
                isHint={addActiveClass(info.base)}
                wasPressed={addKeyPressedClass(info.base)}
              ></Key>
            )
          )}
        </div>
        <div className="key-row">
          {KEYS[3].map((info, k) =>
            info.type == "special" ? (
              <KeyBroadest
                key={k}
                info={info}
                keyPressed={keyPressed}
                hint={hintKey}
                wasPressed={addKeyPressedClass(info.base)}
              ></KeyBroadest>
            ) : (
              <Key
                key={k}
                info={info}
                keyPressed={keyPressed}
                hint={hintKey}
                isHint={addActiveClass(info.base)}
                wasPressed={addKeyPressedClass(info.base)}
              ></Key>
            )
          )}
        </div>
        <div className="key-row">
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
  },
  (prevProps, nextProp) => {
    if (
      prevProps.keyPressed.key === nextProp.keyPressed.key ||
      prevProps.hintKey.hint === nextProp.hintKey.hint
    )
      return true;
    else return false;
  }
);

export default KeyboardLayout;
