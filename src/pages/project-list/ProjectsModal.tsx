import React from 'react';
import { Drawer, Button } from 'antd';

export const ProjectsModal = (props: { projectModalOpen: boolean; closeProjectsModal: () => void }) => {
  return (
    <Drawer width={'100%'} visible={props.projectModalOpen} onClose={props.closeProjectsModal}>
      <Button onClick={props.closeProjectsModal}>关闭</Button>
    </Drawer>
  );
};
