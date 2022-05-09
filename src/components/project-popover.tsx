import React from 'react';
import styled from '@emotion/styled';
import { Popover, Typography, List, Divider } from 'antd';
import { useProjects } from 'src/utils/projects';
import { ButtonNoPadding } from 'src/components/lib';
import { useProjectModal } from 'src/pages/project-list/util';

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const pinProjects = projects?.filter((project) => project.pin);
  const { open } = useProjectModal();

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List
        dataSource={pinProjects}
        renderItem={(project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        )}
      ></List>
      <Divider />
      <ButtonNoPadding type='link' onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement='bottom' content={content}>
      <span>项目</span>
    </Popover>
  );
};

/**
 * style
 */
const ContentContainer = styled.div`
  width: 32rem;
`;
