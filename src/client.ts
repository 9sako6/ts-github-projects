import axios from 'axios';

const baseURL = 'https://api.github.com';

export default axios.create({
  baseURL,
  headers: {
    'Accept': 'application/vnd.github.inertia-preview+json'
  },
  responseType: 'json'
})
