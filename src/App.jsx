import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGalleryItems } from './store/gallerySlice';
import { fetchSiteContent } from './store/siteContentSlice';
import { fetchAllServices } from './store/servicesSlice';
import { checkAuthState } from './store/authSlice';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import './App.css';

// SEO Component
const SEOUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    const updateSEO = () => {
      const baseUrl = 'https://donderlerinsaat.com.tr';
      const currentPath = location.pathname;
      
      let title = 'DÖNDERLER İNŞAAT HAFRİYAT - Gaziantep\'te Profesyonel Hafriyat ve Altyapı Hizmetleri (2025)';
      let description = 'Gaziantep\'te 30+ yıllık deneyimle hafriyat, altyapı işleri, içmesuyu kanalı, kilittaşı döşeme ve iş makinesi kiralama hizmetleri. Profesyonel ekipmanlar ve uzman kadro ile kaliteli hizmet. 2025\'te güvenilir çözümler.';
      let keywords = 'hafriyat, altyapı, inşaat, gaziantep hafriyat, iş makinesi kiralama, içmesuyu kanalı, kilittaşı, taşduvar, boru montajı, hafriyat firması, altyapı işleri, inşaat şirketi, gaziantep inşaat, 2025 hafriyat, gaziantep altyapı';
      
      switch (currentPath) {
        case '/':
          title = 'DÖNDERLER İNŞAAT HAFRİYAT - Ana Sayfa | Gaziantep Hafriyat ve Altyapı Hizmetleri (2025)';
          description = 'Gaziantep\'te 30+ yıllık deneyimle hafriyat, altyapı işleri, içmesuyu kanalı, kilittaşı döşeme ve iş makinesi kiralama hizmetleri. Profesyonel ekipmanlar ve uzman kadro ile kaliteli hizmet.';
          keywords = 'gaziantep hafriyat, hafriyat firması, altyapı işleri, iş makinesi kiralama, gaziantep inşaat, 2025 hafriyat';
          break;
        case '/about':
          title = 'Hakkımızda - DÖNDERLER İNŞAAT HAFRİYAT | 30+ Yıllık Deneyim (2025)';
          description = 'DÖNDERLER İNŞAAT HAFRİYAT olarak 30+ yıllık deneyimimizle Gaziantep\'te güvenilir hafriyat ve altyapı hizmetleri sunuyoruz. Modern ekipmanlar ve uzman kadromuzla kaliteli hizmet.';
          keywords = 'dönderler inşaat, gaziantep hafriyat firması, 30 yıl deneyim, hafriyat şirketi, altyapı firması, gaziantep inşaat şirketi';
          break;
        case '/services':
          title = 'Hizmetlerimiz - DÖNDERLER İNŞAAT HAFRİYAT | Hafriyat, Altyapı ve İş Makinesi Kiralama (2025)';
          description = 'Hafriyat işleri, altyapı projeleri, içmesuyu kanalı, kilittaşı döşeme, taşduvar yapımı ve iş makinesi kiralama hizmetlerimiz. Gaziantep\'te profesyonel çözümler.';
          keywords = 'hafriyat işleri, altyapı projeleri, içmesuyu kanalı, kilittaşı döşeme, iş makinesi kiralama, gaziantep hafriyat hizmetleri';
          break;
        case '/gallery':
          title = 'Proje Galerimiz - DÖNDERLER İNŞAAT HAFRİYAT | Tamamlanan Projeler (2025)';
          description = 'DÖNDERLER İNŞAAT HAFRİYAT olarak başarıyla tamamladığımız hafriyat, altyapı ve inşaat projelerinden örnekler. Gaziantep\'te referans projelerimiz.';
          keywords = 'hafriyat projeleri, altyapı projeleri, inşaat projeleri, gaziantep hafriyat referansları, tamamlanan projeler, hafriyat galeri';
          break;
        case '/contact':
          title = 'İletişim - DÖNDERLER İNŞAAT HAFRİYAT | Gaziantep Hafriyat Firması (2025)';
          description = 'DÖNDERLER İNŞAAT HAFRİYAT ile iletişime geçin. Telefon: 0 533 569 10 05, 0 534 642 63 93. Gaziantep\'te hafriyat ve altyapı hizmetleri için bize ulaşın.';
          keywords = 'dönderler inşaat iletişim, gaziantep hafriyat telefon, hafriyat firması iletişim, altyapı firması telefon, gaziantep inşaat iletişim';
          break;
        default:
          title = '404 - Sayfa Bulunamadı | DÖNDERLER İNŞAAT HAFRİYAT (2025)';
          description = 'Aradığınız sayfa bulunamadı. DÖNDERLER İNŞAAT HAFRİYAT ana sayfasına dönün veya iletişime geçin.';
          keywords = '404, sayfa bulunamadı, dönderler inşaat, gaziantep hafriyat';
          break;
      }
      
      // Update document title
      document.title = title;
      
      // Update meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      const canonical = document.querySelector('link[rel="canonical"]');
      
      if (metaDescription) metaDescription.setAttribute('content', description);
      if (metaKeywords) metaKeywords.setAttribute('content', keywords);
      if (ogTitle) ogTitle.setAttribute('content', title);
      if (ogDescription) ogDescription.setAttribute('content', description);
      if (ogUrl) ogUrl.setAttribute('content', `${baseUrl}${currentPath}`);
      if (twitterTitle) twitterTitle.setAttribute('content', title);
      if (twitterDescription) twitterDescription.setAttribute('content', description);
      if (canonical) canonical.setAttribute('href', `${baseUrl}${currentPath}`);
    };
    
    updateSEO();
  }, [location]);
  
  return null;
};

function App() {
  const dispatch = useDispatch();

  // App component mount olduğunda gallery ve site content verilerini çek
  useEffect(() => {
    dispatch(fetchGalleryItems());
    dispatch(fetchSiteContent());
    dispatch(fetchAllServices());
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <SEOUpdater />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/yonetim-paneli" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;