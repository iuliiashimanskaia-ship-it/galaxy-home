import type { House, Package, HouseOption, City, FAQ } from '@/types';

export const houses: House[] = [
  {
    id: '1',
    name: 'KIMMI S15',
    slug: 'kimmi-s15',
    description: 'Компактный капсульный дом для одного-двух человек. Идеален для одиночного проживания, удаленной работы или небольшого кемпинга.',
    area: 15,
    dimensions: '6.0 × 2.5 × 2.8 м',
    weight: 3500,
    basePrice: 1890000,
    chinaToUssuriysk: 180000,
    images: ['/house-1.jpg'],
    isPopular: true,
    purchaseCount: 23,
  },
  {
    id: '2',
    name: 'KIMMI M25',
    slug: 'kimmi-m25',
    description: 'Среднеразмерный капсульный дом с панорамным остеклением. Отличный выбор для пары или небольшой семьи.',
    area: 25,
    dimensions: '8.5 × 3.0 × 2.9 м',
    weight: 5500,
    basePrice: 2890000,
    chinaToUssuriysk: 250000,
    images: ['/house-2.jpg'],
    isPopular: true,
    purchaseCount: 15,
  },
  {
    id: '3',
    name: 'KIMMI L35',
    slug: 'kimmi-l35',
    description: 'Просторный капсульный дом с террасой и премиальной отделкой. Для тех, кто ценит комфорт и стиль.',
    area: 35,
    dimensions: '10.0 × 3.5 × 3.0 м',
    weight: 7800,
    basePrice: 4190000,
    chinaToUssuriysk: 320000,
    images: ['/house-3.jpg'],
    isPopular: false,
    purchaseCount: 8,
  },
  {
    id: '4',
    name: 'KIMMI CAMP12',
    slug: 'kimmi-camp12',
    description: 'Ультракомпактный дом для кемпинга и арендного бизнеса. Минимальные затраты, максимальная отдача.',
    area: 12,
    dimensions: '4.5 × 2.7 × 2.5 м',
    weight: 2200,
    basePrice: 1290000,
    chinaToUssuriysk: 140000,
    images: ['/house-4.jpg'],
    isPopular: false,
    purchaseCount: 31,
  },
  {
    id: '5',
    name: 'KIMMI XL50',
    slug: 'kimmi-xl50',
    description: 'Двухэтажный премиум-дом с террасой на крыше. Роскошь и пространство для требовательных клиентов.',
    area: 50,
    dimensions: '9.0 × 4.0 × 5.5 м',
    weight: 12000,
    basePrice: 6890000,
    chinaToUssuriysk: 450000,
    images: ['/house-5.jpg'],
    isPopular: true,
    purchaseCount: 5,
  },
  {
    id: '6',
    name: 'KIMMI NANO8',
    slug: 'kimmi-nano8',
    description: 'Мобильный микро-дом на колесах. Свобода передвижения и минимализм в одном решении.',
    area: 8,
    dimensions: '3.5 × 2.3 × 2.4 м',
    weight: 1500,
    basePrice: 890000,
    chinaToUssuriysk: 110000,
    images: ['/house-6.jpg'],
    isPopular: false,
    purchaseCount: 12,
  },
];

