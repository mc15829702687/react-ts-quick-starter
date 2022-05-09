import { configureStore } from '@reduxjs/toolkit';
import { projectListSlice } from 'src/pages/project-list/project-list.slice';
import { authSlice } from './auth.slice';

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

// ReturnType 返回函数返回值类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
