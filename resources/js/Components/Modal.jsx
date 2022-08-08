import React from "react";

const Modal = ({ children, isOpen }) => {
  return (
    isOpen && (
      <div
        data-testid="modal"
        className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-400/50"
      >
        <div className="flex flex-col justify-center w-1/3 h-fit p-8 bg-white">
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
