import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f8fafc",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          margin: 0,
          color: "#2563eb",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/dashboard"
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        Back To Dashboard
      </Link>
    </div>
  );
}

export default NotFound;