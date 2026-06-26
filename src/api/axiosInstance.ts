import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("akumart-auth");
    const token = stored ? JSON.parse(stored)?.state?.token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore parse errors
  }
  return config;
});

// Handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("akumart-auth");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;