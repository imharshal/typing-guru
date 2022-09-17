import KEYS from "../../services/KeysInfo.js";

import {
  Key,
  KeyBroad,
  KeyBroader,
  KeyBroadest,
  KeySpaceBar,
} from "../partials/Keys";

const KeyboardLayout = ({ keyPressed, hintKey }) => {
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
};

export default KeyboardLayout;
