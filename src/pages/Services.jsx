import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { selectAllServices, selectServicesLoading, selectServicesError } from '../store/servicesSlice';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);

  // Redux'tan services verilerini al
  const services = useSelector(selectAllServices);
  const loading = useSelector(selectServicesLoading);
  const error = useSelector(selectServicesError);

  // Icon mapping function
  const getServiceIcon = (iconName) => {
    const iconMap = {
      'temel-kazi': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      'altyapi': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'icmesuyu': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      'kilittasi': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      'tasduvar': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      'is-makinesi': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      'insaat': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    };
    
    return iconMap[iconName] || iconMap['insaat']; // Default icon
  };

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

    return () => observer.disconnect();
  }, []);



  // Error handling
  if (error) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Hata Oluştu</h1>
            <p className="text-xl mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen">
        <Loading />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" aria-labelledby="services-hero-heading">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-orange-300/15 rounded-full blur-3xl animate-pulse delay-1500" aria-hidden="true"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 id="services-hero-heading" className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8">
            <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent animate-pulse">
              Hizmetlerimiz
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
            <span className="block">Hafriyat, inşaat ve altyapı işlerinde</span>
            <span className="block text-orange-300 font-semibold">kapsamlı çözümler</span>
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden" aria-labelledby="services-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/3 rounded-full blur-3xl animate-pulse delay-500" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 
              id="services-heading"
              ref={sectionRef}
              className="text-5xl sm:text-6xl font-bold text-slate-800 mb-8 opacity-0 transform translate-y-10 transition-all duration-1000"
            >
              <span className="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent">
                Hizmetlerimiz
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-8 mt-16" aria-hidden="true"></div>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Hafriyat, inşaat ve altyapı işlerinde kapsamlı çözümler sunuyoruz
            </p>
          </div>

          {/* Services Grid */}
          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
              <article
                key={service.id}
                className={`bg-white rounded-3xl p-10 shadow-2xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 card-hover ${
                  activeService === index 
                    ? 'border-orange-500 shadow-3xl neon-glow' 
                    : 'border-slate-200 hover:border-orange-300'
                }`}
                onClick={() => setActiveService(index)}
                aria-label={`${service.title} hizmeti hakkında detaylı bilgi`}
              >
                <div className="flex items-center mb-8">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mr-6 transition-all duration-500 ${
                    activeService === index ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white scale-110' : 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600'
                  }`} aria-hidden="true">
                    {getServiceIcon(service.icon || 'insaat')}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{service.title}</h3>
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 stagger-item">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse" aria-hidden="true"></div>
                      <span className="text-slate-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                              </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-8"></div>
              <h3 className="text-2xl font-bold text-slate-600 mb-4">Hizmetler Yükleniyor</h3>
              <p className="text-slate-500">Hizmet verilerimiz yükleniyor...</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-12 text-white shadow-3xl transform hover:scale-105 transition-all duration-500">
              <h3 className="text-3xl font-bold mb-6">Projeleriniz İçin Bizimle İletişime Geçin</h3>
              <p className="text-orange-100 mb-8 text-lg leading-relaxed">
                Uzman ekibimiz ve modern ekipmanlarımızla projelerinizi hayata geçiriyoruz
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center px-10 py-5 bg-white text-orange-600 font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 text-lg btn-animate"
                aria-label="Teklif almak için iletişim sayfasına git"
              >
                <span>Teklif Alın</span>
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for Services */}
      {services.length > 0 && (
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Dönderler İnşaat Hizmetleri",
          "description": "Gaziantep'te hafriyat, altyapı işleri ve iş makinesi kiralama hizmetleri",
          "itemListElement": services.map((service, index) => ({
            "@type": "Service",
            "position": index + 1,
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Dönderler İnşaat"
            },
            "areaServed": "Gaziantep",
            "keywords": service.keywords || ""
          }))
        })}
        </script>
      )}

      <Footer />
    </main>
  );
};

export default Services; 