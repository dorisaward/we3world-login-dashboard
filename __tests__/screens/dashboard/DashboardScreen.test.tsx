import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {DashboardScreen} from '../../../src/screens/dashboard/DashboardScreen';

const mockDashboardItemViewText = 'mockDashboardItemViewText'

jest.mock('../../../src/screens/dashboard/components/DashboardItemView', () => ({
  DashboardItemView: (props: any) => {
    const RNText = require('react-native').Text
    return <RNText {...props}>{mockDashboardItemViewText}</RNText>
  }
}))

it('should render', () => {
  // Given
  const renderable = <DashboardScreen navigateToLoginScreen={jest.fn()} />;

  // When
  const {toJSON} = render(renderable);

  // Then
  expect(toJSON()).toMatchSnapshot();
});

it('should navigate, given logout button pressed', () => {
  // Given
  const navigateToLoginScreen = jest.fn();
  const renderable = (
    <DashboardScreen navigateToLoginScreen={navigateToLoginScreen} />
  );
  const {getByText} = render(renderable);
  const logoutButton = getByText('logout');

  // When
  fireEvent.press(logoutButton);

  // Then
  expect(navigateToLoginScreen).toHaveBeenCalled();
});
