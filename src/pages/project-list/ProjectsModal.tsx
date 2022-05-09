import React from 'react';
import { Drawer, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { projectListActions, selectProjectModalOpen } from './project-list.slice';
import { useSelector } from 'react-redux';

export const ProjectsModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer width={'100%'} visible={projectModalOpen} onClose={() => dispatch(projectListActions.closeProjectModal())}>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  );
};
