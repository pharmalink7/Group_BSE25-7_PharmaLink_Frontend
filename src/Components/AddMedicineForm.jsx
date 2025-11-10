import React, { useState } from 'react';
import '../styles/MedicineForm.css';

const AddMedicineForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    pharmacy: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const submitData = {
        name: formData.name,
        description: formData.description,
        price: String(formData.price),
        pharmacy: Number(formData.pharmacy)
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }                                                                                       
  };

  return (
    <div className="medicine-form-overlay">
      <div className="medicine-form-container">
        <div className="medicine-form-header">
          <h2>Add New Medicine</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="medicine-form">
          <div className="form-group">
            <label htmlFor="name">Medicine Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Ibuprofen 200mg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the medicine..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>
            
            {/* <div className="form-group">
              <label htmlFor="pharmacy">Pharmacy Address *</label>
              <input
                type="text"
                id="pharmacy"
                name="pharmacy"
                value={formData.pharmacy}
                onChange={handleChange}
                required
                placeholder=" e.g Kampala"
              />
            </div> */}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineForm;
