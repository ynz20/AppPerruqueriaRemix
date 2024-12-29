import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <dialog
        className="w-full max-w-md rounded-lg shadow-lg"
        open
        onClick={(event) => event.stopPropagation()} // Per evitar tancar quan es fa clic al modal mateix
      >
        {children}
      </dialog>
    </div>
  );
};

export default Modal;
