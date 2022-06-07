import { Input } from 'antd';
import React, { useState } from 'react';
import { useAddKanban } from 'src/utils/kanban';
import { ColumnsContainer } from '.';
import { Container } from './KanbanColumn';
import { useKanbansQueryKey, useProjectIdInUrl } from './util';

export const CreateKanban = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  const { mutateAsync } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await mutateAsync({ name, projectId });
    setName('');
  };

  return (
    <Container>
      <Input
        size='large'
        placeholder='新建看板名称'
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
