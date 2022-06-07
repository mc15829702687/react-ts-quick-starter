import React from 'react';

import styled from '@emotion/styled';

import SearchPannel from './SearchPannel';
import ListScreen from './list';

import { useDebounce } from 'src/utils';
import { useProjects } from 'src/utils/projects';
import { useUsers } from 'src/utils/user';
import { Row, ButtonNoPadding, ErrorBox } from 'src/components/lib';

import { useProjectModal, useProjectsSearchParams } from './util';

const ProjectList = () => {
  const [param, setParam] = useProjectsSearchParams();

  // 通过封装的 useAsync 来 获取 users 和 list
  const { error, isLoading, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between>
        <SearchPannel users={users || []} param={param} setParam={setParam} />
        <ButtonNoPadding type='link' onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <ErrorBox error={error} />
      <ListScreen loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

// ProjectList.whyDidYouRender = true;

const Container = styled.div`
  width: 100%;
  padding: 3.2rem;
`;

export default ProjectList;
