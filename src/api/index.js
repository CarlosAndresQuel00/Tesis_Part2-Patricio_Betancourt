import axios from "axios";

// Axios instance
const api = axios.create({
  // Only necessary, don't recommend to use "eslint-disable-next-line"
  // eslint-disable-next-line no-undef
  baseURL: "Your/URL",
  withCredentials: true,
  credentials: 'include'
});

export default api;