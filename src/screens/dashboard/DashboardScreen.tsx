import React from 'react';
import {Button, FlatList, View} from 'react-native';
import {styles} from './DashboardScreen.styles';
import {Item} from '../../domain/dashboard/Item';
import {DashboardItemView} from './components/DashboardItemView';

type Props = {
  /**
   * Unrenders the dashboard screen and renders the {@link LoginScreen}
   */
  navigateToLoginScreen: () => void;
};

export const DashboardScreen = ({
  navigateToLoginScreen,
}: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={DashboardItemView}
        keyExtractor={keyExtractor}
      />
      <Button title="logout" onPress={navigateToLoginScreen} />
    </View>
  );
};

const keyExtractor = (item: Item) => item.id;

const dummyData: Item[] = [
  {
    id: '0',
    name: 'Item 1',
    description: 'Description aesrdthfjfdhgzxchjvn srdthsrtrdhf srdthfyg',
  },
  {
    id: '1',
    name: 'Item 2',
    description: 'chgncgnbdhthdt sxchncgbdxgcnb xfrhfyjmfyhm xfgtsrtgsdrg',
  },
  {
    id: '2',
    name: 'Item 3',
    description: 'zxfhbvcbngnhjfdtj aesrdthfjfdhgzxchjvn srdthsrtrdhf srdthfyg',
  },
];
