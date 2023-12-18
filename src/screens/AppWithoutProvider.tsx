import React from 'react';
import {useAppSelector} from '../domain/redux/hooks';
import {userIsAuthenticatedSelector} from '../domain/redux/reducers/userReducer';
import {DashboardScreen} from './dashboard/DashboardScreen';
import {LoginScreen} from './login/LoginScreen';

export const AppWithoutProvider = (): React.JSX.Element => {
  const userIsLoggedIn = useAppSelector(userIsAuthenticatedSelector);

  return userIsLoggedIn ? <DashboardScreen /> : <LoginScreen />;
};
