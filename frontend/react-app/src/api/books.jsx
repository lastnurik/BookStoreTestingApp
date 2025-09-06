import axios from 'axios';

const BACKEND_URL = 'http://localhost:5063';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchBooks(params) {
  try {
    const response = await api.get('/api/Book', { params });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}