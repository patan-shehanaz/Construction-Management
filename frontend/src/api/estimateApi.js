// Use environment variable for API URL, fallback to relative path for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchEstimate({ area, constructionType, rooms }) {
  const response = await fetch(`${API_BASE_URL}/api/estimate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ area, constructionType, rooms }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Build a human-friendly message from API errors
    const message =
      data?.errors && Array.isArray(data.errors)
        ? data.errors.join(" ")
        : data?.message || "Failed to get estimate.";
    throw new Error(message);
  }

  return data;
}


