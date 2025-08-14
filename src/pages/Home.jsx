import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

// Gallery resimlerini import ediyoruz
import gallery1 from '../assets/gallery/gallery1.jpg';
import gallery2 from '../assets/gallery/gallery2.jpg';
import gallery3 from '../assets/gallery/gallery3.jpg';
import gallery4 from '../assets/gallery/gallery4.jpeg';
import gallery5 from '../assets/gallery/gallery5.jpg';
import gallery6 from '../assets/gallery/gallery6.jpg';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const featuresRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Profesyonel Hafriyat Çözümleri",
      subtitle: "Gaziantep'in güvenilir hafriyat ve altyapı uzmanı",
      description: "Modern ekipmanlarımız ve uzman ekibimizle projelerinizi hayata geçiriyoruz",
      image: img1,
      alt: "Gaziantep hafriyat işleri - Profesyonel ekipmanlar ile temel kazı çalışmaları"
    },
    {
      id: 2,
      title: "Altyapı İşleri",
      subtitle: "Kapsamlı altyapı çözümleri",
      description: "İçmesuyu kanalı, boru montajı ve kilittaşı işlerinde uzmanlık",
      image: img2,
      alt: "Gaziantep altyapı işleri - İçmesuyu kanalı ve boru montajı hizmetleri"
    },
    {
      id: 3,
      title: "İş Makinesi Kiralama",
      subtitle: "Modern ekipmanlar",
      description: "En son teknoloji iş makineleri ile hızlı ve güvenli hizmet",
      image: img3,
      alt: "Gaziantep iş makinesi kiralama - Ekskavatör, buldozer ve yükleyici kiralama"
    },
    {
      id: 4,
      title: "İş Makinesi Kiralama",
      subtitle: "Modern ekipmanlar",
      description: "En son teknoloji iş makineleri ile hızlı ve güvenli hizmet",
      image: img4,
      alt: "Gaziantep iş makinesi kiralama - Ekskavatör, buldozer ve yükleyici kiralama"
    }
  ];

  // Gallery resimleri için array
  const galleryPreview = [
    { id: 1, src: gallery1, title: 'Hafriyat İşleri', category: 'hafriyat' },
    { id: 2, src: gallery2, title: 'Altyapı Projeleri', category: 'altyapi' },
    { id: 3, src: gallery3, title: 'İnşaat Çalışmaları', category: 'insaat' },
    { id: 4, src: gallery4, title: 'Modern Ekipmanlar', category: 'hafriyat' },
    { id: 5, src: gallery5, title: 'Altyapı Çözümleri', category: 'altyapi' },
    { id: 6, src: gallery6, title: 'Profesyonel Hizmet', category: 'insaat' }
  ];

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

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Güvenilir Hizmet",
      description: "30+ yıllık deneyimle kaliteli hizmet sunuyoruz"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Modern Ekipman",
      description: "En son teknoloji iş makineleri ile çalışıyoruz"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Uzman Ekip",
      description: "Deneyimli ve profesyonel personel kadromuz"
    }
  ];

  return (
    <main className="min-h-screen">
      {isLoading && <Loading />}
      
      {/* Structured Data for Home Page */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "DÖNDERLER İNŞAAT HAFRİYAT - Ana Sayfa",
        "description": "Gaziantep'te 30+ yıllık deneyimle hafriyat, altyapı işleri, içmesuyu kanalı, kilittaşı döşeme ve iş makinesi kiralama hizmetleri",
        "url": "https://donderlerinsaat.com.tr/",
        "mainEntity": {
          "@type": "Organization",
          "name": "DÖNDERLER İNŞAAT HAFRİYAT NAKLİYAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
          "description": "Gaziantep'te hafriyat ve altyapı hizmetleri",
          "url": "https://donderlerinsaat.com.tr",
          "logo": "https://donderlerinsaat.com.tr/src/assets/logo.png",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+90-533-569-10-05",
              "contactType": "customer service",
              "hoursAvailable": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday", 
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ]
            },
            {
              "@type": "ContactPoint",
              "telephone": "+90-534-642-63-93",
              "contactType": "customer service",
              "hoursAvailable": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday", 
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ]
            }
          ],
          "email": "donderlerinsaathafriyat@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gaziantep",
            "addressRegion": "Gaziantep",
            "addressCountry": "TR"
          },
          "serviceType": [
            "Hafriyat İşleri",
            "Altyapı İşleri",
            "İçmesuyu Kanalı",
            "Kilittaşı Döşeme",
            "İş Makinesi Kiralama"
          ]
        }
      })}
      </script>
      
      <Navbar />

      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden" aria-label="Ana Slider">
        {/* Mobile-specific CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 640px) {
              .mobile-bg-position {
                background-position: center center !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-color: #000 !important;
              }
              .mobile-bg-fallback {
                background-position: center center !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-color: #000 !important;
              }
            }
            @media (min-width: 641px) {
              .mobile-bg-position {
                background-position: center center !important;
                background-size: cover !important;
              }
            }
          `
        }} />
        
        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat mobile-bg-position"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover'
                }}
                role="img"
                aria-label={slide.alt}
              >
                {/* Mobile-specific overlay */}
                <div className="absolute inset-0 bg-black/70 sm:bg-black/50"></div>
                
                {/* Mobile background positioning fix */}
                <div 
                  className="sm:hidden absolute inset-0 mobile-bg-fallback" 
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#000',
                    opacity: 0.5
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-5xl mx-auto w-full">
                  {/* Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300 leading-tight">
                    <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent animate-pulse">
                      {slide.title}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-orange-300 mb-4 sm:mb-8 opacity-0 transform translate-y-10 transition-all duration-1000 delay-500 font-semibold leading-tight">
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 opacity-0 transform translate-y-10 transition-all duration-1000 delay-700 max-w-3xl mx-auto leading-relaxed px-2">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div className="opacity-0 transform translate-y-10 transition-all duration-1000 delay-900">
                    <Link 
                      to="/services"
                      className="inline-flex items-center px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base sm:text-xl rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 group"
                      aria-label="Hizmetlerimizi keşfetmek için tıklayın"
                    >
                      <span>Hizmetlerimizi Keşfedin</span>
                      <svg className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group z-20"
          aria-label="Önceki slayt"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group z-20"
          aria-label="Sonraki slayt"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20" role="tablist" aria-label="Slayt navigasyonu">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Slayt ${index + 1}`}
            />
          ))}
        </div>

        {/* Floating elements - hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-ping" aria-hidden="true"></div>
        <div className="hidden sm:block absolute top-3/4 right-1/4 w-3 h-3 bg-orange-300 rounded-full animate-ping delay-1000" aria-hidden="true"></div>
        <div className="hidden sm:block absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-ping delay-500" aria-hidden="true"></div>
        <div className="hidden sm:block absolute top-1/2 right-1/3 w-3 h-3 bg-orange-200 rounded-full animate-ping delay-1500" aria-hidden="true"></div>
        <div className="hidden sm:block absolute bottom-1/3 right-1/4 w-4 h-4 bg-orange-300 rounded-full animate-ping delay-2000" aria-hidden="true"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden" aria-labelledby="features-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/3 rounded-full blur-3xl animate-pulse delay-500" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 id="features-heading" className="text-5xl sm:text-6xl font-bold text-slate-800 mb-8">
              <span className="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent">
                Neden Bizi Seçmelisiniz?
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full" aria-hidden="true"></div>
          </div>

          <div 
            ref={featuresRef}
            className="grid md:grid-cols-3 gap-12 opacity-0 transform translate-y-10 transition-all duration-1000"
          >
            {features.map((feature, index) => (
              <article key={index} className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center group-hover:text-orange-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-slate-600 text-center leading-relaxed text-lg">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-slate-600/10" aria-hidden="true"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-orange-200 to-orange-300 bg-clip-text text-transparent">
                Rakamlarla DÖNDERLER İNŞAAT
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              30+ yıllık deneyimimizle Gaziantep'te binlerce projeyi başarıyla tamamladık
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">30+</div>
              <div className="text-slate-300">Yıllık Deneyim</div>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">500+</div>
              <div className="text-slate-300">Tamamlanan Proje</div>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">50+</div>
              <div className="text-slate-300">Mutlu Müşteri</div>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">24/7</div>
              <div className="text-slate-300">Hizmet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold text-slate-800 mb-8">
              <span className="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent">
                Projelerimizden Örnekler
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Başarıyla tamamladığımız projelerden seçtiğimiz örnekler
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full" aria-hidden="true"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {galleryPreview.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {image.title}
                    </h3>
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ transitionDelay: '0.1s' }}>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        image.category === 'hafriyat' ? 'bg-orange-500' :
                        image.category === 'altyapi' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {image.category === 'hafriyat' ? 'Hafriyat' :
                         image.category === 'altyapi' ? 'Altyapı' : 'İnşaat'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/gallery"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 text-lg group"
              aria-label="Tüm projeleri görmek için galeri sayfasına git"
            >
              <span>Tüm Projeleri Görün</span>
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-12 text-white shadow-3xl transform hover:scale-105 transition-all duration-500">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-6">Projeleriniz İçin Bizimle İletişime Geçin</h3>
              <p className="text-orange-100 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
                Uzman ekibimiz ve modern ekipmanlarımızla projelerinizi hayata geçiriyoruz. 
                Gaziantep'te 30+ yıllık deneyimimizle hizmetinizdeyiz.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to="/services"
                  className="inline-flex items-center px-10 py-4 bg-white text-orange-600 font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 text-lg group"
                  aria-label="Hizmetlerimizi incelemek için tıklayın"
                >
                  <span>Hizmetlerimiz</span>
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex items-center px-10 py-4 border-2 border-white text-white font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-orange-600 text-lg group"
                  aria-label="İletişim sayfasına gitmek için tıklayın"
                >
                  <span>İletişime Geçin</span>
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
