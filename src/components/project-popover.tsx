import React from 'react';
import styled from '@emotion/styled';
import { Popover, Typography, List, Divider } from 'antd';
import { useProjects } from 'src/utils/projects';

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  const { data: projects } = useProjects();
  const pinProjects = projects?.filter((project) => project.pin);

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
      {props.projectButton}
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
