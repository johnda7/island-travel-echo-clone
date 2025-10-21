# ⚡ БЫСТРЫЙ СТАРТ - Добавление нового тура (Октябрь 2025)# ⚡ БЫСТРЫЙ СТАРТ - Централизованная система туров (2025)



> **ЦЕНТРАЛИЗОВАННАЯ АРХИТЕКТУРА**: Все туры используют единый шаблон `TourPageTemplate.tsx` с iOS 26 дизайном, GPS картами и автоматическим поиском/меню.> **НОВАЯ АРХИТЕКТУРА**: Все туры используют единый шаблон `TourPageTemplate` с iOS 26 дизайном, GPS картами и централизованными данными.



---## 🎯 Создать новый тур за 5 минут



## 🎯 Создать новый тур за 10 минут### Шаг 1: Создать маршрут с GPS координатами (2 минуты)



### ✅ Что нужно знать перед началом:**Файл**: `src/data/routes/your-tour-route.ts`



1. **Один тур = одна папка** в `src/data/tours/[tour-slug]/````typescript

2. **GPS координаты обязательны** - без них карта не работаетimport type { RoutePoint } from "@/types/Tour";

3. **Все туры автоматически попадают в поиск и меню** через `toursRegistry.ts`

4. **Шаблон общий для всех** - правка шаблона = правка всех туровexport const yourTourRoute: RoutePoint[] = [

5. **Количество отзывов убрано** - показываем только рейтинг  {

6. **Поиск работает везде** - в Header на всех страницах    name: 'Пхукет',                    // Название точки

    coordinates: [7.8804, 98.3923],    // ⚡ ОБЯЗАТЕЛЬНО: GPS координаты [lat, lng]

---    type: 'start',                     // Тип: 'start' | 'stop' | 'destination'

    time: '06:00',                     // Время прибытия

## 📝 ПОШАГОВАЯ ИНСТРУКЦИЯ    description: 'Трансфер из отеля'   // Описание для тултипа

  },

### ШАГ 1: Создать папку и файлы (1 минута)  {

    name: 'Остров Джеймса Бонда',

```bash    coordinates: [8.2751, 98.5014],    // ⚡ БЕЗ КООРДИНАТ = ОШИБКА НА САЙТЕ!

# Создать структуру тура    type: 'stop',

mkdir -p src/data/tours/new-tour-slug    time: '10:00',

mkdir -p src/assets/new-tour-slug    description: 'Фотосессия на острове'

