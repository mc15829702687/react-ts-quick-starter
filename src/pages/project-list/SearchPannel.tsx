import React from 'react';
import { Form, Input, Select } from 'antd';
import { jsx } from '@emotion/react';
import { Project } from './list';

import { UserSelect } from 'src/components/user-select';

export interface User {
  id: number;
  name: string;
  token?: string;
}

interface SearchPannelProps {
  users: User[];
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  setParam: (param: SearchPannelProps['param']) => void;
}

const SearchPannel = ({ users, param, setParam }: SearchPannelProps) => {
  return (
    <Form layout='inline' style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          type='text'
          placeholder='请输入搜索名称'
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
          defaultOptionName={'参选人'}
          value={param.personId}
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};

export default SearchPannel;
