const {
  baseBricksPerSqm,
  baseCementBagsPerSqm,
  baseSqmPerDay,
  constructionTypeConfig,
} = require("../data/materialRates");

/**
 * Calculates the additional material/time factor based on rooms.
 * - We assume more rooms => more internal walls => more materials and time.
 * - For rooms <= 3, no extra factor.
 * - For each room above 3:
 *   - +2% materials
 *   - +0.5 days total time
 * Time complexity: O(1).
 */
function getRoomAdjustments(rooms) {
  const baseRooms = 3;
  if (rooms <= baseRooms) {
    return {
      roomExtraFactor: 0,
      extraDaysForRooms: 0,
    };
  }

  const extraRooms = rooms - baseRooms;
  const roomExtraFactor = extraRooms * 0.02; // 2% per extra room
  const extraDaysForRooms = extraRooms * 0.5; // 0.5 day per extra room

  return {
    roomExtraFactor,
    extraDaysForRooms,
  };
}

/**
 * Core estimation function.
 * Separates pure logic from HTTP layer for easier testing and explanation.
 */
function calculateEstimate({ area, constructionType, rooms }) {
  const numericArea = Number(area);
  const numericRooms = Number(rooms);

  const typeConfig = constructionTypeConfig[constructionType];

  const { roomExtraFactor, extraDaysForRooms } = getRoomAdjustments(numericRooms);

  // Materials
  const rawBricks =
    numericArea *
    baseBricksPerSqm *
    typeConfig.brickMultiplier *
    (1 + roomExtraFactor);
  const rawCementBags =
    numericArea *
    baseCementBagsPerSqm *
    typeConfig.cementMultiplier *
    (1 + roomExtraFactor);

  // Time (days)
  const baseDays =
    numericArea / (baseSqmPerDay * typeConfig.speedMultiplier);
  const totalDays = baseDays + extraDaysForRooms;

  // We round up bricks and cement bags because you can't buy fractions.
  const bricks = Math.ceil(rawBricks);
  const cementBags = Math.ceil(rawCementBags);
  const constructionDays = Number(totalDays.toFixed(1));

  return {
    input: {
      area: numericArea,
      constructionType,
      rooms: numericRooms,
    },
    estimate: {
      bricks,
      cementBags,
      constructionDays,
    },
    assumptions: {
      baseBricksPerSqm,
      baseCementBagsPerSqm,
      baseSqmPerDay,
      typeMultipliers: {
        brickMultiplier: typeConfig.brickMultiplier,
        cementMultiplier: typeConfig.cementMultiplier,
        speedMultiplier: typeConfig.speedMultiplier,
      },
      roomExtraFactor,
      extraDaysForRooms,
    },
  };
}

module.exports = {
  calculateEstimate,
};


