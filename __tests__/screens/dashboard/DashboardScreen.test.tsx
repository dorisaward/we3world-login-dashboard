import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {DashboardScreen} from '../../../src/screens/dashboard/DashboardScreen';
import items from '../../../src/domain/dashboard/items.json';
import {userActions} from '../../../src/domain/redux/reducers/userReducer';
import {NavigationProp} from '../../../src/domain/navigation/NavigationProp';
import {ScreenNames} from '../../../src/domain/navigation/screenNames';

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

const mockNavigation: NavigationProp = {
  navigation: {navigate: jest.fn()},
  route: {},
} as any;

jest.mock('../../../src/domain/dashboard/fetchItems', () => ({
  fetchItems: jest.fn().mockResolvedValue(undefined),
}));

const mockItemsSelector = jest.fn();
jest.mock('../../../src/domain/redux/reducers/itemsReducer', () => ({
  itemsSelector: mockItemsSelector,
}));

const mockDispatch = jest.fn();
const mockAppSelector = {items: [], loading: false, error: undefined};
jest.mock('../../../src/domain/redux/hooks', () => ({
  useAppDispatch: jest.fn(() => mockDispatch),
  useAppSelector: jest.fn(() => mockAppSelector),
}));

it('should render, given items not yet fetched', () => {
  // Given
  jest.mocked(mockAppSelector).items = [];
  jest.mocked(mockAppSelector).loading = true;
  const renderable = <DashboardScreen {...mockNavigation} />;

  // When
  const {toJSON, getByTestId} = render(renderable);

  // Then
  expect(getByTestId('dashboard-screen-spinner')).toBeTruthy();
  expect(toJSON()).toMatchSnapshot();
});

it('should render, given items fetched', async () => {
  // Given
  jest.mocked(mockAppSelector).items = items as any;
  jest.mocked(mockAppSelector).loading = false;
  const renderable = <DashboardScreen {...mockNavigation} />;
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

it('should render, given items failed to fetch', async () => {
  // Given
  const errorMessage = 'test error';
  jest.mocked(mockAppSelector).loading = false;
  jest.mocked(mockAppSelector).error = errorMessage as any;
  const renderable = <DashboardScreen {...mockNavigation} />;
  const {toJSON, queryByTestId, getByText} = render(renderable);

  // When
  await waitFor(() =>
    expect(queryByTestId('dashboard-screen-spinner')).toBeFalsy(),
  );

  // Then
  expect(getByText(errorMessage)).toBeTruthy();
  expect(toJSON()).toMatchSnapshot();
});

it('should logout, given logout button pressed', () => {
  // Given
  jest.mocked(mockAppSelector).items = [];
  jest.mocked(mockAppSelector).loading = false;
  const renderable = <DashboardScreen {...mockNavigation} />;

  const {getByText} = render(renderable);
  const logoutButton = getByText('logout');

  // When
  fireEvent.press(logoutButton);

  // Then
  expect(mockDispatch).toHaveBeenCalledWith(userActions.logout());
  expect(mockNavigation.navigation.navigate).toHaveBeenCalledWith(
    ScreenNames.Login,
  );
});
