import axios from 'axios';
axios.defaults.headers.common["Authorization"] = `${localStorage.getItem('token')}`;
const axiosInstance = axios.create({
    baseURL : 'http://64.227.141.209:8080',
})
export default axiosInstance;