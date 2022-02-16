import React, { useEffect, useState } from 'react';

import SearchPannel from './SearchPannel';
import List from './list';

import { cleanObject, useMount, useDebounce } from 'utils/utils';
import { useHttp } from 'src/utils/http';

const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const debounceParam = useDebounce<object>(param, 200);

  const client = useHttp();

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParam) }).then(setProjects);
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <div>
      <SearchPannel users={users} param={param} setParam={setParam} />
      <List projects={projects} users={users} />
    </div>
  );
};

export default ProjectList;
