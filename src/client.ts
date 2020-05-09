import axios from 'axios';
import aspida from '@aspida/axios';
import api from 'apis/$api';

type Headers = {
  Accept: string;
  Authorization?: string;
}

const baseURL = 'https://api.github.com';
const axiosConfig: {
  baseURL: string;
  headers: Headers;
} = {
  baseURL,
  headers: {
    'Accept': 'application/vnd.github.inertia-preview+json'
  },
};

export default (headers?: { Authorization?: string }) => {
  if (headers && headers.Authorization) {
    axiosConfig.headers.Authorization = headers.Authorization;
  }
  return api(aspida(axios, axiosConfig));
};
