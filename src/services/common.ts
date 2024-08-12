import axios, { AxiosError, AxiosResponse } from 'axios';

export const server = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false
});

// Set the token from local storage if it exists
const token = localStorage.getItem('authToken');
if (token) {
  server.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function invoke<R = unknown, D = unknown>(call: Promise<AxiosResponse<R, D>>) {
  try {
    const response = await call;
    return response.data;
  } catch (err) {
    const e = err as AxiosError;
    const errPayload = e.response?.data ? (e.response.data as ResponseError) : e;
    throw errPayload;
  }
}
