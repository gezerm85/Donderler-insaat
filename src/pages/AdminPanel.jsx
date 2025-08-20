import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectIsAuthenticated, 
  selectIsAdmin, 
  selectAuthLoading,
  selectAuthError,
  loginUser,
  logoutUser,
  checkAuthState,
  clearAuthError
} from '../store/authSlice';
import { 
  selectAdminLoading,
  selectAdminError,
  selectAdminSuccessMessage,
  clearAdminError,
  clearSuccessMessage,
  refreshAdminData,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  addService,
  updateService,
  deleteService,
  updateSiteContent
} from '../store/adminSlice';
import { selectAllGalleryItems } from '../store/gallerySlice';
import { selectAllServices } from '../store/servicesSlice';
import { selectSiteContent } from '../store/siteContentSlice';
import Loading from '../components/Loading';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Auth state
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  
  // Admin state
  const adminLoading = useSelector(selectAdminLoading);
  const adminError = useSelector(selectAdminError);
  const adminSuccessMessage = useSelector(selectAdminSuccessMessage);
  
  // Data state
  const galleryItems = useSelector(selectAllGalleryItems);
  const services = useSelector(selectAllServices);
  const siteContent = useSelector(selectSiteContent);
  
  // Local state
  const [activeTab, setActiveTab] = useState('gallery');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Global delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  // Global loading states for CRUD operations
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  // Handle success message
  useEffect(() => {
    if (adminSuccessMessage) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        dispatch(clearSuccessMessage());
      }, 3000);
    }
  }, [adminSuccessMessage, dispatch]);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Stay on login page
    } else if (!authLoading && isAuthenticated && !isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, authLoading, navigate]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());
    await dispatch(loginUser(loginForm));
  };

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  // Handle refresh data
  const handleRefreshData = () => {
    dispatch(refreshAdminData());
  };

  if (authLoading) {
    return <Loading />;
  }

  // Login form
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-sm sm:max-w-md mx-3">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Admin Girişi</h1>
            <p className="text-slate-600 text-sm sm:text-base">Dönderler İnşaat Yönetim Paneli</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                placeholder="admin@donderlerinsaat.com.tr"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                placeholder="••••••••"
                required
              />
            </div>
            
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base">
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {authLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-4 sm:gap-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">Dönderler İnşaat Yönetim Paneli</h1>
                <p className="text-slate-300 text-sm sm:text-base truncate">Hoş geldiniz, Admin</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={handleRefreshData}
                disabled={adminLoading}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg sm:rounded-xl font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{adminLoading ? 'Yenileniyor...' : 'Verileri Yenile'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg sm:rounded-xl font-medium transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {adminSuccessMessage}
        </div>
      )}
      
      {adminError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {adminError}
          <button
            onClick={() => dispatch(clearAdminError())}
            className="ml-4 text-white hover:text-red-100"
          >
            ×
          </button>
        </div>
      )}

      {/* Global Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md transform animate-scale-in mx-2">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 lg:p-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold truncate">Silme Onayı</h3>
                  <p className="text-red-100 text-xs sm:text-sm truncate">Bu işlem geri alınamaz!</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
                  "{deleteConfirm.title}" öğesini silmek istediğinizden emin misiniz?
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Bu öğe kalıcı olarak silinecek ve geri alınamaz.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={deleteConfirm.onConfirm}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Evet, Sil</span>
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-slate-100 text-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-200 transition-all font-medium border-2 border-slate-200 hover:border-slate-300 text-sm sm:text-base"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

              {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* Tabs */}
        <div className="border-b border-slate-200 mb-6 sm:mb-8">
          <nav className="flex flex-wrap gap-2 sm:gap-0 sm:space-x-8 overflow-x-auto pb-2 sm:pb-0">
            {[
              { id: 'gallery', name: 'Galeri', count: galleryItems.length },
              { id: 'services', name: 'Hizmetler', count: services.length },
              { id: 'site-content', name: 'Site İçeriği', count: 1 },
              { id: 'hero-slider', name: 'Hero Slider', count: siteContent?.heroSlides?.length || 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-3 sm:py-4 px-3 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors rounded-t-lg sm:rounded-t-none ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 bg-orange-50 sm:bg-transparent'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                <span className="ml-1 sm:ml-0 sm:inline">({tab.count})</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          {activeTab === 'gallery' && (
            <GalleryTab 
              galleryItems={galleryItems} 
              loading={adminLoading}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
            />
          )}
          
          {activeTab === 'services' && (
            <ServicesTab 
              services={services} 
              loading={adminLoading}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
            />
          )}
          
          {activeTab === 'site-content' && (
            <SiteContentTab 
              siteContent={siteContent} 
              loading={adminLoading}
            />
          )}

          {activeTab === 'hero-slider' && (
            <HeroSliderTab 
              siteContent={siteContent} 
              loading={adminLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// Gallery Tab Component
const GalleryTab = ({ galleryItems, isAdding, setIsAdding, setIsUpdating,  setIsDeleting }) => {
  const dispatch = useDispatch();
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'hafriyat',
    src: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!selectedFile && !newItem.src) {
      alert('Lütfen bir resim seçin veya URL girin');
      return;
    }

    try {
      setIsAdding(true);
      await dispatch(addGalleryItem({ itemData: newItem, imageFile: selectedFile }));
      setShowAddForm(false);
      setNewItem({ title: '', description: '', category: 'hafriyat', src: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await dispatch(updateGalleryItem({ 
        id: editingItem.id, 
        itemData: editingItem, 
        imageFile: selectedFile 
      }));
      setEditingItem(null);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteItem = async (item) => {
    setDeleteConfirm(item);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      try {
        setIsDeleting(true);
        await dispatch(deleteGalleryItem({ id: deleteConfirm.id, imageUrl: deleteConfirm.src }));
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setNewItem(prev => ({ ...prev, src: '' })); // Clear URL if file selected
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Galeri Yönetimi</h2>
          <p className="text-slate-600 text-sm sm:text-base">Fotoğrafları ekleyin, düzenleyin ve yönetin</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="group relative px-6 py-4 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-3 overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Icon with animation */}
          <div className="relative z-10 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-90">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          {/* Text with glow effect */}
          <span className="relative z-10 text-white font-semibold tracking-wide">
            Yeni Fotoğraf Ekle
          </span>
          
          {/* Shine effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Yeni Fotoğraf Ekle</h3>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Fotoğraf başlığı"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="hafriyat">Hafriyat</option>
                  <option value="altyapi">Altyapı</option>
                  <option value="insaat">İnşaat</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                rows="3"
                placeholder="Fotoğraf açıklaması"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Resim Dosyası</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Veya Resim URL'i</label>
                <input
                  type="url"
                  value={newItem.src}
                  onChange={(e) => setNewItem({ ...newItem, src: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                  disabled={selectedFile}
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isAdding}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAdding ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Ekleniyor...</span>
                  </>
                ) : (
                  <span>Ekle</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewItem({ title: '', description: '', category: 'hafriyat', src: '' });
                  setSelectedFile(null);
                }}
                className="px-6 py-3 bg-slate-300 text-slate-700 rounded-xl hover:bg-slate-400 transition-all font-medium"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200 overflow-hidden">
            <div className="relative">
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.category === 'hafriyat' ? 'bg-orange-100 text-orange-800' :
                  item.category === 'altyapi' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-lg">{item.title}</h3>
              <p className="text-slate-600 mb-3 text-sm line-clamp-2">{item.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem({ ...item })}
                  className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors font-medium flex items-center justify-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Düzenle</span>
                </button>
                <button
                  onClick={() => handleDeleteItem(item)}
                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors font-medium flex items-center justify-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Sil</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

            {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden transform animate-scale-in mx-2">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold truncate">Fotoğraf Düzenle</h3>
                    <p className="text-blue-100 text-xs sm:text-sm truncate">Mevcut fotoğrafı güncelleyin</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setSelectedFile(null);
                  }}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 flex-shrink-0 ml-2"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              <form onSubmit={handleUpdateItem} className="space-y-4 sm:space-y-6">
                {/* Current Image Preview */}
                <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-dashed border-slate-200">
                  <div className="text-center">
                    <img 
                      src={editingItem.src} 
                      alt={editingItem.title} 
                      className="w-full h-24 sm:h-32 object-cover rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3"
                    />
                    <p className="text-xs sm:text-sm text-slate-600">Mevcut Fotoğraf</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span>Başlık</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 sm:px-4 py-3 border-2 border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:bg-slate-50 text-base"
                      placeholder="Fotoğraf başlığı"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>Kategori</span>
                      </span>
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 sm:px-4 py-3 border-2 border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:bg-slate-50 cursor-pointer text-base"
                    >
                      <option value="hafriyat">🏗️ Hafriyat</option>
                      <option value="altyapi">🔧 Altyapı</option>
                      <option value="insaat">🏠 İnşaat</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Açıklama</span>
                    </span>
                  </label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 sm:px-4 py-3 border-2 border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:bg-slate-50 resize-none text-base"
                    rows="3"
                    placeholder="Fotoğraf açıklaması"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Yeni Resim (Opsiyonel)</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 sm:px-4 py-3 border-2 border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:bg-slate-50 cursor-pointer file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-base"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center space-x-1">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs">Boş bırakırsanız mevcut resim korunur</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-slate-200">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Güncelle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setSelectedFile(null);
                    }}
                    className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-slate-100 text-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-200 transition-all font-medium border-2 border-slate-200 hover:border-slate-300 text-base"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md transform animate-scale-in mx-2">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Silme Onayı</h3>
                  <p className="text-red-100 text-sm">Bu işlem geri alınamaz!</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  "{deleteConfirm.title}" öğesini silmek istediğinizden emin misiniz?
                </h4>
                <p className="text-slate-600 text-sm">
                  Bu fotoğraf kalıcı olarak silinecek ve geri alınamaz.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={confirmDelete}
                  className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Evet, Sil</span>
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-200 transition-all font-medium border-2 border-slate-200 hover:border-slate-300"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Services Tab Component
const ServicesTab = ({ services }) => {
  const dispatch = useDispatch();
  const [editingService, setEditingService] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    features: [''],
    icon: 'insaat'
  });

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...newService,
        features: newService.features.filter(feature => feature.trim() !== '')
      };
      await dispatch(addService(serviceData));
      setShowAddForm(false);
      setNewService({ title: '', description: '', features: [''], icon: 'insaat' });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...editingService,
        features: editingService.features.filter(feature => feature.trim() !== '')
      };
      await dispatch(updateService({ id: editingService.id, serviceData }));
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteService = async (service) => {
    if (window.confirm(`${service.title} hizmetini silmek istediğinizden emin misiniz?`)) {
      try {
        await dispatch(deleteService(service.id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const addFeature = () => {
    setNewService(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    setNewService(prev => ({ 
      ...prev, 
      features: prev.features.filter((_, i) => i !== index) 
    }));
  };

  const updateFeature = (index, value) => {
    setNewService(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const addEditFeature = () => {
    setEditingService(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeEditFeature = (index) => {
    setEditingService(prev => ({ 
      ...prev, 
      features: prev.features.filter((_, i) => i !== index) 
    }));
  };

  const updateEditFeature = (index, value) => {
    setEditingService(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Hizmetler Yönetimi</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">Hizmetleri ekleyin, düzenleyin ve yönetin</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Yeni Hizmet Ekle</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg sm:rounded-2xl border border-slate-200">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6">Yeni Hizmet Ekle</h3>
          <form onSubmit={handleAddService} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hizmet Adı</label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                  placeholder="Hizmet adı"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">İkon</label>
                <select
                  value={newService.icon}
                  onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base cursor-pointer"
                >
                  <option value="insaat">🏗️ İnşaat</option>
                  <option value="hafriyat">🚜 Hafriyat</option>
                  <option value="altyapi">🔧 Altyapı</option>
                  <option value="icmesuyu">💧 İçmesuyu</option>
                  <option value="kilittasi">🧱 Kilittaşı</option>
                  <option value="tasduvar">🏛️ Taşduvar</option>
                  <option value="is-makinesi">🚛 İş Makinesi</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
              <textarea
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base resize-none"
                rows="3"
                placeholder="Hizmet açıklaması"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Özellikler</label>
              <div className="space-y-2 sm:space-y-3">
                {newService.features.map((feature, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                      placeholder={`Özellik ${index + 1}`}
                    />
                    {newService.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="w-full sm:w-auto px-3 py-2 sm:py-3 bg-red-500 text-white rounded-lg sm:rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="sm:hidden">Sil</span>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-slate-300 text-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-400 transition-colors text-sm sm:text-base font-medium flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>+ Özellik Ekle</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6">
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg sm:rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 font-medium text-sm sm:text-base"
              >
                Ekle
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewService({ title: '', description: '', features: [''], icon: 'insaat' });
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-slate-300 text-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-400 transition-all font-medium text-sm sm:text-base"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-4 sm:space-y-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-4">
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 sm:mb-2">{service.title}</h3>
                    <p className="text-slate-600 text-sm sm:text-base line-clamp-2">{service.description}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => setEditingService({ ...service })}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => handleDeleteService(service)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Sil</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                {service.features?.map((feature, index) => (
                  <span key={index} className="px-2 sm:px-3 py-1 sm:py-2 bg-orange-100 text-orange-800 text-xs sm:text-sm rounded-lg font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden transform animate-scale-in mx-2">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Hizmet Düzenle</h3>
                    <p className="text-blue-100 text-xs sm:text-sm">Hizmet bilgilerini güncelleyin</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingService(null)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-3 sm:p-4 lg:p-6">
              <form onSubmit={handleUpdateService} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Hizmet Adı</label>
                    <input
                      type="text"
                      value={editingService.title}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">İkon</label>
                    <select
                      value={editingService.icon}
                      onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base cursor-pointer"
                    >
                      <option value="insaat">🏗️ İnşaat</option>
                      <option value="hafriyat">🚜 Hafriyat</option>
                      <option value="altyapi">🔧 Altyapı</option>
                      <option value="icmesuyu">💧 İçmesuyu</option>
                      <option value="kilittasi">🧱 Kilittaşı</option>
                      <option value="tasduvar">🏛️ Taşduvar</option>
                      <option value="is-makinesi">🚛 İş Makinesi</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base resize-none"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Özellikler</label>
                  <div className="space-y-2 sm:space-y-3">
                    {editingService.features?.map((feature, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateEditFeature(index, e.target.value)}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                          placeholder={`Özellik ${index + 1}`}
                        />
                        {editingService.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEditFeature(index)}
                            className="w-full sm:w-auto px-3 py-2 sm:py-3 bg-red-500 text-white rounded-lg sm:rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="sm:hidden">Sil</span>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addEditFeature}
                      className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-slate-300 text-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-400 transition-colors text-sm sm:text-base font-medium flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>+ Özellik Ekle</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 border-t border-slate-200">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 font-medium text-sm sm:text-base"
                  >
                    Güncelle
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-slate-300 text-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-400 transition-all font-medium text-sm sm:text-base"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Site Content Tab Component
const SiteContentTab = ({ siteContent }) => {
  const dispatch = useDispatch();
  const [editingContent, setEditingContent] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleUpdateContent = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateSiteContent({ 
        contentData: editingContent, 
        imageFiles: selectedFiles 
      }));
      setEditingContent(null);
      setSelectedFiles({});
    } catch (error) {
      console.error('Error updating site content:', error);
    }
  };

  const handleFileChange = (section, index, file) => {
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [index]: file
        }
      }));
    }
  };

  const updateSlide = (index, field, value) => {
    setEditingContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map((slide, i) => 
        i === index ? { ...slide, [field]: value } : slide
      )
    }));
  };

  const updateAboutContent = (field, value) => {
    setEditingContent(prev => ({
      ...prev,
      aboutContent: { ...prev.aboutContent, [field]: value }
    }));
  };

  const updateContactInfo = (field, value) => {
    setEditingContent(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const updateWorkingHours = (field, value) => {
    setEditingContent(prev => ({
      ...prev,
      workingHours: { ...prev.workingHours, [field]: value }
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Site İçeriği Yönetimi</h2>
        <button
          onClick={() => setEditingContent({ ...siteContent })}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 font-medium flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>İçeriği Düzenle</span>
        </button>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 text-lg flex items-center space-x-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Hakkımızda</span>
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-slate-700">Başlık:</span>
              <p className="text-slate-600 mt-1">{siteContent?.aboutContent?.title}</p>
            </div>
            <div>
              <span className="font-medium text-slate-700">Alt Başlık:</span>
              <p className="text-slate-600 mt-1">{siteContent?.aboutContent?.subtitle}</p>
            </div>
            <div>
              <span className="font-medium text-slate-700">Açıklama:</span>
              <p className="text-slate-600 mt-1 line-clamp-3">{siteContent?.aboutContent?.description}</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 text-lg flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>İletişim Bilgileri</span>
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-slate-700">Telefon:</span>
              <p className="text-slate-600 mt-1">{siteContent?.contactInfo?.phone}</p>
            </div>
            <div>
              <span className="font-medium text-slate-700">E-posta:</span>
              <p className="text-slate-600 mt-1">{siteContent?.contactInfo?.email}</p>
            </div>
            <div>
              <span className="font-medium text-slate-700">Adres:</span>
              <p className="text-slate-600 mt-1">{siteContent?.contactInfo?.address}</p>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 text-lg flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Çalışma Saatleri</span>
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-slate-700">Hafta İçi:</span>
              <p className="text-slate-600 mt-1">{siteContent?.workingHours?.weekdays}</p>
            </div>
            <div>
              <span className="font-medium text-slate-700">Hafta Sonu:</span>
              <p className="text-slate-600 mt-1">{siteContent?.workingHours?.weekend}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 text-lg flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Özellikler</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {siteContent?.aboutContent?.features?.map((feature, index) => (
              <span key={index} className="px-3 py-2 bg-purple-100 text-purple-800 text-sm rounded-lg font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-6 text-lg flex items-center space-x-2">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Hero Slider</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteContent?.heroSlides?.map((slide, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="relative mb-4">
                <img 
                  src={slide.image} 
                  alt={slide.alt} 
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  Slide {index + 1}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Başlık:</span>
                  <p className="text-slate-600">{slide.title}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Alt Başlık:</span>
                  <p className="text-slate-600">{slide.subtitle}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Açıklama:</span>
                  <p className="text-slate-600 line-clamp-2">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Site İçeriği Düzenle</h3>
            <form onSubmit={handleUpdateContent} className="space-y-6">
              {/* About Content */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-4">Hakkımızda Bölümü</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
                    <input
                      type="text"
                      value={editingContent.aboutContent?.title || ''}
                      onChange={(e) => updateAboutContent('title', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Alt Başlık</label>
                    <input
                      type="text"
                      value={editingContent.aboutContent?.subtitle || ''}
                      onChange={(e) => updateAboutContent('subtitle', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                  <textarea
                    value={editingContent.aboutContent?.description || ''}
                    onChange={(e) => updateAboutContent('description', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    rows="4"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-4">İletişim Bilgileri</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                    <input
                      type="text"
                      value={editingContent.contactInfo?.phone || ''}
                      onChange={(e) => updateContactInfo('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={editingContent.contactInfo?.email || ''}
                      onChange={(e) => updateContactInfo('email', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Adres</label>
                  <input
                    type="text"
                    value={editingContent.contactInfo?.address || ''}
                    onChange={(e) => updateContactInfo('address', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-4">Çalışma Saatleri</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Hafta İçi</label>
                    <input
                      type="text"
                      value={editingContent.workingHours?.weekdays || ''}
                      onChange={(e) => updateWorkingHours('weekdays', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="08:00 - 18:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Hafta Sonu</label>
                    <input
                      type="text"
                      value={editingContent.workingHours?.weekend || ''}
                      onChange={(e) => updateWorkingHours('weekend', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="08:00 - 17:00"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Slider */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-4">Hero Slider</h4>
                <div className="space-y-4">
                  {editingContent.heroSlides?.map((slide, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 bg-white">
                      <h5 className="font-medium text-slate-800 mb-3">Slide {index + 1}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) => updateSlide(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Alt Başlık</label>
                          <input
                            type="text"
                            value={slide.subtitle || ''}
                            onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                        <textarea
                          value={slide.description || ''}
                          onChange={(e) => updateSlide(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          rows="2"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Resim</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('heroSlides', index, e.target.files[0])}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                        <p className="text-xs text-slate-500 mt-1">Boş bırakırsanız mevcut resim korunur</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 font-medium"
                >
                  Güncelle
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingContent(null);
                    setSelectedFiles({});
                  }}
                  className="px-8 py-3 bg-slate-300 text-slate-700 rounded-xl hover:bg-slate-400 transition-all font-medium"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Hero Slider Tab Component
const HeroSliderTab = ({ siteContent }) => {
  const dispatch = useDispatch();
  const [editingSlides, setEditingSlides] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [showAddSlide, setShowAddSlide] = useState(false);
  const [newSlide, setNewSlide] = useState({
    title: '',
    subtitle: '',
    description: '',
    alt: ''
  });

  const handleUpdateSlides = async (e) => {
    e.preventDefault();
    try {
      // Only send imageFiles if there are actual files selected
      const filesToUpload = {};
      Object.keys(selectedFiles).forEach(key => {
        if (selectedFiles[key] instanceof File) {
          filesToUpload[key] = selectedFiles[key];
        }
      });

      await dispatch(updateSiteContent({ 
        contentData: { ...siteContent, heroSlides: editingSlides.heroSlides }, 
        imageFiles: filesToUpload 
      }));
      setEditingSlides(null);
      setSelectedFiles({});
    } catch (error) {
      console.error('Error updating hero slides:', error);
    }
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    if (!selectedFiles.newSlide) {
      alert('Lütfen bir resim seçin');
      return;
    }

    try {
      const newSlideData = {
        ...newSlide,
        id: Date.now().toString(),
        image: '' // Placeholder, will be updated after upload
      };
      
      const updatedSlides = [...(siteContent?.heroSlides || []), newSlideData];
      await dispatch(updateSiteContent({ 
        contentData: { ...siteContent, heroSlides: updatedSlides }, 
        imageFiles: { newSlide: selectedFiles.newSlide } 
      }));
      
      setShowAddSlide(false);
      setNewSlide({ title: '', subtitle: '', description: '', alt: '' });
      setSelectedFiles({});
    } catch (error) {
      console.error('Error adding slide:', error);
    }
  };

  const handleDeleteSlide = async (slideIndex) => {
    if (window.confirm('Bu slide\'ı silmek istediğinizden emin misiniz?')) {
      try {
        const updatedSlides = siteContent.heroSlides.filter((_, index) => index !== slideIndex);
        await dispatch(updateSiteContent({ 
          contentData: { ...siteContent, heroSlides: updatedSlides }, 
          imageFiles: {} 
        }));
      } catch (error) {
        console.error('Error deleting slide:', error);
      }
    }
  };

  const handleFileChange = (slideIndex, file) => {
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        [slideIndex]: file
      }));
    }
  };

  const handleNewSlideFileChange = (file) => {
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        newSlide: file
      }));
    }
  };

  const updateSlide = (index, field, value) => {
    setEditingSlides(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map((slide, i) => 
        i === index ? { ...slide, [field]: value } : slide
      )
    }));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Hero Slider Yönetimi</h2>
          <p className="text-slate-600 text-sm sm:text-base">Ana sayfa slider'ını yönetin ve düzenleyin</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setEditingSlides({ ...siteContent })}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Slides Düzenle</span>
          </button>
          <button
            onClick={() => setShowAddSlide(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Yeni Slide Ekle</span>
          </button>
        </div>
      </div>

      {/* Current Slides Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {siteContent?.heroSlides?.map((slide, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="relative">
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                Slide {index + 1}
              </div>
              <div className="absolute top-2 left-2">
                <button
                  onClick={() => handleDeleteSlide(index)}
                  className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-lg">{slide.title}</h3>
              <p className="text-slate-600 mb-2 text-sm font-medium">{slide.subtitle}</p>
              <p className="text-slate-500 text-sm line-clamp-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Slide Modal */}
      {showAddSlide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden transform animate-scale-in mx-2">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Yeni Slide Ekle</h3>
                    <p className="text-green-100 text-sm">Hero slider'a yeni slide ekleyin</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddSlide(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              <form onSubmit={handleAddSlide} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Başlık</label>
                    <input
                      type="text"
                      value={newSlide.title}
                      onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Ana başlık"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Alt Başlık</label>
                    <input
                      type="text"
                      value={newSlide.subtitle}
                      onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Alt başlık"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Açıklama</label>
                  <textarea
                    value={newSlide.description}
                    onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    rows="3"
                    placeholder="Slide açıklaması"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={newSlide.alt}
                    onChange={(e) => setNewSlide({ ...newSlide, alt: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Resim alt metni"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Slide Resmi</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleNewSlideFileChange(e.target.files[0])}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-slate-200">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Slide Ekle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddSlide(false)}
                    className="w-full sm:w-auto px-6 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium border-2 border-slate-200 hover:border-slate-300"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Slides Modal */}
      {editingSlides && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden transform animate-scale-in mx-2">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Hero Slider Düzenle</h3>
                    <p className="text-blue-100 text-sm">Mevcut slide'ları düzenleyin</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingSlides(null)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              <form onSubmit={handleUpdateSlides} className="space-y-6">
                <div className="space-y-4">
                  {editingSlides.heroSlides?.map((slide, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                      <h5 className="font-medium text-slate-800 mb-3 flex items-center space-x-2">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span>Slide {index + 1}</span>
                      </h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) => updateSlide(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Alt Başlık</label>
                          <input
                            type="text"
                            value={slide.subtitle || ''}
                            onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                        <textarea
                          value={slide.description || ''}
                          onChange={(e) => updateSlide(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          rows="2"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Resim</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(index, e.target.files[0])}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <p className="text-xs text-slate-500 mt-1">Boş bırakırsanız mevcut resim korunur</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 pt-6 border-t border-slate-200">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 font-medium"
                  >
                    Güncelle
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingSlides(null)}
                    className="px-8 py-3 bg-slate-300 text-slate-700 rounded-xl hover:bg-slate-400 transition-all font-medium"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
