function Modal({
  children,
  onClose,
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(15,23,42,.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "20px",
          padding: "28px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,.2)",
          animation:
            "modalShow .25s ease",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            border: "none",
            borderRadius: "50%",
            background: "#f3f4f6",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;