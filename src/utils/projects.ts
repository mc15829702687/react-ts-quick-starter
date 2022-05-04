import { useCallback, useEffect } from 'react';
import { useHttp } from 'src/utils/http';
import { useAsync } from 'src/utils/use-async';
import { Project } from 'src/pages/project-list/list';

import { cleanObject } from 'src/utils';

export const useProjects = (param?: Partial<Project>) => {
  // 使用自定义 hook 来获取 loading，error，网络请求
  const { run, ...result } = useAsync<Project[]>();

  // 封装的 fetch 函数
  const client = useHttp();

  const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [client, param]);

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);

  return result;
};

export const useEditProjects = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, { data: params, method: 'PATCH' }));
  };

  return {
    mutate,
    ...asyncResult,
  };
};
