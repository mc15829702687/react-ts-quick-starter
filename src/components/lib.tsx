import React from 'react';
import { Spin, Typography, Button } from 'antd';
import styled from '@emotion/styled';

export const Row = styled.div<{
  gap?: number | boolean | undefined;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  align-items: center;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom + 'rem' : undefined)};
  > * {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: ${(props) => (typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined)};
  }
`;

// 全屏的 Loading
export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size='large' />
    </FullPage>
  );
};
const FullPage = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

// 全屏的报错
export const FullPageError = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <ErrorBox error={error} />
    </FullPage>
  );
};

// 类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type='danger'>{error?.message}</Typography.Text>;
  }
  return null;
};

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
