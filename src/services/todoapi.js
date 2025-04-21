// src/services/api.js
import axios from "axios";

// สร้าง instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// เพิ่ม interceptor เพื่อแนบ token ทุกครั้งที่มี request
api.interceptors.request.use((config) => {
  const sessionUser = sessionStorage.getItem("user");
  const localUser = localStorage.getItem("user");
  const user = sessionUser ? JSON.parse(sessionUser) : JSON.parse(localUser);

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;

// API calls
export const getTodosByOwnerId = (ownerId, page, pageSize) =>
  api.get(`/api/Todo/owner/${ownerId}`, { params: { page, pageSize } });

export const deleteTodo = (todoId) => api.delete(`/api/Todo/${todoId}`);

export const addTodo = (todo) => api.post("/api/Todo", todo);

export const getTodosById = (todoId) => api.get(`/api/Todo/${todoId}`);
export const editTodoById = (todoId, updatedTodo) =>
  api.put(`/api/Todo/${todoId}`, updatedTodo);
