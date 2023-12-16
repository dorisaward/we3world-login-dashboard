import {it, expect, jest} from '@jest/globals';
import {fetchItems} from '../../../src/domain/dashboard/fetchItems';

it('should fetch items', async () => {
  // Given
  const mockJson = {testJson: 'Test'};
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockJson as never),
  } as any);

  // When
  const result = await fetchItems();

  // Then
  expect(global.fetch).toHaveBeenCalledWith('/api/items');
  expect(result).toEqual(mockJson);
});

it('should fail to fetch items, given error', async () => {
  // Given
  const error = new Error('Test error');
  jest.spyOn(global, 'fetch').mockRejectedValueOnce(error);

  // When
  try {
    await fetchItems();
  } catch (e) {
    // Then
    expect(global.fetch).toHaveBeenCalledWith('/api/items');
    expect(e).toEqual(error);
  }
});
