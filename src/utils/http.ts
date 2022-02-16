/**
 * 此文件主要功能是封装 fetch 请求
 */
import qs from 'qs';
import * as auth from 'src/auth-provide';
import { useAuth } from 'src/context/auth-context';

const apiURL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = (endPoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === 'GET') {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }

  // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为 2xx 的时候抛出异常
  return window.fetch(`${apiURL}/${endPoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: '请重新登录' });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endPoint, config]: Parameters<typeof http>) => http(endPoint, { ...config, token: user?.token });
};
