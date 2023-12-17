import {createAsyncThunk} from '@reduxjs/toolkit';
import {Item} from './Item';

/**
 * An async redux thunk to fetch the {@link Item}s to be displayed
 */
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await fetch('/api/items');
  const responseJson: Item[] = await response.json();
  return responseJson;
});
