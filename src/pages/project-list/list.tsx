import React from 'react';
import { Table } from 'antd';
import { User } from './SearchPannel';

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
}

interface ListProps {
  projects: Project[];
  users: User[];
}

const List = ({ projects, users }: ListProps) => {
  return (
    <Table
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '负责人',
          dataIndex: 'personId',
          render: (text, project) => {
            return <td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>;
          },
        },
      ]}
      dataSource={projects}
    ></Table>
  );
};

export default List;
