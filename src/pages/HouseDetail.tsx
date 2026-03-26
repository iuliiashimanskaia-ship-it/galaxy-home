import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHouseBySlug, getPackagesByHouseId, getOptionsByHouseId, cities } from '@/data/houses';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Maximize, 
  Ruler, 
  Scale, 
  Truck, 
  Calculator,
  Save,
  Flame
} from 'lucide-react';

export function HouseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveFormData, setSaveFormData] = useState({ name: '', phone: '' });
  const [rentPrice, setRentPrice] = useState(3000);
  const [rentDays, setRentDays] = useState(20);

  const {
    selectedHouse,
    selectedPackage,
    selectedOptions,
    deliveryCity,
    setSelectedHouse,
    setSelectedPackage,
    toggleOption,
    setDeliveryCity,
    getBasePrice,
    getOptionsPrice,
    getDeliveryPrice,
    getTotalPrice,
  } = useAppStore();

  const house = selectedHouse || (slug ? getHouseBySlug(slug) : null);
  const packages = house ? getPackagesByHouseId(house.id) : [];
  const options = house ? getOptionsByHouseId(house.id) : [];

  useEffect(() => {
    if (house && !selectedHouse) {
      setSelectedHouse(house);
    }
  }, [house, selectedHouse, setSelectedHouse]);

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Дом не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  // Group options by category
  const optionsByCategory = options.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, typeof options>);

  // ROI Calculator
  const monthlyIncome = rentPrice * rentDays;
  const yearlyIncome = monthlyIncome * 12;
  const totalPrice = getTotalPrice();
  const paybackMonths = totalPrice > 0 ? Math.ceil(totalPrice / monthlyIncome) : 0;
  const paybackYears = (paybackMonths / 12).toFixed(1);

  const handleSaveCalculation = () => {
    console.log('Saving calculation:', {
      house: house.name,
      package: selectedPackage?.name,
      options: selectedOptions.map(o => o.name),
      totalPrice: getTotalPrice(),
      ...saveFormData,
    });
    setShowSaveDialog(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              onClick={() => navigate('/#catalog')}
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в каталог
            </Button>
            <span className="text-xl font-bold font-display">KIMMI</span>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
              <img 
                src={house.images[0]} 
                alt={house.name}
                className="w-full h-full object-cover"
              />
              {house.isPopular && (
                <Badge className="absolute top-4 left-4 bg-neon text-black font-semibold">
                  <Flame className="w-3 h-3 mr-1" />
                  ХИТ ПРОДАЖ
                </Badge>
              )}
            </div>
            
            {/* Specs */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Maximize className="w-6 h-6 mx-auto mb-2 text-neon" />
                  <div className="text-2xl font-bold">{house.area}</div>
                  <div className="text-sm text-gray-500">м²</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Ruler className="w-6 h-6 mx-auto mb-2 text-neon" />
                  <div className="text-lg font-bold">{house.dimensions.split('×')[0].trim()}</div>
                  <div className="text-sm text-gray-500">длина</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Scale className="w-6 h-6 mx-auto mb-2 text-neon" />
                  <div className="text-2xl font-bold">{(house.weight / 1000).toFixed(1)}</div>
                  <div className="text-sm text-gray-500">тонн</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right: Configuration */}
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">{house.name}</h1>
            <p className="text-gray-600 mb-6">{house.description}</p>

            {/* Package Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Комплектация</h3>
              <Tabs 
                value={selectedPackage?.id || packages[0]?.id} 
                onValueChange={(id) => {
                  const pkg = packages.find(p => p.id === id);
                  if (pkg) setSelectedPackage(pkg);
                }}
              >
                <TabsList className="grid grid-cols-4 w-full">
                  {packages.map((pkg) => (
                    <TabsTrigger key={pkg.id} value={pkg.id} className="text-xs sm:text-sm">
                      {pkg.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {packages.map((pkg) => (
                  <TabsContent key={pkg.id} value={pkg.id}>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{pkg.description}</span>
                          <span className="font-bold">
                            {pkg.price > 0 ? `+${formatPrice(pkg.price)} ₽` : 'Включено'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Дополнительные опции</h3>
              <div className="space-y-4">
                {Object.entries(optionsByCategory).map(([category, categoryOptions]) => (
                  <Card key={category}>
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">{category}</h4>
                      <div className="space-y-2">
                        {categoryOptions.map((option) => (
                          <div key={option.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id={option.id}
                                checked={selectedOptions.some(o => o.id === option.id)}
                                onCheckedChange={() => toggleOption(option)}
                              />
                              <Label htmlFor={option.id} className="cursor-pointer">
                                {option.name}
                              </Label>
                            </div>
                            <span className="text-sm font-medium">+{formatPrice(option.price)} ₽</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Доставка
              </h3>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label>Город доставки</Label>
                    <Select 
                      value={deliveryCity?.id || ''} 
                      onValueChange={(id) => {
                        const city = cities.find(c => c.id === id);
                        setDeliveryCity(city || null);
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {deliveryCity && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Китай → Уссурийск</span>
                        <span>{formatPrice(house.chinaToUssuriysk)} ₽</span>
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
                </CardContent>
              </Card>
            </div>

            {/* ROI Calculator */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Калькулятор окупаемости
              </h3>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Цена аренды/сутки</Label>
                      <Input 
                        type="number"
                        value={rentPrice}
                        onChange={(e) => setRentPrice(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Дней в месяц</Label>
                      <Input 
                        type="number"
                        value={rentDays}
                        onChange={(e) => setRentDays(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">В месяц</div>
                      <div className="text-lg font-bold text-neon">{formatPrice(monthlyIncome)} ₽</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">В год</div>
                      <div className="text-lg font-bold">{formatPrice(yearlyIncome)} ₽</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Окупаемость</div>
                      <div className="text-lg font-bold">{paybackYears} лет</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Total Price */}
            <Card className="bg-black text-white">
              <CardContent className="p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Дом + комплектация</span>
                    <span>{formatPrice(getBasePrice())} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Опции</span>
                    <span>+{formatPrice(getOptionsPrice())} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Доставка</span>
                    <span>+{formatPrice(getDeliveryPrice())} ₽</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <span className="text-lg">Итоговая стоимость</span>
                  <span className="text-3xl font-bold text-neon font-display">
                    {formatPrice(getTotalPrice())} ₽
                  </span>
                </div>
                <Button 
                  className="w-full mt-6 bg-neon text-black hover:bg-neon-dark font-semibold"
                  onClick={() => setShowSaveDialog(true)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить расчёт
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Сохранить расчёт</DialogTitle>
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
              <div className="text-sm text-gray-500 mb-2">Ваш расчёт:</div>
              <div className="font-semibold">{house.name}</div>
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
              Отправить расчёт
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
