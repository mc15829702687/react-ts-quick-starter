import { Button, Input } from 'antd';
import React from 'react';
import { Row } from 'src/components/lib';
import { TaskTypeSelect } from 'src/components/task-type-select';
import { UserSelect } from 'src/components/user-select';
import { useSetUrlSearchParam } from 'src/utils/url';
import { useTaskSearchParams } from './util';

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap>
      <Input
        style={{ width: '20rem' }}
        value={searchParams.name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
        placeholder={'任务名'}
      />
      <UserSelect
        defaultOptionName='经办人'
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName='类型'
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除选择器</Button>
    </Row>
  );
};
