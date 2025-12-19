/**
 * This file stores all the base material rates and configuration.
 * It uses simple JavaScript objects (hash maps) so lookups are O(1).
 */

// Base material usage per square meter (simple constants)
const baseBricksPerSqm = 50; // 50 bricks per m^2
const baseCementBagsPerSqm = 0.4; // 0.4 cement bags per m^2
const baseSqmPerDay = 20; // team can build 20 m^2 per day

/**
 * Configuration per construction type.
 * Each key is a construction type, acting like a hash map.
 */
const constructionTypeConfig = {
  residential: {
    brickMultiplier: 1.0,
    cementMultiplier: 1.0,
    speedMultiplier: 1.0,
  },
  commercial: {
    brickMultiplier: 1.1, // slightly more bricks for stronger structure
    cementMultiplier: 1.2, // slightly more cement
    speedMultiplier: 0.9, // slower due to complexity
  },
};

module.exports = {
  baseBricksPerSqm,
  baseCementBagsPerSqm,
  baseSqmPerDay,
  constructionTypeConfig,
};


