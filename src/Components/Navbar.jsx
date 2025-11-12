// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function BackButton({ className = '' }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`btn btn-secondary ${className}`}
    >
      ← Back
    </button>
  );
}

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        PharmaLink
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/medicines">Browse Medicines</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {/* <li><span className="user-welcome">Welcome, {user?.username}</span></li> */}
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            {/* <li><Link to="/register">Register</Link></li> */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;