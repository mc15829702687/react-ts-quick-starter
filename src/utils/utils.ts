import { useEffect, useState } from 'react';

const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // 删除值为空的字段
    // @ts-ignore
    if (isFalsy(result[key])) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// 防抖函数
export const debounce = (fn: () => void, delay?: number) => {
  let timer: number | undefined;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      fn();
    }, delay);
  };
};

// custom hooks
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceVal;
};

export const useArray = <T>(initialArr: T[]) => {
  const [value, setValue] = useState(initialArr);

  return {
    value,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copyVal = [...value];
      copyVal.splice(index, 1);
      setValue(copyVal);
    },
  };
};
