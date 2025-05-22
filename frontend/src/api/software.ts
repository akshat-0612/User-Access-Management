import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '';

export const createSoftware = (data: { name: string; description: string; accessLevels: string[] }) =>
  axios.post(`/api/software`, data);

export const getSoftwareList = () =>
  axios.get(`/api/software`); 