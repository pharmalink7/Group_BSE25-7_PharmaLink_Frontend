import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Homepage.css";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="pharmalink-root">
      {/* Global Navbar renders from App.jsx. Removed page-specific navbar to avoid duplicates. */}

      {/* Hero section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Welcome to <span className="brand">PharmaLink</span>
          </h1>
          <p>
            The smart way to connect pharmacies and people.<br />
            <span className="hero-slogan">
              
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
                {/* <Link to="/register" className="btn btn-filled">Get Started</Link> */}
                <Link to="/login" className="btn btn-filled">Login</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="/hero.jpeg"
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3c8dbc" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        </svg>
      </span>
      <h3>Compare Medicine Prices</h3>
      <p>Compare prices and pick what suits you best.</p>
    </div>

    <div className="feature-card">
      <span className="feature-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#3c8dbc">
          <circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      <h3>Instant Connections</h3>
      <p>Reach pharmacies and customers instantly with live updates.</p>
    </div>

    <div className="feature-card">
      <span className="feature-icon">
        <svg width="28" height="28" viewBox="0 0 24 24">
          <rect x="5" y="5" width="14" height="14" rx="7" fill="#31c48d"/><path d="M9 12h6" stroke="#fff" strokeWidth="2"/>
        </svg>
      </span>
      <h3>Easy Management</h3>
      <p>Manage inventory, orders, and prescriptions in one dashboard.</p>
    </div>

    <div className="feature-card">
      <span className="feature-icon">
        <svg width="28" height="28" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="5" fill="#3c8dbc"/><path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2"/>
        </svg>
      </span>
      <h3>24/7 Support</h3>
      <p>We’re here for you anytime, day or night.</p>
    </div>

  </div>
</section>


      {/* CTA */}
      <section className="cta-section">
        <h2>Connect your pharmacy to the world.</h2>
        <p>PharmaLink empowers pharmacies and people. Join us today.</p>
        <Link to="/login" className="btn btn-filled">Log In to Explore</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-section brand">
      <h3>PharmaLink</h3>
      <p>Connecting patients with trusted pharmacies and medicines.</p>
    </div>

    <div className="footer-section links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div className="footer-section contact">
      <h4>Contact</h4>
      <p>Email: support@pharmalink.com</p>
      <p>Phone: +256 700 123 456</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} PharmaLink. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
}