const API_BASE_URL = "http://localhost:5000/api";

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Set auth token in localStorage
const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Remove auth token from localStorage
const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get user data from localStorage
const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Set user data in localStorage
const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text.substring(0, 200));
      
      if (response.status === 404) {
        throw new Error("API endpoint not found. Make sure the server is running on http://localhost:5000");
      }
      throw new Error("Server returned an invalid response. Please check if the backend server is running.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    // If it's already our custom error, rethrow it
    if (error.message.includes("API endpoint") || error.message.includes("Server returned")) {
      throw error;
    }
    
    // Network errors or other fetch errors
    if (error.name === "TypeError" || error.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Please make sure the backend server is running on http://localhost:5000");
    }
    
    throw error;
  }
};

// Auth API
const authAPI = {
  register: async (name, email, password) => {
    return await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
  },
  login: async (email, password) => {
    return await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  },
  getCurrentUser: async () => {
    return await apiRequest("/auth/me");
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  return getToken() !== null;
};

// Redirect to login if not authenticated
const requireAuth = () => {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
};

// Logout function
const logout = () => {
  removeToken();
  window.location.href = "index.html";
};

