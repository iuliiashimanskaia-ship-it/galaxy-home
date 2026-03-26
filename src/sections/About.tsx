import { useEffect, useRef, useState } from 'react';
import { Check, Truck, Shield, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'От заказа до установки — всего 45-60 дней',
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: '15 лет гарантии на конструкцию дома',
  },
  {
    icon: Clock,
    title: 'Под ключ',
    description: 'Все коммуникации уже внутри дома',
  },
  {
    icon: Award,
    title: 'Сертификаты',
    description: 'Все необходимые документы и разрешения',
  },
];

const certificates = [
  'ISO 9001:2015',
  'CE Certification',
  'Fire Safety Class A',
  'Energy Efficiency A+',
];

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gray-50"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-display mb-6">
              О компании <span className="text-neon">KIMMI</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-6">
              Мы специализируемся на поставках инновационных капсульных домов из Китая в Россию. 
              Наши дома сочетают в себе современный дизайн, прочность конструкции и полную готовность к проживанию.
            </p>
            
            <p className="text-gray-600 mb-8">
              С 2020 года мы доставили более 150 домов в 40+ городов России. Наша команда обеспечивает 
              полный цикл — от консультации до установки и сервисного обслуживания.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div>
              <h4 className="font-semibold text-black mb-3">Сертификаты</h4>
              <div className="flex flex-wrap gap-2">
                {certificates.map((cert, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700"
                  >
                    <Check className="w-4 h-4 text-neon" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Image/Video Placeholder */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/house-3.jpg" 
                  alt="KIMMI Production"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              
              {/* Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-neon font-display">150+</div>
                    <div className="text-gray-500 text-sm">Доставлено</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black font-display">40+</div>
                    <div className="text-gray-500 text-sm">Городов</div>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-4 -right-4 bg-black text-white rounded-full w-24 h-24 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-neon">5+</div>
                <div className="text-xs text-center">лет<br/>опыта</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics Steps */}
        <div 
          className={`mt-24 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-bold text-black font-display text-center mb-12">
            Как мы работаем
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Заявка', desc: 'Оставляете заявку на сайте или по телефону' },
              { step: '02', title: 'Расчет', desc: 'Рассчитываем полную стоимость с доставкой' },
              { step: '03', title: 'Производство', desc: 'Изготовление дома на заводе (30-40 дней)' },
              { step: '04', title: 'Доставка', desc: 'Доставляем и устанавливаем на вашем участке' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-gray-100 font-display mb-4">{item.step}</div>
                <h4 className="text-lg font-semibold text-black mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-px bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
