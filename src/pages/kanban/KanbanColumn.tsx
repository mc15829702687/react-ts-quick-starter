import React from 'react';
import { Kanban } from 'src/types/kanban';
import { useTasks } from 'src/utils/task';
import { useTaskTypes } from 'src/utils/task-type';
import { useKanbansQueryKey, useTaskSearchParams, useTasksModal } from './util';

import { ReactComponent as TaskIcon } from 'src/assets/task.svg';
import { ReactComponent as BugIcon } from 'src/assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { CreateTask } from './create-task';
import { Task } from 'src/types/task';
import { Mask } from './mask';
import { useDeleteKanban } from 'src/utils/kanban';
import { Row } from 'src/components/lib';
import { Drag, Drop, DropChild } from 'src/components/drag-and-drop';

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  // Todo: svg导入报错
  return <>{name === 'task' ? '<TaskIcon/>' : '<BugIcon/>'}</>;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTaskSearchParams();

  return (
    <Card style={{ marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => startEdit(task.id)} key={task.id}>
      <Mask keyword={keyword} name={task.name} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban, ...props }, ref) => {
  const { data: allTask } = useTasks(useTaskSearchParams());
  const tasks = allTask?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container ref={ref} {...props}>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        <Drop type='ROW' direction='vertical' droppableId={String(kanban.id)}>
          <DropChild style={{ minHeight: '5px' }}>
            {tasks?.map((task, taskIndex) => (
              <Drag key={task.id} index={taskIndex} draggableId={'task' + task.id}>
                <div>
                  <TaskCard task={task} key={task.id} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>

        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());

  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定要删除吗?',
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };

  const items = [
    {
      label: <Button onClick={startEdit}>删除</Button>,
      key: 'delete',
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items}></Menu>}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  );
};

/**
 * styles
 */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1rem;
`;
const TasksContainer = styled.div`
  flex: 1;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
