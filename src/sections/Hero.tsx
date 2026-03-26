import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToCatalog = () => {
    const element = document.querySelector('#catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Доставка по всей России</span>
          </div>

          {/* Main Title */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display uppercase tracking-tight leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Доставка капсульных
            <br />
            <span className="text-neon">домов нового</span>
            <br />
            поколения
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Под ключ в Россию. Современные решения для жизни, работы и бизнеса. 
            От производителя с гарантией до 2 лет.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Button 
              size="lg"
              className="bg-neon text-black hover:bg-neon-dark font-semibold text-base px-8 py-6 rounded-xl group"
              onClick={scrollToCatalog}
            >
              Оставить заявку
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-xl"
              onClick={() => window.open('https://t.me/kimmi', '_blank')}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Связаться в Telegram
            </Button>
          </div>

          {/* Stats */}
          <div 
            className={`grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-display">150+</div>
              <div className="text-white/60 text-sm mt-1">Доставлено домов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-neon font-display">45</div>
              <div className="text-white/60 text-sm mt-1">Дней доставка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-display">2</div>
              <div className="text-white/60 text-sm mt-1">Года гарантии</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <Button 
          className="bg-neon text-black hover:bg-neon-dark font-semibold shadow-lg shadow-neon/30 rounded-full px-6 py-6"
          onClick={scrollToCatalog}
        >
          Оставить заявку
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
