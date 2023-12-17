import {it, expect, jest} from '@jest/globals';
import {fetchItems} from '../../../src/domain/dashboard/fetchItems';

it('should fetch items', async () => {
  // // Given
  const mockJson = {testJson: 'Test'};
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockJson as never),
  } as any);
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue({
    items: {
      items: [],
    },
  });
  const action = fetchItems();

  // When
  await action(dispatch, getState, undefined);

  // Then
  expect(global.fetch).toHaveBeenCalledWith('/api/items');
});

it('should fail to fetch items, given error', async () => {
  // Given
  const error = new Error('Test error');
  jest.spyOn(global, 'fetch').mockRejectedValueOnce(error);
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue({
    items: {
      items: [],
    },
  });
  const action = fetchItems();

  // When
  try {
    await action(dispatch, getState, undefined);
  } catch (e) {
    // Then
    expect(global.fetch).toHaveBeenCalledWith('/api/items');
    expect(e).toEqual(error);
  }
});
