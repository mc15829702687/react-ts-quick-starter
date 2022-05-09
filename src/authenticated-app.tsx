import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import { Routes, Route, Navigate } from 'react-router';
import { HashRouter as Router, Link } from 'react-router-dom';

import { useAuth } from './context/auth-context';
import ProjectList from './pages/project-list';
import { Row } from './components/lib';
import { resetRoute, useDocumentTitle } from 'src/utils';
import { Test } from './test';

import { ReactComponent as SoftwareLogo } from 'src/assets/software-logo.svg';
import { ProjectsScreen } from './pages/projects';
import { ProjectsModal } from 'src/pages/project-list/ProjectsModal';
import { ProjectPopover } from './components/project-popover';

/**
 * grid 和 flex 依赖的场景
 * 1. 一般，一维布局用 flex, 二维布局用 grid
 * 2. 是从内容出发还是从布局出发?
 *    从内容出发: 先有一组数据(数量不定), 希望将它们均匀分布在容器中，由内容自己决定
 *    从布局出发: 先规划好布局，然后将元素依次填充
 *    从内容出发用 flex, 从布局出发用 grid
 * @returns
 */

export const Authenticated = () => {
  useDocumentTitle('列表界面', false);

  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/projects' />} />
            <Route path='projects' element={<ProjectList />} />
            <Route path='projects/:projectId/*' element={<ProjectsScreen />} />
          </Routes>
        </Router>
      </Main>

      <ProjectsModal />
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between>
      <HeaderLeft gap={2}>
        <Button type={'link'} onClick={resetRoute}>
          <SoftwareLogo width='18rem' color='rgb(38, 132, 255)' />
        </Button>
        <ProjectPopover />
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key='logout'>
            <Button type='link' onClick={logout}>
              退出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type='link' onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

/**
 * style
 */
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
