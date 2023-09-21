import axios from 'axios';
axios.defaults.headers.common["Authorization"] = `${localStorage.getItem('token')}`;
const axiosInstance = axios.create({
    baseURL : 'http://64.227.141.209:8080',
})
// http://64.227.141.209:8080
// http://192.168.0.120:8000
export default axiosInstance;