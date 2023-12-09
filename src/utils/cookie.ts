import Cookies from 'js-cookie';

const set = (name: string, value: string, hoursToExpire: number) => {
  const expires = new Date();

  expires.setTime(expires.getTime() + (hoursToExpire * 60 * 60 * 1000));

  Cookies.set(name, value, { expires, })
};

const get = (name: string) => Cookies.get(name) ?? '';

const remove = (name: string) => Cookies.remove(name);

const cookie = {
  set,
  get,
  remove,
};

export default cookie;