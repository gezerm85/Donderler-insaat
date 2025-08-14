import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const NotFound = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {isLoading && <Loading />}
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" aria-labelledby="notfound-hero-heading">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-orange-300/15 rounded-full blur-3xl animate-pulse delay-1500" aria-hidden="true"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 id="notfound-hero-heading" className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8">
            <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent animate-pulse">
              404
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
            <span className="block">Sayfa bulunamadı</span>
            <span className="block text-orange-300 font-semibold">Aradığınız sayfa mevcut değil</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden" aria-labelledby="notfound-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/3 rounded-full blur-3xl animate-pulse delay-500" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 
              id="notfound-heading"
              ref={sectionRef}
              className="text-5xl sm:text-6xl font-bold text-slate-800 mb-8 opacity-0 transform translate-y-10 transition-all duration-1000"
            >
              <span className="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent">
                Sayfa Bulunamadı
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-16" aria-hidden="true"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Error Info */}
            <div 
              ref={contentRef}
              className="space-y-10 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300"
            >
              <article className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200 hover:shadow-3xl transition-all duration-500 card-hover">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6" aria-hidden="true">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800">Hata Detayları</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">Hata Kodu</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      404 - Sayfa Bulunamadı
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">Olası Nedenler</h4>
                    <ul className="text-slate-600 leading-relaxed text-lg space-y-2">
                      <li>• Sayfa adresi yanlış yazılmış olabilir</li>
                      <li>• Sayfa taşınmış veya silinmiş olabilir</li>
                      <li>• Geçersiz bir bağlantıya tıklamış olabilirsiniz</li>
                      <li>• Sayfa henüz oluşturulmamış olabilir</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">Çözüm Önerileri</h4>
                    <ul className="text-slate-600 leading-relaxed text-lg space-y-2">
                      <li>• URL adresini kontrol edin</li>
                      <li>• Ana sayfaya dönün</li>
                      <li>• Site haritasını kullanın</li>
                      <li>• Arama yapın</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200 hover:shadow-3xl transition-all duration-500 card-hover">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6" aria-hidden="true">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800">Hızlı Erişim</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link 
                    to="/"
                    className="group p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="font-semibold">Ana Sayfa</div>
                    <div className="text-sm opacity-90">Başlangıç noktası</div>
                  </Link>
                  
                  <Link 
                    to="/services"
                    className="group p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="text-2xl mb-2">🔧</div>
                    <div className="font-semibold">Hizmetler</div>
                    <div className="text-sm opacity-90">Sunulan hizmetler</div>
                  </Link>
                  
                  <Link 
                    to="/gallery"
                    className="group p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="text-2xl mb-2">📸</div>
                    <div className="font-semibold">Galeri</div>
                    <div className="text-sm opacity-90">Proje örnekleri</div>
                  </Link>
                  
                  <Link 
                    to="/contact"
                    className="group p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="text-2xl mb-2">📞</div>
                    <div className="font-semibold">İletişim</div>
                    <div className="text-sm opacity-90">Bize ulaşın</div>
                  </Link>
                </div>
              </article>
            </div>

            {/* Search and Help */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 text-white shadow-3xl">
                <h3 className="text-3xl font-bold mb-8">Yardıma mı ihtiyacınız var?</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Arama Yapın</h4>
                      <p className="text-orange-100 leading-relaxed">
                        Aradığınız içeriği bulmak için site içinde arama yapabilirsiniz.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Yardım Alın</h4>
                      <p className="text-orange-100 leading-relaxed">
                        Sorularınız için bizimle iletişime geçebilirsiniz.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Geri Dönün</h4>
                      <p className="text-orange-100 leading-relaxed">
                        Tarayıcınızın geri butonunu kullanarak önceki sayfaya dönebilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">İletişim Bilgileri</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">Telefon: 0 533 569 10 05</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">Telefon: 0 534 642 63 93</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">E-posta: donderlerinsaathafriyat@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">Adres: Gaziantep, Türkiye</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    İletişime Geçin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound; 