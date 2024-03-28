import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://go-comic.onrender.com',
  // baseURL: 'http://172.16.0.174:8080',
  baseURL: 'http://172.16.1.121:8080',
  validateStatus: function (status) {
    return status >= 200 && status <= 299;
  },
});
instance.defaults.validateStatus = function (status) {
  return status >= 200 && status < 299;
};
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
