/**
 * 该工具库主要作用是用读写在 localstorage 中的登录 token
 */
import { User } from './types/user';

// 在真实环境中，如果使用 firebase 这种第三方 auth 服务的话，本文件不需要开发者开发
const localStorageKey = '__auth_provide_token__';

const apiURL = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const logout = async () => window.localStorage.removeItem(localStorageKey);
