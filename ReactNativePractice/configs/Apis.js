import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_CONTEXT = "/IMPROOK_CARE";
const SERVER = "http://localhost:2024";

export const endpoints = {
    "login": `${SERVER_CONTEXT}/api/public/login/`,
    "current-user": `${SERVER_CONTEXT}/api/auth/current-user/`
}

let token;

const getToken = async () => {
    token = await AsyncStorage.getItem('token');
};

getToken();

export const authApi = (token) => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": token
        }
    })
}

export default axios.create({
    baseURL: SERVER
});