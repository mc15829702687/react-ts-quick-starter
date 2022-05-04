import React from 'react';
import { Form, Input, Button } from 'antd';

import { useAuth } from 'src/context/auth-context';
import { LongButton } from '.';
import { useAsync } from 'src/utils/use-async';

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values));
    } catch (err: any) {
      onError(err);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type='text' id='username' placeholder='用户名' />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input type='password' id='password' placeholder='密码' />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType='submit' type='primary' loading={isLoading}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
