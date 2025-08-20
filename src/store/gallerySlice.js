import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, doc, getDoc, query, limit, orderBy, startAfter } from 'firebase/firestore';
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

// Async thunk for fetching gallery items with pagination
export const fetchGalleryItems = createAsyncThunk(
  'gallery/fetchGalleryItems',
  async (_, { rejectWithValue }) => {
    try {
      const galleryRef = collection(db, 'gallery');
      const q = query(galleryRef, orderBy('createdAt', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      
      const galleryItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertDocumentData(doc)
      }));
      
      return galleryItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching next page of gallery items
export const fetchNextPage = createAsyncThunk(
  'gallery/fetchNextPage',
  async (lastDoc, { rejectWithValue, getState }) => {
    try {
      const galleryRef = collection(db, 'gallery');
      const q = query(
        galleryRef, 
        orderBy('createdAt', 'desc'), 
        startAfter(lastDoc), 
        limit(20)
      );
      const snapshot = await getDocs(q);
      
      const galleryItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertDocumentData(doc)
      }));
      
      return {
        items: galleryItems,
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching specific page
export const fetchSpecificPage = createAsyncThunk(
  'gallery/fetchSpecificPage',
  async (pageNumber, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { pageCache, lastDoc } = state.gallery;
      
      // Eğer sayfa cache'de varsa, onu kullan
      if (pageCache[pageNumber]) {
        return {
          items: pageCache[pageNumber],
          pageNumber,
          fromCache: true
        };
      }
      
      // Cache'de yoksa, Firebase'den çek
      const galleryRef = collection(db, 'gallery');
      const q = query(
        galleryRef, 
        orderBy('createdAt', 'desc'), 
        limit(pageNumber * 20)
      );
      const snapshot = await getDocs(q);
      
      const allItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertDocumentData(doc)
      }));
      
      // Sayfa bazlı böl
      const startIndex = (pageNumber - 1) * 20;
      const endIndex = startIndex + 20;
      const pageItems = allItems.slice(startIndex, endIndex);
      
      return {
        items: pageItems,
        pageNumber,
        fromCache: false,
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching single gallery item by ID
export const fetchGalleryItemById = createAsyncThunk(
  'gallery/fetchGalleryItemById',
  async (itemId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'gallery', itemId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...convertDocumentData(docSnap)
        };
      } else {
        throw new Error('Gallery item not found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
  lastFetched: null,
  hasMore: true,
  lastDoc: null,
  totalItems: 0,
  currentPage: 1,
  maxPages: 10, // Maksimum 10 sayfa tutuyoruz (200 veri)
  pageCache: {} // Sayfa bazlı cache
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearGalleryError: (state) => {
      state.error = null;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    setGalleryFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearPageCache: (state) => {
      state.pageCache = {};
      state.currentPage = 1;
      state.hasMore = true;
      state.lastDoc = null;
    },
    resetGallery: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.pageCache = {};
      state.hasMore = true;
      state.lastDoc = null;
      state.totalItems = 0;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all gallery items
      .addCase(fetchGalleryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = new Date().toISOString();
        state.lastDoc = action.payload[action.payload.length - 1];
        state.hasMore = action.payload.length === 20;
        state.totalItems = action.payload.length;
        state.currentPage = 1;
        state.pageCache = { 1: action.payload }; // İlk sayfayı cache'le
        state.error = null;
      })
      .addCase(fetchGalleryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch next page
      .addCase(fetchNextPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNextPage.fulfilled, (state, action) => {
        state.loading = false;
        
        // Yeni sayfa numarasını hesapla
        const nextPage = state.currentPage + 1;
        
        // Cache'e yeni sayfayı ekle
        state.pageCache[nextPage] = action.payload.items;
        
        // Memory management - eski sayfaları temizle
        if (Object.keys(state.pageCache).length > state.maxPages) {
          const oldestPage = Math.min(...Object.keys(state.pageCache).map(Number));
          delete state.pageCache[oldestPage];
        }
        
        // Sadece mevcut sayfa ve sonraki sayfayı items'a ekle
        const currentPageItems = state.pageCache[state.currentPage] || [];
        const nextPageItems = state.pageCache[nextPage] || [];
        state.items = [...currentPageItems, ...nextPageItems];
        
        state.lastDoc = action.payload.lastDoc;
        state.hasMore = action.payload.items.length === 20;
        state.totalItems = state.items.length;
        state.currentPage = nextPage;
        state.error = null;
      })
      .addCase(fetchNextPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch specific page
      .addCase(fetchSpecificPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificPage.fulfilled, (state, action) => {
        state.loading = false;
        
        if (!action.payload.fromCache) {
          // Cache'e ekle
          state.pageCache[action.payload.pageNumber] = action.payload.items;
          
          // Memory management
          if (Object.keys(state.pageCache).length > state.maxPages) {
            const oldestPage = Math.min(...Object.keys(state.pageCache).map(Number));
            delete state.pageCache[oldestPage];
          }
        }
        
        state.items = action.payload.items;
        state.currentPage = action.payload.pageNumber;
        state.totalItems = action.payload.items.length;
        state.error = null;
      })
      .addCase(fetchSpecificPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single gallery item
      .addCase(fetchGalleryItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
        state.error = null;
      })
      .addCase(fetchGalleryItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  clearGalleryError, 
  clearCurrentItem, 
  setGalleryFilter, 
  clearPageCache, 
  resetGallery 
} = gallerySlice.actions;

// Selectors
export const selectAllGalleryItems = (state) => state.gallery.items;
export const selectCurrentGalleryItem = (state) => state.gallery.currentItem;
export const selectGalleryLoading = (state) => state.gallery.loading;
export const selectGalleryError = (state) => state.gallery.error;
export const selectGalleryLastFetched = (state) => state.gallery.lastFetched;
export const selectGalleryHasMore = (state) => state.gallery.hasMore;
export const selectGalleryLastDoc = (state) => state.gallery.lastDoc;
export const selectGalleryTotalItems = (state) => state.gallery.totalItems;
export const selectGalleryCurrentPage = (state) => state.gallery.currentPage;
export const selectGalleryMaxPages = (state) => state.gallery.maxPages;
export const selectGalleryPageCache = (state) => state.gallery.pageCache;

// Filtered selectors
export const selectGalleryItemsByCategory = (state, category) => {
  if (category === 'all') return state.gallery.items;
  return state.gallery.items.filter(item => item.category === category);
};

export const selectGalleryCategories = (state) => {
  const categories = [...new Set(state.gallery.items.map(item => item.category))];
  return categories;
};

export default gallerySlice.reducer;
