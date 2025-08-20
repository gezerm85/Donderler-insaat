import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallerySlice';
import siteContentReducer from './siteContentSlice';
import servicesReducer from './servicesSlice';
import authReducer from './authSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    siteContent: siteContentReducer,
    services: servicesReducer,
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'gallery/fetchGalleryItems/fulfilled', 
          'gallery/fetchGalleryItemById/fulfilled',
          'admin/refreshAdminData/fulfilled'
        ],
        ignoredPaths: ['gallery.lastFetched'],
        warnAfter: 128,
      },
    }),
});

export default store;
