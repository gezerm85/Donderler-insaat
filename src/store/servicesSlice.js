import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

// Helper function to convert Firebase Timestamp to ISO string
const convertTimestamp = (timestamp) => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate().toISOString();
  }
  return timestamp;
};

// Helper function to convert document data
const convertDocumentData = (doc) => {
  if (!doc) return null;
  
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt)
  };
};

// Async thunk to fetch all services
export const fetchAllServices = createAsyncThunk(
  'services/fetchAllServices',
  async (_, { rejectWithValue }) => {
    try {
      const servicesRef = collection(db, 'services');
      const q = query(servicesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const services = querySnapshot.docs.map(doc => convertDocumentData(doc));
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch specific service by ID
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (serviceId, { rejectWithValue }) => {
    try {
      const serviceRef = doc(db, 'services', serviceId);
      const serviceDoc = await getDoc(serviceRef);
      
      if (!serviceDoc.exists()) {
        throw new Error('Service not found');
      }
      
      return convertDocumentData(serviceDoc);
    } catch (error) {
      console.error('Error fetching service:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  services: [],
  currentService: null,
  loading: false,
  error: null,
  lastFetched: null
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServicesError: (state) => {
      state.error = null;
    },
    resetServices: (state) => {
      state.services = [];
      state.currentService = null;
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchAllServices
      .addCase(fetchAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchServiceById
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentService = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearServicesError, resetServices } = servicesSlice.actions;

// Selectors
export const selectAllServices = (state) => state.services.services;
export const selectCurrentService = (state) => state.services.currentService;
export const selectServicesLoading = (state) => state.services.loading;
export const selectServicesError = (state) => state.services.error;
export const selectServicesLastFetched = (state) => state.services.lastFetched;

export default servicesSlice.reducer;
