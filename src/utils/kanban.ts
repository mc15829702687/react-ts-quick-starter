import { QueryKey, useMutation, useQuery } from 'react-query';
import { Kanban } from 'src/types/kanban';
import { cleanObject } from '.';
import { useHttp } from './http';
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from './use-optimistic-options';

export const useKanbans = (param?: Partial<Kanban>) => {
  // 封装的 fetch 函数
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: cleanObject(param || {}) }));
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) => client(`kanbans`, { data: params, method: 'POST' }),
    useAddConfig(queryKey),
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  );
};

export interface SortProps {
  // 重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标 item 的前还是后
  type: 'before' | 'after';
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: SortProps) =>
      client('kanbans/reorder', {
        data: params,
        method: 'POST',
      }),
    useReorderKanbanConfig(queryKey),
  );
};
