import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import {LoginScreen} from './src/screens/login/LoginScreen';
import {DashboardScreen} from './src/screens/dashboard/DashboardScreen';

function App(): React.JSX.Element {
  const [screenToDisplay, setScreenToDisplay] = useState<screen>(screen.Login);
  const navigateToDashboard = useCallback(
    () => setScreenToDisplay(screen.Dashboard),
    [],
  );
  const navigateToLoginScreen = useCallback(
    () => setScreenToDisplay(screen.Login),
    [],
  );
  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#f5f5dc',
    height: '100%',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {screenToDisplay === screen.Login ? (
        <LoginScreen navigateToDashboard={navigateToDashboard} />
      ) : (
        <DashboardScreen navigateToLoginScreen={navigateToLoginScreen} />
      )}
    </SafeAreaView>
  );
}

enum screen {
  Login = 'Login',
  Dashboard = 'Dashboard',
}

export default App;
