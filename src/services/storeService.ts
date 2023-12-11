import http from '../utils/axios';

const getStoreListAsync = async (page: number, size: number, keyword: string) => {
  const params = {
    page,
    size,
    keyword,
  };

  return await http.get('api/backoffice/store', { params });
};

const deleteStoreAsync = async (id: string) => {
  return await http.delete(`api/backoffice/store/${id}`);
};

const storeService = {
  getStoreListAsync,
  deleteStoreAsync,
};

export default storeService;