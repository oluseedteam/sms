import apiFetch from './api';

// ─── Fee Structures (Admin) ─────────────────────────────
export const getFees = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/admin/fees${query ? `?${query}` : ''}`);
};

export const createFee = (data) => apiFetch('/admin/fees', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const updateFee = (id, data) => apiFetch(`/admin/fees/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

export const deleteFee = (id) => apiFetch(`/admin/fees/${id}`, {
  method: 'DELETE',
});

export const getAllPayments = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/admin/payments${query ? `?${query}` : ''}`);
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
