import React from 'react';
import {render} from '@testing-library/react-native';
import {DashboardItemView} from '../../../../src/screens/dashboard/components/DashboardItemView';
import {ListRenderItemInfo} from 'react-native';
import {Item} from '../../../../src/domain/dashboard/Item';

it('should render', () => {
  // Given
  const item: Item = {
    id: 'test-id',
    name: 'test-name',
    description: 'test-description',
  };
  const renderable = <DashboardItemView item={item} {...otherProps} />;

  // When
  const {toJSON} = render(renderable);

  // Then
  expect(toJSON()).toMatchSnapshot();
});

const otherProps: Pick<ListRenderItemInfo<Item>, 'separators' | 'index'> = {
  separators: {
    highlight: jest.fn(),
    unhighlight: jest.fn(),
    updateProps: jest.fn(),
  },
  index: 0,
};
