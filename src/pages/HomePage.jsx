import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Homepage.css";

export default function HomePage() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="pharmalink-root">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="https://img.icons8.com/color/48/000000/pharmacy-shop.png" alt="PharmaLink Logo" />
          <span>PharmaLink</span>
        </div>
        <ul className="navbar-features">
          <li><Link to="/medicines">Browse Medicines</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li>
                <span className="user-welcome">Welcome, {user?.username}</span>
              </li>
              <li>
                <button onClick={logout} className="logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/support">Support</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Hero section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Welcome to <span className="brand">PharmaLink</span>
          </h1>
          <p>
            The smart way to connect pharmacies and people.<br />
            <span className="hero-slogan">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ verticalAlign: "middle", marginRight: 6 }}>
                <circle cx="12" cy="12" r="10" stroke="#31c48d" strokeWidth="2" />
                <path d="M8 12h8M12 8v8" stroke="#3c8dbc" strokeWidth="2" />
              </svg>
              Your pharmacy network, reimagined.
            </span>
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-filled">Go to Dashboard</Link>
                <Link to="/medicines" className="btn btn-outline">Browse Medicines</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-filled">Get Started</Link>
                <Link to="/login" className="btn btn-outline">Login</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="/edagala.jpg"
            alt="Connecting pharmacies and people"
            className="hero-image"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Why Choose PharmaLink?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="11" rx="3" fill="#31c48d" /><path d="M7 7V5.5A4.5 4.5 0 0 1 16 5.5V7" stroke="#3c8dbc" strokeWidth="2" /></svg>
            </span>
            <h3>Secure & Private</h3>
            <p>End-to-end encryption keeps your data safe and confidential.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#3c8dbc" /><path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
            </span>
            <h3>Instant Connections</h3>
            <p>Reach pharmacies and customers instantly with live updates.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="7" fill="#31c48d" /><path d="M9 12h6" stroke="#fff" strokeWidth="2" /></svg>
            </span>
            <h3>Easy Management</h3>
            <p>Manage inventory, orders, and prescriptions in one simple dashboard.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5" fill="#3c8dbc" /><path d="M12 8v8" stroke="#fff" strokeWidth="2" /><path d="M8 12h8" stroke="#fff" strokeWidth="2" /></svg>
            </span>
            <h3>24/7 Support</h3>
            <p>We’re here for you, any time of day.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Connect your pharmacy to the world.</h2>
        <p>PharmaLink empowers pharmacies and people. Join us today.</p>
        <Link to="/register" className="btn btn-filled">Create Account</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <img src="https://img.icons8.com/color/48/000000/pharmacy-shop.png" alt="PharmaLink" />
          <span>PharmaLink © 2025</span>
        </div>
        <div className="footer-info">
          <div>
            <strong>Contact Us:</strong> support@pharmalink.com | +123-456-7890
          </div>
          <div>
            <strong>Location:</strong> Kigali, Rwanda &bull; Open 24/7
          </div>
          <div>
            <strong>Follow Us:</strong>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}