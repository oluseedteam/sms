import toast from "react-hot-toast";

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

  try {
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
      
      if (options.showToast !== false) {
        toast.error(message);
      }

      throw Object.assign(new Error(message), {
        status: res.status,
        errors: data?.errors ?? {},
      });
    }

    // Success notification for mutations (POST, PUT, PATCH, DELETE)
    const method = options.method?.toUpperCase() || "GET";
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && options.showToast !== false) {
      toast.success(data.message || "Operation successful!");
    }

    return data;
  } catch (error) {
    // If it's already an error object we threw, just rethrow it
    if (error.status) throw error;

    // Otherwise it's a network error or something else
    if (options.showToast !== false) {
      toast.error(error.message || "Network error. Please check your connection.");
    }
    throw error;
  }
}

export default apiFetch;
