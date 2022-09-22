const Modal = ({ message }) => {
  return (
    <div
      className="modal-confirmation"
      dangerouslySetInnerHTML={{ __html: message }}
    ></div>
  );
};

export default Modal;
