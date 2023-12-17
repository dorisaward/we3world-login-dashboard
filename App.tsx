import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import {LoginScreen} from './src/screens/login/LoginScreen';
import {DashboardScreen} from './src/screens/dashboard/DashboardScreen';
import {createServer} from 'miragejs';
import items from './src/domain/dashboard/items.json';
import {Provider} from 'react-redux';
import {store} from './src/domain/redux/store';

function App(): React.JSX.Element {
  const [screenToDisplay, setScreenToDisplay] = useState<screen>(screen.Login);

  useEffect(() => {
    const server = createServer({
      routes() {
        this.get('/api/items', () => items);
      },
    });
    return server.shutdown;
  }, []);

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
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        {screenToDisplay === screen.Login ? (
          <LoginScreen navigateToDashboard={navigateToDashboard} />
        ) : (
          <DashboardScreen navigateToLoginScreen={navigateToLoginScreen} />
        )}
      </SafeAreaView>
    </Provider>
  );
}

enum screen {
  Login = 'Login',
  Dashboard = 'Dashboard',
}

export default App;
