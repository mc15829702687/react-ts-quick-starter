import { useMemo } from 'react';
import { useUrlQueryParams } from 'src/utils/url';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(['name', 'personId']);
  return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};
