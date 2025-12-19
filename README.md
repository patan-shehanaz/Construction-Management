## Construction Management Estimation Web App (MVP)

### 1. Problem Statement

This project is a **very simple construction estimation tool** built for learning and interviews (second‑year CS / Microsoft Explore level).

Given:
- **Area** in square meters
- **Construction type**: `residential` or `commercial`
- **Number of rooms`

The app returns a **rough estimate** of:
- Number of **bricks**
- Number of **cement bags**
- **Construction time** in days

It is **not** intended for real engineering use. The focus is on:
- Clean full‑stack structure (React + Node + Express)
- Clear estimation logic with simple DSA concepts
- Easy to explain in an interview

---

### 2. Tech Stack and Folder Structure

- **Frontend**: React (Vite)
  - `frontend/src/App.jsx` – main layout
  - `frontend/src/components/EstimationForm.jsx` – form for inputs
  - `frontend/src/components/EstimateResult.jsx` – shows results + assumptions
  - `frontend/src/components/HelpChat.jsx` – rule‑based FAQ (no AI)
  - `frontend/src/components/DesignIdeas.jsx` – static design ideas
  - `frontend/src/api/estimateApi.js` – wrapper to call `/api/estimate`
  - `frontend/src/styles/App.css` – simple styling

- **Backend**: Node.js + Express
  - `backend/src/server.js` – Express app and route mounting
  - `backend/src/routes/estimateRoutes.js` – `/api/estimate` route
  - `backend/src/controllers/estimateController.js` – handles request/response
  - `backend/src/services/validationService.js` – input validation
  - `backend/src/services/estimationService.js` – core estimation logic
  - `backend/src/data/materialRates.js` – base material constants and config

---

### 3. Estimation Assumptions

The numbers are **simple and made-up**, but consistent and explainable.

#### Base rates (per square meter)
- `baseBricksPerSqm = 50` → about 50 bricks per m²
- `baseCementBagsPerSqm = 0.4` → 1 bag per 2.5 m²
- `baseSqmPerDay = 20` → a team builds 20 m² per day

#### Construction type configuration (hash map)

Defined in `backend/src/data/materialRates.js` as a JavaScript object:

- **Residential**
  - `brickMultiplier = 1.0`
  - `cementMultiplier = 1.0`
  - `speedMultiplier = 1.0`

- **Commercial**
  - `brickMultiplier = 1.1` (slightly more bricks)
  - `cementMultiplier = 1.2` (slightly more cement)
  - `speedMultiplier = 0.9` (slightly slower)

We treat this object like a **hash map**:
```js
const typeConfig = constructionTypeConfig[constructionType];
```
Lookup is **O(1)**.

#### Room‑based adjustments

Idea: **more rooms ⇒ more internal walls ⇒ more materials and time.**

- For rooms **≤ 3**:
  - `roomExtraFactor = 0`
  - `extraDaysForRooms = 0`
- For each room **above 3**:
  - `+2%` materials: `roomExtraFactor += 0.02`
  - `+0.5` extra days total: `extraDaysForRooms += 0.5`

This is calculated in `getRoomAdjustments(rooms)` in **O(1)** time.

---

### 4. How the Estimation Works

Given:
- `area` (m²)
- `constructionType` (`residential` or `commercial`)
- `rooms` (integer)

Steps (implemented in `calculateEstimate` in `estimationService.js`):

1. **Look up type config** (hash map / object)
   - `typeConfig = constructionTypeConfig[constructionType]`

2. **Compute room adjustments**
   - `roomExtraFactor` (for materials)
   - `extraDaysForRooms` (for time)

3. **Calculate materials**
   - Bricks:
     \[
       \text{rawBricks} =
       \text{area} \times \text{baseBricksPerSqm} \times \text{type.brickMultiplier} \times (1 + \text{roomExtraFactor})
     \]
   - Cement bags:
     \[
       \text{rawCementBags} =
       \text{area} \times \text{baseCementBagsPerSqm} \times \text{type.cementMultiplier} \times (1 + \text{roomExtraFactor})
     \]

4. **Calculate time**
   - Base days:
     \[
       \text{baseDays} =
         \frac{\text{area}}{\text{baseSqmPerDay} \times \text{type.speedMultiplier}}
     \]
   - Total days:
     \[
       \text{totalDays} = \text{baseDays} + \text{extraDaysForRooms}
     \]

5. **Rounding**
   - `bricks = ceil(rawBricks)` – you cannot buy half a brick
   - `cementBags = ceil(rawCementBags)`
   - `constructionDays = totalDays` rounded to 1 decimal place

6. **Return structure**
   - `input`: echo of validated input
   - `estimate`: bricks, cementBags, constructionDays
   - `assumptions`: base rates, type multipliers, room factors

This is all constant‑time arithmetic ⇒ **O(1)** time complexity.

---

### 5. API Design

**Endpoint**
- Method: `POST`
- URL: `/api/estimate`
- Content‑Type: `application/json`

**Request body example**
```json
{
  "area": 120,
  "constructionType": "residential",
  "rooms": 4
}
```

**Success response (200)**
```json
{
  "input": {
    "area": 120,
    "constructionType": "residential",
    "rooms": 4
  },
  "estimate": {
    "bricks": 7920,
    "cementBags": 77,
    "constructionDays": 7.1
  },
  "assumptions": {
    "baseBricksPerSqm": 50,
    "baseCementBagsPerSqm": 0.4,
    "baseSqmPerDay": 20,
    "typeMultipliers": {
      "brickMultiplier": 1,
      "cementMultiplier": 1,
      "speedMultiplier": 1
    },
    "roomExtraFactor": 0.02,
    "extraDaysForRooms": 0.5
  }
}
```

**Error response (400)**
```json
{
  "message": "Invalid input",
  "errors": [
    "Area must be greater than 0.",
    "Construction type must be 'residential' or 'commercial'."
  ]
}
```

---

### 6. DSA Concepts Used

- **Arrays / Objects for configuration**
  - `constructionTypeConfig` object stores multipliers.
  - This acts like a **hash map** for O(1) lookup by construction type.

- **Hash map lookup**
  - Accessing `constructionTypeConfig[constructionType]` is O(1).

- **Functions to separate logic**
  - `validateEstimateInput` – validation logic
  - `getRoomAdjustments` – computes room‑based factors
  - `calculateEstimate` – pure estimation logic
  - `handleEstimate` – HTTP controller that wires everything together

- **Conditional logic**
  - Used in validation (checking types/ranges).
  - Used in `getRoomAdjustments` to handle rooms `<= 3` vs `> 3`.

- **Time complexity**
  - All core operations are simple arithmetic and object lookups.
  - Overall estimation is **O(1)** for each request.

---

### 7. How to Run the Project

#### 1) Install backend dependencies
```bash
cd backend
npm install
npm run start   # or: npm run dev (with nodemon)
```

Backend will listen on **port 4000**.

#### 2) Install frontend dependencies
```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on **http://localhost:5173** and proxy `/api` calls to the backend.

---

### 8. Optional Features Explained

#### Help / Chat section (rule‑based)
- Implemented in `HelpChat.jsx` and `faqData.js`.
- When a user types a question, we **do not** call any AI.
- We simply search existing FAQ questions for a substring match.
- If we find a match, we show the pre‑defined answer; otherwise we show a generic message.
- This is easy to explain and uses only array traversal (O(n), where n is small).

#### Design inspiration section
- Implemented in `DesignIdeas.jsx` and `designIdeas.js`.
- `designIdeas` is a static array of objects with `title` and `description`.
- We simply map over this array and display a list of ideas.
- This is also O(n) where n is the number of ideas (small).

---

### 9. Future Improvements (if asked in interview)

- Add **authentication** so users can save multiple projects.
- Persist estimates in a **database** instead of keeping everything in memory.
- Allow more detailed inputs: floors, wall height, material quality, labor rates.
- Support exporting estimates to **PDF** or **Excel**.
- Add **unit tests** for the estimation service and validation service.
- Improve the chat to a more sophisticated rule system or integrate AI (if appropriate for the role).


