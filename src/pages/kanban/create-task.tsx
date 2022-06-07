import { Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAddTask } from 'src/utils/task';
import { useProjectIdInUrl, useTasksQueryKey } from './util';

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('');
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputModal, setInputModal] = useState(false);

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputModal(false);
    setName('');
  };

  const toggle = () => setInputModal(!inputModal);

  useEffect(() => {
    if (!inputModal) setName('');
  }, [inputModal]);

  if (!inputModal) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder='需要做些什么'
        autoFocus
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
