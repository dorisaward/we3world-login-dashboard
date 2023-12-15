import 'react-native';
import React from 'react';
import App from '../App';
import {it, expect} from '@jest/globals';
import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  // Given
  const renderable = <App />;

  // When
  const {toJSON} = render(renderable);

  // Then
  expect(toJSON()).toMatchSnapshot();
});
