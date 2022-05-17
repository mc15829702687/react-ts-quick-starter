import React, { useEffect } from 'react';
import { Drawer, Button, Spin, Form, Input } from 'antd';
import { useProjectModal } from './util';
import { UserSelect } from 'src/components/user-select';
import { useAddProjects, useEditProjects, useProjectsQueryKey } from 'src/utils/projects';
import { ErrorBox } from 'src/components/lib';
import styled from '@emotion/styled';

export const ProjectsModal = () => {
  const { projectModalOpen, close, isLoading, editingProject } = useProjectModal();
  const useMutateProject = editingProject ? useEditProjects : useAddProjects;

  const { mutateAsync, isLoading: mutateLoading, error } = useMutateProject(useProjectsQueryKey());
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? '编辑项目' : '添加项目';

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [form, editingProject]);

  const onClose = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer width={'100%'} visible={projectModalOpen} onClose={onClose} forceRender>
      <Container>
        {isLoading ? (
          <Spin size='large' />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form layout={'vertical'} onFinish={onFinish} form={form} style={{ width: '40rem' }}>
              <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入项目名' }]}>
                <Input placeholder='请输入项目名' />
              </Form.Item>
              <Form.Item label='部门' name='organization' rules={[{ required: true, message: '请输入部门名称' }]}>
                <Input placeholder='请输入部门名称' />
              </Form.Item>
              <Form.Item label='负责人' name='personId'>
                <UserSelect defaultOptionName='负责人' />
              </Form.Item>
              <Form.Item>
                <Button loading={mutateLoading} type='primary' htmlType='submit'>
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
