import React, { useEffect, useState } from 'react';

// 模拟闭包
const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `更新后的值为: ${num}`;
    return function unMount() {
      console.log(message);
    };
  };

  return effect;
};
// const add = test();
// const unMount = add();
// add();
// add();
// unMount(); // 更新的值为 1，不是 3

export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    setInterval(() => {
      // console.log('渲染', num);
    }, 1000);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log('销毁时的num', num);
    };
  }, [num]);

  return (
    <div>
      <p>{num}</p>
      <button onClick={add}>add</button>
    </div>
  );
};
