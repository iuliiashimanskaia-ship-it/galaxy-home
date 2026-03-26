import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Телефон',
    value: '8 (800) 123-45-67',
    subtext: 'Бесплатно по России',
    href: 'tel:+78001234567',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@kimmi.ru',
    subtext: 'Отвечаем в течение дня',
    href: 'mailto:info@kimmi.ru',
  },
  {
    icon: MessageCircle,
    label: 'Telegram',
    value: '@kimmi_support',
    subtext: 'Быстрые ответы',
    href: 'https://t.me/kimmi_support',
  },
  {
    icon: Clock,
    label: 'Режим работы',
    value: '9:00 — 20:00',
    subtext: 'МСК, без выходных',
    href: null,
  },
];

export function Contacts() {
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
      id="contacts" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gray-50"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-display mb-4">
            Свяжитесь с <span className="text-neon">нами</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Остались вопросы? Мы всегда рады помочь. Выберите удобный способ связи.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <Card 
                  key={index} 
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-neon" />
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-lg font-semibold text-black hover:text-neon transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-lg font-semibold text-black">{item.value}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">{item.subtext}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Address */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Офис</div>
                    <div className="text-lg font-semibold text-black">
                      г. Москва, ул. Примерная, д. 123
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Бизнес-центр "Капсула", офис 456
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Contact Form */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-2xl font-bold text-black font-display mb-2">
                      Отправить сообщение
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Заполните форму и мы ответим вам в течение дня
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contact-name" className="text-black">Имя</Label>
                          <Input 
                            id="contact-name"
                            placeholder="Ваше имя"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-phone" className="text-black">Телефон</Label>
                          <Input 
                            id="contact-phone"
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="contact-email" className="text-black">Email</Label>
                        <Input 
                          id="contact-email"
                          type="email"
                          placeholder="your@email.com"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contact-message" className="text-black">Сообщение</Label>
                        <Textarea 
                          id="contact-message"
                          placeholder="Опишите ваш вопрос или пожелание..."
                          className="mt-1 min-h-[120px]"
                          required
                        />
                      </div>

                      <Button 
                        type="submit"
                        className="w-full bg-neon text-black hover:bg-neon-dark font-semibold py-6"
                      >
                        Отправить сообщение
                        <Send className="ml-2 w-5 h-5" />
                      </Button>

                      <p className="text-xs text-gray-400 text-center">
                        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-neon" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-gray-500">
                      Мы получили ваше сообщение и ответим вам в ближайшее время
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
