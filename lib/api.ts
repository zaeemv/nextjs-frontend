import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your FastAPI backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCustomers = async () => {
  const res = await api.get('/customers/');
  return res.data;
};

export default api;