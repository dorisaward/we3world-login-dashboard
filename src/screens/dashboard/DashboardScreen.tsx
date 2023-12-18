import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Button, FlatList, View} from 'react-native';
import {styles} from './DashboardScreen.styles';
import {Item} from '../../domain/dashboard/Item';
import {DashboardItemView} from './components/DashboardItemView';
import {useAppDispatch, useAppSelector} from '../../domain/redux/hooks';
import {fetchItems} from '../../domain/dashboard/fetchItems';
import {itemsSelector} from '../../domain/redux/reducers/itemsReducer';
import {userActions} from '../../domain/redux/reducers/userReducer';

export const DashboardScreen = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const {items, loading} = useAppSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems() as any);
  }, [dispatch]);

  const handleLogout = useCallback(
    () => dispatch(userActions.logout()),
    [dispatch],
  );

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
