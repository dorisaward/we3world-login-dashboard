import React from 'react';
import {render} from '@testing-library/react-native';
import {AppWithoutProvider} from '../../src/screens/AppWithoutProvider';

jest.mock('../../src/domain/redux/reducers/userReducer', () => ({
  userIsAuthenticatedSelector: jest.fn(),
}));

let mockAppSelector = true;
jest.mock('../../src/domain/redux/hooks', () => ({
  useAppSelector: jest.fn(() => mockAppSelector),
  useAppDispatch: jest.fn(),
}));

const mockDashboardScreenText = 'mockDashboardScreenText';
jest.mock('../../src/screens/dashboard/DashboardScreen', () => ({
  DashboardScreen: (props: any) => {
    const RNText = require('react-native').Text;
    return <RNText {...props}>{mockDashboardScreenText}</RNText>;
  },
}));

const mockLoginScreenText = 'mockLoginScreenText';
jest.mock('../../src/screens/login/LoginScreen', () => ({
  LoginScreen: (props: any) => {
    const RNText = require('react-native').Text;
    return <RNText {...props}>{mockLoginScreenText}</RNText>;
  },
}));

it('should render login screen, given user not logged in', () => {
  // Given
  mockAppSelector = false;
  const renderable = <AppWithoutProvider />;

  // When
  const {getByText, queryByText} = render(renderable);

  // Then
  expect(getByText(mockLoginScreenText)).toBeTruthy();
  expect(queryByText(mockDashboardScreenText)).toBeFalsy();
});

it('should render dashboard screen, given user logged in', () => {
  // Given
  mockAppSelector = true;
  const renderable = <AppWithoutProvider />;

  // When
  const {getByText, queryByText} = render(renderable);

  // Then
  expect(getByText(mockDashboardScreenText)).toBeTruthy();
  expect(queryByText(mockLoginScreenText)).toBeFalsy();
});
