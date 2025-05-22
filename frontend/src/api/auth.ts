import axios from 'axios';


export const signup = (data: { username: string; password: string }) =>
  axios.post(`/api/auth/signup`, data);

export const login = (data: { username: string; password: string }) =>
  axios.post(`/api/auth/login`, data); 
