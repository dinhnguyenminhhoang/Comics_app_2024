import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://go-comic.onrender.com',
  validateStatus: function (status) {
    return status >= 200 && status < 1000;
  },
});

// Interceptor cho response thành công
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return error.response.data;
  },
);

export default instance;
