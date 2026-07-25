const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getToken = () => localStorage.getItem('token');

const apiFetch = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const api = {
  register: (payload) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getFlights: (params = '') => apiFetch(`/api/flights/search${params ? `?${params}` : ''}`),
  getHotels: (params = '') => apiFetch(`/api/hotels/search${params ? `?${params}` : ''}`),
  bookFlight: (payload) => apiFetch('/api/flights/book', { method: 'POST', body: JSON.stringify(payload) }),
  bookHotel: (payload) => apiFetch('/api/hotels/book', { method: 'POST', body: JSON.stringify(payload) }),
  getBookings: () => apiFetch('/api/bookings/me'),
  checkout: (payload) => apiFetch('/api/payments/checkout', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => apiFetch('/api/users/profile'),
  getAdminDashboard: () => apiFetch('/api/admin/dashboard'),
  getReviews: (params = '') => apiFetch(`/api/reviews${params ? `?${params}` : ''}`),
  createReview: (payload) => apiFetch('/api/reviews', { method: 'POST', body: JSON.stringify(payload) })
};
