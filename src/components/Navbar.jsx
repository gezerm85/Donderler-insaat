import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAboutContent } from '../store/siteContentSlice';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Redux'tan site content verilerini çek
  const aboutContent = useSelector(selectAboutContent);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Ana Sayfa', title: 'Dönderler İnşaat Ana Sayfa' },
    { path: '/about', label: 'Hakkımızda', title: 'Dönderler İnşaat Hakkında' },
    { path: '/services', label: 'Hizmetler', title: 'Dönderler İnşaat Hizmetleri' },
    { path: '/gallery', label: 'Galeri', title: 'Dönderler İnşaat Proje Galerisi' },
    { path: '/contact', label: 'İletişim', title: 'Dönderler İnşaat İletişim' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Sol */}
          <Link to="/" className="flex-shrink-0" aria-label="Ana sayfaya git">
            <div className="w-16 h-16 group-hover:scale-110 transition-transform duration-300">
              <img
                src={logo}
                alt="Dönderler İnşaat Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Şirket Adı - Orta (Mobilde görünür) */}
            <div className="flex-1 flex justify-center sm:hidden">
              <div className="text-center max-w-[70%]">
                <span
                  role="heading"
                  aria-level={1}
                  className="block text-md font-bold text-orange-500 transition-colors duration-300 truncate"
                  title="DÖNDERLER İNŞAAT"
                >
                  DÖNDERLER İNŞAAT
                </span>
              </div>
            </div>

          {/* Desktop Menu - Sağ */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    title={item.title}
                    className={`relative px-4 py-2 font-medium transition-all duration-300 group ${
                      isActive(item.path)
                        ? isScrolled
                          ? 'text-orange-500'
                          : 'text-orange-400'
                        : isScrolled
                          ? 'text-slate-700 hover:text-orange-500'
                          : 'text-white hover:text-orange-400'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-100 transition-transform duration-300" aria-hidden="true"></div>
                    )}
                    <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ${
                      isActive(item.path) ? 'hidden' : ''
                    }`} aria-hidden="true"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? 'text-slate-700 hover:text-orange-500'
                  : 'text-white hover:text-orange-400'
              }`}
              aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                title={item.title}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-slate-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 