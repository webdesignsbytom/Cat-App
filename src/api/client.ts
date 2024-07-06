import axios from 'axios';

const host: string = 'http://localhost:4000';
const tokenKey: string = 'un';

const client = {
  get: (path: string) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };

    return axios.get(url, { headers });
  },

  getVideo: (path: string) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };
    return axios.get(url, { headers, responseType: 'blob' });
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

  postVideo: (path: string, data: any, withToken: boolean = false) => {
    const url = `${host}${path}`;
    let headers = {
      'Content-Type': 'multipart/form-data',
    };

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
