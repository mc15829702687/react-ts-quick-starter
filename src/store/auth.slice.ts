import { createSlice } from '@reduxjs/toolkit';
import { AuthForm, bootstrapUser } from 'src/context/auth-context';
import { User } from 'src/pages/project-list/SearchPannel';
import { AppDispatch, RootState } from '.';
import * as auth from 'src/auth-provide';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) => bootstrapUser().then((user) => dispatch(setUser(user)));
