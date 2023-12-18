import React, {useCallback, useEffect, useState} from 'react';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import {styles} from './LoginScreen.styles';
import {validateLoginDetails} from '../../domain/login/validateLoginDetails';
import {useAppDispatch} from '../../domain/redux/hooks';
import {userActions} from '../../domain/redux/reducers/userReducer';
import {ScreenNames} from '../../domain/navigation/screenNames';
import {NavigationProp} from '../../domain/navigation/NavigationProp';
import {preventAndroidBack} from '../../domain/navigation/preventAndroidBack';

export const LoginScreen = ({
  navigation,
}: NavigationProp): React.JSX.Element => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const dispatch = useAppDispatch();

  useEffect(preventAndroidBack, []);

  const handleSubmitLoginDetails = useCallback(() => {
    const validation = validateLoginDetails(email, password);
    if (typeof validation === 'string') {
      setErrorMessage(validation);
    } else if (validation) {
      setErrorMessage(undefined);
      dispatch(userActions.login());
      navigation.navigate(ScreenNames.Dashboard);
    }
  }, [email, password, setErrorMessage, dispatch, navigation]);

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