export const packages: Package[] = [
  // KIMMI S15
  { id: 'p1-1', houseId: '1', name: 'БАЗОВЫЙ', price: 0, description: 'Стандартная комплектация' },
  { id: 'p1-2', houseId: '1', name: 'КОМФОРТ', price: 180000, description: 'Улучшенная отделка, мебель' },
  { id: 'p1-3', houseId: '1', name: 'ПРЕМИУМ', price: 350000, description: 'Премиум материалы, полная меблировка' },
  { id: 'p1-4', houseId: '1', name: 'ДЛЯ АРЕНДЫ', price: 420000, description: 'Оптимизировано для сдачи в аренду' },
  
  // KIMMI M25
  { id: 'p2-1', houseId: '2', name: 'БАЗОВЫЙ', price: 0, description: 'Стандартная комплектация' },
  { id: 'p2-2', houseId: '2', name: 'КОМФОРТ', price: 250000, description: 'Улучшенная отделка, мебель' },
  { id: 'p2-3', houseId: '2', name: 'ПРЕМИУМ', price: 480000, description: 'Премиум материалы, полная меблировка' },
  { id: 'p2-4', houseId: '2', name: 'ДЛЯ АРЕНДЫ', price: 550000, description: 'Оптимизировано для сдачи в аренду' },
  
  // KIMMI L35
  { id: 'p3-1', houseId: '3', name: 'БАЗОВЫЙ', price: 0, description: 'Стандартная комплектация' },
  { id: 'p3-2', houseId: '3', name: 'КОМФОРТ', price: 320000, description: 'Улучшенная отделка, мебель' },
  { id: 'p3-3', houseId: '3', name: 'ПРЕМИУМ', price: 620000, description: 'Премиум материалы, полная меблировка' },
  { id: 'p3-4', houseId: '3', name: 'ДЛЯ АРЕНДЫ', price: 710000, description: 'Оптимизировано для сдачи в аренду' },
  
  // KIMMI CAMP12
  { id: 'p4-1', houseId: '4', name: 'БАЗОВЫЙ', price: 0, description: 'Стандартная комплектация' },
  { id: 'p4-2', houseId: '4', name: 'КОМФОРТ', price: 120000, description: 'Улучшенная отделка, мебель' },
  { id: 'p4-3', houseId: '4', name: 'ПРЕМИУМ', price: 240000, description: 'Премиум материалы, полная меблировка' },
  { id: 'p4-4', houseId: '4', name: 'ДЛЯ АРЕНДЫ', price: 280000, description: 'Оптимизировано для сдачи в аренду' },
  
  // KIMMI XL50
  { id: 'p5-1', houseId: '5', name: 'БАЗОВЫЙ', price: 0, description: 'Стандартная комплектация' },
  { id: 'p5-2', houseId: '5', name: 'КОМФОРТ', price: 450000, description: 'Улучшенная отделка, мебель' },
  { id: 'p5-3', houseId: '5', name: 'ПРЕМИУМ', price: 890000, description: 'Премиум материалы, полная меблировка' },
  { id: 'p5-4', houseId: '5', name: 'ДЛЯ АРЕНДЫ', price: 980000, description: 'Оптимизировано для сдачи в аренду' },
  
  // KIMMI NANO8
  { id: 'p6-1', houseId: '6', name: 'БАЗОВЫЙ', price: 0, description: 'Стандартная комплектация' },
  { id: 'p6-2', houseId: '6', name: 'КОМФОРТ', price: 80000, description: 'Улучшенная отделка, мебель' },
  { id: 'p6-3', houseId: '6', name: 'ПРЕМИУМ', price: 160000, description: 'Премиум материалы, полная меблировка' },
  { id: 'p6-4', houseId: '6', name: 'ДЛЯ АРЕНДЫ', price: 190000, description: 'Оптимизировано для сдачи в аренду' },
];

