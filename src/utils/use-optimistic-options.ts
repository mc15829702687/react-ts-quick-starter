import { QueryKey, useQueryClient } from 'react-query';
import { Task } from 'src/types/task';
import { reorder } from './reorder';

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any) => {
  const queryClent = useQueryClient();

  return {
    onSuccess: () => queryClent.invalidateQueries(queryKey),
    // 乐观更新 optimistic update
    async onMutate(target: any) {
      const previousItem = queryClent.getQueryData(queryKey);
      queryClent.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItem };
    },
    onError(err: any, newItem: any, context: any) {
      queryClent.setQueryData(queryKey, (context as { previousItem: any[] }).previousItem);
    },
  };
};

export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.map((item) => (item.id === target.id ? { ...item, ...target } : item))) ||
  [];
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.filter((item) => item.id !== target.id)) || [];

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) => (item.id === target.fromId ? { ...item, kanbanId: target.toKanbanId } : item));
  });
