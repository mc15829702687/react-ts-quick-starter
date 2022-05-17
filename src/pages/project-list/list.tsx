import React from 'react';
import { Table, TableProps, Dropdown, Menu, Button, Modal } from 'antd';

import dayjs from 'dayjs';

import { User } from './SearchPannel';
import { Link } from 'react-router-dom';
import { Pin } from 'src/components/pin';
import { useDeleteProjects, useEditProjects, useProjectsQueryKey } from 'src/utils/projects';
import { useProjectModal } from './util';

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
}

const ListScreen = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProjects(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

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
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => startEdit(id);
  const { mutate: deleteProject } = useDeleteProjects(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => editProject(project.id)}>编辑</Menu.Item>
          <Menu.Item onClick={() => confirmDeleteProject(project.id)}>删除</Menu.Item>
        </Menu>
      }
    >
      <span>...</span>
    </Dropdown>
  );
};

export default ListScreen;
