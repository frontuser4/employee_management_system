import axios from 'axios';
axios.defaults.headers.common["Authorization"] = `${localStorage.getItem('token')}`;
const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_APP_BASE_URL,
})
export default axiosInstance;