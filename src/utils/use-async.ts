import { useCallback, useReducer, useState } from 'react';
import { useMountedRef } from 'src/utils';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'success' | 'error';
}

// 默认数据
const defaultState: State<null> = {
  error: null,
  data: null,
  stat: 'idle',
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => {
      mountedRef.current ? dispatch(...args) : void 0;
    },
    [mountedRef, dispatch],
  );
};

// ToDo 用 useReducer 去封装，
// useReducer适合互相影响的状态, useState 适合单个状态
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultState,
    ...initialState,
  } as State<D>);
  // const [state, dispatch] = useState<State<D>>({
  //   ...defaultState,
  //   ...initialState,
  // });

  // useState 传入函数的本质：惰性初始 state，所用用 useState 保存函数不能直接传入函数
  // https://codesandbox.io/s/vigilant-dirac-3szxkc?file=/src/App.js
  const [retry, setRetry] = useState(() => () => {});

  // const mountedRef = useMountedRef();
  const safeDispatch = useSafeDispatch(dispatch);

  // 成功
  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        error: null,
        stat: 'success',
        data,
      });
    },
    [safeDispatch],
  );

  // 失败
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        data: null,
        stat: 'error',
      });
    },
    [safeDispatch],
  );

  // run 函数处理异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error(`参数请传入promise~`);
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ stat: 'loading' });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((err) => {
          setError(err);
          if (initialConfig?.throwOnError) return Promise.reject(err);
          return err;
        });
    },
    [initialConfig?.throwOnError, setData, setError, safeDispatch],
  );

  // 返回四种状态和数据
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    setData,
    setError,
    retry,
    run,
    ...state,
  };
};
