import axios from 'axios';

const api = axios.create({
  baseURL: 'http://167.172.231.96:3333',
});

export default api;
