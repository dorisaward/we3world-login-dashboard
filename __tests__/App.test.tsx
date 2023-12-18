import 'react-native';
import React from 'react';
import App from '../App';
import {it, expect} from '@jest/globals';
import {render} from '@testing-library/react-native';

jest.mock('miragejs', () => ({
  createServer: () => ({
    server: {
      shutdown: jest.fn(),
    },
  }),
}));
jest.mock('../src/screens/AppWithoutProvider');
jest.mock('react-redux', () => ({
  Provider: (props: any) => {
    const RNView = require('react-native').View;
    return <RNView {...props} />;
  },
}));

it('renders correctly', () => {
  // Given
  const renderable = <App />;

  // When
  const {toJSON} = render(renderable);

  // Then
  expect(toJSON()).toMatchSnapshot();
});
