import axios from "axios";

const URLServices = import.meta.env.VITE_APP_URL_SERVICES;
const username = import.meta.env.VITE_APP_USERNAME_SERVICES;
const password = import.meta.env.VITE_APP_PASS_SERVICES;

const login = async () => {

    const response = await axios.post(`${URLServices}/auth/login`, {
        username,
        password,
    });

    localStorage.setItem("jwt", response.data.token);
    return response.data;
};

export default {
    login,
};