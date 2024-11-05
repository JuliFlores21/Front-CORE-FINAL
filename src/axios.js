import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://www.corefinal.somee.com/api', // URL base de tu API
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
