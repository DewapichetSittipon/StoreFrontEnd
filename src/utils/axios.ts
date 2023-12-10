import axios, { HttpStatusCode } from 'axios';
import cookie from './cookie';
import toast from './toast';

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
      toast.error("ต้องห้าม");

      break;
    case HttpStatusCode.MethodNotAllowed:
      toast.error("วิธีการไม่ได้รับอนุญาต");

      break;
    case HttpStatusCode.InternalServerError:
      toast.error("ข้อผิดพลาดเซิร์ฟเวอร์");

      break;
    case HttpStatusCode.NotFound:
      toast.error("ไม่พบข้อมูล");

      break;
  }

  return error.response;
}, { synchronous: true });

export default AxiosInstance;