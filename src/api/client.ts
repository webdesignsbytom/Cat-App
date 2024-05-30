import axios from 'axios';

const host: string = process.env.REACT_APP_API_URL as string;
const tokenKey: string = process.env.REACT_APP_USER_TOKEN as string;

const client = {
  get: (path: string) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };

    return axios.get(url, { headers });
  },

  post: (path: string, data: any, withToken: boolean = true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers: Record<string, string> = {};

    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.post(url, data, { headers });
  },

  patch: (path: string, data: any, withToken: boolean = true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers: Record<string, string> = {};
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.patch(url, data, { headers });
  },

  delete: (path: string) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };

    return axios.delete(url, { headers });
  },
};

export default client;
