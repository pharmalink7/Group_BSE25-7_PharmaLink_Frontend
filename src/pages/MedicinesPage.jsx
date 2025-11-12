// src/pages/MedicinesPage.jsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getAllMedicines, getAllPharmacies,analyzeSymptoms } from "../services/apiService";
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
  const [symptoms, setSymptoms] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");


  const handleAnalyzeSymptoms = async () => {
  try {
    setAiLoading(true);
    setAiError("");
    const data = await analyzeSymptoms(symptoms); // call your backend AI endpoint
    setAiResult(data);
  } catch (err) {
    setAiError(err.message || "Something went wrong.");
  } finally {
    setAiLoading(false);
  }
};


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
  <div className="medicines-page-container">
    {/* AI Symptom Checker */}
    <div className="ai-chat-container">
      <h2 className="ai-chat-title">AI Symptom Checker</h2>

      <div className="chat-box">
        {aiResult && (
          <>
            <div className="chat-message user-message">{symptoms}</div>
            <div className="chat-message ai-message">
              <p className="chat-section-title">Condition:</p>
              <p>{aiResult.suggested_condition}</p>

              <p className="chat-section-title">Suggested Medicines:</p>
              <ul>
                {aiResult.suggested_medicines.map((med, i) => (
                  <li key={i}>{med}</li>
                ))}
              </ul>

              <p className="chat-section-title">Advice:</p>
              <p>{aiResult.advice}</p>
            </div>
          </>
        )}
      </div>

      <textarea
        className="chat-input"
        rows="3"
        placeholder="Describe your symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button
        onClick={handleAnalyzeSymptoms}
        className="chat-send-btn"
        disabled={aiLoading || !symptoms.trim()}
      >
        {aiLoading ? "Analyzing..." : "Send"}
      </button>

      {aiError && <p className="chat-error">{aiError}</p>}
    </div>

    {/* Medicine search */}
    <MedicineSearch
      onSearch={handleSearch}
      onCategoryFilter={handleCategoryFilter}
      categoryFilter={categoryFilter}
      onClearFilters={clearFilters}
      searchQuery={searchQuery}
    />

    {/* Medicine results */}
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

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
    </div>

    {/* Pharmacies */}
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