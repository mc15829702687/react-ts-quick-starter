import React, { ReactNode, useContext } from 'react';

import { DevTools } from 'jira-dev-tool';
import * as auth from 'src/auth-provide';
import { FullPageLoading, FullPageError } from 'src/components/lib';
import { User } from 'src/pages/project-list/SearchPannel';
import { http } from 'src/utils/http';
import { useAsync } from 'src/utils/use-async';
import { useMount } from 'src/utils';

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

const bootstrapUser = async () => {
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

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
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

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('必须在 useAuth 中使用 context');
  }
  return context;
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
