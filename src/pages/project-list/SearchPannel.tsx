import React from 'react';
import { Form, Input, Select } from 'antd';

export interface User {
  id: number;
  name: string;
  token: string;
}

interface SearchPannelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPannelProps['param']) => void;
}

const SearchPannel = ({ users, param, setParam }: SearchPannelProps) => {
  return (
    <Form>
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
        <Select
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value=''>参选人</Select.Option>
          {users.map((user) => {
            return <Select.Option value={user.id}>{user.name}</Select.Option>;
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPannel;