export const houseOptions: HouseOption[] = [
  // KIMMI S15 options
  { id: 'o1-1', houseId: '1', name: 'Шторы', price: 36315, category: 'Комфорт' },
  { id: 'o1-2', houseId: '1', name: 'Кухня (вытяжка, столешница, индукционная плита)', price: 80700, category: 'Кухня' },
  { id: 'o1-3', houseId: '1', name: 'Кровать с ящиком для хранения + матрас', price: 80700, category: 'Спальня' },
  { id: 'o1-4', houseId: '1', name: 'Фирменная кровать + матрас', price: 36315, category: 'Спальня' },
  { id: 'o1-5', houseId: '1', name: 'Трехслойное остекление', price: 38736, category: 'Окна' },
  { id: 'o1-6', houseId: '1', name: 'Электрический теплый пол', price: 62946, category: 'Отопление' },
  { id: 'o1-7', houseId: '1', name: 'Теплоизоляция труб', price: 20175, category: 'Инженерия' },
  { id: 'o1-8', houseId: '1', name: 'Проектор + передние моторизованные рулонные шторы', price: 22596, category: 'Развлечения' },
  { id: 'o1-9', houseId: '1', name: 'Диван для отдыха', price: 22596, category: 'Мебель' },
  
  // KIMMI M25 options
  { id: 'o2-1', houseId: '2', name: 'Шторы', price: 42315, category: 'Комфорт' },
  { id: 'o2-2', houseId: '2', name: 'Кухня (вытяжка, столешница, индукционная плита)', price: 95700, category: 'Кухня' },
  { id: 'o2-3', houseId: '2', name: 'Кровать с ящиком для хранения + матрас', price: 95700, category: 'Спальня' },
  { id: 'o2-4', houseId: '2', name: 'Фирменная кровать + матрас', price: 42315, category: 'Спальня' },
  { id: 'o2-5', houseId: '2', name: 'Трехслойное остекление', price: 48736, category: 'Окна' },
  { id: 'o2-6', houseId: '2', name: 'Электрический теплый пол', price: 72946, category: 'Отопление' },
  { id: 'o2-7', houseId: '2', name: 'Теплоизоляция труб', price: 25175, category: 'Инженерия' },
  { id: 'o2-8', houseId: '2', name: 'Проектор + передние моторизованные рулонные шторы', price: 27596, category: 'Развлечения' },
  { id: 'o2-9', houseId: '2', name: 'Диван для отдыха', price: 27596, category: 'Мебель' },
  
  // KIMMI L35 options
  { id: 'o3-1', houseId: '3', name: 'Шторы', price: 52315, category: 'Комфорт' },
  { id: 'o3-2', houseId: '3', name: 'Кухня (вытяжка, столешница, индукционная плита)', price: 115700, category: 'Кухня' },
  { id: 'o3-3', houseId: '3', name: 'Кровать с ящиком для хранения + матрас', price: 115700, category: 'Спальня' },
  { id: 'o3-4', houseId: '3', name: 'Фирменная кровать + матрас', price: 52315, category: 'Спальня' },
  { id: 'o3-5', houseId: '3', name: 'Трехслойное остекление', price: 58736, category: 'Окна' },
  { id: 'o3-6', houseId: '3', name: 'Электрический теплый пол', price: 87946, category: 'Отопление' },
  { id: 'o3-7', houseId: '3', name: 'Теплоизоляция труб', price: 30175, category: 'Инженерия' },
  { id: 'o3-8', houseId: '3', name: 'Проектор + передние моторизованные рулонные шторы', price: 32596, category: 'Развлечения' },
  { id: 'o3-9', houseId: '3', name: 'Диван для отдыха', price: 32596, category: 'Мебель' },
  
  // KIMMI CAMP12 options
  { id: 'o4-1', houseId: '4', name: 'Шторы', price: 28315, category: 'Комфорт' },
  { id: 'o4-2', houseId: '4', name: 'Кухня (вытяжка, столешница, индукционная плита)', price: 60700, category: 'Кухня' },
  { id: 'o4-3', houseId: '4', name: 'Кровать с ящиком для хранения + матрас', price: 60700, category: 'Спальня' },
  { id: 'o4-4', houseId: '4', name: 'Фирменная кровать + матрас', price: 28315, category: 'Спальня' },
  { id: 'o4-5', houseId: '4', name: 'Трехслойное остекление', price: 30736, category: 'Окна' },
  { id: 'o4-6', houseId: '4', name: 'Электрический теплый пол', price: 47946, category: 'Отопление' },
  { id: 'o4-7', houseId: '4', name: 'Теплоизоляция труб', price: 15175, category: 'Инженерия' },
  { id: 'o4-8', houseId: '4', name: 'Проектор + передние моторизованные рулонные шторы', price: 17596, category: 'Развлечения' },
  { id: 'o4-9', houseId: '4', name: 'Диван для отдыха', price: 17596, category: 'Мебель' },
  
  // KIMMI XL50 options
  { id: 'o5-1', houseId: '5', name: 'Шторы', price: 72315, category: 'Комфорт' },
  { id: 'o5-2', houseId: '5', name: 'Кухня (вытяжка, столешница, индукционная плита)', price: 155700, category: 'Кухня' },
  { id: 'o5-3', houseId: '5', name: 'Кровать с ящиком для хранения + матрас', price: 155700, category: 'Спальня' },
  { id: 'o5-4', houseId: '5', name: 'Фирменная кровать + матрас', price: 72315, category: 'Спальня' },
  { id: 'o5-5', houseId: '5', name: 'Трехслойное остекление', price: 78736, category: 'Окна' },
  { id: 'o5-6', houseId: '5', name: 'Электрический теплый пол', price: 117946, category: 'Отопление' },
  { id: 'o5-7', houseId: '5', name: 'Теплоизоляция труб', price: 40175, category: 'Инженерия' },
  { id: 'o5-8', houseId: '5', name: 'Проектор + передние моторизованные рулонные шторы', price: 42596, category: 'Развлечения' },
  { id: 'o5-9', houseId: '5', name: 'Диван для отдыха', price: 42596, category: 'Мебель' },
  
  // KIMMI NANO8 options
  { id: 'o6-1', houseId: '6', name: 'Шторы', price: 22315, category: 'Комфорт' },
  { id: 'o6-2', houseId: '6', name: 'Кухня (вытяжка, столешница, индукционная плита)', price: 45700, category: 'Кухня' },
  { id: 'o6-3', houseId: '6', name: 'Кровать с ящиком для хранения + матрас', price: 45700, category: 'Спальня' },
  { id: 'o6-4', houseId: '6', name: 'Фирменная кровать + матрас', price: 22315, category: 'Спальня' },
  { id: 'o6-5', houseId: '6', name: 'Трехслойное остекление', price: 24736, category: 'Окна' },
  { id: 'o6-6', houseId: '6', name: 'Электрический теплый пол', price: 37946, category: 'Отопление' },
  { id: 'o6-7', houseId: '6', name: 'Теплоизоляция труб', price: 12175, category: 'Инженерия' },
  { id: 'o6-8', houseId: '6', name: 'Проектор + передние моторизованные рулонные шторы', price: 13596, category: 'Развлечения' },
  { id: 'o6-9', houseId: '6', name: 'Диван для отдыха', price: 13596, category: 'Мебель' },
];

