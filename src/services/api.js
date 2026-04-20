// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.ghra.org.ng/api";

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.message ||
      (data?.errors
        ? Object.values(data.errors).flat().join(" ")
        : "Something went wrong. Please try again.");
    throw Object.assign(new Error(message), {
      status: res.status,
      errors: data?.errors ?? {},
    });
  }

  return data;
}

export default apiFetch;
