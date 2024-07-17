import axios from "axios";

const api = axios.create({
  baseURL: 'http://172.20.177.141:8000/api',
});

export default api