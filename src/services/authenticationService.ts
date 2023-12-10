import { AuthenticationModel } from '../models';
import http from '../utils/axios';

const signInAsync = async (userName: string, password: string) => {
  const body = {
    userName,
    password
  };

  return await http.post('api/authen/signin', body);
};

const signUpAsync = async (body: AuthenticationModel) => {
  return await http.post('api/authen/signup', body);
};

const authenticationService = {
  signInAsync,
  signUpAsync,
};

export default authenticationService;