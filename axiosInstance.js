import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Base URL of your Spring Boot backend
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Allows sending cookies with requests
});

export default axiosInstance;
