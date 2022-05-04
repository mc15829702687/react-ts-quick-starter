import React from 'react';
import { Form, Input } from 'antd';

import { useAuth } from 'src/context/auth-context';
import { LongButton } from '.';
import { useAsync } from 'src/utils/use-async';

const RegisterScreen = ({ onError }: { onError: (error: Error | null) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({ cpassword, ...values }: { username: string; cpassword: string; password: string }) => {
    // e.preventDefault();
    // const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    if (cpassword !== values.password) {
      onError(new Error(`输入的密码和上次输入的密码不一样~`));
      return;
    }
    try {
      await run(register(values));
    } catch (err: any) {
      onError(err);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type='text' placeholder='用户名' id='username' />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input type='password' placeholder='密码' id='password' />
      </Form.Item>
      <Form.Item name='cpassword' rules={[{ required: true, message: '请确认密码' }]}>
        <Input type='password' placeholder='密码' id='cpassword' />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType='submit' type='primary' loading={isLoading}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
