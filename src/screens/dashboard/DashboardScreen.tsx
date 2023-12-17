import React, {useEffect} from 'react';
import {ActivityIndicator, Button, FlatList, View} from 'react-native';
import {styles} from './DashboardScreen.styles';
import {Item} from '../../domain/dashboard/Item';
import {DashboardItemView} from './components/DashboardItemView';
import {useAppDispatch, useAppSelector} from '../../domain/redux/hooks';
import {fetchItems} from '../../domain/dashboard/fetchItems';
import {itemsSelector} from '../../domain/redux/reducers/itemsReducer';

type Props = {
  /**
   * Unrenders the dashboard screen and renders the {@link LoginScreen}
   */
  navigateToLoginScreen: () => void;
};

export const DashboardScreen = ({
  navigateToLoginScreen,
}: Props): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const {items, loading} = useAppSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems() as any);
  }, [dispatch]);

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
      <Button title="logout" onPress={navigateToLoginScreen} />
    </View>
  );
};

const keyExtractor = (item: Item) => item.id;
