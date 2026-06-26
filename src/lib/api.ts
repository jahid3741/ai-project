import axios from "axios";

// 1. Connects to the Express backend we built earlier on port 4000!
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- REQUEST INTERCEPTOR ---
// This magically grabs your Clerk security token from the browser
// and attaches it to every request automatically. No more messy headers!
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined" && (window as any).Clerk?.session) {
      const token = await (window as any).Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// --- RESPONSE INTERCEPTOR ---
// If the Express backend throws an error, this catches it globally
// so it doesn't crash your frontend completely.
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.error || error.message;
    console.error("🚨 API Error:", errorMessage);
    return Promise.reject(error);
  },
);

// ==========================================
// EXPORTED API FUNCTIONS (Your Clean Shortcuts)
// ==========================================

export const getItems = async (params = {}) => {
  const response = await api.get("/items", { params });
  return response.data;
};

export const getItem = async (id: string) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

export const generateContent = async (prompt: string, type: string) => {
  const response = await api.post("/ai/generate", { prompt, type });
  return response.data;
};

export const getRecommendations = async (itemIds: string[]) => {
  const response = await api.post("/ai/recommendations", {
    viewedItemIds: itemIds,
  });
  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export default api;
