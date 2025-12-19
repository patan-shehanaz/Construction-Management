import React, { useState } from "react";
import { fetchEstimate } from "../api/estimateApi";

function EstimationForm({ onSuccess, onError }) {
  const [area, setArea] = useState("");
  const [constructionType, setConstructionType] = useState("residential");
  const [rooms, setRooms] = useState("3");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await fetchEstimate({
        area: Number(area),
        constructionType,
        rooms: Number(rooms),
      });
      onSuccess(result);
    } catch (error) {
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="area">Area (m²)</label>
        <input
          id="area"
          type="number"
          min="1"
          step="1"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="constructionType">Construction Type</label>
        <select
          id="constructionType"
          value={constructionType}
          onChange={(e) => setConstructionType(e.target.value)}
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="rooms">Number of rooms</label>
        <input
          id="rooms"
          type="number"
          min="1"
          step="1"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          required
        />
      </div>

      <button className="primary-button" type="submit" disabled={isLoading}>
        {isLoading ? "Calculating..." : "Get Estimate"}
      </button>
    </form>
  );
}

export default EstimationForm;


