import React, { useState } from "react";
import DiscoveryForm from "./components/DiscoveryForm";
import ComparisonPage from "./components/ComparisonPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("form"); // 'form' or 'comparison'
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentPage("comparison");
  };

  const handleReset = () => {
    setFormData(null);
    setCurrentPage("form");
  };

  return (
    <div className="App">
      {currentPage === "form" ? (
        <DiscoveryForm onSubmit={handleFormSubmit} />
      ) : (
        <ComparisonPage formData={formData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
