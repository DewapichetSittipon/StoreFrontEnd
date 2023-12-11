export interface StoreListResponseModel {
  id: string;
  name: string;
  description: string;
  views: number;
  banner: string;
  latitude: string;
  longitude: string;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
}

export interface StoreCreateUpdateModel {
  name: string;
  description: string;
  image?: File;
  latitude: string;
  longitude: string;
}