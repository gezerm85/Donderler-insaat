import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  orderBy,
  query,
  getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Helper function to convert data for Firestore
const prepareDataForFirestore = (data) => {
  const { id, ...dataWithoutId } = data;
  return {
    ...dataWithoutId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
};

// Async thunk to add gallery item
export const addGalleryItem = createAsyncThunk(
  'admin/addGalleryItem',
  async ({ itemData, imageFile }, { rejectWithValue }) => {
    try {
      let imageUrl = itemData.src; // Use existing URL if no new file

      // Upload new image if provided
      if (imageFile) {
        const storageRef = ref(storage, `gallery/${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const galleryData = {
        ...itemData,
        src: imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'gallery'), galleryData);
      return { id: docRef.id, ...galleryData };
    } catch (error) {
      console.error('Error adding gallery item:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update gallery item
export const updateGalleryItem = createAsyncThunk(
  'admin/updateGalleryItem',
  async ({ id, itemData, imageFile }, { rejectWithValue }) => {
    try {
      let imageUrl = itemData.src;

      // Upload new image if provided
      if (imageFile) {
        const storageRef = ref(storage, `gallery/${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const updateData = {
        ...itemData,
        src: imageUrl,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'gallery', id), updateData);
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating gallery item:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete gallery item
export const deleteGalleryItem = createAsyncThunk(
  'admin/deleteGalleryItem',
  async ({ id, imageUrl }, { rejectWithValue }) => {
    try {
      // Delete image from storage if it's a Firebase Storage URL
      if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (storageError) {
          console.warn('Could not delete image from storage:', storageError);
        }
      }

      await deleteDoc(doc(db, 'gallery', id));
      return id;
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add service
export const addService = createAsyncThunk(
  'admin/addService',
  async (serviceData, { rejectWithValue }) => {
    try {
      const data = prepareDataForFirestore(serviceData);
      const docRef = await addDoc(collection(db, 'services'), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error adding service:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update service
export const updateService = createAsyncThunk(
  'admin/updateService',
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const updateData = {
        ...serviceData,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'services', id), updateData);
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating service:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete service
export const deleteService = createAsyncThunk(
  'admin/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'services', id));
      return id;
    } catch (error) {
      console.error('Error deleting service:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update site content
export const updateSiteContent = createAsyncThunk(
  'admin/updateSiteContent',
  async ({ contentData, imageFiles }, { rejectWithValue }) => {
    try {
      const updateData = { ...contentData, updatedAt: serverTimestamp() };

      // Handle image uploads for hero slides
      if (imageFiles && Object.keys(imageFiles).length > 0) {
        const updatedHeroSlides = [...(contentData.heroSlides || [])];
        
        // Handle individual slide image updates
        for (let i = 0; i < updatedHeroSlides.length; i++) {
          if (imageFiles[i]) {
            const storageRef = ref(storage, `hero/${Date.now()}_${imageFiles[i].name}`);
            const snapshot = await uploadBytes(storageRef, imageFiles[i]);
            const imageUrl = await getDownloadURL(snapshot.ref);
            updatedHeroSlides[i] = {
              ...updatedHeroSlides[i],
              image: imageUrl
            };
          }
        }

        // Handle new slide addition
        if (imageFiles.newSlide) {
          const storageRef = ref(storage, `hero/${Date.now()}_${imageFiles.newSlide.name}`);
          const snapshot = await uploadBytes(storageRef, imageFiles.newSlide);
          const imageUrl = await getDownloadURL(snapshot.ref);
          
          // Find the new slide data (it should be the last one with empty image)
          const newSlideIndex = updatedHeroSlides.findIndex(slide => !slide.image || slide.image === '');
          if (newSlideIndex !== -1) {
            updatedHeroSlides[newSlideIndex] = {
              ...updatedHeroSlides[newSlideIndex],
              image: imageUrl
            };
          }
        }

        updateData.heroSlides = updatedHeroSlides;
      }

      // Remove any File objects from the data before sending to Firestore
      const cleanData = JSON.parse(JSON.stringify(updateData));
      
      await updateDoc(doc(db, 'siteContent', 'KJMCp8HxjQrHZcrSjZPV'), cleanData);
      return cleanData;
    } catch (error) {
      console.error('Error updating site content:', error);
      return rejectWithValue(error.message);
    }
  }
);

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

// Async thunk to refresh admin data
export const refreshAdminData = createAsyncThunk(
  'admin/refreshAdminData',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch fresh data for admin panel
      const [gallerySnapshot, servicesSnapshot] = await Promise.all([
        getDocs(query(collection(db, 'gallery'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'services'), orderBy('createdAt', 'desc')))
      ]);

      const galleryItems = gallerySnapshot.docs.map(doc => convertDocumentData(doc));
      const services = servicesSnapshot.docs.map(doc => convertDocumentData(doc));

      return { galleryItems, services };
    } catch (error) {
      console.error('Error refreshing admin data:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
  lastOperation: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetAdmin: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      state.lastOperation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Gallery Item
      .addCase(addGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGalleryItem.fulfilled, (state, action, { dispatch }) => {
        state.loading = false;
        state.successMessage = 'Galeri öğesi başarıyla eklendi';
        state.lastOperation = 'add_gallery';
        // Automatically refresh data after successful addition
        dispatch(refreshAdminData());
      })
      .addCase(addGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Gallery Item
      .addCase(updateGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGalleryItem.fulfilled, (state, action, { dispatch }) => {
        state.loading = false;
        state.successMessage = 'Galeri öğesi başarıyla güncellendi';
        state.lastOperation = 'update_gallery';
        // Automatically refresh data after successful update
        dispatch(refreshAdminData());
      })
      .addCase(updateGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Gallery Item
      .addCase(deleteGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGalleryItem.fulfilled, (state, action, { dispatch }) => {
        state.loading = false;
        state.successMessage = 'Galeri öğesi başarıyla silindi';
        state.lastOperation = 'delete_gallery';
        // Automatically refresh data after successful deletion
        dispatch(refreshAdminData());
      })
      .addCase(deleteGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Service
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action, { dispatch }) => {
        state.loading = false;
        state.successMessage = 'Hizmet başarıyla eklendi';
        state.lastOperation = 'add_service';
        // Automatically refresh data after successful addition
        dispatch(refreshAdminData());
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action, { dispatch }) => {
        state.loading = false;
        state.successMessage = 'Hizmet başarıyla güncellendi';
        state.lastOperation = 'update_service';
        // Automatically refresh data after successful update
        dispatch(refreshAdminData());
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action, { dispatch }) => {
        state.loading = false;
        state.successMessage = 'Hizmet başarıyla silindi';
        state.lastOperation = 'delete_service';
        // Automatically refresh data after successful deletion
        dispatch(refreshAdminData());
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Site Content
      .addCase(updateSiteContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSiteContent.fulfilled, (state, action, { dispatch }) => {
        state.loading = false;
        state.successMessage = 'Site içeriği başarıyla güncellendi';
        state.lastOperation = 'update_site_content';
        // Automatically refresh data after successful update
        dispatch(refreshAdminData());
      })
      .addCase(updateSiteContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Refresh Admin Data
      .addCase(refreshAdminData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAdminData.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = 'Veriler yenilendi';
        state.lastOperation = 'refresh_data';
      })
      .addCase(refreshAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAdminError, clearSuccessMessage, resetAdmin } = adminSlice.actions;

// Selectors
export const selectAdminLoading = (state) => state.admin.loading;
export const selectAdminError = (state) => state.admin.error;
export const selectAdminSuccessMessage = (state) => state.admin.successMessage;
export const selectAdminLastOperation = (state) => state.admin.lastOperation;

export default adminSlice.reducer;
