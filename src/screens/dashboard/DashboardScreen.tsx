import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Button, FlatList, View} from 'react-native';
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
  const {items, loading} = useAppSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems() as any);
  }, [dispatch]);

  useEffect(preventAndroidBack, []);

  const handleLogout = useCallback(() => {
    dispatch(userActions.logout());
    navigation.navigate(ScreenNames.Login);
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
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
