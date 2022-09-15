import { useEffect, useRef } from "react";
const ResponseBox = ({ onChange }) => {
  const responseBox = useRef(null);
  useEffect(() => {
    responseBox.current.focus();
  }, [focus]);
  return (
    <textarea
      ref={responseBox}
      id="response-box"
      placeholder="Start typing here.."
      spellCheck="false"
      onChange={(e, value) => onChange(e, value)}
    ></textarea>
  );
};

export { ResponseBox };
