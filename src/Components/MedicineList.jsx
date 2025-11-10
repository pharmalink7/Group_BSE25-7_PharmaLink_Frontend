import React, { useState } from 'react';
import '../styles/MedicineList.css';

const MedicineList = ({ medicines, onUpdate, onDelete, isOwner = false }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditForm({
      name: medicine.name,
      description: medicine.description || '',
      price: medicine.price,
      expiry_date: medicine.expiry_date || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (medicineId) => {
    try {
      await onUpdate(medicineId, editForm);
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatPrice = (price) => {
    const numeric = Number(price) || 0;
    return new Intl.NumberFormat('UGX', {
      style: 'currency',
      currency: 'UGX'
    }).format(numeric);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'pain-relief': '#ff6b6b',
      'antibiotics': '#4ecdc4',
      'vitamins': '#45b7d1',
      'cold-flu': '#96ceb4',
      'digestive': '#ffeaa7',
      'heart': '#dda0dd',
      'diabetes': '#98d8c8',
      'other': '#f7b731'
    };
    if (!category) return '#95a5a6';
    return colors[category] || '#95a5a6';
  };

  if (medicines.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">💊</div>
        <h3>No medicines found</h3>
        <p>{isOwner ? 'Start by adding your first medicine!' : 'No medicines available at the moment.'}</p>
      </div>
    );
  }

  return (
    <div className="medicine-list">
      {medicines.map((medicine) => (
        <div key={medicine.id} className="medicine-card">
          {editingId === medicine.id ? (
            <div className="edit-form">
              <div className="edit-form-row">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Medicine name"
                />
                <input
                  type="text"
                  name="manufacturer"
                  value={editForm.manufacturer}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Manufacturer"
                />
              </div>
              
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                className="edit-textarea"
                placeholder="Description"
                rows="2"
              />
              
              <div className="edit-form-row">
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleInputChange}
                  className="edit-select"
                >
                  <option value="pain-relief">Pain Relief</option>
                  <option value="antibiotics">Antibiotics</option>
                  <option value="vitamins">Vitamins</option>
                  <option value="cold-flu">Cold & Flu</option>
                  <option value="digestive">Digestive Health</option>
                  <option value="heart">Heart Health</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="other">Other</option>
                </select>
                
                <input
                  type="number"
                  name="quantity"
                  value={editForm.quantity}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Quantity"
                  min="0"
                />
                
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="edit-form-actions">
                <button 
                  onClick={() => handleSaveEdit(medicine.id)}
                  className="btn btn-success btn-sm"
                >
                  Save
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="medicine-header">
                <div className="medicine-info">
                  <h3 className="medicine-name">{medicine.name}</h3>
                  <p className="medicine-manufacturer">{medicine.manufacturer}</p>
                  {medicine.description && (
                    <p className="medicine-description">{medicine.description}</p>
                  )}
                </div>
                <div className="medicine-badge" style={{ backgroundColor: getCategoryColor(medicine.category) }}>
                  {(medicine.category || 'other').replace('-', ' ').toUpperCase()}
                </div>
              </div>

              <div className="medicine-details">
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value price">{formatPrice(medicine.price)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Stock:</span>
                  <span className={`detail-value stock ${medicine.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {medicine.quantity} units
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Expiry:</span>
                  <span className="detail-value">{formatDate(medicine.expiry_date)}</span>
                </div>
                {medicine.prescription_required && (
                  <div className="detail-item">
                    <span className="prescription-badge">📋 Prescription Required</span>
                  </div>
                )}
              </div>

              {isOwner && (
                <div className="medicine-actions">
                  <button 
                    onClick={() => handleEdit(medicine)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(medicine.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              )}

              {!isOwner && medicine.pharmacy_name && (
                <div className="pharmacy-info">
                  <span className="pharmacy-label">Available at:</span>
                  <span className="pharmacy-name">{medicine.pharmacy_name}</span>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MedicineList;
