import React from 'react';
import { Button } from 'antd';
import styled from '@emotion/styled';

import { useAuth } from './context/auth-context';
import ProjectList from './pages/project-list';

export const Authenticated = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header>
        <Button onClick={logout}>退出</Button>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectList />
      </Main>
      <Aside>aside</Aside>
      <Footer>Footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
`;

const Nav = styled.nav`
  grid-area: nav;
`;

const Aside = styled.aside`
  grid-area: aside;
`;

const Main = styled.main`
  grid-area: main;
`;

const Footer = styled.footer`
  grid-area: footer;
`;
