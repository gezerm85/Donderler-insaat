import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Hizmet talebi',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // EmailJS initialization
    emailjs.init("FEmlmuXBQGjPmdPZw");

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
    if (formRef.current) observer.observe(formRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);

    return () => observer.disconnect();
  }, []);

  // Show notification function
  const showToast = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Ad Soyad alanı zorunludur';
    if (name.trim().length < 2) return 'Ad Soyad en az 2 karakter olmalıdır';
    if (name.trim().length > 50) return 'Ad Soyad en fazla 50 karakter olabilir';
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(name.trim())) {
      return 'Ad Soyad sadece harf içerebilir';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Telefon alanı zorunludur';
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      return 'Geçerli bir telefon numarası giriniz';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'E-posta alanı zorunludur';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Geçerli bir e-posta adresi giriniz';
    }
    return '';
  };

  const validateMessage = (message) => {
    if (!message.trim()) return 'Mesaj alanı zorunludur';
    if (message.trim().length < 10) return 'Mesaj en az 10 karakter olmalıdır';
    if (message.trim().length > 1000) return 'Mesaj en fazla 1000 karakter olabilir';
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.name = validateName(formData.name);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.email = validateEmail(formData.email);
    newErrors.message = validateMessage(formData.message);

    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';
    
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('error', 'Lütfen form hatalarını düzeltiniz');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Dönderler İnşaat'
      };
      
      const response = await emailjs.send(
        'service_donderler',
        'template_donderler',
        templateParams
      );
      
      if (response.status === 200) {
        setSubmitStatus('success');
        showToast('success', 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: 'Hizmet talebi',
          message: ''
        });
      } else {
        throw new Error('Email gönderilemedi');
      }
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      setSubmitStatus('error');
      showToast('error', 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" aria-labelledby="contact-hero-heading">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-orange-300/15 rounded-full blur-3xl animate-pulse delay-1500" aria-hidden="true"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 id="contact-hero-heading" className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8">
            <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent animate-pulse">
              İletişim
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
            <span className="block">Bizimle iletişime geçin</span>
            <span className="block text-orange-300 font-semibold">projelerinizi hayata geçirelim</span>
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden" aria-labelledby="contact-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/3 rounded-full blur-3xl animate-pulse delay-500" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 
              id="contact-heading"
              ref={sectionRef}
              className="text-5xl sm:text-6xl font-bold text-slate-800 mb-8 opacity-0 transform translate-y-10 transition-all duration-1000"
            >
              <span className="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent">
                İletişim Bilgileri
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-16" aria-hidden="true"></div>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mt-8">
              Hafriyat, altyapı işleri ve iş makinesi kiralama hizmetlerimiz hakkında bilgi almak için bizimle iletişime geçin
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className="opacity-0 transform translate-y-10 transition-all duration-1000 delay-300"
            >
              <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">Mesaj Gönderin</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-orange-500'
                      }`}
                      placeholder="Adınız ve soyadınız"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-2" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-orange-500'
                      }`}
                      placeholder="Telefon numaranız"
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-2" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-orange-500'
                      }`}
                      placeholder="E-posta adresiniz"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-2" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                      Konu
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500"
                    >
                      <option value="Hizmet talebi">Hizmet talebi</option>
                      <option value="Teklif talebi">Teklif talebi</option>
                      <option value="Bilgi talebi">Bilgi talebi</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Mesaj *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 resize-none ${
                        errors.message ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-orange-500'
                      }`}
                      placeholder="Mesajınızı buraya yazın..."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={errors.message ? 'true' : 'false'}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-2" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xl rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    aria-label={isSubmitting ? 'Mesaj gönderiliyor...' : 'Mesajı gönder'}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </div>
                    ) : (
                      'Mesajı Gönder'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div 
              ref={contactInfoRef}
              className="opacity-0 transform translate-y-10 transition-all duration-1000 delay-500"
            >
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 text-white shadow-3xl">
                  <h3 className="text-3xl font-bold mb-8">İletişim Bilgileri</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Telefon</h4>
                        <p className="text-orange-100 leading-relaxed">
                          <a href="tel:0 534 642 63 93" className="hover:text-white transition-colors duration-300">
                          0 533-569-10-05
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">E-posta</h4>
                        <p className="text-orange-100 leading-relaxed">
                          <a href="mailto:donderlerinsaathafriyat@gmail.com" className="hover:text-white transition-colors duration-300">
                            donderlerinsaathafriyat@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Adres</h4>
                        <address className="text-orange-100 leading-relaxed not-italic">
                          Gaziantep, Türkiye
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200">
                  <h3 className="text-3xl font-bold text-slate-800 mb-8">Çalışma Saatleri</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                      <span className="text-slate-700 font-medium">Hafta İçi</span>
                      <span className="text-slate-800 font-semibold">08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Hafta Sonu</span>
                      <span className="text-slate-800 font-semibold">08:00 - 17:00</span>
                    </div>
                    <div className="mt-6 p-4 bg-orange-500/10 rounded-xl border border-orange-200">
                      <p className="text-slate-700 text-sm">
                        <span className="font-semibold">Not:</span> Acil durumlar için 7/24 iletişim kurulabilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Toast */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 p-6 rounded-2xl shadow-2xl transform transition-all duration-500 ${
          notificationType === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`} role="alert" aria-live="polite">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6" aria-hidden="true">
              {notificationType === 'success' ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <span className="font-semibold">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Structured Data for Contact */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "İletişim - Dönderler İnşaat",
        "description": "Gaziantep'te hafriyat, altyapı işleri ve iş makinesi kiralama hizmetleri için iletişim bilgileri",
        "url": "https://donderlerinsaat.com.tr/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": "Dönderler İnşaat",
          "telephone": "+90-533-569-10-05, +90-534-642-63-93",
          "email": "donderlerinsaathafriyat@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gaziantep",
            "addressRegion": "Gaziantep",
            "addressCountry": "Türkiye"
          },
          "openingHours": "Mo-Fr 08:00-18:00, Sa-Su 08:00-17:00",
          "areaServed": "Gaziantep"
        }
      })}
      </script>

      <Footer />
    </main>
  );
};

export default Contact; 