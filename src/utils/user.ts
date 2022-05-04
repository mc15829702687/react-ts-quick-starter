import { useMount } from '.';
import { useHttp } from 'src/utils/http';
import { useAsync } from './use-async';
import { User } from 'src/pages/project-list/SearchPannel';

export const useUsers = () => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(client('users'));
  });

  return result;
};
