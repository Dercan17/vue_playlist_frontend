import axios from 'axios';


const URLServices = import.meta.env.VITE_APP_URL_SERVICES;

const userName = import.meta.env.VITE_APP_USERNAME_SERVICES;
const pass = import.meta.env.VITE_APP_PASS_SERVICES;

const toEncript = `${userName}:${pass}`;

const basicAuth = `Basic ${btoa(toEncript)}`;

const config = { headers: { 'Authorization': basicAuth, 'Content-Type': 'application/json' } };

const playListServices = {
    getAllPlayLists() {
        return axios.get(`${URLServices}/lists`, config)
    },

    deletePlayList(name) {
        return axios.delete(`${URLServices}/lists/${name}`, config)
    },

    getPlayListByName(name) {
        return axios.get(`${URLServices}/lists/${name}`, config)
    },

    savePlayList(playList) {
        return axios.post(`${URLServices}/lists`, playList, config);
    }


}


export { playListServices };

