import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject } from '.';

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // https://codesandbox.io/s/cranky-gould-hs6ct2?file=/src/App.js
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line
      [searchParams],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // Iterator
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};

// demo
// let a = ['123', 23, { age: 12 }] as const;
// const a = ['123'] as const;
