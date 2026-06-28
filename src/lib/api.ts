import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backend-l0ha.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ================================
// Request Interceptor
// ================================
api.interceptors.request.use(
  async (config) => {
    try {
      if (typeof window !== "undefined") {
        const clerk = (window as any).Clerk;

        if (clerk?.session) {
          const token = await clerk.session.getToken();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      }

      return config;
    } catch (err) {
      console.error("Token Error:", err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// ================================
// Response Interceptor
// ================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

// ================================
// Items
// ================================
export const getItems = async (params = {}) => {
  const { data } = await api.get("/items", { params });
  return data;
};

export const getItem = async (id: string) => {
  const { data } = await api.get(`/items/${id}`);
  return data;
};

// ================================
// AI
// ================================
export const generateContent = async (
  prompt: string,
  toolSlug: string
) => {
  const { data } = await api.post("/ai/generate", {
    prompt,
    toolSlug,
  });

  return data;
};

export const getRecommendations = async (
  itemIds: string[]
) => {
  const { data } = await api.post("/ai/recommendations", {
    viewedItemIds: itemIds,
  });

  return data;
};

// ================================
// Admin
// ================================
export const getStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

export default api;