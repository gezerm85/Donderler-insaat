import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAboutContent, selectContactInfo, selectWorkingHours } from '../store/siteContentSlice';
import logo from '../assets/logo.png';

const Footer = () => {
  const footerRef = useRef(null);
  
  // Redux'tan site content verilerini çek
  const aboutContent = useSelector(selectAboutContent);
  const contactInfo = useSelector(selectContactInfo);
  const workingHours = useSelector(selectWorkingHours);

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

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4">
                  <img 
                    src={logo} 
                    alt="DÖNDERLER Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-400">{aboutContent?.title || 'DÖNDERLER'}</h3>
                  <p className="text-slate-300">{aboutContent?.subtitle || 'İNŞAAT HAFRİYAT'}</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {aboutContent?.description || 'Gaziantep\'in güvenilir hafriyat ve altyapı uzmanı olarak, kaliteli hizmet ve müşteri memnuniyeti odaklı çalışmalarımızla projelerinizi hayata geçiriyoruz.'}
              </p>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-300 group transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-300 group transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-300 group transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-orange-400">Hızlı Linkler</h4>
              <div className="space-y-4">
                <Link to="/" className="block text-slate-300 hover:text-orange-400 transition-colors duration-200">
                  Ana Sayfa
                </Link>
                <Link to="/about" className="block text-slate-300 hover:text-orange-400 transition-colors duration-200">
                  Hakkımızda
                </Link>
                <Link to="/services" className="block text-slate-300 hover:text-orange-400 transition-colors duration-200">
                  Hizmetler
                </Link>
                <Link to="/contact" className="block text-slate-300 hover:text-orange-400 transition-colors duration-200">
                  İletişim
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-orange-400">İletişim</h4>
              <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-slate-300 text-sm">{contactInfo?.address || 'Gaziantep, Türkiye'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div className="text-slate-300 text-sm">
                        <a href={`tel:${contactInfo?.phone || '05335691005'}`} className="block hover:text-orange-400 transition-colors duration-200">{contactInfo?.phone || '0 533 569 10 05'}</a>
                        <a href="tel:05346426393" className="block hover:text-orange-400 transition-colors duration-200">0 534 642 63 93</a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${contactInfo?.email || 'donderlerinsaathafriyat@gmail.com'}`} className="text-slate-300 text-sm hover:text-orange-400 transition-colors duration-200">
                        {contactInfo?.email || 'donderlerinsaathafriyat@gmail.com'}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-slate-300 text-sm">
                        <span className="block font-semibold">Çalışma Saatleri:</span>
                        <span className="block">Hafta İçi: {workingHours?.weekdays || '08:00 - 18:00'}</span>
                        <span className="block">Hafta Sonu: {workingHours?.weekend || '08:00 - 17:00'}</span>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 DÖNDERLER İNŞAAT HAFRİYAT. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-orange-300 rounded-full animate-ping delay-1000"></div>
    </footer>
  );
};

export default Footer; 