import React from 'react';
import {it, expect} from '@jest/globals';
import {LoginScreen} from '../../../src/screens/login/LoginScreen';
import {fireEvent, render} from '@testing-library/react-native';
import {validateLoginDetails} from '../../../src/domain/login/validateLoginDetails';
import {userActions} from '../../../src/domain/redux/reducers/userReducer';
import {NavigationProp} from '../../../src/domain/navigation/NavigationProp';
import {ScreenNames} from '../../../src/domain/navigation/screenNames';

jest.mock('../../../src/domain/login/validateLoginDetails');

const mockDispatch = jest.fn();
jest.mock('../../../src/domain/redux/hooks', () => ({
  useAppDispatch: jest.fn(() => mockDispatch),
  useAppSelector: jest.fn(),
}));

const mockNavigation: NavigationProp = {
  navigation: {navigate: jest.fn()},
  route: {},
} as any;

it('should render', () => {
  // Given
  const renderable = <LoginScreen {...mockNavigation} />;

  // When
  const {toJSON} = render(renderable);

  // Then
  expect(toJSON()).toMatchSnapshot();
});

it('should display error message, given login details not valid', () => {
  // Given
  const errorMessage = 'test error message';
  jest.mocked(validateLoginDetails).mockImplementationOnce(() => errorMessage);

  const renderable = <LoginScreen {...mockNavigation} />;
  const {getByText, queryByText} = render(renderable);
  const loginButton = getByText('login');

  // When
  fireEvent.press(loginButton);

  // Then
  expect(mockDispatch).not.toHaveBeenCalled();
  expect(queryByText(errorMessage)).toBeTruthy();
});

it('should login, given login details valid', () => {
  // Given
  jest.mocked(validateLoginDetails).mockImplementationOnce(() => true);

  const renderable = <LoginScreen {...mockNavigation} />;
  const {getByText} = render(renderable);
  const loginButton = getByText('login');

  // When
  fireEvent.press(loginButton);

  // Then
  expect(mockDispatch).toHaveBeenCalledWith(userActions.login());
  expect(mockNavigation.navigation.navigate).toHaveBeenCalledWith(
    ScreenNames.Dashboard,
  );
});
