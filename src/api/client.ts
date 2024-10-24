import axios, { AxiosError } from 'axios';
import { TOKEN_NAME } from '../utils/contstants/Constants';

// const host: string | undefined = process.env.REACT_APP_API_URL;
// const tokenKey: string | undefined = process.env.REACT_APP_USER_TOKEN;

const host: string = 'http://localhost:4100'; //'https://api.cat-app.app'; // http://localhost:4000
const tokenKey: string = TOKEN_NAME;

// Helper function to get Authorization headers
const getAuthHeaders = (): Record<string, string> => {
  const token = tokenKey ? localStorage.getItem(tokenKey) : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Error handling function
const handleError = (error: AxiosError): Promise<never> => {
  let errorMessage = 'An unexpected error occurred.';

  if (error.response) {
    // Check if the API provided a specific error message
    if (error.response.data && (error.response.data as any).message) {
      errorMessage = (error.response.data as any).message; // Detailed API message
    } else {
      // Handle specific HTTP error codes if no message provided
      switch (error.response.status) {
        case 401:
          errorMessage = 'Unauthorized - Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Forbidden - You do not have access.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        default:
          errorMessage = 'An unexpected server error occurred.';
      }
    }
  } else if (error.request) {
    // No response received
    errorMessage = 'No response from the server. Please try again.';
  } else {
    // Request setup issue
    errorMessage = error.message;
  }

  // Return error object with a custom message
  return Promise.reject({ ...error, message: errorMessage });
};

const client = {
  // GET request with optional token
  get: async (path: string, withToken: boolean = true): Promise<any> => {
    const url = `${host}${path}`;
    const headers = withToken ? getAuthHeaders() : {};

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // POST request with optional token
  post: async (
    path: string,
    data: any,
    withToken: boolean = true
  ): Promise<any> => {
    const url = `${host}${path}`;
    const headers = withToken ? getAuthHeaders() : {};

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // PATCH request with optional token
  patch: async (
    path: string,
    data: any,
    withToken: boolean = true
  ): Promise<any> => {
    const url = `${host}${path}`;
    const headers = withToken ? getAuthHeaders() : {};

    try {
      const response = await axios.patch(url, data, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // DELETE request with optional token
  delete: async (path: string, withToken: boolean = true): Promise<any> => {
    const url = `${host}${path}`;
    const headers = withToken ? getAuthHeaders() : {};

    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
};

export default client;
