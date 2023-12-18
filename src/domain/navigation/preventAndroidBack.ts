import {BackHandler} from 'react-native';

/**
 * Prevent user from going to the login screen without logging out
 * and going to the dashboard without logging in
 */
export const preventAndroidBack = () => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    console.log('Dont go back'); // Left in for debugging
    return true;
  });
  return backHandler.remove;
};
