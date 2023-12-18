import React from 'react';
import {render} from '@testing-library/react-native';
import {Navigation} from '../../src/screens/navigation/Navigation';
import {ScreenNames} from '../../src/domain/navigation/screenNames';

const navigatorTestID = 'navigatorTestID';
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children, ...props}: any) => {
      const RNView = require('react-native').View;
      return (
        <RNView testID={navigatorTestID} {...props}>
          {children}
        </RNView>
      );
    },
    Screen: ({component, ...props}: any) => {
      const RNView = require('react-native').View;
      return <RNView {...props}>{component()}</RNView>;
    },
  }),
}));

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
  const renderable = <Navigation />;

  // When
  const {getByText, getByTestId} = render(renderable);

  // Then
  expect(getByTestId(navigatorTestID).props.initialRouteName).toEqual(
    ScreenNames.Login,
  );
  expect(getByText(mockLoginScreenText)).toBeTruthy();
});

it('should render dashboard screen, given user logged in', () => {
  // Given
  mockAppSelector = true;
  const renderable = <Navigation />;

  // When
  const {getByText, getByTestId} = render(renderable);

  // Then
  expect(getByTestId(navigatorTestID).props.initialRouteName).toEqual(
    ScreenNames.Dashboard,
  );
  expect(getByText(mockDashboardScreenText)).toBeTruthy();
});
