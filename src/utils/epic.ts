import { QueryKey, useMutation, useQuery } from 'react-query';
import { Epic } from 'src/types/epic';
import { cleanObject } from '.';
import { useHttp } from './http';
import { useAddConfig, useDeleteConfig } from './use-optimistic-options';

export const useEpics = (param?: Partial<Epic>) => {
  // 封装的 fetch 函数
  const client = useHttp();

  return useQuery<Epic[]>(['epics', param], () => client('epics', { data: cleanObject(param || {}) }));
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) => client(`epics`, { data: params, method: 'POST' }),
    useAddConfig(queryKey),
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`epics/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  );
};
