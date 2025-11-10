// src/pages/MedicinesPage.jsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getAllMedicines, getAllPharmacies } from "../services/apiService";
import MedicineList from "../Components/MedicineList";
import MedicineSearch from "../Components/MedicineSearch";
import "../styles/MedicinesPage.css";

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]); // Store all medicines for client-side filtering
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const searchTimeoutRef = useRef(null);

  
  const fetchData = useCallback(async (searchTerm = "") => {
    try {
      setLoading(true);
      // Always use public endpoint so everyone sees the full catalog
      const includeAuth = false;
      const [medicinesData, pharmaciesData] = await Promise.all([
        getAllMedicines(searchTerm, includeAuth),
        getAllPharmacies(),
      ]);

      const fetchedMedicines = medicinesData.results || medicinesData || [];
      setAllMedicines(fetchedMedicines);
      setPharmacies(pharmaciesData.results || pharmaciesData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once.

  
  useEffect(() => {
    fetchData();
    // Cleanup timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [fetchData]);

  // Apply filters whenever searchQuery, categoryFilter, or allMedicines change
  useEffect(() => {
    let filtered = [...allMedicines];

    // Apply search query filter (client-side filtering to ensure accuracy)
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((medicine) => {
        const name = (medicine.name || "").toLowerCase();
        const manufacturer = (medicine.manufacturer || "").toLowerCase();
        const description = (medicine.description || "").toLowerCase();
        
        // Check if search query matches name, manufacturer, or description
        return (
          name.includes(query) ||
          manufacturer.includes(query) ||
          description.includes(query)
        );
      });
    }

    // Apply category filter only if one is selected
    if (categoryFilter && categoryFilter !== "") {
      filtered = filtered.filter(
        (medicine) => medicine.category === categoryFilter
      );
    }

    setMedicines(filtered);
  }, [searchQuery, categoryFilter, allMedicines]);


  const handleSearch = async (query) => {
    // Clear any pending search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);

    // If query is empty, fetch all medicines immediately
    if (!trimmedQuery) {
      try {
        setLoading(true);
        // Always use public endpoint so everyone sees the full catalog
        const includeAuth = false;
        const data = await getAllMedicines("", includeAuth);
        const fetchedMedicines = data.results || data || [];
        setAllMedicines(fetchedMedicines);
      } catch (err) {
        setError(err.message);
        setAllMedicines([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Debounce the API call for non-empty queries
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        // Always use public endpoint so everyone sees the full catalog
        const includeAuth = false;
        const data = await getAllMedicines(trimmedQuery, includeAuth);
        const fetchedMedicines = data.results || data || [];
        setAllMedicines(fetchedMedicines);
      } catch (err) {
        setError(err.message);
        setAllMedicines([]); // Clear results on error
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const clearFilters = () => {
    // Clear any pending search timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setSearchQuery("");
    setCategoryFilter("");
    // Fetch all medicines without any filters
    fetchData("");
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