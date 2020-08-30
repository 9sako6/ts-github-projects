import axios from 'axios';

export const createClient = (optionalHeaders?: { [key: string]: string }) => {
  const baseURL = 'https://api.github.com';
  const requiredtHeaders = { 'Accept': 'application/vnd.github.inertia-preview+json' };
  const headers = optionalHeaders
    ? { ...requiredtHeaders, ...optionalHeaders }
    : requiredtHeaders;

  return axios.create({ baseURL, headers });
};
