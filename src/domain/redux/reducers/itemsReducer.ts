import {createSlice} from '@reduxjs/toolkit';
import {fetchItems} from '../../dashboard/fetchItems';
import {Item} from '../../dashboard/Item';

export type ItemsState = {
  items: Item[];
  loading: boolean;
  error?: string;
};

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: undefined,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.error.message === 'string') {
        state.error = action.error.message;
      } else {
        state.error = 'Unknown error';
      }
    });
  },
});

export const itemsReducer = itemsSlice.reducer;

export const itemsSelector = (state: {items: ItemsState}) => state.items;
