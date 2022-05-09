import React, { ReactNode, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DevTools } from 'jira-dev-tool';
import * as auth from 'src/auth-provide';
import { FullPageLoading, FullPageError } from 'src/components/lib';
import { User } from 'src/pages/project-list/SearchPannel';
import { http } from 'src/utils/http';
import { useAsync } from 'src/utils/use-async';
import { useMount } from 'src/utils';

import * as authStore from 'src/store/auth.slice';

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isIdle, isLoading, isError, run, error, data: user, setData: setUser } = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });

  // 登录做 Loading
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // 全屏报错
  if (isError) {
    return (
      <>
        <DevTools />
        <FullPageError error={error} />
      </>
    );
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};

// // utility type
// type Person = {
//   name: string;
//   age: number;
// };
// type PersonKeys = keyof Person;
// type PersonOnlyName = Pick<Person, 'name'>;
// type Age = Exclude<PersonKeys, 'name'>;

// const xiaoMing: Partial<Person> = { age: 12 };
// const shenMiRen: Omit<Person, 'name'> = { age: 12 };
