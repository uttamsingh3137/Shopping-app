import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const success = await signup(name, email, password);
    if (!success) {
      setError("User already exists");
      return;
    }
    navigate("/");
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#2563eb" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
