import cookie from "./cookie";

const setAccessToken = (accessToken: string, role: string) => {
  cookie.set('accessToken', accessToken, 8760);
  cookie.set('role', role, 8760);
};

export {
  setAccessToken,
}