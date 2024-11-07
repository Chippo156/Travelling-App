
import axios from 'axios';

// Khởi tạo instance axios
const axiosInstance = axios.create({
  baseURL: 'https://travelling-app.onrender.com/api/v1', // URL mặc định cho tất cả các yêu cầu
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Thời gian chờ tối đa (10 giây)
});

// Thêm interceptor để xử lý request
axiosInstance.interceptors.request.use(
  (config) => {
    // Có thể thêm token vào headers nếu cần
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm interceptor để xử lý response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung (VD: thông báo, xử lý lỗi 401,...)
    if (error.response && error.response.status === 401) {
      // Ví dụ: logout hoặc refresh token
      console.log('Unauthorized - Redirecting to login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
