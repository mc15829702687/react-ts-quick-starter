import { useMemo, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject, subset } from '.';

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);

  // https://codesandbox.io/s/cranky-gould-hs6ct2?file=/src/App.js
  return [
    useMemo(
      () => subset(Object.fromEntries(searchParams), stateKeys) as { [key in K]: string },
      // eslint-disable-next-line
      [searchParams, stateKeys],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    // Iterator
    const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

// demo
// let a = ['123', 23, { age: 12 }] as const;
// const a = ['123'] as const;
