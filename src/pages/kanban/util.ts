import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'src/utils';
import { useProject } from 'src/utils/projects';
import { useTask } from 'src/utils/task';
import { useUrlQueryParams } from 'src/utils/url';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(['name', 'typeId', 'processorId', 'tagId']);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(param.name, 200);

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debouncedName,
    }),
    [projectId, param, debouncedName],
  );
};

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParams(['editingTaskId']);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId],
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close,
  };
};
