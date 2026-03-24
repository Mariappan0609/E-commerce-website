import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Collections from "./pages/Collections";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuthSuccess = ({ token: nextToken, user }) => {
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(nextToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <nav className="main-nav">
        <div className="main-nav__brand">
          <img src="Images/logo-image 01.png" alt="logo" />
          <h1>VIBEVAULT</h1>
        </div>

        <button
          type="button"
          className="nav-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`main-nav__links ${menuOpen ? "main-nav__links--open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/collections" onClick={closeMenu}>Collection</Link>
          <Link to="/cart" onClick={closeMenu}>Cart</Link>
          {!token ? (
            <Link to="/login" onClick={closeMenu}>Login</Link>
          ) : (
            <button type="button" className="nav-logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login onAuthSuccess={handleAuthSuccess} isLoggedIn={Boolean(token)} />}
        />
      </Routes>
    </div>
  );
}

export default App;
