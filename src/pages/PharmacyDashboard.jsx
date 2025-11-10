import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMyMedicines, addMedicine, updateMedicine, deleteMedicine } from '../services/apiService';
import AddMedicineForm from '../Components/AddMedicineForm';
import MedicineList from '../Components/MedicineList';
import '../styles/Dashboard.css';

const PharmacyDashboard = () => {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const data = await getMyMedicines();
      const fetchedMedicines = Array.isArray(data) ? data : (data.results || data || []);
      setMedicines(fetchedMedicines);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  const handleAddMedicine = async (medicineData) => {
    try {
      await addMedicine(medicineData);
      setShowAddForm(false);
      fetchMedicines(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateMedicine = async (medicineId, medicineData) => {
    try {
      await updateMedicine(medicineId, medicineData);
      fetchMedicines(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    try {
      if (window.confirm('Are you sure you want to delete this medicine?')) {
        await deleteMedicine(medicineId);
        fetchMedicines(); // Refresh the list
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading your medicines...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome    {user?.username}  to your Dashboard</h1>
        <h2>Add your medicines below</h2>
        {/* <p><strong>Pharmacy Owner:</strong> { user.name }!</p> */}
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New Medicine
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {showAddForm && (
        <AddMedicineForm
          onSubmit={handleAddMedicine}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="dashboard-content">
        <h2>Your Medicines ({medicines.length})</h2>
        <MedicineList
          medicines={medicines}
          onUpdate={handleUpdateMedicine}
          onDelete={handleDeleteMedicine}
          isOwner={true}
        />
      </div>
    </div>
  );
};

export default PharmacyDashboard;
