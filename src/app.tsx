import React from 'react';
import { Authenticated } from './authenticated-app';
import { useAuth } from './context/auth-context';
import { UnauthenticatedApp } from './unauthenticated-app';

import './app.scss';

function App() {
  const { user } = useAuth();

  return <div className='App'>{user ? <Authenticated /> : <UnauthenticatedApp />}</div>;
}

export default App;
