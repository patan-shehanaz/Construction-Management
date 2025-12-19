import React from "react";

function EstimateResult({ data }) {
  const { input, estimate, assumptions } = data;

  return (
    <div className="result">
      <h3>Estimate Summary</h3>
      <div className="result-grid">
        <div>
          <p className="label">Bricks (approx.)</p>
          <p className="value">{estimate.bricks}</p>
        </div>
        <div>
          <p className="label">Cement bags (approx.)</p>
          <p className="value">{estimate.cementBags}</p>
        </div>
        <div>
          <p className="label">Construction time (days)</p>
          <p className="value">{estimate.constructionDays}</p>
        </div>
      </div>

      <details className="details">
        <summary>Show assumptions used</summary>
        <pre className="assumptions">
{JSON.stringify({ input, assumptions }, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default EstimateResult;


