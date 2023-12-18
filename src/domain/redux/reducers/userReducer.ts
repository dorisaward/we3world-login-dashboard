import {createSlice} from '@reduxjs/toolkit';

type UserState = {
  userIsAuthenticated: boolean;
};

const initialState: UserState = {
  userIsAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: state => {
      state.userIsAuthenticated = true;
    },
    logout: state => {
      state.userIsAuthenticated = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userIsAuthenticatedSelector = (state: {user: UserState}) =>
  state.user.userIsAuthenticated;
