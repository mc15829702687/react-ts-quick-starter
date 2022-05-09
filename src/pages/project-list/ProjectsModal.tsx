import React from 'react';
import { Drawer, Button } from 'antd';
import { useProjectModal } from './util';

export const ProjectsModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width={'100%'} visible={projectModalOpen} onClose={close}>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
