import React from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { KanbanScreen } from '../kanban';
import { EquipScreen } from '../epic';
import styled from '@emotion/styled';
import { Menu } from 'antd';

const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
};

export const ProjectsScreen = () => {
  const items = [
    {
      label: <Link to={'kanban'}>看板</Link>,
      key: 'kanban',
    },
    {
      label: <Link to={'epic'}>任务组</Link>,
      key: 'epic',
    },
  ];
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode='inline' selectedKeys={[routeType]} items={items}></Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'kanban'} element={<KanbanScreen />}></Route>
          <Route path={'epic'} element={<EquipScreen />}></Route>
          <Route index element={<KanbanScreen />} />
          {/* <Route path={''} element={<Navigate to={window.location.pathname + 'kanban'} replace />}></Route> */}
        </Routes>
      </Main>
    </Container>
  );
};

/**
 * styles
 */
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
  height: 100%;
`;

const Aside = styled.div`
  display: flex;
  background-color: rgb(244, 245, 277);
`;

const Main = styled.div`
  display: flex;
  overflow: hidden;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;
