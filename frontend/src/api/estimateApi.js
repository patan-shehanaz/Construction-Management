export async function fetchEstimate({ area, constructionType, rooms }) {
  const response = await fetch("/api/estimate", {
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


