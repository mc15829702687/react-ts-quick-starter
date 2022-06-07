import styled from '@emotion/styled';
import { Spin } from 'antd';
import React, { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Drag, Drop, DropChild } from 'src/components/drag-and-drop';
import { useDocumentTitle } from 'src/utils';
import { useKanbans, useReorderKanban } from 'src/utils/kanban';
import { useReorderTask, useTasks } from 'src/utils/task';
import { CreateKanban } from './create-kanban';
import { KanbanColumn } from './KanbanColumn';
import { SearchPanel } from './search-panel';
import { TaskModal } from './task-modal';
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTaskSearchParams,
  useTasksQueryKey,
} from './util';

export const KanbanScreen = () => {
  useDocumentTitle('看板列表');
  const { data: project } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskLoading } = useTasks(useTaskSearchParams());

  const isLoading = kanbanLoading || taskLoading;

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <h2>{project?.name}看板</h2>
        <SearchPanel />
        {isLoading ? (
          <Spin size='large' />
        ) : (
          <ColumnsContainer>
            <Drop type='COLUMN' direction='horizontal' droppableId='kanban'>
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => {
                  return (
                    <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                      <KanbanColumn kanban={kanban} />
                    </Drag>
                  );
                })}
              </DropChild>
            </Drop>

            <CreateKanban />
          </ColumnsContainer>
        )}

        <TaskModal />
      </Container>
    </DragDropContext>
  );
};

const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { data: allTask = [] } = useTasks(useTaskSearchParams());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? 'after' : 'before';
        reorderKanban({ fromId, referenceId: toId, type });
      }

      if (type === 'ROW') {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;

        // if (fromKanbanId === toKanbanId) {
        //   return;
        // }
        const fromTask = allTask.filter((task) => task.kanbanId === fromKanbanId)[source.index];
        const toTask = allTask.filter((task) => task.kanbanId === toKanbanId)[destination.index];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before',
        });
      }
    },
    [allTask, kanbans, reorderKanban, reorderTask],
  );
};

/**
 * styles
 */
export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;
