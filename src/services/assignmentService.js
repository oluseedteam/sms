import apiFetch from "./api";

export async function getAssignments(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/assignments?${query}`);
}

export async function createAssignment(data) {
  return apiFetch("/assignments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAssignment(id) {
  return apiFetch(`/assignments/${id}`);
}

export async function updateAssignment(id, data) {
  return apiFetch(`/assignments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteAssignment(id) {
  return apiFetch(`/assignments/${id}`, {
    method: "DELETE",
  });
}
