import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

function App(): React.JSX.Element {
  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: 'cyan',
    height: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>We3World Login Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
