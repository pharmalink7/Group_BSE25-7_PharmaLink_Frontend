// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';

import ProtectedRoute from './Components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PharmacyDashboard from './pages/PharmacyDashboard';
import MedicinesPage from './pages/MedicinesPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <PharmacyDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;