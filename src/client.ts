import axios from 'axios';
import { AspidaRequest, AspidaClient } from 'aspida';
import aspida from '@aspida/axios';
import api, { ApiInstance } from 'apis/$api';

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

export default (headers?: { Authorization?: string }): ApiInstance => {
  if (headers && headers.Authorization) {
    axiosConfig.headers.Authorization = headers.Authorization;
  }
  const client = api(aspida(axios, axiosConfig));
  return client as ApiInstance;
};
