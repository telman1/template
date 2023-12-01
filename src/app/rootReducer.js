import { configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import commonSlice from '../slices/commonSlice';
import sidebarSlice from '../slices/sidebarSlice';

// function wrapWithPersist(reducer, key = [], whitelist = [], blackList = [], storage = session) {
//   return persistReducer(
//     {
//       key,
//       storage,
//       debug: true,
//       whitelist,
//       blackList,
//     },
//     reducer
//   );
// }

const reducers = {
  common: commonSlice,
  sidebar: sidebarSlice,
};

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
