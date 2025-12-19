const express = require("express");
const cors = require("cors");

const estimateRoutes = require("./routes/estimateRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Basic middlewares
app.use(cors());
app.use(express.json());

// Health check (useful for deployment)
app.get("/", (req, res) => {
  res.json({ message: "Construction Estimation API is running" });
});

// Main estimation route
app.use("/api/estimate", estimateRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});


