import axios from 'axios';

const API_URL = 'http://localhost:3033';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auth Services
export const authService = {
    register: (userData) => api.post('/api/Auth/Register', userData),
    login: (credentials) => api.post('/api/Auth/Login', credentials),
    refreshToken: () => api.post('/api/Auth/RefreshToken'),
    revoke: () => api.post('/api/Auth/Revoke'),
    revokeAll: () => api.post('/api/Auth/RevokeAll')
};

// Brand Services
export const brandService = {
    getAllBrands: () => api.get('/api/Brand/GetAllBrands'),
    createBrand: (brandData) => api.post('/api/Brand/CreateBrand', brandData)
};

// Product Services
export const productService = {
    getAllProducts: () => api.get('/api/Product/GetAllProducts'),
    createProduct: (productData) => api.post('/api/Product/CreateProducts', productData),
    updateProduct: (productData) => api.post('/api/Product/UpdateProducts', productData),
    deleteProduct: (productId) => api.post('/api/Product/DeleteProducts', productId)
};

// Interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api; 