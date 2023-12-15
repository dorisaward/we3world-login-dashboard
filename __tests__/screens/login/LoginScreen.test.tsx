import React from 'react';
import {it, expect} from '@jest/globals';
import {LoginScreen} from '../../../src/screens/login/LoginScreen';
import {fireEvent, render} from '@testing-library/react-native';
import {validateLoginDetails} from '../../../src/domain/login/validateLoginDetails';

jest.mock('../../../src/domain/login/validateLoginDetails');

it('should render', () => {
  // Given
  const renderable = <LoginScreen navigateToDashboard={jest.fn()} />;

  // When
  const {toJSON} = render(renderable);

  // Then
  expect(toJSON()).toMatchSnapshot();
});

it('should display error message, given login details not valid', () => {
  // Given
  const errorMessage = 'test error message';
  jest.mocked(validateLoginDetails).mockImplementationOnce(() => errorMessage);

  const navigateToDashboard = jest.fn();
  const renderable = <LoginScreen navigateToDashboard={navigateToDashboard} />;
  const {getByText, queryByText} = render(renderable);
  const loginButton = getByText('login');

  // When
  fireEvent.press(loginButton);

  // Then
  expect(navigateToDashboard).not.toHaveBeenCalled();
  expect(queryByText(errorMessage)).toBeTruthy();
});

it('should navigate, given login details valid', () => {
  // Given
  jest.mocked(validateLoginDetails).mockImplementationOnce(() => true);

  const navigateToDashboard = jest.fn();
  const renderable = <LoginScreen navigateToDashboard={navigateToDashboard} />;
  const {getByText} = render(renderable);
  const loginButton = getByText('login');

  // When
  fireEvent.press(loginButton);

  // Then
  expect(navigateToDashboard).toHaveBeenCalled();
});
