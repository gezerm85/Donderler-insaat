import { useState, useEffect } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-orange-300/15 rounded-full blur-3xl animate-pulse delay-1500" aria-hidden="true"></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true"></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Company Name */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-4">
            <span className="bg-gradient-to-r from-slate-800 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              DÖNDERLER İNŞAAT
            </span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">HAFRİYAT & ALTYAPI</p>
        </div>

        {/* Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-r-orange-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        {/* Loading Text */}
        <div className="text-slate-600 font-medium text-lg">
          <span>Yükleniyor{dots}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-200 rounded-full mt-6 mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-ping" aria-hidden="true"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-300 rounded-full animate-ping delay-1000" aria-hidden="true"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-ping delay-500" aria-hidden="true"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-orange-200 rounded-full animate-ping delay-1500" aria-hidden="true"></div>
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-orange-300 rounded-full animate-ping delay-2000" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default Loading;

