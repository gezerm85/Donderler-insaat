import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Helper function to convert Firebase Timestamp to serializable format
const convertTimestamp = (timestamp) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toISOString();
  }
  return timestamp;
};

// Helper function to convert document data
const convertDocumentData = (doc) => {
  const data = doc.data();
  const convertedData = {};
  
  Object.keys(data).forEach(key => {
    if (key === 'createdAt' || key === 'updatedAt') {
      convertedData[key] = convertTimestamp(data[key]);
    } else {
      convertedData[key] = data[key];
    }
  });
  
  return convertedData;
};

// Async thunk for fetching site content
export const fetchSiteContent = createAsyncThunk(
  'siteContent/fetchSiteContent',
  async (_, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'siteContent', 'KJMCp8HxjQrHZcrSjZPV');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return convertDocumentData(docSnap);
      } else {
        throw new Error('Site content not found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  content: null,
  loading: false,
  error: null,
  lastFetched: null
};

const siteContentSlice = createSlice({
  name: 'siteContent',
  initialState,
  reducers: {
    clearSiteContentError: (state) => {
      state.error = null;
    },
    resetSiteContent: (state) => {
      state.content = null;
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
        state.lastFetched = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchSiteContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSiteContentError, resetSiteContent } = siteContentSlice.actions;

// Selectors
export const selectSiteContent = (state) => state.siteContent.content;
export const selectSiteContentLoading = (state) => state.siteContent.loading;
export const selectSiteContentError = (state) => state.siteContent.error;
export const selectSiteContentLastFetched = (state) => state.siteContent.lastFetched;

// Specific content selectors
export const selectHeroSlides = (state) => state.siteContent.content?.heroSlides || [];
export const selectAboutContent = (state) => state.siteContent.content?.aboutContent || {};
export const selectContactInfo = (state) => state.siteContent.content?.contactInfo || {};
export const selectWorkingHours = (state) => state.siteContent.content?.workingHours || {};

export default siteContentSlice.reducer;