export const cities: City[] = [
  { id: '1', name: 'Москва', region: 'Московская область', distanceKm: 6420, deliveryRate: 120 },
  { id: '2', name: 'Санкт-Петербург', region: 'Ленинградская область', distanceKm: 7250, deliveryRate: 120 },
  { id: '3', name: 'Новосибирск', region: 'Новосибирская область', distanceKm: 3150, deliveryRate: 120 },
  { id: '4', name: 'Екатеринбург', region: 'Свердловская область', distanceKm: 4650, deliveryRate: 120 },
  { id: '5', name: 'Казань', region: 'Татарстан', distanceKm: 5280, deliveryRate: 120 },
  { id: '6', name: 'Нижний Новгород', region: 'Нижегородская область', distanceKm: 5850, deliveryRate: 120 },
  { id: '7', name: 'Челябинск', region: 'Челябинская область', distanceKm: 4350, deliveryRate: 120 },
  { id: '8', name: 'Самара', region: 'Самарская область', distanceKm: 5620, deliveryRate: 120 },
  { id: '9', name: 'Омск', region: 'Омская область', distanceKm: 2850, deliveryRate: 120 },
  { id: '10', name: 'Ростов-на-Дону', region: 'Ростовская область', distanceKm: 6850, deliveryRate: 120 },
  { id: '11', name: 'Уфа', region: 'Башкортостан', distanceKm: 4980, deliveryRate: 120 },
  { id: '12', name: 'Красноярск', region: 'Красноярский край', distanceKm: 2150, deliveryRate: 120 },
  { id: '13', name: 'Воронеж', region: 'Воронежская область', distanceKm: 6350, deliveryRate: 120 },
  { id: '14', name: 'Пермь', region: 'Пермский край', distanceKm: 4850, deliveryRate: 120 },
  { id: '15', name: 'Волгоград', region: 'Волгоградская область', distanceKm: 6250, deliveryRate: 120 },
  { id: '16', name: 'Краснодар', region: 'Краснодарский край', distanceKm: 7150, deliveryRate: 120 },
  { id: '17', name: 'Тюмень', region: 'Тюменская область', distanceKm: 3850, deliveryRate: 120 },
  { id: '18', name: 'Иркутск', region: 'Иркутская область', distanceKm: 1850, deliveryRate: 120 },
  { id: '19', name: 'Владивосток', region: 'Приморский край', distanceKm: 120, deliveryRate: 120 },
  { id: '20', name: 'Хабаровск', region: 'Хабаровский край', distanceKm: 750, deliveryRate: 120 },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Сколько времени занимает доставка?',
    answer: 'Средний срок доставки от момента заказа до прибытия дома в ваш город составляет 45-60 дней. Это включает производство (30-40 дней), морскую перевозку из Китая в Уссурийск (10-15 дней) и автомобильную доставку до вашего города (3-7 дней в зависимости от расстояния).',
    category: 'Доставка',
  },
  {
    id: '2',
    question: 'Нужно ли получать разрешение на установку?',
    answer: 'Для установки капсульного дома на собственном участке разрешение не требуется, если дом является временной (мобильной) конструкцией. Для постоянной установки может потребоваться регистрация в местной администрации. Мы предоставляем полную документацию и консультируем по вопросам легализации.',
    category: 'Установка',
  },
  {
    id: '3',
    question: 'Какие коммуникации нужно подключать?',
    answer: 'Все наши дома полностью автономны и требуют минимального подключения: электричество 220V (стандартная розетка), водоснабжение (шланг 1/2 дюйма) и канализация (сливная труба 50 мм). Дома оснащены автономным отоплением, водонагревателем и электрической плитой.',
    category: 'Установка',
  },
  {
    id: '4',
    question: 'Какая гарантия предоставляется?',
    answer: 'Мы предоставляем гарантию 15 лет на конструкцию дома и 1 год на инженерное оборудование. Гарантия распространяется на заводские дефекты и не включает износ от нормальной эксплуатации. После окончания гарантийного срока доступно сервисное обслуживание.',
    category: 'Гарантия',
  },
  {
    id: '5',
    question: 'Можно ли перенести дом на другое место?',
    answer: 'Да, все наши капсульные дома являются мобильными конструкциями. Для перемещения потребуется автокран (для снятия/установки) и низкорамный трал для транспортировки. Стоимость переезда рассчитывается индивидуально.',
    category: 'Установка',
  },
  {
    id: '6',
    question: 'Как происходит оплата?',
    answer: 'Оплата производится в три этапа: предоплата 30% при заказе, 50% перед отгрузкой с завода в Китае, и оставшиеся 20% перед доставкой к месту установки. Принимаем переводы на российский счёт, оплату картой и криптовалюту.',
    category: 'Доставка',
  },
  {
    id: '7',
    question: 'Дома пригодны для зимнего проживания?',
    answer: 'Да, все наши дома рассчитаны на круглогодичное проживание в российском климате. Стандартная комплектация включает утепление стен 150 мм, энергосберегающие окна и автономное отопление. Опционально доступно трёхслойное остекление и тёплый пол.',
    category: 'Установка',
  },
  {
    id: '8',
    question: 'Можно ли использовать дом для сдачи в аренду?',
    answer: 'Абсолютно! У нас есть специальная комплектация "Для аренды" с оптимальным соотношением цена/качество. Многие наши клиенты успешно используют дома для глэмпинга, посуточной аренды и краткосрочного проживания. Мы также предоставляем консультации по запуску арендного бизнеса.',
    category: 'Доставка',
  },
];

export function getHouseBySlug(slug: string): House | undefined {
  return houses.find(h => h.slug === slug);
}

export function getPackagesByHouseId(houseId: string): Package[] {
  return packages.filter(p => p.houseId === houseId);
}

export function getOptionsByHouseId(houseId: string): HouseOption[] {
  return houseOptions.filter(o => o.houseId === houseId);
}

export function getCityById(id: string): City | undefined {
  return cities.find(c => c.id === id);
}

export function calculateDelivery(city: City): number {
  return city.distanceKm * city.deliveryRate;
}
