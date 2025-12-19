const { validateEstimateInput } = require("../services/validationService");
const { calculateEstimate } = require("../services/estimationService");

/**
 * Controller for handling the /api/estimate request.
 * - Validates input
 * - Calls the estimation service
 * - Sends a clean JSON response
 */
function handleEstimate(req, res) {
  const { area, constructionType, rooms } = req.body || {};

  const validationErrors = validateEstimateInput({ area, constructionType, rooms });

  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: "Invalid input",
      errors: validationErrors,
    });
  }

  const estimateResult = calculateEstimate({ area, constructionType, rooms });

  return res.json(estimateResult);
}

module.exports = {
  handleEstimate,
};


