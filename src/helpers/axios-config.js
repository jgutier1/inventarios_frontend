import axios from "axios";

const axiosInstance = axios.create ({
baseURL:"https://invetariosbackend.herokuapp.com/"


})

export {
    axiosInstance
}