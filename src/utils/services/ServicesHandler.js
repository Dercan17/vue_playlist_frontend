import axios from 'axios';

const URLServices = import.meta.env.VITE_APP_URL_SERVICES;

const getAuthConfig = () => {
    const token = localStorage.getItem("jwt");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};

const playListServices = {
    getAllPlayLists() {
        return axios.get(`${URLServices}/lists`, getAuthConfig());
    },

    deletePlayList(name) {
        return axios.delete(`${URLServices}/lists/${name}`, getAuthConfig());
    },

    getPlayListByName(name) {
        return axios.get(`${URLServices}/lists/${name}`, getAuthConfig());
    },

    savePlayList(playList) {
        return axios.post(`${URLServices}/lists`, playList, getAuthConfig());
    },
};

const genres = {
    getAllGenres() {
        return axios.get(`${URLServices}/genres`, getAuthConfig());
    },
}

export { playListServices, genres };