mkdir -p src/data/routes  },

  {

# Создать базовые файлы    name: 'Пхукет',

touch src/data/tours/new-tour-slug/index.ts    coordinates: [7.8804, 98.3923],

touch src/data/tours/new-tour-slug/static.ts    type: 'destination',               // Конечная точка

touch src/data/routes/new-tour-slug-route.ts    time: '18:00',

touch src/pages/NewTourNew.tsx    description: 'Возврат в отель'

```  }

];

---```



### ШАГ 2: Добавить фотографии (2 минуты)**🔍 Где найти GPS координаты:**

- Google Maps → Правый клик на месте → "Копировать координаты"

1. **Открыть папку для загрузки:**- Формат: `[широта, долгота]` (lat, lng)

   ```bash- Проверка: широта для Таиланда 7-9, долгота 98-100

   open src/assets/new-tour-slug

   ```**⚠️ КРИТИЧЕСКИ ВАЖНО:**

- ❌ **БЕЗ `coordinates`** = TypeError на сайте (Cannot read properties of undefined)

2. **Загрузить фото** (минимум 6-10 штук)- ❌ **Старый формат** `{icon, location}` больше НЕ РАБОТАЕТ

- ✅ **Новый формат** `{name, coordinates, type}` - ОБЯЗАТЕЛЕН

3. **Переименовать файлы:**

   ```bash---

   cd src/assets/new-tour-slug

   ### Шаг 2: Создать данные тура (2 минуты)

   # Создать главное фото

   cp "IMG_1234.JPG" hero-1.jpg**Файл**: `src/data/tours/your-tour/static.ts`

   

   # Переименовать остальные```typescript

   mv "IMG_1235.JPG" newtour-1.jpgimport type { TourData } from "@/types/Tour";

   mv "IMG_1236.JPG" newtour-2.jpgimport img1 from "@/assets/your-tour/gallery-01.jpg";

   # ... и так далееimport img2 from "@/assets/your-tour/gallery-02.jpg";

   ```

export const yourTourData: TourData = {

4. **Удалить лишние форматы:**  id: "your-tour-id",                   // URL-friendly ID

   ```bash  title: "Название тура на русском",

   rm -f *.webp *.avif *.HEIC *.heic .DS_Store  subtitle: "КРАТКОЕ ОПИСАНИЕ",

   ```  description: "Полное описание тура...",

  

---  // 💰 ЦЕНЫ

  priceAdult: 2500,

### ШАГ 3: Создать GPS маршрут (3 минуты)  priceChild: 2000,

  priceInfant: 0,                       // Бесплатно для младенцев

**Файл**: `src/data/routes/new-tour-slug-route.ts`  currency: "฿",

  

```typescript  // 📊 МЕТАДАННЫЕ

import type { RoutePoint } from '@/types/Tour';  duration: "1 день (12 часов)",

  groupSize: "до 15 человек",

export const newTourRoute: RoutePoint[] = [  rating: 4.9,                          // ⚡ БЕЗ СКОБОК (143) - только число!

  {  reviewsCount: 143,

    name: 'Пхукет (отель)',  

    coordinates: [7.8804, 98.3923],    // ⚡ ОБЯЗАТЕЛЬНО!  // 🖼️ ГАЛЕРЕЯ

    type: 'start',                     // 'start' | 'stop' | 'destination'  mainImage: img1,

    time: '06:00',  gallery: [img1, img2, img3, img4, img5],  // Минимум 5-7 фото

    description: 'Трансфер из отеля'  

  },  // ✨ ЧТО ВКЛЮЧЕНО

  {  highlights: [

    name: 'Первая остановка',    "Трансфер из отеля и обратно",

    coordinates: [8.0641, 98.4192],    // ⚡ ОБЯЗАТЕЛЬНО!    "Русскоговорящий гид",

    type: 'stop',    "Обед и напитки",

    time: '09:00',    "Страховка",

    description: 'Завтрак и инструктаж'  ],

  },  

  {  included: [

    name: 'Главная достопримечательность',    "Транспорт (автобус и лодка)",

    coordinates: [8.2751, 98.5014],    // ⚡ ОБЯЗАТЕЛЬНО!    "Входные билеты",

    type: 'destination',    "Оборудование для снорклинга",

    time: '11:00',  ],

    description: 'Основная программа тура'  

  },  excluded: [

  {    "Личные расходы",

    name: 'Обед',    "Алкогольные напитки",

    coordinates: [8.1234, 98.4567],  ],

    type: 'stop',};

    time: '13:00',```

    description: 'Традиционная тайская кухня'

  },**Файл**: `src/data/tours/your-tour/index.ts`

  {```typescript

    name: 'Возвращение в отель',export * from './static';

    coordinates: [7.8804, 98.3923],```

    type: 'destination',

    time: '18:00',---

    description: 'Конец программы'

  }### Шаг 3: Создать страницу тура (30 секунд)

];

```**Файл**: `src/pages/YourTourNew.tsx`



**🔍 Где взять GPS координаты:**```typescript

- Google Maps → Правый клик → "Копировать координаты"import { TourPageTemplate } from "@/components/TourPageTemplate";

- Формат: `[широта, долгота]` → `[7.8804, 98.3923]`import { yourTourData } from "@/data/tours/your-tour";

- Для Таиланда: широта 7-9, долгота 98-100import { yourTourRoute } from "@/data/routes/your-tour-route";



**⚠️ КРИТИЧЕСКИ ВАЖНО:**const YourTourNew = () => {

- ❌ **БЕЗ coordinates** = TypeError на сайте  return (

- ✅ **С coordinates** = карта работает идеально    <TourPageTemplate 

      tourData={yourTourData}

---      routePoints={yourTourRoute}        // ⚡ С GPS картой

    />

### ШАГ 4: Создать данные тура (3 минуты)  );

};

**Файл**: `src/data/tours/new-tour-slug/static.ts`

export default YourTourNew;

```typescript```

import type { TourData } from '@/types/Tour';

**Без карты (если нет маршрута):**

// Импорт фотографий через @/assets```typescript

import heroImage from '@/assets/new-tour-slug/hero-1.jpg';<TourPageTemplate 

import img1 from '@/assets/new-tour-slug/newtour-1.jpg';  tourData={yourTourData}

import img2 from '@/assets/new-tour-slug/newtour-2.jpg';  breadcrumbCategory="Туры"

import img3 from '@/assets/new-tour-slug/newtour-3.jpg';/>

import img4 from '@/assets/new-tour-slug/newtour-4.jpg';```

import img5 from '@/assets/new-tour-slug/newtour-5.jpg';

import img6 from '@/assets/new-tour-slug/newtour-6.jpg';---



// Импорт GPS маршрута### Шаг 4: Добавить роутинг (30 секунд)

import { newTourRoute } from '@/data/routes/new-tour-slug-route';

**Файл**: `src/App.tsx`

export const newTourData: TourData = {

  // 🆔 Основная информация```typescript

  id: 'new-tour-slug',                         // URL-friendly ID (lowercase, дефисы)import YourTour from "./pages/YourTour";

  title: 'Название тура на русском',           // Полное название

  subtitle: 'КРАТКОЕ ОПИСАНИЕ ЗАГЛАВНЫМИ',     // Подзаголовок// В Routes:

  description: 'Полное описание тура, что увидят туристы, чем будем заниматься. Можно на несколько предложений.',<Route path="/tours/your-tour" element={<YourTour />} />

  route: newTourRoute,                         // ⚡ GPS маршрут```

  

  // 💰 Ценообразование---

  priceAdult: 2500,                            // Цена для взрослого

  priceChild: 2000,                            // Цена для ребенка 4-11 лет### Шаг 5: Проверить (30 секунд)

  priceInfant: 0,                              // Дети 0-3 бесплатно

  currency: '฿',                               // Всегда ฿```bash

  npm run dev

  // 📊 Характеристики```

  duration: '1 день (10 часов)',               // Длительность

  groupSize: 'до 15 человек',                  // Размер группыОткрой: `http://localhost:8080/#/tours/your-tour`

  rating: 4.9,                                 // ⚡ Только число! БЕЗ reviewsCount

  **✅ Проверь:**

  // 🖼️ Галерея (минимум 6 фото)- Gallery swipe работает

  mainImage: heroImage,                        // Главное горизонтальное фото- Booking modal открывается

  gallery: [heroImage, img1, img2, img3, img4, img5, img6],- Карта отображается (если есть routePoints)

  - Цена синяя (#007AFF)

  // ✨ Особенности тура (что включено)

  highlights: [---

    'Трансфер из отеля и обратно',

    'Русскоговорящий гид',## 🎨 Что автоматически получаешь

    'Обед в ресторане',

    'Страховка на время тура',✅ iOS 26 Gallery (swipe, wheel, keyboard)  

    'Все входные билеты',✅ Compact Header (breadcrumbs + title)  

  ],✅ Horizontal Scroll Tags  

  ✅ Route Map (если routePoints)  

  // 📋 Программа тура (по времени)✅ Booking Modal  

  itinerary: [✅ Mobile Booking Bar  

    { day: '', time: '06:50', activity: 'Трансфер из отеля. Начало приключения!' },✅ Все iOS 26 стили  

    { day: '', time: '09:00', activity: 'Прибытие на первую локацию. Завтрак.' },

    { day: '', time: '10:30', activity: 'Основная программа: экскурсия по достопримечательности' },---

    { day: '', time: '13:00', activity: 'Обед с местной кухней' },

    { day: '', time: '14:00', activity: 'Свободное время для фото' },## 📝 Шпаргалка типов

    { day: '', time: '16:00', activity: 'Отправление обратно' },

    { day: '', time: '18:00', activity: 'Возвращение в отель' },### TourData (обязательные поля)

  ],

  ```typescript

  // ✅ Что включено в стоимость{

  included: [  id: string;           // "phi-phi-islands"

    'Транспорт (автобус туда-обратно)',  title: string;        // "Пхи-Пхи острова"

    'Лодка для морской части программы',  subtitle: string;     // "Краткое описание"

    'Все входные билеты',  gallery: string[];    // минимум 5 фото

    'Оборудование для снорклинга',  priceAdult: number;   // 2500

    'Обед и безалкогольные напитки',  priceChild: number;   // 2000

    'Русскоговорящий гид',  currency: string;     // "฿"

    'Страховка',  duration: string;     // "12 часов"

  ],  groupSize: string;    // "до 15 человек"

    rating: number;       // 4.9

  // ❌ Что НЕ включено (дополнительные расходы)  reviewsCount: number; // 234

  excluded: [  highlights: string[]; // ["✓ Трансфер", ...]

    'Алкогольные напитки',}

    'Личные расходы и сувениры',```

    'Фото и видео съемка дроном (по желанию)',

  ],### RoutePoint (для карты)

  

  // ⚠️ Важная информация```typescript

  importantInfo: [{

    'Возьмите с собой: купальник, полотенце, солнцезащитный крем, головной убор',  name: string;               // "Пхукет"

    'Обувь: удобная для ходьбы, сандалии или кроссовки',  coordinates: [number, number]; // [7.88, 98.39]

    'Возможна отмена тура при плохой погоде',  type: 'start' | 'stop' | 'destination';

    'Дети до 3 лет бесплатно, 4-11 лет - детский тариф',  time?: string;              // "06:00"

    'Время трансфера зависит от расположения вашего отеля',  description?: string;       // "Трансфер"

    'Программа может меняться в зависимости от погодных условий',}

  ],```

  

  // 📱 SEO и метаданные---

  category: 'islands',                         // islands | adventure | cultural | diving | fishing

  tags: ['острова', 'снорклинг', 'пляжи', 'фото', 'семейный', 'природа', 'лодка'],## 🔄 Обновить ВСЕ туры сразу

};

```**Один раз изменил → везде работает!**



**Файл**: `src/data/tours/new-tour-slug/index.ts`**Файл**: `src/components/TourPageTemplate.tsx`



```typescript```typescript

export { newTourData } from './static';// Например, изменить текст кнопки:

```

// БЫЛО:

---<Button>Забронировать тур</Button>



### ШАГ 5: Создать страницу тура (1 минута)// СТАЛО:

<Button>Забронировать сейчас</Button>

**Файл**: `src/pages/NewTourNew.tsx`

// ✅ Автоматически обновится на ВСЕХ 30+ турах!

```typescript```

import { TourPageTemplate } from "@/components/TourPageTemplate";

import { newTourData } from "@/data/tours/new-tour-slug";---



export const NewTourNew = () => {## 🚨 Важные правила

  return <TourPageTemplate tourData={newTourData} />;

};### ❌ НЕ делай:

- Не копируй код из TourPageTemplate в страницы туров

export default NewTourNew;- Не дублируй стили

```- Не изменяй iOS 26 цвета (#007AFF, #34C759)



---### ✅ ДЕЛАЙ:

- Все изменения ТОЛЬКО в TourPageTemplate.tsx

### ШАГ 6: Добавить роуты (1 минута)- Данные туров в src/data/tours/

- Маршруты в src/data/routes/

**Файл**: `src/App.tsx`- Следуй структуре CheoLanLake



Найти блок с роутами и добавить:---



```typescript## 📚 Полная документация

import { NewTourNew } from "./pages/NewTourNew";

- **iOS 26 Design System**: `AI_DOCS/IOS26_DESIGN_PROMPT.md`

// ... внутри <Routes>:- **Централизованная система**: `AI_DOCS/CENTRALIZED_TOUR_SYSTEM.md`

- **Эталон**: `src/pages/CheoLanLakeNew.tsx` (11 строк)

<Route path="/excursion/new-tour-slug" element={<NewTourNew />} />

<Route path="/tours/new-tour-slug" element={<NewTourNew />} />---

```

## 🎯 Примеры

---

### Простой тур (без карты)

### ШАГ 7: Зарегистрировать тур (2 минуты)```typescript

<TourPageTemplate tourData={simpleTourData} />

**Файл**: `src/data/toursRegistry.ts````



1. **Добавить импорт** (в секцию импортов):### Тур с картой

```typescript

```typescript<TourPageTemplate 

import { newTourData } from './tours/new-tour-slug';  tourData={tourData}

```  routePoints={routePoints}

/>

2. **Добавить тур в реестр** (в массив tours):```



```typescript### Тур с кастомными breadcrumbs

{```typescript

  id: 'new-tour-slug',<TourPageTemplate 

  name: 'Название тура',  tourData={tourData}

  category: 'islands',                    // islands | adventure | cultural | diving | fishing  breadcrumbCategory="Экскурсии"

  tags: ['острова', 'снорклинг', 'пляжи', 'фото', 'семейный'],  breadcrumbCategoryLink="/tours?category=sightseeing"

  isPopular: true,                        // Показывать в популярных/>

  isActive: true,                         // Активен для поиска```

  isFeatured: true,                       // Показывать на главной

  priority: 26,                           // Порядковый номер (следующий после последнего)---

  data: () => Promise.resolve(newTourData)

}## 💡 Золотое правило

```

**CheoLanLake = Эталон!** 🏆

**🎯 Категории:**

- `islands` - Морские туры на островаСомневаешься как сделать? Смотри на CheoLanLake.

- `adventure` - Приключения (рафтинг, ATV, джунгли)

- `cultural` - Культурные (храмы, города)---

- `diving` - Дайвинг и снорклинг

- `fishing` - Рыбалка**Время создания нового тура: 5 минут** ⚡


**⚡ После регистрации:**
- ✅ Тур автоматически появится в поиске (на всех страницах)
- ✅ Тур будет в меню категории
- ✅ Тур появится на главной (если isFeatured: true)
- ✅ Поиск работает по названию, тегам и описанию

---

### ШАГ 8: Собрать и задеплоить (2 минуты)

```bash
# Собрать проект
npm run build

# Коммит и пуш
git add -A
git commit -m "feat: добавлен тур [Название] (цена ฿, X фото)"
git push origin main
```

**✅ Готово!** GitHub Actions автоматически задеплоит за 2-3 минуты.

---

## 🚨 ЧАСТЫЕ ОШИБКИ И ИХ РЕШЕНИЕ

### ❌ Ошибка: "Cannot read properties of undefined (reading 'lat')"

**Причина:** GPS координаты не указаны или в неправильном формате

**Решение:**
```typescript
// ❌ НЕПРАВИЛЬНО:
coordinates: { lat: 7.8804, lng: 98.3923 }  // Объект
coordinates: undefined                       // Не указаны

// ✅ ПРАВИЛЬНО:
coordinates: [7.8804, 98.3923]              // Массив [lat, lng]
```

---

### ❌ Ошибка: "'reviewsCount' does not exist in type 'TourData'"

**Причина:** Пытаешься использовать старое поле reviewsCount

**Решение:**
```typescript
// ❌ НЕПРАВИЛЬНО:
rating: 4.9,
reviewsCount: 143,  // ← УДАЛИТЬ! Это поле больше не используется

// ✅ ПРАВИЛЬНО:
rating: 4.9,        // Только рейтинг, отзывы убраны
```

---

### ❌ Ошибка: Фото не загружаются

**Причина:** Неправильный импорт или путь к файлу

**Решение:**
```typescript
// ❌ НЕПРАВИЛЬНО:
import img1 from '../assets/tour/img1.jpg';           // Относительный путь
import img1 from '@/assets/tour/image-with spaces.jpg'; // Пробелы

// ✅ ПРАВИЛЬНО:
import img1 from '@/assets/tour-slug/tour-1.jpg';      // Через @/assets, дефисы
```

---

### ❌ Ошибка: Тур не появляется в поиске

**Причина:** Не добавлен в toursRegistry.ts или isActive: false

**Решение:**
```typescript
// В toursRegistry.ts:
{
  id: 'new-tour',
  isActive: true,    // ← Должно быть true!
  // ...
}
```

---

### ❌ Ошибка: Тур не на главной

**Причина:** isFeatured: false

**Решение:**
```typescript
{
  isFeatured: true,   // ← Поставить true для показа на главной
}
```

---

## 📚 ШПАРГАЛКА ПО ПОЛЯМ TourData

| Поле | Тип | Обязательно | Пример |
|------|-----|-------------|--------|
| `id` | string | ✅ | `'phi-phi-islands'` |
| `title` | string | ✅ | `'Острова Пхи-Пхи'` |
| `subtitle` | string | ✅ | `'КЛАССИЧЕСКИЙ ТУР'` |
| `description` | string | ✅ | `'Посетите острова...'` |
| `route` | RoutePoint[] | ✅ | `phiPhiRoute` |
| `priceAdult` | number | ✅ | `2500` |
| `priceChild` | number | ✅ | `2000` |
| `priceInfant` | number | ❌ | `0` |
| `currency` | string | ✅ | `'฿'` |
| `duration` | string | ✅ | `'1 день (10 часов)'` |
| `groupSize` | string | ✅ | `'до 15 человек'` |
| `rating` | number | ✅ | `4.9` |
| `~~reviewsCount~~` | ~~number~~ | ❌ **УДАЛЕНО** | ~~`143`~~ |
| `mainImage` | string | ✅ | `heroImage` |
| `gallery` | string[] | ✅ | `[img1, img2, ...]` |
| `highlights` | string[] | ✅ | `['Трансфер', ...]` |
| `itinerary` | object[] | ❌ | `[{time, activity}]` |
| `included` | string[] | ❌ | `['Обед', ...]` |
| `excluded` | string[] | ❌ | `['Алкоголь']` |
| `importantInfo` | string[] | ❌ | `['Взять полотенце']` |
| `category` | string | ✅ | `'islands'` |
| `tags` | string[] | ✅ | `['острова', 'пляж']` |

---

## 🎯 ПРИМЕРЫ РЕАЛЬНЫХ ТУРОВ

### Пример 1: Симиланские острова (diving)

```typescript
export const similanIslandsTourData: TourData = {
  id: 'similan-islands',
  title: 'Симиланские острова',
  priceAdult: 2500,
  priceChild: 2300,
  rating: 4.9,                    // ⚡ БЕЗ reviewsCount!
  category: 'diving',
  tags: ['симиланы', 'снорклинг', 'лучший снорклинг', 'острова'],
};
```

### Пример 2: Рафтинг + СПА (adventure)

```typescript
export const raftingSpa1DayTourData: TourData = {
  id: 'rafting-spa-1day',
  title: 'РАФТИНГ + СЛОНОВЬЕ СПА 1 день',
  priceAdult: 1900,
  priceChild: 1600,
  rating: 4.8,                    // ⚡ Только рейтинг
  category: 'adventure',
  tags: ['рафтинг', 'слоны', 'spa', 'джунгли'],
};
```

### Пример 3: Рыбалка (fishing)

```typescript
export const fishingSunriseTourData: TourData = {
  id: 'fishing-sunrise',
  title: 'РЫБАЛКА НА РАССВЕТЕ',
  priceAdult: 2300,
  priceChild: 2100,
  rating: 4.7,
  category: 'fishing',
  isFeatured: true,              // На главной
};
```

---

## ✅ ЧЕКЛИСТ ПЕРЕД ДЕПЛОЕМ

- [ ] GPS координаты добавлены во все точки маршрута
- [ ] Минимум 6 фотографий загружено
- [ ] Главное фото `hero-1.jpg` горизонтальное
- [ ] Импорты фото через `@/assets`
- [ ] Поле `reviewsCount` НЕ используется ⚡
- [ ] Поле `rating` только число (без скобок)
- [ ] Маршрут импортирован: `route: newTourRoute`
- [ ] Создан файл `index.ts` с экспортом
- [ ] Создана страница `NewTourNew.tsx`
- [ ] Добавлены роуты в `App.tsx`
- [ ] Тур зарегистрирован в `toursRegistry.ts`
- [ ] `isActive: true` для показа в поиске
- [ ] `npm run build` проходит без ошибок

---

## 🚀 ИТОГО: ПОЛНАЯ СТРУКТУРА ТУРА

```
src/
├── assets/
│   └── new-tour-slug/          # Фотографии
│       ├── hero-1.jpg
│       ├── newtour-1.jpg
│       └── ...
├── data/
│   ├── routes/
│   │   └── new-tour-slug-route.ts  # GPS маршрут
│   ├── tours/
│   │   └── new-tour-slug/
│   │       ├── index.ts            # Экспорт
│   │       └── static.ts           # Данные тура
│   └── toursRegistry.ts            # ← Регистрация тура
├── pages/
│   └── NewTourNew.tsx              # Страница тура
└── App.tsx                         # ← Роуты
```

---

## 🔍 КАК РАБОТАЕТ ПОИСК

**Поиск автоматически ищет по:**
- `tourData.id` - ID тура
- `tourData.title` - Название
- `tourData.subtitle` - Подзаголовок
- `tourData.description` - Описание
- `tourData.tags` - Теги

**Где доступен поиск:**
- ✅ На главной странице (/)
- ✅ На странице туров (/tours)
- ✅ На любой странице тура
- ✅ На всех остальных страницах

**Как улучшить поисковую видимость:**
- Добавь больше тегов в `tags: []`
- Используй синонимы в описании
- Добавь название на английском в теги

---

## 🎨 КАК РАБОТАЕТ ЦЕНТРАЛИЗАЦИЯ

**Один шаблон - все туры:**
- ✅ Правка `TourPageTemplate.tsx` = правка всех 25 туров
- ✅ Убрали отзывы из шаблона → исчезли со всех туров
- ✅ Изменили дизайн → изменился везде
- ✅ Добавили функцию → появилась у всех

**Что централизовано:**
- Дизайн и layout
- GPS карта
- Галерея фотографий
- Форма бронирования
- Breadcrumbs
- Отображение рейтинга (без reviewsCount)
- Mobile/Desktop версии

---

**📅 Документ создан:** 22 октября 2025  
**✅ Актуален для:** Tours #1-25 (централизованная архитектура)  
**🎯 Версия:** 3.0 (без reviewsCount, с автопоиском, без фейковых отзывов)  
**🔄 Обновлено:** Убраны фейковые отзывы с главной, удалено поле reviewsCount, удален FAQ про возврат за 24ч

---

**💡 Совет:** Копируй существующий тур как шаблон - это быстрее чем создавать с нуля!
