import React, {useEffect} from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import {createServer} from 'miragejs';
import items from './src/domain/dashboard/items.json';
import {Provider} from 'react-redux';
import {store} from './src/domain/redux/store';
import {Navigation} from './src/screens/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  useEffect(() => {
    const server = createServer({
      routes() {
        this.get('/api/items', () => items);
      },
    });
    return server.shutdown;
  }, []);

  const safeAreaViewStyles: StyleProp<ViewStyle> = {
    flex: 1,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={safeAreaViewStyles}>
          <Navigation />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
