import axios from "axios";

/**
 * A pre-configured Axios instance for making HTTP requests to the API.
 *
 * The `api` instance is created with fixed configuration options:
 * - `baseURL`: The base URL for API requests. It retrieves the value from an environmental
 *   variable `VITE_API_URL` or defaults to "https://your‐api.example.com/api".
 * - `headers`: Default headers for all requests. Currently, it includes:
 *   - `"Content-Type": "application/json"` to signify that the request body (if present)
 *     is in JSON format.
 *
 * This instance provides a centralized way to interact with the backend, ensuring consistent
 * settings across API calls.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://your‐api.example.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Example: attach a request interceptor to put the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const apiRoutes = {
    getCategories: () => "/categories",
    getTopicsForCategory: (categoryId) => `/categories/${categoryId}/topics`,
};



export default api;
