import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useTasksModal, useTasksQueryKey } from './util';
import { useDeleteTask, useEdiTasks } from 'src/utils/task';
import { UserSelect } from 'src/components/user-select';
import { TaskTypeSelect } from 'src/components/task-type-select';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const TaskModal = () => {
  const [form] = Form.useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEdiTasks(useTasksQueryKey());
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定要删除吗?',
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  return (
    <Modal
      onOk={onOk}
      onCancel={onCancel}
      okText={'确认'}
      cancelText={'取消'}
      confirmLoading={editLoading}
      title='编辑任务'
      visible={!!editingTaskId}
      forceRender
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item label='任务名' name='name' rules={[{ required: true, message: '请输入任务名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='经办人' name='processorId'>
          <UserSelect defaultOptionName='经办人' />
        </Form.Item>
        <Form.Item label='类型' name='typeId'>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button size='small' style={{ fontSize: '14px' }} onClick={startDelete}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
