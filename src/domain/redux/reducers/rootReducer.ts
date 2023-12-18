import {itemsReducer} from './itemsReducer';
import {userReducer} from './userReducer';

export const rootReducer = {
  items: itemsReducer,
  user: userReducer,
};
