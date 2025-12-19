import React, { useState } from "react";
import EstimationForm from "./components/EstimationForm";
import EstimateResult from "./components/EstimateResult";
import HelpChat from "./components/HelpChat";
import DesignIdeas from "./components/DesignIdeas";

function App() {
  const [estimateResponse, setEstimateResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Construction Estimation MVP</h1>
        <p className="subtitle">
          Simple estimation tool for residential and commercial projects.
        </p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>Estimator</h2>
          <EstimationForm
            onSuccess={(data) => {
              setEstimateResponse(data);
              setErrorMessage("");
            }}
            onError={(msg) => {
              setEstimateResponse(null);
              setErrorMessage(msg);
            }}
          />
          {errorMessage && (
            <p className="error-text" aria-live="polite">
              {errorMessage}
            </p>
          )}
          {estimateResponse && <EstimateResult data={estimateResponse} />}
        </section>

        <section className="side-panel">
          <div className="card">
            <h2>Help / FAQ</h2>
            <HelpChat />
          </div>
          <div className="card">
            <h2>Design Ideas</h2>
            <DesignIdeas />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built as a clear, interview-safe MVP using React and Express.</p>
      </footer>
    </div>
  );
}

export default App;


