// axiosConfig.js
import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "https://localhost:5001", // Update with your server URL
});

// Set up an interceptor to add the token to the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
