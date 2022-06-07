import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';

import { useHttp } from 'src/utils/http';
import { Project } from 'src/types/project';

import { cleanObject } from 'src/utils';
import { useProjectsSearchParams } from 'src/pages/project-list/util';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';

export const useProjectsQueryKey = () => {
  const [param] = useProjectsSearchParams();
  return ['projects', param];
};

export const useProjects = (param?: Partial<Project>) => {
  // 封装的 fetch 函数
  const client = useHttp();

  return useQuery<Project[]>(['projects', param], () => client('projects', { data: cleanObject(param || {}) }));
};

export const useEditProjects = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, { data: params, method: 'PATCH' }),
    useEditConfig(queryKey),
  );
};

export const useAddProjects = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) => client(`projects`, { data: params, method: 'POST' }),
    useAddConfig(queryKey),
  );
};

export const useDeleteProjects = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  );
};

// enabled 为 false 时，不会自动刷新接口
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(['project', id], () => client(`projects/${id}`), {
    enabled: !!id,
  });
};
