import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, View} from 'react-native';
import {styles} from './DashboardScreen.styles';
import {Item} from '../../domain/dashboard/Item';
import {DashboardItemView} from './components/DashboardItemView';
import {fetchItems} from '../../domain/dashboard/fetchItems';

type Props = {
  /**
   * Unrenders the dashboard screen and renders the {@link LoginScreen}
   */
  navigateToLoginScreen: () => void;
};

export const DashboardScreen = ({
  navigateToLoginScreen,
}: Props): React.JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchItems().then(fetchedItems => {
      setItems(fetchedItems);
      setLoading(false);
    });
  }, []);
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
