// src/pages/MedicinesPage.jsx
import React, { useState, useEffect } from "react";
import { getAllMedicines, getAllPharmacies } from "../services/apiService";
import MedicineList from "../Components/MedicineList";
import MedicineSearch from "../Components/MedicineSearch";
import "../styles/MedicinesPage.css";
import { BackButton } from "../Components/Navbar";

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [medicinesData, pharmaciesData] = await Promise.all([
        getAllMedicines(),
        getAllPharmacies(),
      ]);

      setMedicines(medicinesData.results || medicinesData || []);
      setPharmacies(pharmaciesData.results || pharmaciesData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setSearchQuery(query);
      const data = await getAllMedicines(query);
      setMedicines(data.results || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    const filtered = medicines.filter(
      (medicine) => category === "" || medicine.category === category
    );
    setMedicines(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    fetchData();
  };

  if (loading && medicines.length === 0) {
    return (
      <div className="medicines-page">
        <div className="loading">Loading medicines...</div>
      </div>
    );
  }

  return (
    <div className="medicines-page">
      <div className="page-header">
        <BackButton />
        <h1>Browse Medicines</h1>
        <p>Find medicines available at pharmacies near you</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <MedicineSearch
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        categoryFilter={categoryFilter}
        onClearFilters={clearFilters}
        searchQuery={searchQuery}
      />

      <div className="results-section">
        <div className="results-header">
          <h2>
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "All Medicines"}
            {categoryFilter && ` in ${categoryFilter.replace("-", " ")}`}
          </h2>
          <span className="results-count">
            {medicines.length} medicine{medicines.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {loading ? (
          <div className="loading">Searching...</div>
        ) : (
          <MedicineList medicines={medicines} isOwner={false} />
        )}
      </div>

      {pharmacies.length > 0 && (
        <div className="pharmacies-section">
          <h2>Available Pharmacies</h2>
          <ul>
            {pharmacies.map((pharma, idx) => (
              <li key={idx}>{pharma.name || pharma}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicinesPage;
