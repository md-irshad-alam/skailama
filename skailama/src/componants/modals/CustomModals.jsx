import React from "react";

const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const contentStyles = {
  background: "#fff",
  borderRadius: "8px",
  padding: "24px",
  minWidth: "320px",
  maxWidth: "90vw",
  maxHeight: "90vh",
  boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
  overflowY: "auto",
};

const CustomModal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div style={modalStyles} onClick={handleBackdropClick}>
      <div style={contentStyles}>{children}</div>
    </div>
  );
};

export default CustomModal;
