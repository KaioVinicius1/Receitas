import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.themealdb.com/api.php'
})

export default api;