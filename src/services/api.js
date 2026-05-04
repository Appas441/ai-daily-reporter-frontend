import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-daily-reporter-backend.onrender.com", // ✅ FIXED
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;