import axios from 'axios';

export const createRequest = (data: { software: string; accessType: string; reason: string }) =>
  axios.post(`/api/requests`, data);

export const getPendingRequests = () =>
  axios.get(`/api/requests?status=Pending`);

export const updateRequest = (id: number, status: 'Approved' | 'Rejected') =>
  axios.patch(`/api/requests/${id}`, { status }); 