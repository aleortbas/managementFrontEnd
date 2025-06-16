import axios from 'axios';

export const login = (credentials: { email: string; password: string }) => {
  return axios.post('http://localhost:5000/api/users/login', credentials)
}

export const register = (credentials: { email: string; username: string; password: string }) => {
  return axios.post('http://localhost:5000/api/users/', credentials)
}