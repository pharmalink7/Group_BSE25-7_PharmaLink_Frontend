import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AuthForm.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const userData = {
        username: email.split('@')[0],
        email,
        token: response.access,
      };

      login(userData);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Section: Logo & Text */}
        <div className="auth-brand-section">
          <div className="brand-logo"></div>
          <h1 className="brand-title">PharmaLink</h1>
          <p className="brand-tagline">
            Connect. Manage. Grow your pharmacy network with ease.
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="auth-form-box">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="form-title">Sign In</h2>
            <p className="form-subtitle">
              Welcome back! Please log in to access your dashboard.
            </p>

            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17v2" />
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
