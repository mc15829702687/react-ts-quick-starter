import styled from '@emotion/styled';
import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd';
import React, { useEffect } from 'react';
import { ErrorBox } from 'src/components/lib';
import { useAddEpic } from 'src/utils/epic';
import { useProjectIdInUrl } from '../kanban/util';
import { useEpicsQueryKey } from './util';

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
  const { mutateAsync: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = Form.useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer visible={props.visible} onClose={props.onClose} forceRender width={'100%'}>
      <Container>
        {isLoading ? (
          <Spin size='large' />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form layout={'vertical'} onFinish={onFinish} form={form} style={{ width: '40rem' }}>
              <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入任务名' }]}>
                <Input placeholder='请输入任务名' />
              </Form.Item>
              <Form.Item>
                <Button loading={isLoading} type='primary' htmlType='submit'>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

/**
 * styles
 */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
`;
