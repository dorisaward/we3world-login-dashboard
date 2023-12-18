import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View} from 'react-native';
import {styles} from './DashboardScreen.styles';
import {Item} from '../../domain/dashboard/Item';
import {DashboardItemView} from './components/DashboardItemView';
import {useAppDispatch, useAppSelector} from '../../domain/redux/hooks';
import {fetchItems} from '../../domain/dashboard/fetchItems';
import {itemsSelector} from '../../domain/redux/reducers/itemsReducer';
import {userActions} from '../../domain/redux/reducers/userReducer';
import {NavigationProp} from '../../domain/navigation/NavigationProp';
import {ScreenNames} from '../../domain/navigation/screenNames';
import {preventAndroidBack} from '../../domain/navigation/preventAndroidBack';

export const DashboardScreen = ({
  navigation,
}: NavigationProp): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const {items, loading, error} = useAppSelector(itemsSelector);

  const tryToFetchItems = useCallback(() => {
    dispatch(fetchItems() as any);
  }, [dispatch]);

  useEffect(tryToFetchItems, [tryToFetchItems]);

  useEffect(preventAndroidBack, []);

  const handleLogout = useCallback(() => {
    dispatch(userActions.logout());
    navigation.navigate(ScreenNames.Login);
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      {error && (
        <>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button title="retry" onPress={tryToFetchItems} />
        </>
      )}
      {loading ? (
        <ActivityIndicator
          testID="dashboard-screen-spinner"
          color={'mediumvioletred'}
          style={styles.activityIndicaton}
          size={'large'}
        />
      ) : (
        <FlatList
          data={items}
          renderItem={DashboardItemView}
          keyExtractor={keyExtractor}
        />
      )}
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
};

const keyExtractor = (item: Item) => item.id;
