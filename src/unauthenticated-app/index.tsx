import React, { useState } from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';

import LoginScreen from './login';
import RegisterScreen from './register';
import { useDocumentTitle } from 'src/utils';

import logo from 'src/assets/logo.svg';
import left from 'src/assets/left.svg';
import right from 'src/assets/right.svg';
import { ErrorBox } from 'src/components/lib';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle('请登录或者注册', false);

  return (
    <Container>
      {/* <Helmet>
        <title>请登录或者注册~</title>
      </Helmet> */}
      <Header />
      <Background />
      <ShadowCrad>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        <ErrorBox error={error} />
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        <Button type='link' onClick={(e) => setIsRegister(!isRegister)}>
          {isRegister ? '已经有账号？直接登录' : '没有账号？注册新账号'}
        </Button>
      </ShadowCrad>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const ShadowCrad = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  text-align: center;
`;

const Header = styled.div`
  width: 100%;
  padding: 5rem 0;
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
