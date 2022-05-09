import { useMemo } from 'react';
import { useUrlQueryParams } from 'src/utils/url';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(['name', 'personId']);
  return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModal] = useUrlQueryParams(['projectCreate']);

  const open = () => setProjectModal({ projectCreate: true });
  const close = () => setProjectModal({ projectCreate: undefined });

  // 返回三种一下的自定义组件状态用 tuple，三种以上用对象形式返回
  return {
    projectModalOpen: projectCreate === 'true',
    open,
    close,
  };
};
