# KIMMI — Техническая спецификация

## 1. Архитектура проекта

### Стек технологий
- **Frontend**: React 18 + TypeScript + Vite
- **Стилизация**: Tailwind CSS 3.4 + shadcn/ui
- **Состояние**: Zustand (глобальное) + React Query (серверное)
- **Формы**: React Hook Form + Zod
- **Анимации**: Framer Motion
- **Карты**: Yandex Maps API (для расчёта расстояний)
- **Backend**: Node.js + Express (в отдельной директории)
- **База данных**: PostgreSQL + Prisma ORM

### Структура проекта
```
/mnt/okcomputer/output/
├── app/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── sections/       # Секции страниц
│   │   ├── pages/          # Страницы
│   │   ├── hooks/          # Кастомные хуки
│   │   ├── store/          # Zustand store
│   │   ├── lib/            # Утилиты
│   │   ├── types/          # TypeScript типы
│   │   └── api/            # API клиент
│   └── public/             # Статические файлы
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Контроллеры
│   │   ├── models/         # Модели данных
│   │   ├── middleware/     # Middleware
│   │   └── utils/          # Утилиты
│   └── prisma/             # Prisma schema
└── admin/                  # Admin панель (отдельное приложение)
```

---

## 2. База данных

### Схема Prisma

```prisma
// House (Дом)
model House {
  id              String   @id @default(uuid())
  name            String
  slug            String   @unique
  description     String
  area            Float    // Площадь м²
  dimensions      String   // Габариты
  weight          Float    // Вес кг
  basePrice       Int      // Базовая цена
  chinaToUssuriysk Int     // Доставка Китай → Уссурийск
  images          String[] // Массив URL фото
  isPopular       Boolean  @default(false)
  purchaseCount   Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  packages        Package[]
  options         HouseOption[]
  leads           Lead[]
}

// Package (Комплектация)
model Package {
  id          String @id @default(uuid())
  houseId     String
  name        String // БАЗОВЫЙ, КОМФОРТ, ПРЕМИУМ, ДЛЯ АРЕНДЫ
  price       Int
  description String
  
  house       House  @relation(fields: [houseId], references: [id])
}

// HouseOption (Опции конфигуратора)
model HouseOption {
  id       String @id @default(uuid())
  houseId  String
  name     String // Название опции
  price    Int
  category String // Категория для группировки
  
  house    House  @relation(fields: [houseId], references: [id])
}

// City (Города для доставки)
model City {
  id           String @id @default(uuid())
  name         String
  region       String
  distanceKm   Int    // Расстояние от Уссурийска
  deliveryRate Int    @default(120) // ₽/км
}

// Lead (Заявка)
model Lead {
  id            String   @id @default(uuid())
  houseId       String?
  name          String
  phone         String
  telegram      String?
  email         String?
  city          String?
  purpose       String?  // Проживание, Аренда, Бизнес
  timeline      String?  // Срочно, 1-3 месяца, Интерес
  selectedOptions String? // JSON выбранных опций
  totalPrice    Int?
  deliveryPrice Int?
  source        String   @default("website") // website, agent, ads
  agentId       String?
  status        String   @default("new") // new, processing, completed, cancelled
  createdAt     DateTime @default(now())
  
  house         House?   @relation(fields: [houseId], references: [id])
  agent         Agent?   @relation(fields: [agentId], references: [id])
}

// Agent (Агент)
model Agent {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  phone         String
  password      String   // hashed
  referralCode  String   @unique
  isActive      Boolean  @default(true)
  commissionRate Float   @default(0.05) // 5%
  totalSales    Int      @default(0)
  totalEarnings Int      @default(0)
  createdAt     DateTime @default(now())
  
  leads         Lead[]
  stats         AgentStat[]
}

// AgentStat (Статистика агента)
model AgentStat {
  id          String   @id @default(uuid())
  agentId     String
  date        DateTime
  views       Int      @default(0)
  leads       Int      @default(0)
  sales       Int      @default(0)
  earnings    Int      @default(0)
  
  agent       Agent    @relation(fields: [agentId], references: [id])
}

// Admin (Администратор)
model Admin {
  id       String @id @default(uuid())
  email    String @unique
  password String // hashed
  role     String @default("admin") // admin, manager
}

// FAQ
model FAQ {
  id       String @id @default(uuid())
  question String
  answer   String
  category String // Доставка, Сроки, Установка, Гарантия
  order    Int    @default(0)
}
```

