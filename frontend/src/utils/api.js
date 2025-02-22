import axios from "axios";

const API_URL = "https://bookshop-latest.onrender.com";  // Django backend URL
// const API_URL = "http://127.0.0.1:8000";  // Django backend URL

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register/`, userData);
};

export const loginUser = async (userData) => {
    return axios.post(`${API_URL}/login/`, userData, { withCredentials: true });
};

export const logoutUser = async () => {
    return axios.post(`${API_URL}/logout/`, {}, { withCredentials: true });
};

export const fetchBooks = async () => {
    return axios.get(`${API_URL}/books/`, { withCredentials: true });
};
