import { useEffect, useRef, useState } from 'react';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Temel Kazı İşleri",
      description: "Profesyonel ekipmanlarımız ve deneyimli personelimizle temel kazı işlerinizi güvenle gerçekleştiriyoruz.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: ["Derin kazı işleri", "Temel hazırlama", "Zemin analizi", "Güvenlik önlemleri"]
    },
    {
      id: 2,
      title: "Altyapı İşleri",
      description: "Modern şehirlerin ihtiyacı olan altyapı çözümlerini en yüksek kalitede sunuyoruz.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ["Yol yapımı", "Kanalizasyon", "Elektrik altyapısı", "Telekomünikasyon"]
    },
    {
      id: 3,
      title: "İçmesuyu Kanalı ve Boru Montajı",
      description: "Su şebekesi kurulumu ve bakımı konusunda uzman ekibimizle hizmetinizdeyiz.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      features: ["Su hattı döşeme", "Boru montajı", "Vana kurulumu", "Sistem testleri"]
    },
    {
      id: 4,
      title: "Kilittaşı İşleri",
      description: "Estetik ve dayanıklı kilittaşı döşeme işlerinde uzmanlaşmış ekibimizle çalışıyoruz.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      features: ["Yol döşeme", "Kaldırım yapımı", "Parke taşı", "Bordür döşeme"]
    },
    {
      id: 5,
      title: "Taşduvar Yapımı",
      description: "Geleneksel ve modern taşduvar yapım teknikleriyle projelerinizi hayata geçiriyoruz.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      features: ["İstinat duvarları", "Bahçe duvarları", "Dekoratif duvarlar", "Yapısal duvarlar"]
    },
    {
      id: 6,
      title: "Kiralık İş Makinesi",
      description: "Modern ve bakımlı iş makinelerimizle projelerinizde yanınızdayız.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: ["Ekskavatör", "Buldozer", "Yükleyici", "Kamyon"]
    }
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={sectionRef}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6 opacity-0 transform translate-y-10 transition-all duration-1000"
          >
            Hizmetlerimiz
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hafriyat, inşaat ve altyapı işlerinde kapsamlı çözümler sunuyoruz
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl p-8 shadow-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                activeService === index 
                  ? 'border-orange-500 shadow-2xl' 
                  : 'border-slate-200 hover:border-orange-300'
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                  activeService === index ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Projeleriniz İçin Bizimle İletişime Geçin</h3>
            <p className="text-orange-100 mb-6">
              Uzman ekibimiz ve modern ekipmanlarımızla projelerinizi hayata geçiriyoruz
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span>Teklif Alın</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 