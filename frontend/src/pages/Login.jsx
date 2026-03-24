import { useState } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Login({ onAuthSuccess, isLoggedIn }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/cart" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const endpoint =
        mode === "login"
          ? `${API_BASE_URL}/api/users/login`
          : `${API_BASE_URL}/api/users/register`;

      const payload =
        mode === "login"
          ? { email, password }
          : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Something went wrong");
        setMessageType("error");
        return;
      }

      if (mode === "register") {
        setMessage("Registration successful. Please login.");
        setMessageType("success");
        setMode("login");
        setName("");
        setPassword("");
        return;
      }

      onAuthSuccess(data);
      setMessage("Login successful");
      setMessageType("success");
    } catch (error) {
      setMessage("Unable to connect to server");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-side">
          <p>VibeVault Access</p>
          <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <span>
            {mode === "login"
              ? "Login to manage your cart and continue shopping with the same theme and experience."
              : "Register to save your details and access protected store features."}
          </span>
          <div className="auth-points">
            <div>Secure login flow</div>
            <div>Protected cart access</div>
            <div>Simple shopping experience</div>
          </div>
        </div>

        <div className="auth-box">
          <div className="auth-switch">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setMessage("");
                setMessageType("");
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                setMode("register");
                setMessage("");
                setMessageType("");
              }}
            >
              Register
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label>
                Full Name
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            ) : null}

            <label>
              Email
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {message ? (
              <p className={`auth-message ${messageType}`}>{message}</p>
            ) : null}

            <button type="submit" className="auth-submit">
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
