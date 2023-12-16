import React from 'react';
import {ListRenderItem, Text, View} from 'react-native';
import {styles} from './DashboardItemView.styles';
import {Item} from '../../../domain/dashboard/Item';

export const DashboardItemView: ListRenderItem<Item> = ({
  item: {name, description},
}) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);
