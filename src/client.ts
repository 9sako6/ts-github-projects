import axios from 'axios';
import aspida from '@aspida/axios';
import api from 'apis/$api';

const baseURL = 'https://api.github.com';
const axiosConfig = {
  baseURL,
  headers: {
    'Accept': 'application/vnd.github.inertia-preview+json'
  },
};

export default api(aspida(axios, axiosConfig));
