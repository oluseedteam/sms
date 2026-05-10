import apiFetch from './api';

// ─── Fee Structures (Admin) ─────────────────────────────
export const getFees = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/fees${query ? `?${query}` : ''}`);
};

export const createFee = (data) => apiFetch('/fees', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const updateFee = (id, data) => apiFetch(`/fees/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

export const deleteFee = (id) => apiFetch(`/fees/${id}`, {
  method: 'DELETE',
});

export const getAllPayments = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/payments${query ? `?${query}` : ''}`);
};

// ─── Student Finance ────────────────────────────────────
export const getStudentFinance = () => apiFetch('/student/finance');

export const initializePayment = (data) => apiFetch('/student/payment/initialize', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const verifyPayment = (data) => apiFetch('/student/payment/verify', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const payFromWallet = (data) => apiFetch('/student/payment/pay-from-wallet', {
  method: 'POST',
  body: JSON.stringify(data),
});
// ─── Admin Broadcast ────────────────────────────────────
export const broadcastMessage = (data) => apiFetch('/admin/broadcast-message', {
  method: 'POST',
  body: JSON.stringify(data),
});
