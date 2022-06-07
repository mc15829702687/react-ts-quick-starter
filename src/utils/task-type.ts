import { useQuery } from 'react-query';
import { TaskType } from 'src/types/task-type';
import { useHttp } from './http';

export const useTaskTypes = () => {
  // 封装的 fetch 函数
  const client = useHttp();

  return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'));
};
