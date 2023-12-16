import React, {useCallback, useState} from 'react';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import {styles} from './LoginScreen.styles';
import {validateLoginDetails} from '../../domain/login/validateLoginDetails';

type Props = {
  /**
   * Unrenders the login screen and renders the {@link DashboardScreen}
   */
  navigateToDashboard: () => void;
};

export const LoginScreen = ({
  navigateToDashboard,
}: Props): React.JSX.Element => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const handleSubmitLoginDetails = useCallback(() => {
    const validation = validateLoginDetails(email, password);
    if (typeof validation === 'string') {
      setErrorMessage(validation);
    } else if (validation) {
      setErrorMessage(undefined);
      navigateToDashboard();
    }
  }, [email, password, setErrorMessage, navigateToDashboard]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <Text style={styles.header}>Please enter your email and password</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          placeholder="email address"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          placeholder="password"
          onChangeText={setPassword}
        />
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <Button title="login" onPress={handleSubmitLoginDetails} />
      </View>
    </ScrollView>
  );
};
