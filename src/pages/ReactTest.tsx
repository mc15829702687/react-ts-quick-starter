import React from "react";
import { useArray, useMount } from "src/utils";

const ReactTest = () => {
  const persons: { name: string; age: number }[] = [
    {
      name: "jack",
      age: 24,
    },
    {
      name: "ma",
      age: 25,
    },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {
    // console.log(value.notExist);
    // add({name: 'mc'});
    // removeIndex('123');
  });

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add Jon</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { name: string; age: number }, index: number) => {
        return (
          <div style={{ marginBottom: "30px" }} key={person.name}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ReactTest;
