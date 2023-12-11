export interface UserListResponseModel {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
}

export interface UserCreateUpdateModel {
  firstName: string;
  lastName: string;
  userName: string;
  password?: string;
  role: string;
}