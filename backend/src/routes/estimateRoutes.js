const express = require("express");
const { handleEstimate } = require("../controllers/estimateController");

const router = express.Router();

// POST /api/estimate
router.post("/", handleEstimate);

module.exports = router;


