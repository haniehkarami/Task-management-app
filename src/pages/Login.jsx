import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const schema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
});

function Login() {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "white",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "20px",
          }}
        >
          Welcome to the Task Manager.
        </h1>
        <h2
          style={{
            fontSize: "15px",
            color: "gray",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Please enter your username
        </h2>

        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        {errors.username && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {errors.username.message}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
