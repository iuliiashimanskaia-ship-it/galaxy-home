import { MessageCircle, Instagram, Youtube, Send } from 'lucide-react';

const footerLinks = {
  catalog: [
    { label: 'KIMMI S15', href: '#' },
    { label: 'KIMMI M25', href: '#' },
    { label: 'KIMMI L35', href: '#' },
    { label: 'KIMMI XL50', href: '#' },
    { label: 'Все модели', href: '#catalog' },
  ],
  company: [
    { label: 'О нас', href: '#about' },
    { label: 'Производство', href: '#about' },
    { label: 'Доставка', href: '#faq' },
    { label: 'Гарантия', href: '#faq' },
  ],
  partners: [
    { label: 'Стать агентом', href: '#agent' },
    { label: 'Личный кабинет', href: '#' },
    { label: 'Материалы', href: '#agent' },
  ],
  support: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Документация', href: '#' },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: 'https://t.me/kimmi', label: 'Telegram' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Send, href: '#', label: 'VK' },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <a href="#hero" className="inline-block mb-4">
              <span className="text-3xl font-bold font-display tracking-tight text-white">
                KIMMI
              </span>
            </a>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Доставка капсульных домов нового поколения под ключ в Россию. 
              Современные решения для жизни, работы и бизнеса.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-neon hover:text-black transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-semibold text-white mb-4">Каталог</h4>
            <ul className="space-y-2">
              {footerLinks.catalog.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-neon transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-neon transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-semibold text-white mb-4">Партнерам</h4>
            <ul className="space-y-2">
              {footerLinks.partners.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-neon transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Поддержка</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-neon transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 KIMMI. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-neon transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-neon transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
