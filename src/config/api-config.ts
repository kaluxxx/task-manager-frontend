const API_URL = import.meta.env.VITE_BASE_URL as string;
export const TASK_URL = `${API_URL}/tasks`;
export const ACCOUNT_URL = `${API_URL}/accounts`;
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;