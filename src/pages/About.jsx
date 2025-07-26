import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

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

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" aria-labelledby="about-hero-heading">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-orange-300/15 rounded-full blur-3xl animate-pulse delay-1500" aria-hidden="true"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 id="about-hero-heading" className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8">
            <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent animate-pulse">
              Hakkımızda
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
            <span className="block">Güvenilir hafriyat ve altyapı</span>
            <span className="block text-orange-300 font-semibold">çözümleri</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden" aria-labelledby="about-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/3 rounded-full blur-3xl animate-pulse delay-500" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 
              id="about-heading"
              ref={sectionRef}
              className="text-5xl sm:text-6xl font-bold text-slate-800 mb-8 opacity-0 transform translate-y-10 transition-all duration-1000"
            >
              <span className="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent ">
                Şirketimiz
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-16" aria-hidden="true"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Company Info */}
            <div 
              ref={contentRef}
              className="space-y-10 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300"
            >
              <article className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200 hover:shadow-3xl transition-all duration-500 card-hover">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6" aria-hidden="true">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800">Şirket Bilgileri</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">Şirket Adı</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      DÖNDERLER İNŞAAT HAFRİYAT NAKLİYAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">Adres</h4>
                    <address className="text-slate-600 leading-relaxed text-lg not-italic">
                      Gaziantep, Türkiye
                    </address>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">Deneyim</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      30+ yıllık sektör deneyimi ile Gaziantep'te güvenilir hafriyat ve altyapı hizmetleri sunuyoruz.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">Hizmet Alanları</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      Hafriyat işleri, altyapı projeleri, içmesuyu kanalı, kilittaşı döşeme ve iş makinesi kiralama hizmetleri.
                    </p>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200 hover:shadow-3xl transition-all duration-500 card-hover">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6" aria-hidden="true">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800">Misyonumuz</h3>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-lg">
                  Modern ekipmanlarımız ve uzman ekibimizle Gaziantep'te kaliteli hafriyat ve altyapı hizmetleri sunarak, 
                  müşterilerimizin projelerini güvenle hayata geçirmelerini sağlamak.
                </p>
              </article>

              <article className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200 hover:shadow-3xl transition-all duration-500 card-hover">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6" aria-hidden="true">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800">Vizyonumuz</h3>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-lg">
                  Gaziantep'in önde gelen hafriyat ve altyapı şirketi olarak, teknolojik gelişmeleri takip ederek 
                  müşterilerimize en kaliteli hizmeti sunmak ve sektörde güvenilir bir marka olmak.
                </p>
              </article>
            </div>

            {/* Company Values */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 text-white shadow-3xl">
                <h3 className="text-3xl font-bold mb-8">Değerlerimiz</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Güvenilirlik</h4>
                      <p className="text-orange-100 leading-relaxed">
                        30+ yıllık deneyimimizle müşterilerimize güvenilir hizmet sunuyoruz.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Kalite</h4>
                      <p className="text-orange-100 leading-relaxed">
                        Modern ekipmanlar ve uzman personel ile en yüksek kalitede hizmet veriyoruz.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Uzmanlık</h4>
                      <p className="text-orange-100 leading-relaxed">
                        Deneyimli ekibimiz ile hafriyat ve altyapı işlerinde uzmanlaşmış hizmet sunuyoruz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">Neden Bizi Seçmelisiniz?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">30+ yıllık sektör deneyimi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">Modern ekipmanlar</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">Uzman personel kadrosu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">Kaliteli hizmet garantisi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-slate-600 font-medium">Gaziantep'te yerel hizmet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for About */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Dönderler İnşaat",
        "alternateName": "DÖNDERLER İNŞAAT HAFRİYAT NAKLİYAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
        "description": "Gaziantep'te 30+ yıllık deneyimle hafriyat, altyapı işleri ve iş makinesi kiralama hizmetleri",
        "url": "https://donderlerinsaat.com.tr",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gaziantep",
          "addressRegion": "Gaziantep",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.0662,
          "longitude": 37.3833
        },
        "foundingDate": "1990",
        "numberOfEmployees": "50+",
        "serviceType": [
          "Hafriyat İşleri",
          "Altyapı İşleri",
          "İçmesuyu Kanalı",
          "Kilittaşı Döşeme",
          "İş Makinesi Kiralama"
        ],
        "areaServed": "Gaziantep",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "İnşaat Hizmetleri"
        }
      })}
      </script>

      <Footer />
    </main>
  );
};

export default About; 