export interface AuthenticationModel {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export interface SigninResponseModel {
  access_token: string;
  expires_token: number;
  role: string;
  firstName: string;
  lastName: string;
}