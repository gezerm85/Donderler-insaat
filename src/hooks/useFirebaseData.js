import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryData, fetchServicesData, fetchSiteContent } from '..//slices';

export const useGalleryData = (documentId) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.gallery);

  useEffect(() => {
    if (documentId && !data) {
      dispatch(fetchGalleryData(documentId));
    }
  }, [dispatch, documentId, data]);

  return { data, loading, error };
};

export const useServicesData = (documentId) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (documentId && !data) {
      dispatch(fetchServicesData(documentId));
    }
  }, [dispatch, documentId, data]);

  return { data, loading, error };
};

export const useSiteContent = (documentId) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.siteContent);

  useEffect(() => {
    if (documentId && !data) {
      dispatch(fetchSiteContent(documentId));
    }
  }, [dispatch, documentId, data]);

  return { data, loading, error };
};

// Hook to fetch all data at once
export const useAllFirebaseData = () => {
  const gallery = useGalleryData('2xCrxaPHN91P5Y7uYew5');
  const services = useServicesData('X2H5K08nqSofMrxO6umW');
  const siteContent = useSiteContent('KJMCp8HxjQrHZcrSjZPV');

  return {
    gallery,
    services,
    siteContent,
    allLoading: gallery.loading || services.loading || siteContent.loading,
    allError: gallery.error || services.error || siteContent.error,
  };
};
