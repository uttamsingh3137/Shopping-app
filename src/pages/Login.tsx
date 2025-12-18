import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   ************************************************
  const location = useLocation();
  const from = (location.state as any)?.from || "/";

  const handleLogin = async () => {
    const success = await login(email, password);
    if (!success) {
      setError("Invalid credentials");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Don&apos;t have an account?{" "}
        <Link to="/signup" style={{ color: "#2563eb", fontWeight: 500 }}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
