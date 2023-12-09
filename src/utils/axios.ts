import axios, { HttpStatusCode } from 'axios';
import cookie from './cookie';

const baseApiUrl = import.meta.env.VITE_APP_API_URL;

const AxiosInstance = axios.create({
  baseURL: baseApiUrl,
});

AxiosInstance.interceptors.request.use((requestConfig) => {
  const accessToken = cookie.get('accessToken');

  // TODO: Add AccessToken and Check Condition Authorized.
  if (accessToken) {
    requestConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return requestConfig;
}, (error) => {
  return Promise.reject(error);
}, { synchronous: true });

AxiosInstance.interceptors.response.use((responseConfig) => {
  switch (responseConfig.status) {
    case HttpStatusCode.Created:
      // Create
      break;
    case HttpStatusCode.Accepted:
      // Update
      break;
    case HttpStatusCode.NoContent:
      // Delete
      break;
  };

  return responseConfig;
}, (error) => {

  switch (error.response?.status) {
    case HttpStatusCode.Forbidden:
      break;
    case HttpStatusCode.MethodNotAllowed:
      break;
    case HttpStatusCode.InternalServerError:
      break;
    case HttpStatusCode.NotFound:
      break;
  }

  return error.response;
}, { synchronous: true });

export default AxiosInstance;