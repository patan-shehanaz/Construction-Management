/**
 * Validates input for the estimation endpoint.
 * Returns an array of error messages. If empty, the input is valid.
 * Time complexity: O(1) because we perform a constant number of checks.
 */
function validateEstimateInput({ area, constructionType, rooms }) {
  const errors = [];

  if (area === undefined || area === null || isNaN(Number(area))) {
    errors.push("Area must be a number.");
  } else if (Number(area) <= 0) {
    errors.push("Area must be greater than 0.");
  }

  if (!constructionType || typeof constructionType !== "string") {
    errors.push("Construction type is required.");
  } else if (!["residential", "commercial"].includes(constructionType)) {
    errors.push("Construction type must be 'residential' or 'commercial'.");
  }

  if (rooms === undefined || rooms === null || isNaN(Number(rooms))) {
    errors.push("Number of rooms must be a number.");
  } else if (!Number.isInteger(Number(rooms)) || Number(rooms) <= 0) {
    errors.push("Number of rooms must be a positive integer.");
  }

  return errors;
}

module.exports = {
  validateEstimateInput,
};


