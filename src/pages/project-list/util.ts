import { useMemo } from 'react';
import { useSetUrlSearchParam, useUrlQueryParams } from 'src/utils/url';
import { useProject } from 'src/utils/projects';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(['name', 'personId']);
  return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams(['projectCreate']);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams(['editingProjectId']);
  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: '', editingProjectId: '' });
  };
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

  // 返回三种一下的自定义组件状态用 tuple，三种以上用对象形式返回
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
