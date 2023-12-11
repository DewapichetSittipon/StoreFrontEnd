import { UserCreateUpdateModel } from '../models';
import http from '../utils/axios';

const getUserListAsync = async (page: number, size: number, keyword?: string) => {
  const params = {
    page,
    size,
    keyword,
  };

  return await http.get('api/backoffice/user', { params });
};

const createUserListAsync = async (body: UserCreateUpdateModel) => {
  return await http.post('api/backoffice/user', body);
};

const updateUserListAsync = async (body: UserCreateUpdateModel, id: string) => {
  return await http.put(`api/backoffice/user/${id}`, body);
};

const getUserDetailAsync = async (id: string) => {
  return await http.get(`api/backoffice/user/${id}`);
};

const deleteUserAsync = async (id: string) => {
  return await http.delete(`api/backoffice/user/${id}`);
};

const backofficeUserService = {
  getUserListAsync,
  createUserListAsync,
  getUserDetailAsync,
  updateUserListAsync,
  deleteUserAsync,
};

export default backofficeUserService;