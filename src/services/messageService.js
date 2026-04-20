import apiFetch from "./api";

export async function getMessages(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/messages?${query}`);
}

export async function sendMessage(data) {
  return apiFetch("/messages", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
