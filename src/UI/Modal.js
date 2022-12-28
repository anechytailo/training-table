import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalCard = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalCard>{props.children}</ModalCard>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
