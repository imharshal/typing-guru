import KEYS, { ShiftLeft, ShiftRight } from "../../services/KeysInfo";
import leftHandImage from "../../assets/left-hand.png";
import rightHandImage from "../../assets/right-hand.png";
const ALLKEYS = [...KEYS[0], ...KEYS[1], ...KEYS[2], ...KEYS[3], ...KEYS[4]];
const highlightLeftFinger = (k) => {
  if (k && k.hint) {
    let name = " finger-";
    const keyIndex = ALLKEYS.findIndex(
      (key) => key.base === k.hint.toLowerCase()
    );
    if (keyIndex != -1) {
      const { finger, base } = ALLKEYS[keyIndex];
      if (ShiftLeft.has(k.hint)) name += "ll";
      else if (k.hint.toLowerCase() === base && finger.indexOf("l") === 0)
        name += finger;
    }
    return name + " ";
  }
};
const highlightRightFinger = (k) => {
  if (k && k.hint) {
    let name = " finger-";
    const keyIndex = ALLKEYS.findIndex(
      (key) => key.base === k.hint.toLowerCase()
    );
    if (keyIndex != -1) {
      const { finger, base } = ALLKEYS[keyIndex];
      if (ShiftRight.has(k.hint)) name += "rl";
      else if (k.hint.toLowerCase() === base && finger.indexOf("r") === 0)
        name += finger;
    }
    return name + " ";
  }
};
const LeftHand = ({ hintKey }) => {
  return (
    <div className="hand-box">
      <img
        className={`hand-image ${highlightLeftFinger(hintKey)}`}
        src={leftHandImage}
        alt="left-hand-image"
      />
    </div>
  );
};
const RightHand = ({ hintKey }) => {
  return (
    <div className="hand-box">
      <img
        className={`hand-image ${highlightRightFinger(hintKey)}`}
        src={rightHandImage}
        alt="right-hand-image"
      />
    </div>
  );
};

export { LeftHand, RightHand };
