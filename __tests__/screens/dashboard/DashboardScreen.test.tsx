import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {DashboardScreen} from '../../../src/screens/dashboard/DashboardScreen';
import items from '../../../src/domain/dashboard/items.json';
import {fetchItems} from '../../../src/domain/dashboard/fetchItems';

const mockDashboardItemViewText = 'mockDashboardItemViewText';

jest.mock(
  '../../../src/screens/dashboard/components/DashboardItemView',
  () => ({
    DashboardItemView: (props: any) => {
      const RNText = require('react-native').Text;
      return <RNText {...props}>{mockDashboardItemViewText}</RNText>;
    },
  }),
);

jest.mock('../../../src/domain/dashboard/fetchItems', () => ({
  fetchItems: jest.fn().mockResolvedValue(undefined),
}));

it('should render, given items not yet fetched', () => {
  // Given
  const renderable = <DashboardScreen navigateToLoginScreen={jest.fn()} />;

  // When
  const {toJSON, getByTestId} = render(renderable);

  // Then
  expect(getByTestId('dashboard-screen-spinner')).toBeTruthy();
  expect(toJSON()).toMatchSnapshot();
});

it('should render, given items fetched', async () => {
  // Given
  jest.mocked(fetchItems).mockResolvedValueOnce(items);
  const renderable = <DashboardScreen navigateToLoginScreen={jest.fn()} />;
  const {toJSON, queryByTestId, getAllByText} = render(renderable);

  // When
  await waitFor(() =>
    expect(queryByTestId('dashboard-screen-spinner')).toBeFalsy(),
  );

  // Then
  expect(queryByTestId('dashboard-screen-spinner')).toBeFalsy();
  expect(getAllByText(mockDashboardItemViewText)).toHaveLength(3);
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
