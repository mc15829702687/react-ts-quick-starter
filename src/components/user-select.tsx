import React from 'react';

import { useUsers } from 'src/utils/user';
import { IdSelect } from './id-select';

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();

  return <IdSelect options={users || []} {...props}></IdSelect>;
};
