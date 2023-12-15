import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    flex: 1,
  },
  header: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
