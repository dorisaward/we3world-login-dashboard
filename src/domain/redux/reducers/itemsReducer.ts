import {createSlice} from '@reduxjs/toolkit';
import {fetchItems} from '../../dashboard/fetchItems';
import {Item} from '../../dashboard/Item';

export type ItemsState = {
  items: Item[];
  loading: boolean;
};

const initialState: ItemsState = {
  items: [],
  loading: false,
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
    });
    builder.addCase(fetchItems.rejected, state => {
      state.loading = false;
    });
  },
});

export const itemsReducer = itemsSlice.reducer;

export const itemsSelector = (state: {items: ItemsState}) => state.items;
