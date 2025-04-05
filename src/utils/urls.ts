// src/api/urls.ts

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
export const GET_PRODUCTS = getApiUrl(`/todos?_limit=10`);
export const DELETE = (id: number) => getApiUrl(`/todos/${id}`);
export const ADD_TASK = getApiUrl(`/todos`);
export const TASK_UPDATE = (id: number) => getApiUrl(`/todos/${id}`);
