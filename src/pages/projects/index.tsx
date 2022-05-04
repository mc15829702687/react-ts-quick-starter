import React from 'react';
import { Routes, Route } from 'react-router';
import { Link, Navigate } from 'react-router-dom';
import { KanbanScreen } from '../kanban';
import { EquipScreen } from '../epic';

export const ProjectsScreen = () => {
  return (
    <div>
      <h1>ProjectsScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'kanban'} element={<KanbanScreen />}></Route>
        <Route path={'epic'} element={<EquipScreen />}></Route>
        <Route path={''} element={<Navigate to={window.location.pathname + '/kanban'} />}></Route>
      </Routes>
    </div>
  );
};
