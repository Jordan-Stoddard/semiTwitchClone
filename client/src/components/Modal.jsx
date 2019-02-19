import React from "react";
import ReactDOM from "react-dom";


const Modal = props => {
  // Helper functions
function stopPropagation(e) {
  e.stopPropagation()
}

// Return Statement
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
      <div onClick={stopPropagation} className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector("#modalRoot")
  );
};

export default Modal;

