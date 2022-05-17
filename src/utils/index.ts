import { useEffect, useRef, useState } from 'react';

const isFalsy = (val: unknown) => (val === 0 ? false : !val);

const isVoid = (val: unknown) => val === undefined || val === null || val === '';

// object 类型包含: {}, () => {}, 函数不能结构赋值，所以 obj 的类型如下
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // 删除值为空的字段
    if (isVoid(result[key])) {
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
    // eslint-disable-next-line
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

// 改变 header title
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  // const oldTitle = document.title;
  const oldTitle = useRef(document.title).current; // 返回的 ref 对象在组件的整个生命周期内持续存在

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// 重定向
export const resetRoute = () => {
  window.location.href = window.location.origin;
};

// 返回组件的挂载状态，如果还没挂载或者已经卸载返回false，否则返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};

/**
 * 传一个对象和键的集合，返回对应的对象中的键值对
 */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
  const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K));
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
