import http from '../utils/axios';

const getStoreListAsync = async (page: number, size: number, keyword?: string) => {
  const params = {
    page,
    size,
    keyword,
  };

  return await http.get('api/store', { params });
};

const getStoreDetailAsync = async (id: string) => {
  return await http.get(`api/store/${id}`);
};

const storeService = {
  getStoreListAsync,
  getStoreDetailAsync,
};

export default storeService;