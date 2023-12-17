import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers/rootReducer';
import {createLogger} from 'redux-logger';

const logger = createLogger();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger) as any,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
