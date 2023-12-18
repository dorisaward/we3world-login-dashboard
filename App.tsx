import React, {useEffect} from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import {createServer} from 'miragejs';
import items from './src/domain/dashboard/items.json';
import {Provider} from 'react-redux';
import {store} from './src/domain/redux/store';
import {AppWithoutProvider} from './src/screens/AppWithoutProvider';

function App(): React.JSX.Element {
  useEffect(() => {
    const server = createServer({
      routes() {
        this.get('/api/items', () => items);
      },
    });
    return server.shutdown;
  }, []);

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#f5f5dc',
    height: '100%',
    flex: 1,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <AppWithoutProvider />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
