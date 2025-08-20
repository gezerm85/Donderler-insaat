/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { 
  selectAllGalleryItems, 
  selectGalleryLoading, 
  selectGalleryError,
  selectGalleryItemsByCategory 
} from '../store/gallerySlice';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const galleryRef = useRef(null);

  // Redux selectors
  const galleryItems = useSelector(selectAllGalleryItems);
  const loading = useSelector(selectGalleryLoading);
  const error = useSelector(selectGalleryError);
  const filteredItems = useSelector(state => selectGalleryItemsByCategory(state, filter));

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const galleryItems = galleryRef.current?.querySelectorAll('.gallery-item');
    galleryItems?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [filter]);

  // Loading effect - Firebase'den veri geldiğinde loading'i kaldır
  useEffect(() => {
    if (galleryItems.length > 0 && !loading) {
      setIsLoading(false);
    }
  }, [galleryItems.length, loading]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const currentIndex = currentItems.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % currentItems.length;
    setSelectedImage(currentItems[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = currentItems.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? currentItems.length - 1 : currentIndex - 1;
    setSelectedImage(currentItems[prevIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  // Show loading while fetching data
  if (loading && galleryItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Loading />
      </div>
    );
  }

  // Show error if fetch failed
  if (error && galleryItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Veri yüklenirken hata oluştu</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {isLoading && <Loading />}
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" aria-labelledby="gallery-hero-heading">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-orange-300/15 rounded-full blur-3xl animate-pulse delay-1500" aria-hidden="true"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 id="gallery-hero-heading" className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8">
            <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent animate-pulse">
              Proje Galerimiz
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
            <span className="block">Başarıyla tamamladığımız</span>
            <span className="block text-orange-300 font-semibold">projelerden örnekler</span>
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === 'all'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
              }`}
            >
              Tümü ({galleryItems.length})
            </button>
            <button
              onClick={() => setFilter('hafriyat')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === 'hafriyat'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
              }`}
            >
              Hafriyat İşleri ({galleryItems.filter(item => item.category === 'hafriyat').length})
            </button>
            <button
              onClick={() => setFilter('altyapi')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === 'altyapi'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
              }`}
            >
              Altyapı Projeleri ({galleryItems.filter(item => item.category === 'altyapi').length})
            </button>
            <button
              onClick={() => setFilter('insaat')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === 'insaat'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
              }`}
            >
              İnşaat Projeleri ({galleryItems.filter(item => item.category === 'insaat').length})
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Bu kategoride henüz proje bulunmuyor.</p>
            </div>
          ) : (
            <div 
              ref={galleryRef}
              className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              {currentItems.map((image, index) => (
                <div
                  key={image.id}
                  className="gallery-item break-inside-avoid mb-6 group cursor-pointer transform transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-lg font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {image.title}
                        </h3>
                        <p className="text-sm text-orange-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ transitionDelay: '0.1s' }}>
                          {image.description}
                        </p>
                        <div className="mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ transitionDelay: '0.2s' }}>
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              {/* Previous Page Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                
                // Show limited page numbers for better UX
                if (totalPages <= 7) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-orange-100 transform hover:scale-105'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else {
                  // Show first, last, current, and nearby pages
                  if (pageNumber === 1 || pageNumber === totalPages || 
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-700 hover:bg-orange-100 transform hover:scale-105'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return (
                      <span key={pageNumber} className="px-2 py-2 text-slate-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              })}

              {/* Next Page Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Page Info */}
          {totalPages > 1 && (
            <div className="text-center mt-6 text-slate-600">
              <p className="text-sm">
                Sayfa {currentPage} / {totalPages} • 
                Toplam {filteredItems.length} proje • 
                Sayfa başına {itemsPerPage} proje
              </p>
            </div>
          )}
        </div> 
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-7xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-orange-200">{selectedImage.description}</p>
                <div className="mt-4 text-sm text-slate-300">
                  {currentItems.findIndex(img => img.id === selectedImage.id) + 1} / {currentItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery; 