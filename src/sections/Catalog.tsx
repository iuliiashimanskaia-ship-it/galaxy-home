import { useState, useEffect, useRef } from 'react';
import { houses, getPackagesByHouseId, getOptionsByHouseId, cities } from '@/data/houses';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Ruler, Scale, Maximize, ArrowRight, Truck, Save, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/store/appStore';
import type { House, Package, HouseOption, City } from '@/types';

const purposes = [
  { value: 'living', label: 'Проживание' },
  { value: 'rent', label: 'Аренда' },
  { value: 'business', label: 'Бизнес' },
];

const timelines = [
  { value: 'urgent', label: 'Срочно' },
  { value: '1-3months', label: '1–3 месяца' },
  { value: 'interest', label: 'Просто интересно' },
];

export function Catalog() {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Configurator state
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<HouseOption[]>([]);
  const [deliveryCity, setDeliveryCity] = useState<City | null>(null);
  const [saveFormData, setSaveFormData] = useState({ name: '', phone: '' });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const { quizData, setQuizData, resetQuiz } = useAppStore();

  const packages = selectedHouse ? getPackagesByHouseId(selectedHouse.id) : [];
  const options = selectedHouse ? getOptionsByHouseId(selectedHouse.id) : [];

  // Group options by category
  const optionsByCategory = options.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, typeof options>);

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

  // Reset configurator when house changes
  useEffect(() => {
    if (selectedHouse && packages.length > 0) {
      setSelectedPackage(packages[0]);
      setSelectedOptions([]);
      setDeliveryCity(null);
    }
  }, [selectedHouse, packages.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const openQuiz = (house: House) => {
    setSelectedHouse(house);
    setShowQuiz(true);
    setQuizStep(1);
    resetQuiz();
  };

  const submitQuiz = () => {
    // Save lead data
    console.log('Quiz submitted:', { house: selectedHouse, ...quizData });
    setShowQuiz(false);
    setShowConfigurator(true);
  };

  const toggleOption = (option: HouseOption) => {
    setSelectedOptions(prev => {
      const exists = prev.find(o => o.id === option.id);
      if (exists) {
        return prev.filter(o => o.id !== option.id);
      }
      return [...prev, option];
    });
  };

  const getBasePrice = () => {
    if (!selectedHouse) return 0;
    return selectedHouse.basePrice + (selectedPackage?.price || 0);
  };

  const getOptionsPrice = () => {
    return selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  };

  const getDeliveryPrice = () => {
    if (!deliveryCity || !selectedHouse) return 0;
    return selectedHouse.chinaToUssuriysk + (deliveryCity.distanceKm * deliveryCity.deliveryRate);
  };

  const getTotalPrice = () => {
    return getBasePrice() + getOptionsPrice() + getDeliveryPrice();
  };

  const handleSaveCalculation = () => {
    console.log('Saving calculation:', {
      house: selectedHouse?.name,
      package: selectedPackage?.name,
      options: selectedOptions.map(o => o.name),
      city: deliveryCity?.name,
      totalPrice: getTotalPrice(),
      ...saveFormData,
    });
    setShowSaveDialog(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const canProceed = () => {
    switch (quizStep) {
      case 1: return quizData.city;
      case 2: return quizData.purpose;
      case 3: return quizData.timeline;
      case 4: return quizData.name && quizData.phone;
      default: return false;
    }
  };

  return (
    <section 
      id="catalog" 
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
            Каталог домов
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Выберите подходящую модель капсульного дома. Все дома готовы к круглогодичному проживанию в российском климате.
          </p>
        </div>

        {/* Houses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.map((house, index) => (
            <Card 
              key={house.id}
              className={`group overflow-hidden border border-gray-200 rounded-2xl hover:shadow-xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={house.images[0]} 
                  alt={house.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {house.isPopular && (
                  <Badge className="absolute top-4 left-4 bg-neon text-black font-semibold px-3 py-1">
                    <Flame className="w-3 h-3 mr-1" />
                    ХИТ ПРОДАЖ
                  </Badge>
                )}
                {house.purchaseCount > 10 && (
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    Купили {house.purchaseCount} раз
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                {/* Title & Price */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black font-display">{house.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{house.description}</p>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Maximize className="w-4 h-4 text-gray-400" />
                    <span>{house.area} м²</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Ruler className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{house.dimensions.split('×')[0].trim()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Scale className="w-4 h-4 text-gray-400" />
                    <span>{(house.weight / 1000).toFixed(1)} т</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-black font-display">
                    {formatPrice(house.basePrice)} ₽
                  </div>
                  <div className="text-gray-400 text-xs">без учета доставки и пошлин</div>
                </div>

                {/* CTA */}
                <Button 
                  className="w-full bg-black text-white hover:bg-neon hover:text-black font-medium group/btn"
                  onClick={() => openQuiz(house)}
                >
                  Узнать полную стоимость
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quiz Modal */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedHouse?.name}
            </DialogTitle>
          </DialogHeader>
          
          {/* Progress */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  step <= quizStep ? 'bg-neon' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Step 1: City */}
          {quizStep === 1 && (
            <div className="space-y-4">
              <Label className="text-lg font-medium">Город установки</Label>
              <Input 
                placeholder="Введите город"
                value={quizData.city}
                onChange={(e) => setQuizData({ city: e.target.value })}
              />
            </div>
          )}

          {/* Step 2: Purpose */}
          {quizStep === 2 && (
            <div className="space-y-4">
              <Label className="text-lg font-medium">Назначение</Label>
              <div className="grid gap-2">
                {purposes.map((p) => (
                  <Button
                    key={p.value}
                    variant={quizData.purpose === p.value ? 'default' : 'outline'}
                    className={`justify-start ${quizData.purpose === p.value ? 'bg-neon text-black' : ''}`}
                    onClick={() => setQuizData({ purpose: p.value as any })}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {quizStep === 3 && (
            <div className="space-y-4">
              <Label className="text-lg font-medium">Срок покупки</Label>
              <div className="grid gap-2">
                {timelines.map((t) => (
                  <Button
                    key={t.value}
                    variant={quizData.timeline === t.value ? 'default' : 'outline'}
                    className={`justify-start ${quizData.timeline === t.value ? 'bg-neon text-black' : ''}`}
                    onClick={() => setQuizData({ timeline: t.value as any })}
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contacts */}
          {quizStep === 4 && (
            <div className="space-y-4">
              <Label className="text-lg font-medium">Ваши контакты</Label>
              <Input 
                placeholder="Имя"
                value={quizData.name}
                onChange={(e) => setQuizData({ name: e.target.value })}
              />
              <Input 
                placeholder="Телефон или Telegram"
                value={quizData.phone}
                onChange={(e) => setQuizData({ phone: e.target.value })}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {quizStep > 1 && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setQuizStep(quizStep - 1)}
              >
                Назад
              </Button>
            )}
            <Button 
              className="flex-1 bg-neon text-black hover:bg-neon-dark"
              disabled={!canProceed()}
              onClick={() => {
                if (quizStep < 4) {
                  setQuizStep(quizStep + 1);
                } else {
                  submitQuiz();
                }
              }}
            >
              {quizStep === 4 ? 'Перейти к расчету' : 'Далее'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configurator Modal */}
      <Dialog open={showConfigurator} onOpenChange={setShowConfigurator}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedHouse && (
                <>
                  <img 
                    src={selectedHouse.images[0]} 
                    alt={selectedHouse.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <div>{selectedHouse.name}</div>
                    <div className="text-sm font-normal text-gray-500">
                      {selectedHouse.area} м² | {selectedHouse.dimensions}
                    </div>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="grid lg:grid-cols-2 gap-8 mt-4">
            {/* Left: Configuration */}
            <div className="space-y-6">
              {/* Package Selection */}
              <div>
                <h4 className="font-semibold text-black mb-3">Комплектация</h4>
                <Tabs 
                  value={selectedPackage?.id || packages[0]?.id} 
                  onValueChange={(id) => {
                    const pkg = packages.find(p => p.id === id);
                    if (pkg) setSelectedPackage(pkg);
                  }}
                >
                  <TabsList className="grid grid-cols-4 w-full">
                    {packages.map((pkg) => (
                      <TabsTrigger key={pkg.id} value={pkg.id} className="text-xs">
                        {pkg.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {packages.map((pkg) => (
                    <TabsContent key={pkg.id} value={pkg.id}>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {pkg.description}
                        {pkg.price > 0 && (
                          <span className="text-neon font-semibold ml-2">
                            +{formatPrice(pkg.price)} ₽
                          </span>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Options */}
              <div>
                <h4 className="font-semibold text-black mb-3">Дополнительные опции</h4>
                <div className="space-y-3">
                  {Object.entries(optionsByCategory).map(([category, categoryOptions]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">{category}</h5>
                      <div className="space-y-2">
                        {categoryOptions.map((option) => (
                          <div key={option.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id={option.id}
                                checked={selectedOptions.some(o => o.id === option.id)}
                                onCheckedChange={() => toggleOption(option)}
                              />
                              <Label htmlFor={option.id} className="text-sm cursor-pointer">
                                {option.name}
                              </Label>
                            </div>
                            <span className="text-sm font-medium text-neon">
                              +{formatPrice(option.price)} ₽
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div>
                <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Доставка
                </h4>
                <Select 
                  value={deliveryCity?.id || ''} 
                  onValueChange={(id) => {
                    const city = cities.find(c => c.id === id);
                    setDeliveryCity(city || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город доставки" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {deliveryCity && selectedHouse && (
                  <div className="mt-3 space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Китай → Уссурийск</span>
                      <span>{formatPrice(selectedHouse.chinaToUssuriysk)} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Уссурийск → {deliveryCity.name}</span>
                      <span>{formatPrice(deliveryCity.distanceKm * deliveryCity.deliveryRate)} ₽</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Итого доставка</span>
                      <span className="text-neon">{formatPrice(getDeliveryPrice())} ₽</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Total Price */}
            <div>
              <div className="bg-black text-white rounded-2xl p-6 sticky top-4">
                <h4 className="text-lg font-semibold mb-4">Ваш расчет</h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{selectedHouse?.name}</span>
                    <span>{formatPrice(selectedHouse?.basePrice || 0)} ₽</span>
                  </div>
                  {selectedPackage && selectedPackage.price > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Комплектация {selectedPackage.name}</span>
                      <span>+{formatPrice(selectedPackage.price)} ₽</span>
                    </div>
                  )}
                  {selectedOptions.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Опции ({selectedOptions.length})</span>
                      <span>+{formatPrice(getOptionsPrice())} ₽</span>
                    </div>
                  )}
                  {deliveryCity && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Доставка в {deliveryCity.name}</span>
                      <span>+{formatPrice(getDeliveryPrice())} ₽</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/20 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Итоговая стоимость</span>
                    <span className="text-3xl font-bold text-neon font-display">
                      {formatPrice(getTotalPrice())} ₽
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-neon text-black hover:bg-neon-dark font-semibold py-6"
                  onClick={() => setShowSaveDialog(true)}
                  disabled={isSaved}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Сохранено!
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Сохранить расчет
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Мы свяжемся с вами в течение 24 часов
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Сохранить расчет</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Ваше имя</Label>
              <Input 
                value={saveFormData.name}
                onChange={(e) => setSaveFormData({ ...saveFormData, name: e.target.value })}
                placeholder="Имя"
              />
            </div>
            <div>
              <Label>Телефон</Label>
              <Input 
                value={saveFormData.phone}
                onChange={(e) => setSaveFormData({ ...saveFormData, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-2">Ваш расчет:</div>
              <div className="font-semibold">{selectedHouse?.name}</div>
              <div className="text-sm text-gray-600">
                Комплектация: {selectedPackage?.name || 'Базовая'}
              </div>
              <div className="text-sm text-gray-600">
                Опций: {selectedOptions.length}
              </div>
              <div className="text-xl font-bold text-neon mt-2">
                {formatPrice(getTotalPrice())} ₽
              </div>
            </div>
            <Button 
              className="w-full bg-neon text-black hover:bg-neon-dark"
              onClick={handleSaveCalculation}
              disabled={!saveFormData.name || !saveFormData.phone}
            >
              Отправить расчет менеджеру
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
