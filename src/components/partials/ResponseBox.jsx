const ResponseBox = ({ onChange }) => {
  return (
    <textarea
      id="response-box"
      placeholder="Start typing here.."
      spellCheck="false"
      onChange={(e, value) => onChange(e, value)}
    ></textarea>
  );
};

export { ResponseBox };
