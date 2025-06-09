import axios from "axios";

const api = axios.create({
  baseURL: "/api", // agora as requisições vão para o backend via proxy do Vercel
});

// Adiciona o token em cada requisição automaticamente
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export { api };
