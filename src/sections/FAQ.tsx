import { useEffect, useRef, useState } from 'react';
import { faqs } from '@/data/houses';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
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
      id="faq" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-display mb-4">
            Часто задаваемые <span className="text-neon">вопросы</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ответы на популярные вопросы о наших капсульных домах, доставке и установке
          </p>
        </div>

        {/* FAQ Accordion */}
        <div 
          className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-gray-200 rounded-xl px-6 data-[state=open]:border-neon/50"
              >
                <AccordionTrigger className="text-left text-black font-medium hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-neon text-sm font-semibold">{faq.category}</span>
                    <span className="text-gray-300">|</span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div 
          className={`text-center mt-12 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-500 mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a 
            href="#contacts"
            className="inline-flex items-center gap-2 text-neon font-medium hover:underline"
          >
            Свяжитесь с нами
          </a>
        </div>
      </div>
    </section>
  );
}
