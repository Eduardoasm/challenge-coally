import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
} // Ejemplo: Guardar una cookie llamada 'token' que expira en 7 días setCookie('token', 'tu-valor-del-token',

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  setToken(token: string) {
    localStorage.setItem('token', token);
    setCookie('token', token, 7);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  clearToken() {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
  },

  async login(credentials: { email: string; password: string }) {
    const { data } = await api.post('/auth/sign-in', credentials);
    if (data.data.token) {
      this.setToken(data.data.token);
    }
    return data;
  },

  logout() {
    this.clearToken();
  }
};

export default api;