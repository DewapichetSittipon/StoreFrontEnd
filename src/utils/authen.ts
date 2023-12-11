import cookie from "./cookie";

const setAccessToken = (accessToken: string, role: string, firstName: string, lastName: string) => {
  cookie.set('accessToken', accessToken, 8760);
  cookie.set('role', role, 8760);
  cookie.set('firstName', firstName, 8760);
  cookie.set('lastName', lastName, 8760);
};

export {
  setAccessToken,
}