---

## 3. API Endpoints

### Houses (Дома)
```
GET    /api/houses              # Список всех домов
GET    /api/houses/:slug        # Детали дома
POST   /api/houses              # Создать дом (admin)
PUT    /api/houses/:id          # Обновить дом (admin)
DELETE /api/houses/:id          # Удалить дом (admin)
```

### Leads (Заявки)
```
POST   /api/leads               # Создать заявку
GET    /api/leads               # Список заявок (admin)
GET    /api/leads/:id           # Детали заявки (admin)
PUT    /api/leads/:id/status    # Обновить статус (admin)
```

### Delivery (Доставка)
```
GET    /api/cities              # Список городов
GET    /api/delivery/calculate  # Расчёт доставки
```

### Agents (Агенты)
```
POST   /api/agents/register     # Регистрация агента
POST   /api/agents/login        # Вход агента
GET    /api/agents/profile      # Профиль агента
GET    /api/agents/stats        # Статистика агента
GET    /api/agents/leads        # Заявки агента
GET    /api/agents/materials    # Материалы для агентов
```

### FAQ
```
GET    /api/faq                 # Список FAQ
```

### Admin
```
POST   /api/admin/login         # Вход админа
GET    /api/admin/dashboard     # Дашборд статистика
GET    /api/admin/agents        # Список агентов
GET    /api/admin/leads         # Все заявки
PUT    /api/admin/leads/:id     # Обновить заявку
```

---

## 4. Frontend Routes

```
/                          # Главная
/catalog                   # Каталог домов
/house/:slug               # Страница дома
/about                     # О компании
/agent                     # Стать агентом
/agent/login               # Вход агента
/agent/dashboard           # ЛК агента
/faq                       # FAQ
/contacts                  # Контакты
/admin/*                   # Админ-панель
```

---

## 5. Ключевые компоненты

### Конфигуратор дома
- Состояние: выбранная комплектация + опции
- Расчёт: базовая цена + комплектация + опции + доставка
- Persist: localStorage для сохранения выбора

### Квиз
- 4 шага: город → назначение → срок → контакты
- Прогресс-бар
- Валидация на каждом шаге
- Отправка данных перед переходом на страницу дома

### Калькулятор доставки
- Select с поиском города
- Автоматический расчёт: расстояние × 120₽
- Отображение этапов: Китай → Уссурийск → Город

### Калькулятор окупаемости
- Поля: цена аренды/сутки, кол-во дней
- Расчёт: доход в месяц, год, срок окупаемости
- Визуализация: прогресс-бар

---

## 6. State Management

### Zustand Store
```typescript
interface AppState {
  // Корзина/конфигуратор
  selectedHouse: House | null;
  selectedPackage: Package | null;
  selectedOptions: HouseOption[];
  deliveryCity: City | null;
  
  // Агент
  agent: Agent | null;
  isAgentLoggedIn: boolean;
  
  // UI
  isMenuOpen: boolean;
  currentModal: string | null;
  
  // Actions
  setSelectedHouse: (house: House) => void;
  toggleOption: (option: HouseOption) => void;
  calculateTotal: () => number;
  setDeliveryCity: (city: City) => void;
}
```

---

## 7. Интеграции

### Telegram Bot
- Отправка уведомлений о новых заявках
- Команды для просмотра статистики

### Email (Resend/SendGrid)
- Подтверждение регистрации агента
- Уведомления о статусе заявки

### Yandex Maps
- Расчёт расстояний между городами
- Отображение маршрута доставки

### Платёжная система (этап 2)
- ЮKassa / Робокасса
- Приём предоплаты

---

## 8. Безопасность

- JWT токены для авторизации
- Хеширование паролей (bcrypt)
- Rate limiting на API
- CORS настройки
- Валидация всех входных данных (Zod)
- SQL injection защита (Prisma)
- XSS защита

---

## 9. Производительность

- Lazy loading для изображений
- Code splitting по роутам
- Кэширование API запросов (React Query)
- Оптимизация изображений (WebP)
- Минификация CSS/JS

---

## 10. SEO

- SSR для основных страниц
- Meta-теги для каждой страницы
- Open Graph теги
- Sitemap.xml
- Robots.txt
- Структурированные данные (JSON-LD)
