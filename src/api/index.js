import axios from "axios";

const api = axios.create({
  baseURL: 'http://172.27.165.78:8000/api',
});

export default api