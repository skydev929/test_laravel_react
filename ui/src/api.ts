import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

export interface UserDto {
  id?: number;
  email: string;
  full_name: string;
  roles: string[];
}

export const createUser = async (payload: { email: string; full_name: string; roles: string[] }) => {
  const { data } = await api.post<{ message: string; data: UserDto }>('/users', payload);
  return data.data;
};

export const fetchUsers = async (role?: string) => {
  const { data } = await api.get<UserDto[]>('/users', { params: role ? { role } : {} });
  return data;
};

export default api;


