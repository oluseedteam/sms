import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "http://localhost:8000/api";

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
    if (error.status) throw error;

    if (options.showToast !== false) {
      toast.error(error.message || "Network error. Please check your connection.");
    }
    throw error;
  }
}

export async function downloadApiFile(endpoint) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Accept: 'application/pdf',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw Object.assign(new Error(errorPayload.message || 'Unable to download this file.'), { status: response.status });
  }

  const disposition = response.headers.get('content-disposition') || '';
  const filename = disposition.match(/filename="?([^";]+)"?/i)?.[1] || 'report-card.pdf';
  const blobUrl = URL.createObjectURL(await response.blob());
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(blobUrl);
}

export default apiFetch;
