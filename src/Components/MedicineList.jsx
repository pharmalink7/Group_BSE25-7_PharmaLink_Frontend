import React, { useState } from "react";
import "../styles/MedicineList.css";

const MedicineList = ({ medicines, onUpdate, onDelete, isOwner = false }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditForm({
      name: medicine.name,
      description: medicine.description || "",
      manufacturer: medicine.manufacturer || "",
      category: medicine.category || "other",
      quantity: medicine.quantity || 0,
      price: medicine.price || 0,
      expiry_date: medicine.expiry_date || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id) => {
    try {
      await onUpdate(id, editForm);
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const formatPrice = (p) => {
    const num = Number(p) || 0;
    return new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX" }).format(num);
  };

  const formatDate = (d) => (!d ? "N/A" : new Date(d).toLocaleDateString());

  // const getCategoryColor = (category) => {
  //   const colors = {
  //     "pain-relief": "#FF6B6B",
  //     antibiotics: "#4ECDC4",
  //     vitamins: "#45B7D1",
  //     "cold-flu": "#96CEB4",
  //     digestive: "#FFEAA7",
  //     heart: "#DDA0DD",
  //     diabetes: "#98D8C8",
  //     other: "#F7B731",
  //   };
  //   return colors[category] || "#95A5A6";
  // };

  if (medicines.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">💊</div>
        <h3>No Medicines Found</h3>
        <p>{isOwner ? "Start by adding your first medicine!" : "No medicines available currently."}</p>
      </div>
    );
  }

  return (
    <div className="medicine-list">
      {medicines.map((medicine) => (
        <div key={medicine.id} className="medicine-card">
          {editingId === medicine.id ? (
            <div className="edit-form">
              <div className="form-grid">
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  placeholder="Medicine Name"
                />
                <input
                  name="manufacturer"
                  value={editForm.manufacturer}
                  onChange={handleInputChange}
                  placeholder="Manufacturer"
                />
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleInputChange}
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
              </div>

              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows="3"
              />

              <div className="form-grid">
                <input
                  type="number"
                  name="quantity"
                  value={editForm.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                />
                <input
                  type="date"
                  name="expiry_date"
                  value={editForm.expiry_date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button onClick={() => handleSaveEdit(medicine.id)} className="btn save">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="btn cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="card-header">
                <div>
                  <h3>{medicine.name}</h3>
                  <span className="manufacturer">{medicine.manufacturer}</span>
                </div>
                
              </div>

              <p className="description">{medicine.description}</p>

              <div className="card-details">
                <div><strong>💰 Price:</strong> {formatPrice(medicine.price)}</div>
                <div><strong>📦 Stock:</strong> {medicine.quantity} units</div>
                <div><strong>⏰ Expiry:</strong> {formatDate(medicine.expiry_date)}</div>
              </div>

              {medicine.prescription_required && (
                <div className="prescription-tag"> Prescription Required</div>
              )}

              {isOwner && (
                <div className="actions">
                  <button onClick={() => handleEdit(medicine)} className="btn edit">
                     Edit
                  </button>
                  <button onClick={() => onDelete(medicine.id)} className="btn delete">
                     Delete
                  </button>
                </div>
              )}

              {!isOwner && medicine.pharmacy_name && (
                <div className="pharmacy">
                  <span>{medicine.pharmacy_name}</span>
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
