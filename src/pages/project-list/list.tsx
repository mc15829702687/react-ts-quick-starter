import React from 'react';
import { Table, TableProps, Dropdown, Menu, Button } from 'antd';

import dayjs from 'dayjs';

import { User } from './SearchPannel';
import { Link } from 'react-router-dom';
import { Pin } from 'src/components/pin';
import { useEditProjects } from 'src/utils/projects';

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

const ListScreen = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProjects();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh);

  return (
    <Table
      rowKey={'id'}
      columns={[
        {
          title: <Pin checked />,
          render: (val, project) => {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />;
          },
        },
        {
          title: '名称',
          render: (val, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: '组织',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          dataIndex: 'personId',
          render: (text, project) => {
            return <div>{users.find((user) => user.id === project.personId)?.name || '未知'}</div>;
          },
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          render: (text, project) => {
            return <div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>;
          },
        },
        {
          title: '操作',
          render: (text, project) => {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>编辑</Menu.Item>
                  </Menu>
                }
              >
                <span>...</span>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

export default ListScreen;
