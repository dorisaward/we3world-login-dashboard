import React, {useState, useCallback} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {LoginScreen} from './src/screens/login/LoginScreen';

function App(): React.JSX.Element {
  const [screenToDisplay, setScreenToDisplay] = useState<screen>(screen.Login);
  const navigateToDashboard = useCallback(
    () => setScreenToDisplay(screen.Dashboard),
    [],
  );
  const navigateToLoginScreen = useCallback(
    () => setScreenToDisplay(screen.Login),
    []
  )
  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#f5f5dc',
    height: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>We3World Login Page</Text>
          {screenToDisplay === screen.Login ? (
            <LoginScreen navigateToDashboard={navigateToDashboard} />
          ) : <Button title='logout' onPress={navigateToLoginScreen}/>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

enum screen {
  Login = 'Login',
  Dashboard = 'Dashboard',
}

export default App;
