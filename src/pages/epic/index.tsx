import { Button, List, Modal } from 'antd';
import React, { useState } from 'react';
import { Row } from 'src/components/lib';
import { useDeleteEpic, useEpics } from 'src/utils/epic';
import { Container } from '../kanban';
import { useProjectInUrl } from '../kanban/util';
import { useEpicSearchParams, useEpicsQueryKey } from './util';
import dayjs from 'dayjs';
import { useTasks } from 'src/utils/task';
import { Link } from 'react-router-dom';
import { Epic } from 'src/types/epic';
import { CreateEpic } from './create-epic';

export const EquipScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组: ${epic.name}`,
      content: '点击删除',
      okText: '确定',
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <Container>
      <Row between>
        <h1>{currentProject?.name}任务组</h1>
        <Button
          onClick={() => {
            setEpicCreateOpen(true);
          }}
          type='link'
        >
          创建任务组
        </Button>
      </Row>
      <List
        dataSource={epics}
        itemLayout={'vertical'}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between>
                  <span>{epic.name}</span>
                  <Button type='link' onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link key={task.id} to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />

      <CreateEpic visible={epicCreateOpen} onClose={() => setEpicCreateOpen(false)} />
    </Container>
  );
};
