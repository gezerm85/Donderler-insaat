import { useEffect, useRef } from 'react';

const AboutSection = () => {
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
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={sectionRef}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6 opacity-0 transform translate-y-10 transition-all duration-1000"
          >
            Hakkımızda
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Company Info */}
          <div 
            ref={contentRef}
            className="space-y-8 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Şirket Bilgileri</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">Şirket Adı</h4>
                  <p className="text-slate-600 leading-relaxed">
                    DÖNDERLER İNŞAAT HAFRİYAT NAKLİYAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">Adres</h4>
                  <p className="text-slate-600 leading-relaxed">
                    ELİF MAH. ATATÜRK (FEVZİ ÇAKMAK) CAD. NO: 41 İÇ KAPI NO: 1 ARABAN / GAZİANTEP
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-orange-500 rounded-xl p-6 text-center text-white transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold mb-2">30+</div>
                <div className="text-sm opacity-90">Yıllık Deneyim</div>
              </div>
              <div className="bg-slate-700 rounded-xl p-6 text-center text-white transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-sm opacity-90">Tamamlanan Proje</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold">Kaliteli Hizmet</h3>
                
                <div className="space-y-4 text-center">
                  <p className="text-orange-100 leading-relaxed">
                    Gaziantep ve çevre illerde hafriyat, inşaat ve altyapı işlerinde uzmanlaşmış firmamız, 
                    müşteri memnuniyetini ön planda tutarak kaliteli hizmet sunmaktadır.
                  </p>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Güvenilir</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Kaliteli</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Deneyimli</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-300 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 