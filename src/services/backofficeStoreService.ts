import { StoreCreateUpdateModel } from '../models';
import http from '../utils/axios';

const getStoreListAsync = async (page: number, size: number, keyword: string) => {
  const params = {
    page,
    size,
    keyword,
  };

  return await http.get('api/backoffice/store', { params });
};

const createStoreAsync = async (body: StoreCreateUpdateModel) => {
  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('description', body.description);
  formData.append('latitude', body.latitude);
  formData.append('longitude', body.longitude);

  if (body.image) {
    formData.append('image', body.image);
  }

  return await http.post('api/backoffice/store', formData);
};

const updateStoreAsync = async (body: StoreCreateUpdateModel, id: string) => {
  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('description', body.description);
  formData.append('latitude', body.latitude);
  formData.append('longitude', body.longitude);

  if (body.image) {
    formData.append('image', body.image);
  }

  return await http.put(`api/backoffice/store/${id}`, formData);
};

const getStoreDetailAsync = async (id: string) => {
  return await http.get(`api/backoffice/store/${id}`);
};

const deleteStoreAsync = async (id: string) => {
  return await http.delete(`api/backoffice/store/${id}`);
};

const backofficeStoreService = {
  getStoreListAsync,
  createStoreAsync,
  deleteStoreAsync,
  getStoreDetailAsync,
  updateStoreAsync,
};

export default backofficeStoreService;