import { useCallback, useState } from 'react';
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

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

  // useState 传入函数的本质：惰性初始 state，所用用 useState 保存函数不能直接传入函数
  // https://codesandbox.io/s/vigilant-dirac-3szxkc?file=/src/App.js
  const [retry, setRetry] = useState(() => () => {});

  const mountedRef = useMountedRef();

  // 成功
  const setData = useCallback((data: D) => {
    setState({
      error: null,
      stat: 'success',
      data,
    });
  }, []);

  // 失败
  const setError = useCallback((error: Error) => {
    setState({
      error,
      data: null,
      stat: 'error',
    });
  }, []);

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
      setState((prevState) => ({ ...prevState, stat: 'loading' }));

      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((err) => {
          setError(err);
          if (initialConfig?.throwOnError) return Promise.reject(err);
          return err;
        });
    },
    [initialConfig?.throwOnError, mountedRef, setData, setError],
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
