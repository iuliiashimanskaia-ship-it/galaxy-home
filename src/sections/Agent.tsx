import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Gift, 
  FileText, 
  Image, 
  Video,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'До 10% комиссии',
    description: 'С каждой продажи капсульного дома',
  },
  {
    icon: TrendingUp,
    title: 'Рост дохода',
    description: 'Повышаем % при достижении целей',
  },
  {
    icon: Gift,
    title: 'Бонусы',
    description: 'Дополнительные выплаты за объем',
  },
  {
    icon: Users,
    title: 'Поддержка 24/7',
    description: 'Личный менеджер и материалы',
  },
];

const materials = [
  { icon: Image, label: 'Фото домов' },
  { icon: Video, label: 'Видео презентации' },
  { icon: FileText, label: 'PDF каталоги' },
  { icon: FileText, label: 'Технические specs' },
];

export function Agent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section 
      id="agent" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#1A1A1A]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display mb-4">
            Станьте нашим <span className="text-neon">агентом</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Зарабатывайте на продаже инновационных капсульных домов. 
            Мы предоставляем всё необходимое для успешной работы.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Benefits & Info */}
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-gray-500 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Earnings Calculator */}
            <Card className="bg-white/5 border-white/10 mb-8">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Сколько можно заработать</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-400">1 дом в месяц</span>
                    <span className="text-neon font-bold">~200 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-400">2 дома в месяц</span>
                    <span className="text-neon font-bold">~450 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">3 дома в месяц</span>
                    <span className="text-neon font-bold">~750 000 ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Материалы для работы</h4>
              <div className="flex flex-wrap gap-3">
                {materials.map((material, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300"
                  >
                    <material.icon className="w-4 h-4 text-neon" />
                    {material.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <Card className="bg-white border-0">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-2xl font-bold text-black font-display mb-2">
                      Регистрация агента
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Заполните форму и мы свяжемся с вами в течение 24 часов
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-black">Имя</Label>
                        <Input 
                          id="name"
                          placeholder="Ваше имя"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-black">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-black">Телефон</Label>
                        <Input 
                          id="phone"
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password" className="text-black">Пароль</Label>
                        <Input 
                          id="password"
                          type="password"
                          placeholder="Минимум 8 символов"
                          className="mt-1"
                          required
                        />
                      </div>

                      <Button 
                        type="submit"
                        className="w-full bg-neon text-black hover:bg-neon-dark font-semibold py-6"
                      >
                        Стать агентом
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>

                      <p className="text-xs text-gray-400 text-center">
                        Нажимая кнопку, вы соглашаетесь с условиями партнерской программы
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-neon" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">
                      Заявка отправлена!
                    </h3>
                    <p className="text-gray-500">
                      Мы свяжемся с вами в течение 24 часов для подтверждения регистрации
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
