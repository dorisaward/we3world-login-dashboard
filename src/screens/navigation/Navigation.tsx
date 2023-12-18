import React from 'react';
import {useAppSelector} from '../../domain/redux/hooks';
import {userIsAuthenticatedSelector} from '../../domain/redux/reducers/userReducer';
import {DashboardScreen} from '../dashboard/DashboardScreen';
import {LoginScreen} from '../login/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleProp, ViewStyle} from 'react-native';
import {ScreenNames} from '../../domain/navigation/screenNames';

export const Navigation = (): React.JSX.Element => {
  const userIsLoggedIn = useAppSelector(userIsAuthenticatedSelector);

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#f5f5dc',
  };

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: backgroundStyle,
        headerShown: false,
        gestureEnabled: false,
        animation: 'slide_from_bottom',
      }}
      initialRouteName={
        userIsLoggedIn ? ScreenNames.Dashboard : ScreenNames.Login
      }>
      <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
      <Stack.Screen name={ScreenNames.Dashboard} component={DashboardScreen} />
    </Stack.Navigator>
  );
};
