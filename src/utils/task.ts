import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'src/types/task';
import { cleanObject } from '.';
import { useHttp } from './http';
import { SortProps } from './kanban';
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from './use-optimistic-options';

export const useTasks = (param?: Partial<Task>) => {
  // 封装的 fetch 函数
  const client = useHttp();

  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: cleanObject(param || {}) }));
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) => client(`tasks`, { data: params, method: 'POST' }),
    useAddConfig(queryKey),
  );
};

// enabled 为 false 时，不会自动刷新接口
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(['tasks', id], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEdiTasks = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) => client(`tasks/${params.id}`, { data: params, method: 'PATCH' }),
    useEditConfig(queryKey),
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`tasks/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: SortProps) =>
      client('tasks/reorder', {
        data: params,
        method: 'POST',
      }),
    useReorderTaskConfig(queryKey),
  );
};
