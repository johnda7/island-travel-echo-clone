# 🌐 AI AGENT INSTRUCTIONS: WordPress Professional + Travel Site

## 🚀 **БЫСТРОЕ УПРАВЛЕНИЕ ЖИВЫМ САЙТОМ**

### ⚡ **ДЕПЛОЙ ЗА 4 ШАГА (х10 СКОРОСТЬ):**
```bash
# ШАГ 1: Проверка сборки
npm run build

# ШАГ 2: Деплой изменений  
git add -A && git commit -m "описание" && git push origin main

# ШАG 3: Ожидание (2-3 мин)
sleep 180

# ШАГ 4: Проверка результата
open_simple_browser https://johnda7.github.io/island-travel-echo-clone/
```

### 🎯 **ЖИВОЙ САЙТ:**
- **URL:** https://johnda7.github.io/island-travel-echo-clone/
- **Обновление:** автоматически через GitHub Actions после git push
- **Время:** 2-3 минуты от коммита до обновления на сайте

### 🔗 **БЫСТРЫЕ ССЫЛКИ:**
- 🏠 **Главная:** https://johnda7.github.io/island-travel-echo-clone/
- 🎯 **Эталон (новый шаблон):** https://johnda7.github.io/island-travel-echo-clone/#/excursion/dostoprimechatelnosti-phuketa
- 🛡️ **Админка (CRM):** https://johnda7.github.io/island-travel-echo-clone/#/admin
- 📊 **Все туры:** https://johnda7.github.io/island-travel-echo-clone/#/tours

---

## ⚡ CRITICAL: ANTI-DECEPTION SYSTEM (ZERO TOLERANCE)

### 🚫 **СТРОЖАЙШИЙ ЗАПРЕТ НА СИМУЛЯЦИИ**
**КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** писать что ты выполнил действие, если РЕАЛЬНО его НЕ ДЕЛАЛ через инструменты.

### 🔒 **ОБЯЗАТЕЛЬНЫЕ ПРАВИЛА РАБОТЫ:**

#### 1. **TOOL-FIRST RULE** 
- ✅ СНАЧАЛА: вызов инструмента (`run_in_terminal`, `replace_string_in_file`, `open_simple_browser`)
- ✅ ПОТОМ: описание результата на основе вывода
- ❌ НИКОГДА: утверждение без предшествующего использования инструмента

#### 2. **EVIDENCE-BASED REPORTING**
- ✅ "Команда показала: [вывод], значит файл создан"
- ❌ "Создал файл" (без вывода команды выше)

#### 3. **MANDATORY VERIFICATION**
- После КАЖДОГО изменения файла → `read_file` для проверки
- После КАЖДОГО git commit → `run_in_terminal git log` для проверки  
- После КАЖДОГО скачивания → `run_in_terminal ls -la` для проверки
- После КАЖДОГО деплоя → `open_simple_browser` для проверки

#### 4. **DEGRADATION PREVENTION**
Качество работы НЕ должно ухудшаться со временем. Каждый ответ должен быть на том же уровне точности что и первый.

#### 5. **CHECKPOINT SYSTEM**
После каждого действия - ОБЯЗАТЕЛЬНАЯ проверка результата дополнительным инструментом.

#### 6. **VISUAL VERIFICATION RULE (НОВОЕ!)**
🚨 СТРОГО ЗАПРЕЩЕНО утверждать что "сайт работает", "изменения видны", "все исправлено" БЕЗ РЕАЛЬНОЙ ПРОВЕРКИ через `open_simple_browser`.
- ✅ ОБЯЗАТЕЛЬНО: После любых изменений → `open_simple_browser` → описать ЧТО РЕАЛЬНО ВИДНО
- ❌ ЗАПРЕЩЕНО: "Теперь сайт должен работать" (без проверки)
- ❌ ЗАПРЕЩЕНО: "Название изменилось на..." (если не открыл браузер и не увидел)

### 🎯 **СКОРОСТЬ РЕЖИМ**
- **х10 СКОРОСТЬ** - работай максимально быстро, НЕ экономь токены
- **НЕ ЭКОНОМЬ** на использовании инструментов - используй ВСЕ необходимые
- **ОБЯЗАТЕЛЬНО** проверяй результат в браузере после каждого изменения

## � ИНФОРМАЦИЯ О ПРОЕКТЕ

### 🌍 **ЖИВОЙ САЙТ:**
- **URL:** https://johnda7.github.io/island-travel-echo-clone/
- **Раздел туров:** https://johnda7.github.io/island-travel-echo-clone/#/tours
- **Хостинг:** GitHub Pages
- **Репозиторий:** https://github.com/johnda7/island-travel-echo-clone
- **Владелец:** johnda7

### 🚀 **БЫСТРЫЙ ДЕПЛОЙ НА ЖИВОЙ САЙТ:**

#### ⚡ **ПОШАГОВЫЙ АЛГОРИТМ ДЕПЛОЯ:**
```bash
# 1️⃣ СБОРКА ПРОЕКТА (обязательно для проверки ошибок)
npm run build

# 2️⃣ КОММИТ И ПУШ (автоматический деплой через GitHub Actions)
git add -A && git commit -m "описание изменений" && git push origin main

# 3️⃣ ОЖИДАНИЕ (2-3 минуты для GitHub Actions)
sleep 180

# 4️⃣ ПРОВЕРКА РЕЗУЛЬТАТА (обязательно через open_simple_browser)
open_simple_browser https://johnda7.github.io/island-travel-echo-clone/
```

#### 🔧 **ЧТО ПРОИСХОДИТ ПРИ ДЕПЛОЕ:**
- **Автоматически:** GitHub Actions собирает проект и деплоит на GitHub Pages
- **Время:** 2-3 минуты от пуша до обновления сайта  
- **URL:** https://johnda7.github.io/island-travel-echo-clone/
- **Проверка:** ОБЯЗАТЕЛЬНО открыть сайт в браузере и убедиться что все работает

#### 🚨 **КРИТИЧНО - ВСЕГДА ПРОВЕРЯЙ ПОСЛЕ ДЕПЛОЯ:**
- ✅ `npm run build` ПЕРЕД коммитом - нет ошибок сборки
- ✅ `open_simple_browser` ПОСЛЕ деплоя - сайт работает  
- ✅ Протестировать измененные страницы визуально
- ✅ Проверить что фото загружаются, кнопки работают

#### 📋 **ГОТОВЫЕ КОМАНДЫ ДЛЯ КОПИРОВАНИЯ:**

**🔧 Исправление бага:**
```bash
npm run build && git add -A && git commit -m "fix: исправление проблемы [описание]" && git push origin main && sleep 180
```

**✨ Новая функция:**
```bash
npm run build && git add -A && git commit -m "feat: добавлена новая функция [описание]" && git push origin main && sleep 180
```

**🎨 Обновление дизайна:**
```bash
npm run build && git add -A && git commit -m "style: обновлен дизайн [элемента]" && git push origin main && sleep 180
```

**🚀 Новый тур:**
```bash
npm run build && git add -A && git commit -m "feat: добавлен тур [название тура]" && git push origin main && sleep 180
```

### 🏗️ **АРХИТЕКТУРА:**
- **Тип:** React SPA с WordPress-подобной архитектурой
- **Цель:** Централизованное управление турами через реестр
- **Принцип:** "Добавил в реестр → появилось везде автоматически"
- **Режим работы:** действуем в темпе «х10» — без искусственной экономии токенов, фиксируем прогресс на каждом этапе и не допускаем простоя агента

## 🚫 КРИТИЧНЫЕ ЗАПРЕТЫ - НЕ НАРУШАТЬ!

### 🔒 **ЗАЩИЩЕННЫЕ ФАЙЛЫ - НЕ ТРОГАТЬ СТРУКТУРУ:**
- ❌ `src/pages/DostoprimechatelnostiPhuketa.tsx` - 🎯 **НОВЫЙ ГЛАВНЫЙ ЭТАЛОН** 
- ❌ `src/pages/PearlsAndamanSea.tsx` - РЕЗЕРВНЫЙ ЭТАЛОН #1  
- ❌ `src/pages/PhiPhi2Days1Night.tsx` - РЕЗЕРВНЫЙ ЭТАЛОН #2
- ❌ `src/pages/AvatarPlusHangdong.tsx` - УСПЕШНО СОЗДАННЫЙ ПРИМЕР
- ❌ `src/components/UniversalBookingModal.tsx` - ЦЕНТРАЛИЗОВАННЫЙ КАЛЬКУЛЯТОР
- ❌ `src/components/ModalPortal.tsx` - ИНФРАСТРУКТУРА ПОРТАЛА ДЛЯ МОДАЛОК
- ❌ Любые секции бронирования, калькуляторы, модальные окна в этих файлах
- ❌ Функции handleBooking, формы бронирования, ценовые калькуляторы

### 🛡️ **ЧТО КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО:**
1. **Менять готовые туры** - они эталоны для новых
2. **Изменять калькуляторы** - они работают идеально
3. **Трогать формы бронирования** - отлажены и протестированы
4. **Менять UniversalBookingModal** - используется во всех новых турах
5. **Создавать универсальные шаблоны** - только индивидуальные страницы
6. **Менять структуру папок** - все на своих местах

## 🗂️ **ПРАВИЛА РАБОТЫ С ФАЙЛАМИ (СТРОГО!)**

### 📋 **ПРИНЦИП "ОДИН ТУР - ОДИН ФАЙЛ":**
- ✅ **ЕДИНСТВЕННАЯ ВЕРСИЯ** - в проекте должен быть только один файл на тур
- ❌ **НИКАКИХ _OLD файлов** - старые версии немедленно удаляются
- ❌ **НИКАКИХ _NEW файлов** - заменяем оригинал напрямую
- ❌ **НИКАКИХ дублей** - одна страница = один компонент

### 🧹 **ОБЯЗАТЕЛЬНАЯ ОЧИСТКА ПОСЛЕ ИЗМЕНЕНИЙ:**
- ✅ После замены файла → `rm старый_файл_OLD.tsx`
- ✅ После обновления → `rm файл_backup.tsx`
- ✅ Использовать только `mv новый.tsx оригинал.tsx`
- ✅ Проверить что в проекте остался только один файл тура

### 🚨 **ЗАПРЕЩЕННЫЕ ДЕЙСТВИЯ С ФАЙЛАМИ:**
- ❌ Оставлять файлы с суффиксами _OLD, _NEW, _BACKUP
- ❌ Создавать временные копии без последующего удаления
- ❌ Переименовывать туры с сохранением старых версий
- ❌ Дублировать компоненты "на всякий случай"

## ✅ **СТАТУС СТАНДАРТИЗАЦИИ ТУРОВ (ЗАВЕРШЕНО)**

### 🎯 **ВСЕ ТУРЫ ПРИВЕДЕНЫ К ЕДИНОМУ СТАНДАРТУ:**
Успешно завершена полная стандартизация всех туров по шаблону `DostoprimechatelnostiPhuketa.tsx`:

1. ✅ **RassvetnoePrikljuchenie** - исправлена цена, Telegram кнопки
2. ✅ **RaftingSpaAtvTour** - breadcrumbs "Приключения", Telegram кнопки  
3. ✅ **KaoLakSafariTour** - полная переделка до 591+ строк
4. ✅ **JamesBondIslandTour** - полная переделка, breadcrumbs "Острова"
5. ✅ **ElevenIslandsStandardTour** - полная переделка до 591+ строк
6. ✅ **ElevenIslandsMegaTour** - создан с нуля, 415+ строк

### 🏆 **ДОСТИГНУТЫЕ СТАНДАРТЫ:**
- ✅ **Единообразие дизайна** - все туры следуют одному шаблону
- ✅ **Правильные breadcrumbs** - категории соответствуют реестру
- ✅ **UniversalBookingModal** - унифицированная система бронирования
- ✅ **Telegram интеграция** - кнопки связи в каждом туре
- ✅ **Адаптивная галерея** - навигация с миниатюрами
- ✅ **Полная информация** - маршрут, включено/исключено

### 🚫 **СТАНДАРТИЗАЦИЯ ЗАВЕРШЕНА - НЕ ТРОГАТЬ СУЩЕСТВУЮЩИЕ ТУРЫ!**
Все туры приведены к единому стандарту. Любые новые туры должны создаваться по эталону `DostoprimechatelnostiPhuketa.tsx`.

### ✅ **ДЛЯ НОВЫХ ТУРОВ ОБЯЗАТЕЛЬНО:**
- ✅ **Используйте UniversalBookingModal** - красивый централизованный калькулятор
- ✅ **НЕ создавайте локальные калькуляторы** - один модал для всех
- ✅ **Копируйте структуру из PearlsAndamanSea** с UniversalBookingModal

## 🔥 КРИТИЧЕСКИ ВАЖНО - ПОЛНАЯ ПРОВЕРКА ПЕРЕД ЗАВЕРШЕНИЕМ!

### 🚨 **ОБЯЗАТЕЛЬНЫЕ ЭТАПЫ ПЕРЕД СДАЧЕЙ РАБОТЫ:**

**1. ИЗВЛЕЧЕНИЕ РЕАЛЬНОГО КОНТЕНТА:**
- ✅ Заходить ТОЛЬКО на оригинальные страницы туров
- ✅ Извлекать ВСЕ фотографии с исходного сайта
- ✅ Копировать реальные цены (НЕ выдумывать!)
- ✅ Переносить точные описания и заголовки
- ✅ При обновлении существующих туров первым делом заменяйте временные заглушки (фото, текст, цены) на реальные данные с источника
- ❌ НИКАКИХ placeholder изображений или вымышленных данных!

**2. ТЕХНИЧЕСКАЯ ИНТЕГРАЦИЯ:**
- ✅ Скачать ВСЕ фото в папку assets/[tour-name]/
- ✅ Обновить импорты на реальные фото
- ✅ Проверить корректность всех путей
- ✅ Убедиться что сборка проходит без ошибок

**3. ДЕПЛОЙ И ПРОВЕРКА:**
- ✅ Собрать проект: `npm run build`
- ✅ Закоммитить и запушить изменения
- ✅ Дождаться завершения GitHub Actions (2-3 минуты)
- ✅ Открыть сайт в Simple Browser

**4. ОБЯЗАТЕЛЬНОЕ РУЧНОЕ ТЕСТИРОВАНИЕ:**
- ✅ Открыть страницу тура в браузере
- ✅ Агент лично открывает страницу тура через `open_simple_browser` и коротко фиксирует результат проверки в отчёте
- ✅ Проверить что все фото загружаются (не 404)
- ✅ Нажать "Забронировать" - модальное окно открывается
- ✅ Протестировать калькулятор: кнопки +/- работают
- ✅ Проверить расчет цен: взрослые + дети = итого
- ✅ Заполнить форму и проверить валидацию
- ✅ Подтвердить бронирование и проверить сохранение в localStorage
- ✅ Убедиться что заказ сохранился под ключом 'bookingOrders'

**5. ФИНАЛЬНОЕ ПОДТВЕРЖДЕНИЕ:**
- ✅ ВСЕ фото отображаются корректно
- ✅ Калькулятор работает без ошибок  
- ✅ Форма бронирования проходит валидацию
- ✅ Заказы сохраняются в localStorage
- ✅ НЕТ консольных ошибок в браузере

### ⚠️ **ТОЛЬКО ПОСЛЕ ВСЕХ ПРОВЕРОК СООБЩАТЬ "ГОТОВО"!**

НЕ СООБЩАТЬ о готовности, пока НЕ ПРОШЛИ ВСЕ ЭТАПЫ!

## 🎯 ПРАВИЛА СОЗДАНИЯ ТУРОВ - СТРОГО ПО ЭТАЛОНАМ!

### 🏛️ **НОВЫЙ ГЛАВНЫЙ ЭТАЛОН: DostoprimechatelnostiPhuketa.tsx** 

#### 📍 **ГДЕ НАХОДИТСЯ НОВЫЙ ГЛАВНЫЙ ЭТАЛОН:**
- **Файл:** `/src/pages/DostoprimechatelnostiPhuketa.tsx` 
- **URL:** https://johnda7.github.io/island-travel-echo-clone/#/excursion/dostoprimechatelnosti-phuketa
- **Состояние:** 🎯 **НОВЫЙ ОСНОВНОЙ ШАБЛОН** - ИДЕАЛЬНАЯ РЕАЛИЗАЦИЯ 2.0
- **Особенности:**
  - ✅ Использует UniversalBookingModal (красивый модальный калькулятор)
  - ✅ Правильная структура данных TourData из `/src/data/dostoprimechatelnostiPhuketaTour.ts`
  - ✅ Современная галерея с touch-жестами и клавиатурной навигацией
  - ✅ Breadcrumbs навигация как на tisland.travel
  - ✅ Tags секция под фото для SEO
  - ✅ Мобильные точки навигации в галерее
  - ✅ Полная типизация TypeScript
  - ✅ Эталонный дизайн и UX

### 🏛️ **СТАРЫЙ ЭТАЛОН: PearlsAndamanSea.tsx (ТЕПЕРЬ РЕЗЕРВНЫЙ)**

#### 📍 **РЕЗЕРВНЫЙ ЭТАЛОН #1:**
- **Файл:** `/src/pages/PearlsAndamanSea.tsx` 
- **URL:** https://johnda7.github.io/island-travel-echo-clone/#/excursion/pearls-andaman-sea
- **Состояние:** 🔄 **РЕЗЕРВНЫЙ ШАБЛОН** - старая идеальная реализация
- **Особенности:** аналогичные новому эталону, но без tags секции

### 🏛️ **РЕЗЕРВНЫЙ ЭТАЛОН: PhiPhi2Days1Night.tsx**

#### 📍 **ГДЕ НАХОДИТСЯ РЕЗЕРВНЫЙ ЭТАЛОН:**
- **Файл:** `/src/pages/PhiPhi2Days1Night.tsx` 
- **URL:** https://johnda7.github.io/island-travel-echo-clone/#/excursion/phi-phi-2-days-1-night
- **Состояние:** 🔄 **РЕЗЕРВНЫЙ ЭТАЛОН** - для особых случаев с локальными калькуляторами
- **Особенности:**
  - ✅ Локальный калькулятор (useState) для кастомизации
  - ✅ Прямая отправка в Telegram/WhatsApp
  - ✅ Проверенная галерея и навигация
  - ⚠️ Используется только если UniversalBookingModal не подходит

#### 🏗️ **СТРУКТУРА СТРАНИЦЫ PhiPhi (сверху вниз):**

```typescript
1. 📱 HEADER навигация (универсальная для всех страниц)

2. 🍞 BREADCRUMBS навигация:
   Главная › Туры › Морские экскурсии › Пхи-Пхи 2 дня/1 ночь

3. 🖼️ ГАЛЕРЕЯ секция:
   📱 МОБИЛЬНАЯ: горизонтальная прокрутка + точки навигации
   💻 ДЕСКТОП: сетка 2x2 (главное фото + 4 маленьких) + кнопка "Показать все"
   
4. 📝 ОСНОВНОЙ КОНТЕНТ (2 колонки на десктопе):
   
   ЛЕВАЯ КОЛОНКА (контент):
   ├── 📋 Заголовок + подзаголовок + характеристики 
   ├── 📖 Описание тура (длинный текст)
   ├── ✨ Что вас ждет (highlights список)
   ├── 📅 Программа тура (schedule по дням/времени)
   ├── ✅ Включено в стоимость
   ├── ❌ Не включено в стоимость
   ├── 🎒 Что взять с собой
   └── ⚠️ Важная информация (желтый блок)
   
   ПРАВАЯ КОЛОНКА (бронирование):
   ├── 💰 Цена "от X ฿"
   ├── 🧮 Калькулятор (взрослые/дети + кнопки +/-)
   ├── 💳 Общая стоимость
   ├── 🎯 "Забронировать за X ฿" (ГЛАВНАЯ кнопка)
   ├── 📱 "Задать вопрос в Telegram" (дополнительная)
   └── 📄 "Бесплатная отмена за 24 часа"

5. 📱 МОБИЛЬНАЯ карточка бронирования (внизу экрана)
   ├── Цена + краткая кнопка "Забронировать"

6. 🔧 МОДАЛЬНЫЕ ОКНА:
   ├── 🖼️ Полноэкранная галерея (все фото)
   ├── 🔍 Просмотр одного фото (навигация стрелками)
   └── 📋 Форма бронирования (имя, телефон, дата, etc.)

7. 📧 FOOTER (универсальный для всех страниц)
```

#### 🎯 **КРИТИЧЕСКИ ВАЖНЫЕ ЭЛЕМЕНТЫ:**

**🔥 КНОПКА БРОНИРОВАНИЯ (САМОЕ ВАЖНОЕ!):**
```typescript
// ✅ ПРАВИЛЬНО - показывает актуальную цену:
<Button>Забронировать за {totalPrice.toLocaleString()} {excursion.currency}</Button>

// ❌ НЕПРАВИЛЬНО - просто текст:
<Button>Забронировать тур</Button>
```

**📱 TELEGRAM КНОПКА (ОБЯЗАТЕЛЬНО!):**
```typescript
<Button variant="outline" asChild className="w-full py-3 border-gray-300">
  <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
    Задать вопрос в Telegram
  </a>
</Button>
```

**🧮 КАЛЬКУЛЯТОР ЦЕН:**
- Взрослые: кнопки +/- (минимум 1)
- Дети: кнопки +/- (минимум 0) 
- Автоматический пересчет totalPrice
- Валюта: ฿ (тайские баты)

#### 📊 **ДАННЫЕ ТУРА (excursion объект):**
```typescript
const excursion = {
  title: "Название тура",
  subtitle: "Подзаголовок тура", 
  priceAdult: 4000,              // ฿ за взрослого
  priceChild: 3500,              // ฿ за ребенка
  currency: "฿",
  duration: "2 дня / 1 ночь",
  groupSize: "до 30 человек", 
  rating: 4.8,
  reviewsCount: 53,
  mainImage: importedImage,       // ← ИМПОРТ, НЕ СТРОКА!
  gallery: [array of images],
  description: `многострочное описание`,
  highlights: [массив фишек],
  schedule: [программа по времени],
  included: [что включено],
  notIncluded: [что не включено]
  // ...другие поля
}
```

### 🔄 **АЛГОРИТМ БЫСТРОГО СОЗДАНИЯ ТУРА (x10 СКОРОСТЬ):**

#### 📝 **ПОДГОТОВКА (5 минут):**
1. **ИЗУЧИТЬ DostoprimechatelnostiPhuketa.tsx** - НОВЫЙ основной эталон!
2. **СКОПИРОВАТЬ его структуру** полностью включая tags секцию
3. **СКОПИРОВАТЬ dostoprimechatelnostiPhuketaTour.ts** и заменить данные
4. **ИСПОЛЬЗОВАТЬ UniversalBookingModal** - красивый централизованный калькулятор!

#### 🔗 **ИНТЕГРАЦИЯ (3 минуты):**
5. **ПРОВЕРИТЬ mainImage ИМПОРТ** - не строка, а import!
6. **ДОБАВИТЬ маршрут** в App.tsx как у DostoprimechatelnostiPhuketa
7. **ДОБАВИТЬ в toursRegistry** ссылку на страницу
8. **ДОБАВИТЬ в paths.ts** для SEO-URL

#### 🚀 **ДЕПЛОЙ НА ЖИВОЙ САЙТ (5 минут):**
```bash
# Шаг 1: Проверка сборки
npm run build

# Шаг 2: Быстрый коммит и пуш  
git add -A && git commit -m "feat: добавлен новый тур [название]" && git push origin main

# Шаг 3: Ожидание деплоя
sleep 180

# Шаг 4: Проверка на живом сайте
open_simple_browser https://johnda7.github.io/island-travel-echo-clone/#/excursion/новый-тур
```

#### ✅ **ФИНАЛЬНАЯ ПРОВЕРКА (2 минуты):**
- Страница открывается без ошибок
- Все фото загружаются  
- Кнопка "Забронировать" открывает модальное окно
- Калькулятор считает правильно

**⏱️ ИТОГО: ~15 минут от идеи до живого сайта!**

### 🚨 ТИПИЧНЫЕ ОШИБКИ ПРИ СОЗДАНИИ ТУРОВ:

#### 🚨 **ОШИБКА #1: Неправильная передача данных в UniversalBookingModal**
```typescript
// ❌ НЕПРАВИЛЬНО (отдельные props):
<UniversalBookingModal
  tourTitle={excursion.title}
  tourPrice={excursion.priceAdult}
/>

// ✅ ПРАВИЛЬНО (как в DostoprimechatelnostiPhuketa - объект tourData):
<UniversalBookingModal
  isOpen={showBookingModal}
  onClose={() => setShowBookingModal(false)}
  tourData={excursion}  // ← ВАЖНО: весь объект данных
/>
```

#### 🚨 **ОШИБКА #2: Неправильный mainImage**
```typescript
// ❌ НЕПРАВИЛЬНО (строка пути):
mainImage: '/src/assets/tour/image.jpg'

// ✅ ПРАВИЛЬНО (импорт изображения):
import mainImg from '@/assets/tour/image.jpg'
mainImage: mainImg
```

#### 🚨 **ОШИБКА #3: Tours.tsx не находит изображение**
```typescript
// ❌ НЕПРАВИЛЬНО (только gallery):
src={tour.data?.gallery?.[0] || fallbackImage}

// ✅ ПРАВИЛЬНО (приоритет mainImage):
src={tour.data?.mainImage || tour.data?.gallery?.[0] || fallbackImage}
```

#### 🚨 **ОШИБКА #4: Забыли добавить кнопку Telegram**
```typescript
// ✅ ОБЯЗАТЕЛЬНО после кнопки бронирования:
<Button variant="outline" asChild className="w-full py-3 border-gray-300">
  <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
    Задать вопрос в Telegram
  </a>
</Button>
```

## 🧮 ПОДРОБНОЕ РУКОВОДСТВО ПО КАЛЬКУЛЯТОРАМ И БРОНИРОВАНИЮ

### 🎯 **КРИТИЧНАЯ ПРОБЛЕМА РЕШЕНА: URL СИНХРОНИЗАЦИЯ**

**🚨 УРОК ИЗ ОШИБКИ:** При создании тура ID в `toursRegistry.ts` ДОЛЖЕН совпадать с URL в маршрутах!

#### ✅ **ПРАВИЛЬНАЯ СИНХРОНИЗАЦИЯ (ПРИМЕР С AVATAR ТУРОМ):**
```typescript
// 1️⃣ toursRegistry.ts - ID тура:
{
  id: 'avatar-plus-hangdong',  // ← ЭТО ID
  name: 'Аватар Плюс +'
}

// 2️⃣ App.tsx - Маршруты (ДОЛЖНЫ СОВПАДАТЬ):
<Route path="/excursion/avatar-plus-hangdong" element={<AvatarPlusHangdong />} />
<Route path="/tours/avatar-plus-hangdong" element={<AvatarPlusHangdong />} />

// 3️⃣ paths.ts - SEO пути (ДОЛЖНЫ СОВПАДАТЬ):
'avatar-plus-hangdong': '/excursion/avatar-plus-hangdong'

// 4️⃣ avatarPlusHangdongTour.ts - route поле (ДОЛЖНО СОВПАДАТЬ):
route: '/excursion/avatar-plus-hangdong'
```

### 🧮 **КАЛЬКУЛЯТОР ЦЕН: ПОШАГОВОЕ КОПИРОВАНИЕ ИЗ PhiPhi**

#### 📋 **ШАГ 1: СКОПИРОВАТЬ СОСТОЯНИЕ (useState)**
```typescript
// ✅ КОПИРОВАТЬ ИЗ PhiPhi2Days1Night.tsx - СТРОКИ 140-141:
const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);

// ✅ КОПИРОВАТЬ РАСЧЕТ ЦЕНЫ - СТРОКА 144:
const totalPrice = adults * excursion.priceAdult + children * excursion.priceChild;
```

#### 📋 **ШАГ 2: СКОПИРОВАТЬ UI КНОПОК +/-**
```typescript
// ✅ КОПИРОВАТЬ ИЗ PhiPhi2Days1Night.tsx - СТРОКИ 430-450:
<div className="flex items-center space-x-3">
  <Button
    variant="outline"
    size="sm"
    onClick={() => setAdults(Math.max(1, adults - 1))}
    className="h-8 w-8 p-0"
  >
    <Minus className="h-4 w-4" />
  </Button>
  <span className="w-8 text-center font-semibold">{adults}</span>
  <Button
    variant="outline"
    size="sm"
    onClick={() => setAdults(adults + 1)}
    className="h-8 w-8 p-0"
  >
    <Plus className="h-4 w-4" />
  </Button>
</div>
```

#### 📋 **ШАГ 3: СКОПИРОВАТЬ КНОПКУ БРОНИРОВАНИЯ**
```typescript
// ✅ КОПИРОВАТЬ ИЗ PhiPhi2Days1Night.tsx - СТРОКИ 575-580:
<Button 
  onClick={handleBooking}
  className="w-full bg-orange-500 hover:bg-orange-600"
>
  Забронировать за {totalPrice.toLocaleString()} {excursion.currency}
</Button>
```

#### 📋 **ШАГ 4: СКОПИРОВАТЬ ФУНКЦИЮ handleBooking**
```typescript
// ✅ КОПИРОВАТЬ ИЗ PhiPhi2Days1Night.tsx - СТРОКИ 170-180:
const handleBooking = useCallback(() => {
  setFormData(prev => ({
    ...prev,
    tourName: excursion.title,
    adults: adults,
    children: children,
    totalPrice: totalPrice,
  }));
  setShowBookingForm(true);
}, [adults, children, totalPrice, excursion.title]);
```

### 🔧 **РЕКОМЕНДУЕМЫЙ КАЛЬКУЛЯТОР ДЛЯ НОВЫХ ТУРОВ: UniversalBookingModal + ModalPortal (ОБЯЗАТЕЛЬНО!)**

**📌 ДЛЯ ВСЕХ НОВЫХ ТУРОВ ИСПОЛЬЗУЙТЕ UniversalBookingModal, ОБЕРНУТЫЙ В ModalPortal**

**🎯 ПРЕИМУЩЕСТВА UniversalBookingModal:**
- ✅ Красивый дизайн с пальмой сверху
- ✅ Цветная стильная форма бронирования  
- ✅ Встроенный калькулятор взрослые/дети
- ✅ Централизованная логика - один файл для всех
- ✅ Не нужно дублировать код в каждом туре

#### ✅ **ПРИМЕР ИСПОЛЬЗОВАНИЯ В НОВОМ ТУРЕ:**
```typescript
// 1️⃣ ИМПОРТ:
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";

// 2️⃣ СОСТОЯНИЕ:
const [showBookingModal, setShowBookingModal] = useState(false);

// 3️⃣ КНОПКА БРОНИРОВАНИЯ:
<Button 
  onClick={() => setShowBookingModal(true)}
  className="w-full py-3 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
  size="lg"
>
  Забронировать за {excursion.priceAdult.toLocaleString()} {excursion.currency}
</Button>

// 4️⃣ МОДАЛ В КОНЦЕ КОМПОНЕНТА (как в PearlsAndamanSea):
<ModalPortal>
  <UniversalBookingModal
    isOpen={showBookingModal}
    onClose={() => setShowBookingModal(false)}
    tourData={excursion}  // ← ВАЖНО: весь объект данных
  />
</ModalPortal>
```

#### ✅ **УСПЕШНЫЙ ПРИМЕР: AvatarPlusHangdong.tsx**

**📌 СОЗДАННЫЙ ПО ЭТАЛОНУ PearlsAndamanSea.tsx:**
- **URL:** https://johnda7.github.io/island-travel-echo-clone/#/excursion/avatar-plus-hangdong
- **Статус:** ✅ Полностью работает, все фото загружаются, UniversalBookingModal интегрирован
- **Особенности:** 32 реальные фотографии, структура точно по эталону, правильные маршруты
- **Старая страница УДАЛЕНА:** `/tours/avatar-plus-hangdong-adventure` больше не существует

### 🚫 **КАК УДАЛЯТЬ СТАРЫЕ/ДУБЛИРОВАННЫЕ СТРАНИЦЫ:**

**ЕСЛИ ЕСТЬ СТАРЫЕ ВЕРСИИ ТУРА:**
1. **useCMSTours.ts:** добавить `.neq('slug', 'старый-slug')` в fetchTours
2. **useCMSTours.ts:** добавить проверку в getTourBySlug: `if (slug === 'старый-slug') return null;`  
3. **DynamicTourPage.tsx:** добавить блокировку: `if (slug === 'старый-slug') { setTour(null); return; }`
4. **Деплой** и проверка что старая страница показывает 404

**ПРИМЕР УДАЛЕНИЯ (Avatar тур):**
- Удалили: `/tours/avatar-plus-hangdong-adventure`
- Оставили: `/excursion/avatar-plus-hangdong`  
- Результат: только одна правильная страница, никакой путаницы

#### 🔧 **ЛОКАЛЬНЫЙ КАЛЬКУЛЯТОР — ТОЛЬКО LEGACY (НЕ КОПИРОВАТЬ!)**

**📌 ТОЛЬКО НА ЗАЩИЩЕННОЙ СТРАНИЦЕ `PhiPhi2Days1Night.tsx`.**
- НЕ копировать и НЕ создавать новые локальные калькуляторы на других страницах.
- Для всех новых туров — только `UniversalBookingModal` в обертке `ModalPortal`.

#### � Контракт данных для калькулятора (TourData — минимально необходимо)
- `title: string` — название тура
- `priceAdult: number` — цена за взрослого
- `priceChild: number` — цена за ребенка (если нет детской цены — указывать 0)
- `currency: string` — валюта ("฿")
- `mainImage: string` или первое фото в `gallery: string[]` — для карточек/героя

Без этих полей модалка не сможет корректно считать и отображать цену.

### ✅ **ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА КАЛЬКУЛЯТОРА ПЕРЕД ДЕПЛОЕМ**

#### 🧪 **ЧЕК-ЛИСТ ТЕСТИРОВАНИЯ:**
```bash
1. ✅ Кнопка "+" увеличивает количество взрослых/детей
2. ✅ Кнопка "-" уменьшает (взрослые минимум 1, дети минимум 0)  
3. ✅ totalPrice пересчитывается автоматически
4. ✅ Кнопка "Забронировать" показывает актуальную цену
5. ✅ При клике на "Забронировать" открывается форма/модал
6. ✅ В форме передаются правильные данные (adults, children, totalPrice)
7. ✅ Telegram кнопка есть и работает
```

#### 🧪 **КАК ПРОВЕРИТЬ НА dev СЕРВЕРЕ:**
```bash
npm run dev
# Открыть http://localhost:8080/excursion/ваш-тур
# Нажать +/- кнопки - цена должна меняться
# Нажать "Забронировать" - должна открыться форма
# Проверить что в форме правильные данные
```

### 📦 Формат заказа и хранилище (ОБЯЗАТЕЛЬНО)

Все бронирования сохраняются в localStorage под ключом `bookingOrders` и читаются админкой `/#/admin`.

— Ключ: `bookingOrders`
— Тип: массив объектов

Строгий контракт одного заказа:

```ts
type BookingOrder = {
  id: number;                 // timestamp, уникальный ID
  tourName: string;           // tourData.title
  customerName: string;       // formData.name
  phone: string;              // formData.phone
  email: string;              // formData.email (может быть "")
  date: string;               // YYYY-MM-DD
  adults: number;             // >= 1
  children: number;           // >= 0
  totalPrice: number;         // рассчитанная сумма
  currency: string;           // tourData.currency (обычно "฿")
  createdAt: string;          // new Date().toLocaleString('ru-RU')
  status: 'новый' | 'подтвержден' | 'отменен';
}
```

— Сохранение происходит внутри `src/components/UniversalBookingModal.tsx` (НЕ МЕНЯТЬ).
— Админка (`src/pages/AdminPanel.tsx`) читает этот же ключ и ожидает тот же формат.
— Любые новые страницы ТУРОВ НЕ ДОЛЖНЫ заниматься сохранением заказов напрямую.

### 🧮 UI/поведение калькулятора (универсальный модал)

— Компонент: `UniversalBookingModal` (обязательно в обертке `ModalPortal`).
— Обязательные props: `{ isOpen: boolean; onClose: () => void; tourData: TourData }`.
— Поля формы (которые должен заполнить пользователь):
  - Имя (обязательное)
  - Телефон (обязательное)
  - Email (необязательно)
  - Дата поездки (обязательное)
— Счетчики гостей: Взрослые (мин. 1), Дети (мин. 0).
— Отображение цены:
  - Для взрослых: `{priceAdult} {currency} за человека`
  - Для детей: `{priceChild} {currency} за ребенка`
  - Итого: динамически считается как `adults*priceAdult + children*priceChild`.
— Кнопка бронирования активна только если заполнены Имя, Телефон, Дата.
— После бронирования:
  1) Заказ пишется в localStorage (`bookingOrders`)
  2) Открывается Telegram с подготовленным текстом
  3) Модалка закрывается, форма очищается

### 🧱 Обязательная обертка модалки в портал

Всегда используйте портал, иначе возможны проблемы с кликами/оверлеями:

```tsx
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";

// ...внутри компонента страницы
<ModalPortal>
  <UniversalBookingModal
    isOpen={showBookingModal}
    onClose={() => setShowBookingModal(false)}
    tourData={excursion}
  />
  {/* НЕ ДОБАВЛЯТЬ другие обертки со своими z-index поверх портала */}
  {/* НЕ МЕНЯТЬ id/поведение корневого 'app-modal-root' в ModalPortal */}
  {/* НЕ ПОДМЕНЯТЬ сохранение заявок — только через UniversalBookingModal */}
</ModalPortal>
```

### 🧾 TourData: минимальный контракт для модалки

Для корректной работы модалки в объекте `tourData` ДОЛЖНЫ быть:

```ts
type TourDataMinimal = {
  title: string;
  subtitle?: string;
  priceAdult: number;   // если нет — 0
  priceChild: number;   // если нет — 0
  currency: string;     // например, "฿"
  mainImage?: string;   // предпочтительно импорт
  gallery?: string[];   // изображения (импорты)
}
```

Рекомендуется копировать структуру из существующих `...Tour.ts` файлов (например, `pearlsTour.ts`).

---

## 🚀 Массовая заливка 6 туров — оперативный чек-лист

1) Данные туров
   - Создать 6 файлов `src/data/<slug>Tour.ts` по образцу `pearlsTour.ts`.
   - Заполнить поля `title`, `subtitle`, `priceAdult`, `priceChild`, `currency`, `mainImage`, `gallery`, `description`, `highlights`, `itinerary`, `included`, `excluded`, `requirements`, `importantInfo`.
   - Использовать импорты изображений; не строки путей.

2) Страницы туров
   - На каждый тур — страница в `src/pages/<PascalCase>.tsx`, копия `PearlsAndamanSea.tsx`.
   - Подключить соответствующий `<slug>TourData` как `excursion`.
   - Вверху/внизу кнопки «Забронировать» открывают `showBookingModal = true`.
   - Модалка бронирования только через `<ModalPortal><UniversalBookingModal ... /></ModalPortal>`.

3) Маршруты
   - В `src/App.tsx` добавить два маршрута на тур: `/excursion/<slug>` и `/tours/<slug>`.
   - Сохранять нотацию в стиле уже существующих маршрутов.

4) Реестр туров
   - В `src/data/toursRegistry.ts` добавить 6 элементов с уникальными `id = <slug>`.
   - Убедиться, что `data: () => Promise.resolve(<slug>TourData)` возвращает правильные данные.
   - Настроить теги/категории/featured/popular по необходимости.

5) Быстрые тесты
   - Открывается ли модалка на всех 6 страницах? (портал обязателен)
   - Считается ли итоговая цена при +/- взрослых/детей?
   - Валидируются ли Имя/Телефон/Дата и активируется кнопка?
   - После брони запись появляется в `/#/admin`?
   - Изображения видны (импорты), карточки показывают `mainImage`.

6) Сборка и деплой
   - `npm run build` — без ошибок.
   - Commit + push в `main` — авто-деплой GitHub Pages.
   - Проверка прод-URL туров + админки.

7) Запрещено при массовой заливке
   - Не создавать локальные калькуляторы на страницах.
   - Не менять `UniversalBookingModal` и `ModalPortal`.
   - Не сохранять заказы где-либо кроме `UniversalBookingModal`.

---

## 🛡️ **СИСТЕМА ЗАКАЗОВ И АДМИНКА - ПОЛНОЕ ОПИСАНИЕ**

### 📊 **CRM АДМИНКА - УПРАВЛЕНИЕ ЗАКАЗАМИ**

**URL Админки:** https://johnda7.github.io/island-travel-echo-clone/#/admin  
**Файл:** `src/pages/AdminPanel.tsx`  
**Назначение:** Полноценная CRM система для просмотра и управления всеми заказами

#### 🎯 **ФУНКЦИОНАЛ АДМИНКИ:**

✅ **Просмотр заказов:**
- Все заказы отображаются в удобной таблице
- Сортировка по дате создания (новые сверху)
- Поиск и фильтрация по статусам
- Детальная информация по каждому заказу

✅ **Управление статусами:**
- 🆕 **"новый"** - только что поступивший заказ
- ✅ **"подтвержден"** - заказ принят к обработке  
- ❌ **"отменен"** - заказ отклонен/отменен

✅ **Полная информация о заказе:**
- ID заказа (timestamp)
- Название тура
- Данные клиента (имя, телефон, email)
- Дата поездки  
- Количество гостей (взрослые/дети)
- Общая стоимость с валютой
- Дата и время создания заказа

#### 💾 **ТЕХНИЧЕСКАЯ АРХИТЕКТУРА:**

**Хранилище:** `localStorage` (ключ: `bookingOrders`)  
**Формат данных:** Массив объектов `BookingOrder[]`  
**Синхронизация:** Автоматическое обновление при новых заказах

```typescript
interface BookingOrder {
  id: number;                 // Уникальный ID (timestamp)
  tourName: string;           // Название тура из tourData.title
  customerName: string;       // Имя клиента из формы
  phone: string;              // Телефон клиента  
  email: string;              // Email (может быть пустым)
  date: string;               // Дата поездки (YYYY-MM-DD)
  adults: number;             // Количество взрослых (≥1)
  children: number;           // Количество детей (≥0)
  totalPrice: number;         // Общая стоимость
  currency: string;           // Валюта (обычно "฿")
  createdAt: string;          // Дата создания заказа
  status: 'новый' | 'подтвержден' | 'отменен';
}
```

### 🔄 **ПРОЦЕСС ОБРАБОТКИ ЗАКАЗА:**

#### 1️⃣ **Создание заказа (UniversalBookingModal):**
```bash
Клиент заполняет форму → Нажимает "Забронировать" → 
Валидация полей → Расчет стоимости → 
Сохранение в localStorage → Отправка в Telegram → 
Закрытие формы с подтверждением
```

#### 2️⃣ **Обработка в админке:**
```bash
Заказ появляется в таблице → Менеджер видит детали → 
Связывается с клиентом → Меняет статус на "подтвержден" → 
Организует тур или отменяет при необходимости
```

#### 3️⃣ **Уведомления:**
```bash
Telegram Bot → Канал @Phuketga → 
Автоматическое уведомление с полными данными заказа
```

### 🎯 **ИНТЕГРАЦИЯ С ФОРМОЙ ЗАКАЗА:**

**Компонент:** `UniversalBookingModal.tsx`  
**Место вызова:** Любая страница тура через кнопку "Забронировать"  
**Обязательная обертка:** `ModalPortal` для корректного z-index

```tsx
// Правильный способ использования на странице тура:
<ModalPortal>
  <UniversalBookingModal
    isOpen={showBookingModal}
    onClose={() => setShowBookingModal(false)}
    tourData={excursion}
  />
</ModalPortal>
```

### 🧪 **ТЕСТИРОВАНИЕ СИСТЕМЫ ЗАКАЗОВ:**

#### ✅ **Проверочный чек-лист:**

1. **Создание заказа:**
   - Открыть любую страницу тура
   - Нажать "Забронировать"
   - Заполнить все обязательные поля
   - Проверить расчет стоимости
   - Отправить заказ

2. **Проверка сохранения:**
   - Открыть админку: `/#/admin`
   - Найти новый заказ в таблице
   - Проверить корректность всех данных
   - Протестировать смену статуса

3. **Telegram уведомления:**
   - Проверить отправку в канал @Phuketga
   - Убедиться в корректности формата сообщения
   - Проверить fallback через прямую ссылку

### 🔒 **ЗАЩИТА И БЕЗОПАСНОСТЬ:**

❌ **ЗАПРЕЩЕНО:**
- Изменять структуру `BookingOrder`
- Модифицировать логику сохранения в `UniversalBookingModal`
- Создавать альтернативные системы заказов
- Изменять ключ `localStorage` ('bookingOrders')

✅ **РАЗРЕШЕНО:**
- Добавлять новые поля в админку (только отображение)
- Расширять фильтрацию и поиск
- Улучшать UI/UX админки
- Добавлять экспорт данных

### 🎨 **UI/UX ОСОБЕННОСТИ:**

**Админка:**
- Современный дизайн с Tailwind CSS
- Адаптивная верстка для мобильных устройств
- Интуитивная навигация
- Цветовая индикация статусов

**Форма заказа:**
- Пошаговая валидация полей
- Динамический расчет цены
- Красивые анимации переходов
- Автоматическая очистка после отправки

### 🌐 **ЦЕНТРАЛИЗОВАННАЯ ИНТЕГРАЦИЯ - АВТОМАТИЧЕСКОЕ ПОЯВЛЕНИЕ ВЕЗДЕ**

#### 🎯 **ПРИНЦИП: "ДОБАВИЛ В РЕЕСТР → ПОЯВИЛОСЬ ВЕЗДЕ АВТОМАТИЧЕСКИ"**

Когда добавляешь тур в `toursRegistry.ts`, он АВТОМАТИЧЕСКИ появляется:
```typescript
// 1️⃣ На главной странице (если isPopular: true)
// 2️⃣ В каталоге /tours (если isActive: true) 
// 3️⃣ В поиске по сайту (Header.tsx поиск)
// 4️⃣ В навигационном меню (по категориям)
// 5️⃣ В фильтрах по тегам
// 6️⃣ В похожих турах на других страницах
```

#### 📋 **ТЕКУЩИЕ ТУРЫ В РЕЕСТРЕ:**
1. **pearls-andaman-sea** - 4 жемчужины Андаманского моря (priority: 1, ЭТАЛОН)
2. **phi-phi-2days** - Пхи-Пхи 2 дня/1 ночь (priority: 2)
3. **dostoprimechatelnosti-phuketa** - Достопримечательности Пхукета (priority: 3)

#### 🗺️ **МАРШРУТЫ ТУРОВ:**
- `/excursion/four-pearls-andaman` → PearlsAndamanSea.tsx (ЭТАЛОН)
- `/excursion/phi-phi-2-days-1-night` → PhiPhi2Days1Night.tsx  
- `/excursion/dostoprimechatelnosti-phuketa` → DostoprimechatelnostiPhuketa.tsx

#### 📋 **СТРУКТУРА ИНТЕГРАЦИИ toursRegistry.ts:**
```typescript
{
  id: 'dostoprimechatelnosti-phuketa',    // ← ID для роутинга
  name: 'Достопримечательности Пхукета', // ← Название в меню
  category: 'cultural',                   // ← Автофильтр по категории
  tags: ['храмы', 'культурные', '1 день'], // ← Поиск по тегам
  isPopular: true,    // ← На главной в "Популярные туры"
  isActive: true,     // ← В поиске и каталоге
  isFeatured: true,   // ← На главной в "Рекомендуемые"
  priority: 3,        // ← Порядок в меню (1, 2, 3...)
  data: () => Promise.resolve(tourDataObject) // ← Ссылка на данные
}
```

#### 🔍 **КАК РАБОТАЕТ ПОИСК:**
```typescript
// Header.tsx ищет по:
- tour.name (название в реестре)
- tour.data.title (заголовок на странице)
- tour.data.subtitle (подзаголовок)
- tour.data.description (описание)
- tour.tags (массив тегов)

// При нажатии Enter → getTourPath(tour.id) → переход
```

#### ⚠️ **ВАЖНО: При добавлении нового тура ОБЯЗАТЕЛЬНО обновить:**

1. **src/components/Header.tsx** - функцию getTourPath:
```typescript
const getTourPath = (tourId: string) => {
  switch (tourId) {
    case 'phi-phi-2days':
      return '/excursion/phi-phi-2-days-1-night';
    case 'pearls-andaman-sea':
      return '/tours/four-pearls-andaman';
    case 'dostoprimechatelnosti-phuketa':
      return '/excursion/dostoprimechatelnosti-phuketa';
    case 'ваш-новый-тур-id':
      return '/excursion/ваш-новый-маршрут';
    default:
      return `/tours/${tourId}`;
  }
};
```

2. **src/components/Tours.tsx** - функцию getDetailPath:
```typescript
const getDetailPath = (tour: TourWithMeta) => {
  switch (tour.id) {
    case 'phi-phi-2days':
      return '/excursion/phi-phi-2-days-1-night';
    case 'pearls-andaman-sea':
      return '/tours/four-pearls-andaman';
    case 'dostoprimechatelnosti-phuketa':
      return '/excursion/dostoprimechatelnosti-phuketa';
    case 'ваш-новый-тур-id':
      return '/excursion/ваш-новый-маршрут';
    default:
      return `/tours/${tour.id}`;
  }
};
```

#### 📱 **КАК РАБОТАЕТ НАВИГАЦИЯ:**
```typescript
// Header.tsx и Tours.tsx используют getTourPath():
case 'dostoprimechatelnosti-phuketa':
  return '/excursion/dostoprimechatelnosti-phuketa';
  
// Маршрут в App.tsx:
<Route path="/excursion/dostoprimechatelnosti-phuketa" 
       element={<DostoprimechatelnostiPhuketa />} />
```

## 📋 СТРОГИЙ АЛГОРИТМ СОЗДАНИЯ ТУРА ПО ШАБЛОНУ

### 🎯 **ПРИОРИТЕТ ШАБЛОНОВ:**
1. **ОСНОВНОЙ:** PearlsAndamanSea.tsx (с UniversalBookingModal)
2. **РЕЗЕРВНЫЙ:** PhiPhi2Days1Night.tsx (с локальным калькулятором)

### 🎯 **ПОШАГОВЫЙ ПЕРЕНОС ИЗ PearlsAndamanSea.tsx**

#### 📋 **ШАГ 1: КОПИРОВАНИЕ ФАЙЛА**
```bash
1. ✅ СКОПИРОВАТЬ src/pages/PearlsAndamanSea.tsx
2. ✅ ПЕРЕИМЕНОВАТЬ в YourNewTour.tsx  
3. ✅ ЗАМЕНИТЬ component name: export default function YourNewTour()
4. ✅ ЗАМЕНИТЬ импорт данных: import { yourTourData } from "@/data/yourTour"
```

#### 📋 **ШАГ 2: СОЗДАНИЕ ДАННЫХ ТУРА**
```typescript
1. ✅ СКОПИРОВАТЬ src/data/pearlsTour.ts
2. ✅ ПЕРЕИМЕНОВАТЬ в src/data/yourTour.ts
3. ✅ ЗАМЕНИТЬ export const pearlsAndamanSeaTourData на yourTourData
4. ✅ ОБНОВИТЬ ВСЕ ПОЛЯ TourData интерфейса
```

#### 📋 **ШАГ 3: ИМПОРТЫ И ИЗОБРАЖЕНИЯ**
```typescript
// ✅ ЗАМЕНИТЬ ВСЕ ИМПОРТЫ ИЗОБРАЖЕНИЙ в yourTour.ts:
import railayMain from "../assets/pearls-andaman-sea/gallery-01-railay-main.jpg";
// ↓ НА ↓  
import newImage1 from "../assets/your-tour/image-1.jpg";

// ✅ ОБНОВИТЬ gallery массив:
gallery: [
  newImage1,    // ← ИМПОРТЫ, НЕ СТРОКИ!
  newImage2, 
  newImage3
],
```

#### 📋 **ШАГ 4: ОБНОВЛЕНИЕ КОМПОНЕНТА**
```typescript
// ✅ В YourNewTour.tsx ЗАМЕНИТЬ импорт данных:
import { pearlsAndamanSeaTourData } from "@/data/pearlsTour";
// ↓ НА ↓
import { yourTourData } from "@/data/yourTour";

// ✅ ЗАМЕНИТЬ константу:
const excursion = pearlsAndamanSeaTourData;
// ↓ НА ↓
const excursion = yourTourData;
```

#### 📋 **ШАГ 5: КАЛЬКУЛЯТОР БРОНИРОВАНИЯ**
```typescript
// ✅ PearlsAndamanSea УЖЕ ИСПОЛЬЗУЕТ UniversalBookingModal:

// 1️⃣ ИМПОРТ УЖЕ ЕСТЬ:
import { UniversalBookingModal } from "@/components/UniversalBookingModal";

// 2️⃣ СОСТОЯНИЕ УЖЕ ЕСТЬ:
const [showBookingModal, setShowBookingModal] = useState(false);

// 3️⃣ КНОПКА УЖЕ НАСТРОЕНА:
<Button 
  onClick={() => setShowBookingModal(true)}
  className="w-full py-3 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
  size="lg"
>
  Забронировать тур
</Button>

// 4️⃣ МОДАЛ УЖЕ ИНТЕГРИРОВАН:
<UniversalBookingModal
  isOpen={showBookingModal}
  onClose={() => setShowBookingModal(false)}
  tourData={excursion}  // ← ВАЖНО: передаем объект tourData
/>

// 🎯 ПРЕИМУЩЕСТВА: красивый дизайн с пальмой, встроенный калькулятор, централизованная логика
```

#### 📋 **ШАГ 4 АЛЬТЕРНАТИВНЫЙ: ЛОКАЛЬНЫЙ КАЛЬКУЛЯТОР (только если нужна кастомизация)**
```typescript
// ⚠️ ТОЛЬКО ДЛЯ ОСОБЫХ СЛУЧАЕВ - КОПИРОВАТЬ ИЗ PhiPhi:
const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);
const totalPrice = adults * excursion.priceAdult + children * excursion.priceChild;

// Кнопки +/- и handleBooking функция - точно как в PhiPhi
```

#### 📋 **ШАГ 5: ИНТЕГРАЦИЯ В СИСТЕМУ**
```typescript
// 1️⃣ ДОБАВИТЬ В src/data/toursRegistry.ts:
{
  id: 'your-new-tour-id',                    // ← УНИКАЛЬНЫЙ ID
  name: 'Ваше название тура', 
  category: 'islands',                       // ← islands/cultural/adventure
  tags: ['море', 'острова', '1 день'],       // ← ВАШИ ТЕГИ
  isPopular: true,
  isActive: true,                            // ← ОБЯЗАТЕЛЬНО true!
  isFeatured: false,
  priority: 5,                               // ← СЛЕДУЮЩИЙ НОМЕР
  data: () => Promise.resolve(yourTourData)  // ← ВАШИ ДАННЫЕ
},

// 2️⃣ ДОБАВИТЬ В src/App.tsx:
<Route path="/excursion/your-new-tour-id" element={<YourNewTour />} />
<Route path="/tours/your-new-tour-id" element={<YourNewTour />} />

// 3️⃣ ДОБАВИТЬ В src/components/Header.tsx:
case 'your-new-tour-id':
  return '/excursion/your-new-tour-id';

// 4️⃣ ДОБАВИТЬ В src/components/Tours.tsx:  
case 'your-new-tour-id':
  return '/excursion/your-new-tour-id';
```

#### 📋 **ШАГ 6: ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА ПЕРЕД ДЕПЛОЕМ**
```bash
# 🧪 ТЕСТ НА ЛОКАЛЬНОМ СЕРВЕРЕ:
npm run dev

# ✅ ПРОВЕРИТЬ:
1. http://localhost:8080/excursion/your-new-tour-id - открывается
2. Кнопки +/- работают, цена пересчитывается  
3. Кнопка "Забронировать за X ฿" показывает цену
4. При клике открывается форма бронирования
5. В форме правильные данные (название, взрослые, дети, цена)
6. Telegram кнопка работает

# ✅ СБОРКА:
npm run build  # <- ДОЛЖНО БЫТЬ БЕЗ ОШИБОК!

# ✅ ДЕПЛОЙ:
git add .
git commit -m "✨ НОВЫЙ ТУР: Ваше название тура"  
git push
```

### ✅ **ОБЯЗАТЕЛЬНЫЙ ЧЕК-ЛИСТ ПОСЛЕ СОЗДАНИЯ ТУРА**

#### 🔍 **ЭТАП 1: ТЕХНИЧЕСКАЯ ПРОВЕРКА**
```bash
✅ npm run build - сборка без ошибок
✅ Открыть прямую ссылку тура - страница загружается
✅ Кнопка бронирования показывает цену
✅ Калькулятор пересчитывает стоимость
✅ Галерея работает (мобильная + десктоп)
✅ Модальные окна открываются/закрываются
```

#### 🔍 **ЭТАП 2: ИНТЕГРАЦИОННАЯ ПРОВЕРКА**
```bash
✅ Открыть /tours - тур появился в каталоге
✅ Фотография в каталоге НЕ заглушка
✅ Поиск находит тур по названию
✅ Поиск находит тур по тегам
✅ Клик на тур в поиске → переход работает
✅ Клик на тур в каталоге → переход работает
✅ На главной появился (если isPopular: true)
```

#### 🔍 **ЭТАП 3: ФУНКЦИОНАЛЬНАЯ ПРОВЕРКА ФОРМ БРОНИРОВАНИЯ**
```bash
✅ Кнопка "Забронировать" показывает актуальную цену
✅ При клике на "Забронировать" открывается форма/модал
✅ В форме автоподставляются данные:
   - Название тура (tourName)
   - Количество взрослых (adults) 
   - Количество детей (children)
   - Общая стоимость (totalPrice)
✅ Форма отправляется на anotrhers@gmail.com
✅ После отправки показывается уведомление
✅ Telegram кнопка открывает https://t.me/Phuketga
✅ Мобильная версия адаптивна  
✅ Все изображения загружаются
```

#### 🧪 **ДЕТАЛЬНАЯ ПРОВЕРКА КАЛЬКУЛЯТОРА:**
```bash
🧮 ТЕСТ КАЛЬКУЛЯТОРА:
1. ✅ Начальное состояние: 1 взрослый, 0 детей
2. ✅ Кнопка "+" увеличивает счетчик
3. ✅ Кнопка "-" уменьшает счетчик (взрослые мин. 1, дети мин. 0)
4. ✅ totalPrice = adults * priceAdult + children * priceChild
5. ✅ Цена форматируется с разделителями (1,900 ฿)
6. ✅ При изменении количества кнопка обновляется: "Забронировать за 3,800 ฿"

� ТЕСТ БРОНИРОВАНИЯ:
1. ✅ Клик на кнопку открывает форму/модал
2. ✅ В форме предзаполнены поля:
   - Тур: "Название вашего тура"
   - Взрослые: текущее количество  
   - Дети: текущее количество
   - Цена: актуальная сумма
3. ✅ Форма отправляется и показывает "Заявка отправлена"
```

#### �🚨 **ТИПИЧНЫЕ ПРОБЛЕМЫ И РЕШЕНИЯ:**

**❌ "Поиск находит, но не переходит"**
```typescript
// Проверить getTourPath в Header.tsx:
case 'your-tour-id':
  return '/excursion/your-tour-route';
  
// Проверить маршрут в App.tsx:
<Route path="/excursion/your-tour-route" element={<YourTour />} />
```

**❌ "Фото в каталоге заглушка"**
```typescript
// Проверить mainImage импорт в данных:
import mainImg from '@/assets/folder/image.jpg'
mainImage: mainImg // НЕ строка!
```

**❌ "Тур не появился в каталоге"**
```typescript
// Проверить в toursRegistry.ts:
isActive: true,  // Должно быть true!
```

**❌ "Калькулятор не работает"**
```typescript
// Для НОВЫХ туров: должен использоваться только UniversalBookingModal в ModalPortal
// Проверить, что модал обернут:
<ModalPortal>
  <UniversalBookingModal isOpen={...} onClose={...} tourData={excursion} />
</ModalPortal>

// Проверить, что в tourData есть ключевые поля:
// title, priceAdult, priceChild, currency, mainImage или gallery[0]
```

**❌ "Форма бронирования не открывается"**
```typescript
// Для НОВЫХ туров handleBooking локально не нужен — открывайте централизованный модал:
const [showBookingModal, setShowBookingModal] = useState(false);
<Button onClick={() => setShowBookingModal(true)}>Забронировать</Button>
<ModalPortal>
  <UniversalBookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} tourData={excursion} />
</ModalPortal>
```

### 🚀 **ФИНАЛЬНАЯ ПРОВЕРКА ПЕРЕД МНОЖЕСТВЕННОЙ ЗАГРУЗКОЙ**

#### ✅ **ЧЕКПОЙНТ ГОТОВНОСТИ К PRODUCTION:**
```bash
🔥 КРИТИЧЕСКИЕ ПРОВЕРКИ:
1. ✅ npm run build - УСПЕШНО без ошибок/предупреждений
2. ✅ Все 4 тура открываются по прямым ссылкам
3. ✅ Все калькуляторы работают (кнопки +/-, пересчет цены)
4. ✅ Все формы бронирования открываются и отправляются
5. ✅ Поиск находит все туры и переходы работают
6. ✅ Каталог /tours показывает все туры с реальными фото
7. ✅ Мобильная версия адаптивна и работает

🌐 ДЕПЛОЙ ГОТОВ:
git add .
git commit -m "🚀 ВСЕ ТУРЫ ПРОТЕСТИРОВАНЫ - ГОТОВО К PRODUCTION"
git push
```

### 🖼️ **ЦЕНТРАЛИЗОВАННАЯ СИСТЕМА ИЗОБРАЖЕНИЙ:**

#### 🎯 **ПРИНЦИП: "ОДНО ИЗОБРАЖЕНИЕ - ВЕЗДЕ АВТОМАТИЧЕСКИ"**
- **mainImage** в данных тура → автоматически в каталоге Tours.tsx
- **mainImage** в данных тура → автоматически как главное фото на странице
- **gallery** массив → автоматически в галерее на странице

#### ✅ **ПРАВИЛЬНАЯ СТРУКТУРА ИЗОБРАЖЕНИЙ:**
```typescript
// src/data/tourData.ts
import mainImg from '@/assets/tour-folder/main-image.jpg'

export const tourData = {
  mainImage: mainImg,        // ← ЭТО фото попадет в каталог!
  gallery: [
    mainImg,                 // ← Первое в галерее = mainImage
    '/src/assets/tour-folder/photo2.jpg', // ← Остальные можно строками
    '/src/assets/tour-folder/photo3.jpg'
  ]
}
```

#### ✅ **КАК Tours.tsx НАХОДИТ ИЗОБРАЖЕНИЕ:**
```typescript
// src/components/Tours.tsx - ИСПРАВЛЕНО!
src={tour.data?.mainImage || tour.data?.gallery?.[0] || fallbackImage}
//    ^^^^^^^^^^^^^^^^^^ ПРИОРИТЕТ mainImage!
```

### 🚫 СТРОГИЕ ЗАПРЕТЫ:

#### ❌ ЗАПРЕТ НА ИЗМЕНЕНИЕ ГОТОВЫХ ТУРОВ:
- **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** менять PhiPhi2Days1Night.tsx
- **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** менять PearlsAndamanSea.tsx  
- **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** менять DostoprimechatelnostiPhuketa.tsx
- **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** трогать калькуляторы в готовых турах
- **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** изменять формы бронирования
- **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** менять handleBooking функции
- **ГОТОВЫЕ ТУРЫ = НЕПРИКОСНОВЕННЫЕ ЭТАЛОНЫ**

#### ❌ ЗАПРЕТ НА ЗАГЛУШКИ ФОТОГРАФИЙ:
- **ЗАПРЕЩЕНО** использовать левые/выдуманные фото
- **ТОЛЬКО** реальные фото с WordPress или от пользователя  
- **Если нет фото** - спросить у пользователя откуда взять

#### ❌ ЗАПРЕТ НА САМОДЕЛЬНЫЕ ШАБЛОНЫ:
- **ЗАПРЕЩЕНО** создавать TourTemplate или другие шаблоны
- **ТОЛЬКО** копирование PhiPhi2Days1Night.tsx
- **НЕ ВЫДУМЫВАТЬ** новые архитектуры

#### ❌ ЗАПРЕТ НА УНИВЕРСАЛЬНЫЕ РОУТЫ:
- **ЗАПРЕЩЕНО** /tour/:tourId маршруты
- **ТОЛЬКО** конкретные пути как у PhiPhi
- **Каждый тур** = отдельная страница

### ✅ ПРАВИЛЬНЫЙ ПРИМЕР:
```typescript
// ПРАВИЛЬНО - как PhiPhi:
import NewTour from "./pages/NewTour";
<Route path="/tours/new-tour" element={<NewTour />} />

// НЕПРАВИЛЬНО - универсальные шаблоны:
import { TourTemplate } from "./templates/TourTemplate"; // ❌
<Route path="/tour/:tourId" element={<TourTemplate />} /> // ❌
```

### 🎯 ЭТАЛОННЫЕ ФАЙЛЫ:
- **PhiPhi2Days1Night.tsx** - основной эталон
- **PearlsAndamanSea.tsx** - второй пример  
- **Все новые туры** - точные копии PhiPhi!

---

## �‍💻 ПРОФИЛЬ AI АГЕНТА:
- **Профессиональный WordPress разработчик (10+ лет опыта)**
- **Эксперт по админке WordPress и автоматизации контента** 
- **Специалист по масштабируемым туристическим сайтам**
- **Знаток принципа "добавил → появилось везде автоматически"**

## ⚠️ ВНИМАНИЕ! ДЛЯ ВСЕХ AI АГЕНТОВ:

### 🛑 СТОП! ПРОЧИТАЙ ЭТО ПЕРЕД ЛЮБЫМИ ДЕЙСТВИЯМИ!

**ЭТО КОММЕРЧЕСКИЙ ТУРИСТИЧЕСКИЙ САЙТ!**
**КАЖДАЯ ОШИБКА = ПОТЕРЯ ПРОДАЖ!**

### 🚨 СТРОГИЕ ЗАПРЕТЫ (WordPress принципы):

#### ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО:
1. **ХАРДКОД ТЕГОВ/КАТЕГОРИЙ В HTML** - как в строках 148-163 PearlsAndamanSea.tsx
   ```tsx
   ❌ НЕ ДЕЛАТЬ:
   <span>Пхи-Пхи</span>
   <span>Майя Бей</span>
   <span>Снорклинг</span>
   ```

2. **РУЧНОЕ ДОБАВЛЕНИЕ ПУНКТОВ МЕНЮ** - только автоматическое из данных туров

3. **СОЗДАНИЕ ОТДЕЛЬНЫХ ПУТЕЙ ДЛЯ КАЖДОГО ТУРА** - только централизованная система

4. **ДУБЛИРОВАНИЕ ИНФОРМАЦИИ О ТУРАХ** в разных файлах

5. **МНОЖЕСТВЕННЫЕ ФАЙЛЫ ДЛЯ ОДНОГО ТУРА** - максимум 1 тур = 1 файл

6. **НЕЦЕНТРАЛИЗОВАННЫЕ ИЗМЕНЕНИЯ** - все должно идти через единую систему

## 🛡️ ЗАЩИЩЕННЫЕ ФАЙЛЫ - НЕ ТРОГАТЬ!

### 🚨 КРИТИЧЕСКИ ВАЖНО: ВСЕГДА ПОДКЛЮЧАЙ AI_PROMPT_INSTRUCTIONS.md!

**ЕСЛИ AI АГЕНТ НЕ ВИДИТ ЭТОТ ФАЙЛ = НАЧИНАЕТ ТУПИТЬ!**

**ПРАВИЛО ДЛЯ ПОЛЬЗОВАТЕЛЯ:** Всегда подключай AI_PROMPT_INSTRUCTIONS.md в attachments!

### 🔒 АБСОЛЮТНО ЗАЩИЩЕННЫЕ ФАЙЛЫ:

#### 📄 **src/pages/PhiPhi2Days1Night.tsx** 
- ✅ **СОСТОЯНИЕ:** Полностью готов, работает галерея, цены, бронирование
- ❌ **НЕ ТРОГАТЬ:** Структуру, логику галереи, состояния компонента
- ✅ **МОЖНО:** Только исправлять импорты изображений, если сломаны

#### 📄 **src/pages/PearlsAndamanSea.tsx**
- ✅ **СОСТОЯНИЕ:** Унифицирован с PhiPhi, одинаковая структура
- ❌ **НЕ ТРОГАТЬ:** Структуру, логику галереи, состояния компонента  
- ✅ **МОЖНО:** Только исправлять импорты изображений, если сломаны

#### 📄 **src/data/phiPhiTour.ts**
- ✅ **СОСТОЯНИЕ:** Единственный источник данных для Phi-Phi
- ❌ **НЕ ТРОГАТЬ:** Структуру данных, импорты изображений
- ✅ **МОЖНО:** Только обновлять цены, описания по запросу

#### 📄 **src/data/pearlsTour.ts**  
- ✅ **СОСТОЯНИЕ:** Единственный источник данных для Pearls
- ❌ **НЕ ТРОГАТЬ:** Структуру данных, импорты изображений
- ✅ **МОЖНО:** Только обновлять цены, описания по запросу

### 🛑 **ЕСЛИ ФАЙЛЫ СЛОМАНЫ:**
1. **ОСТАНОВИСЬ!** Не пытайся их "исправить"
2. **СООБЩИ ПОЛЬЗОВАТЕЛЮ:** "Файл сломан, нужно восстанавливать из бэкапа"
3. **НЕ МЕНЯЙ СТРУКТУРУ** без явного разрешения

### 🚀 ПРАВИЛО АВТОМАТИЧЕСКОГО ДЕПЛОЯ:

**ОБЯЗАТЕЛЬНО:** После КАЖДОЙ важной правки автоматически:
1. ✅ **Проверить сборку** - `npm run build`
2. ✅ **Добавить изменения** - `git add .`
3. ✅ **Закоммитить** - `git commit -m "понятное описание"`
4. ✅ **Задеплоить** - `git push`
5. ✅ **ПРОВЕРИТЬ НА САЙТЕ** - открыть https://johnda7.github.io/island-travel-echo-clone/ и убедиться что изменения применились
6. ✅ **Сказать "ГОТОВО"** - ТОЛЬКО после визуальной проверки на продакшн сайте!

**КОГДА AI ГОВОРИТ "ГОТОВО" = САЙТ УЖЕ ОБНОВЛЕН И ПРОВЕРЕН!**

**Важные изменения (требуют автодеплоя):**
- Исправления багов в функционале
- Изменения форм, калькуляторов, модалок
- Обновления компонентов
- Любые правки кода по запросу

**НЕ требуют деплоя:** Ответы на вопросы, анализ кода, поиск информации

---

## 🎯 АРХИТЕКТУРА САЙТА ПОСЛЕ ОЧИСТКИ (НЕ МЕНЯТЬ!)

### 🏗️ УПРОЩЕННАЯ СТРУКТУРА:
```
ГЛАВНАЯ СТРАНИЦА (/)
├── Hero секция (фон: maya-bay-sunrise.jpg)
├── Advantages (преимущества)
├── Gallery (галерея из phi-phi-2days)
├── Tours (популярные туры - ТОЛЬКО Phi Phi)
├── Reviews (отзывы)
├── FAQ (вопросы-ответы)
└── Contact (контакты)

СТРАНИЦА ТУРА (/phi-phi-2days)  
├── Галерея фотографий (phi-phi-2days папка)
├── Описание тура
├── Кнопка "Забронировать сейчас" → модальное окно
└── Кнопка "Забронировать" внизу → модальное окно

СТРАНИЦА БРОНИРОВАНИЯ (/book/phi-phi-2days)
├── Форма с выбором даты
├── Калькулятор гостей (взрослые/дети/младенцы)
├── Поля контактов
└── Кнопка "Забронировать тур" → Telegram

УДАЛЕННЫЕ РАЗДЕЛЫ (НЕ ВОЗВРАЩАТЬ!):
❌ /beaches - пляжи удалены
❌ /what-to-visit - достопримечательности удалены  
❌ /destinations - направления удалены
❌ /attractions - аттракционы удалены
```

### 🔄 ЛОГИКА БРОНИРОВАНИЯ (СОХРАНЕНА):
1. **Пользователь нажимает "Забронировать"** (где угодно)
2. **Переходит на `/book/phi-phi-2days`** (централизованно)
3. **Заполняет форму** (дата, гости, контакты)
4. **Нажимает "Забронировать тур"** 
5. **Открывается Telegram** с готовым сообщением в @Phuketga

## 📦 ЭТАЛОН КАРТОЧКИ ТУРА (WordPress стандарт):

### 🎨 ВИЗУАЛЬНЫЕ ТРЕБОВАНИЯ:
```tsx
КАРТОЧКА ТУРА:
├── 📸 Реальное фото (НЕ зеленый градиент!)
│   - tour.data?.gallery?.[0] или fallback изображение
│   - Размер: полная ширина карточки, aspect-ratio фиксированный
│   - Alt текст: tour.data?.title
├── ⭐ Рейтинг и популярность
│   - tour.data?.rating (5.0 звезд)
│   - PopularityBadge если популярный тур
├── 📝 Заголовок и описание
│   - <h3>{tour.data?.title}</h3> (НЕ хардкод!)
│   - <p>{tour.data?.description}</p> (НЕ хардкод!)
├── 💰 Реальная цена
│   - {tour.data?.priceAdult?.toLocaleString()} ₿ (НЕ статичная ₿4,500!)
│   - "за взрослого" подпись
└── 🔘 Кнопка бронирования
    - "Забронировать" или "Подробнее"
    - Полная ширина (w-full)
    - Стиль: bg-orange-500 hover:bg-orange-600
```

### ⚠️ КРИТИЧЕСКИЕ ОШИБКИ В КАРТОЧКАХ:
```tsx
❌ НЕПРАВИЛЬНО (хардкод):
<div style={{background: "linear-gradient(...)"}}> // зеленый градиент
<h3>Пхи-Пхи острова</h3> // хардкод заголовка
<p>Описание тура...</p> // хардкод описания
<span>₿4,500</span> // статичная цена

✅ ПРАВИЛЬНО (центрально):
<img src={tour.data?.gallery?.[0]} alt={tour.data?.title} />
<h3>{tour.data?.title}</h3>
<p>{tour.data?.description}</p>
<span>{tour.data?.priceAdult?.toLocaleString()} ₿</span>
```

## 📋 ЭТАЛОН СТРАНИЦЫ БРОНИРОВАНИЯ:

### 🎯 СТРУКТУРА /book/{tourSlug}:
```tsx
СТРАНИЦА БРОНИРОВАНИЯ:
├── 📱 Hero секция
│   - Заголовок: "Забронировать {tour.data?.title}"
│   - Подзаголовок: tour.data?.description
│   - Фон: tour.data?.gallery?.[0]
├── 📅 Форма бронирования
│   - Выбор даты (react-datepicker)
│   - Количество гостей (взрослые/дети/младенцы)
│   - Поля контактов (имя, WhatsApp/Telegram, email)
│   - Автоматический расчет итоговой стоимости
├── 💰 Калькулятор стоимости
│   - Взрослые: {adults} × {tour.data?.priceAdult} ₿
│   - Дети: {children} × {tour.data?.priceChild} ₿  
│   - Младенцы: {infants} × 0 ₿ (бесплатно)
│   - ИТОГО: {total} ₿
└── 🔗 Кнопка "Забронировать тур"
    - Формирует сообщение для Telegram
    - Открывает t.me/Phuketga с готовым текстом
```

---

## ✅ Обновления (20.09.2025)

- Поиск унифицирован для десктопа и мобайла:
  - Добавлен debouncing ввода, поддержка Enter (открытие первого результата)
  - Единый рендер пустых состояний и индикатор загрузки
  - Ссылки ведут на канонические страницы через getTourDetailPath
- Линт/качество:
  - Исправлены предупреждения react-hooks/exhaustive-deps в галереях
  - Подавлены несущественные react-refresh/only-export-components в shadcn UI
- Напоминание по авто-деплою: после правок — build, commit, push, визуальная проверка на проде

### � Централизация туров и калькулятора
- Введён универсальный маршрут шаблона: `/tour/:tourId` рендерит `src/templates/TourTemplate.tsx`.
- Все переходы на страницы туров должны строиться через `getTourDetailPath(id)` из `src/lib/paths.ts`.
  - Для двух защищённых туров функция возвращает SEO-дружественные страницы:
    - `phi-phi-2days` → `/excursion/phi-phi-2-days-1-night` (также дублируется на `/tours/...`)
    - `pearls-andaman-sea` → `/tours/four-pearls-andaman` (также дублируется на `/excursion/...`)
  - Для всех остальных туров возвращается `/tour/{id}` (динамический шаблон).
- `UniversalBookingModal` — единственный калькулятор/модалка бронирования. Он:
  - Подключён в TourTemplate (значит доступен во всех незащищённых турах по умолчанию),
  - Используется непосредственно и в защищённых страницах, сохраняя единое поведение.

### 📌 Правила для добавления новых туров
- Зарегистрируй тур в `src/data/toursRegistry.ts` (id, name, теги, data() → TourData)
- Не создавай отдельный роут — по умолчанию страница будет по `/tour/{id}`
- Для ссылок/поиска используй только `getTourDetailPath(id)`
- Если тур должен быть защищён и иметь SEO-URL — добавь override в `getTourDetailPath()` и явный Route в `src/App.tsx`

### �📨 ФОРМАТ СООБЩЕНИЯ ДЛЯ TELEGRAM:
```text
🏝️ БРОНИРОВАНИЕ ТУРА

📝 Тур: {tour.data?.title}
📅 Дата: {selectedDate}
👥 Гости: {adults} взр, {children} дет, {infants} мл

💰 СТОИМОСТЬ:
• Взрослые: {adults} × {priceAdult} ₿ = {adultTotal} ₿
• Дети: {children} × {priceChild} ₿ = {childTotal} ₿
• Младенцы: бесплатно
💳 ИТОГО: {total} ₿

👤 КОНТАКТЫ:
• Имя: {name}
• Телефон: {phone}
• Email: {email}

Подтвердите бронирование, пожалуйста!
```

ОШИБКА = ПОТЕРЯ ПРОДАЖ!**

## 📋 ПОДРОБНАЯ ИНСТРУКЦИЯ ПО ПЕРЕНОСУ ТУРОВ:

### 🎯 ПРИНЦИП: "ОДИН ТУР = ОДИН КОМПЛЕКТ ФАЙЛОВ"

#### 📋 ПРОВЕРЕННЫЙ АЛГОРИТМ ПЕРЕНОСА:

**ШАГ 1: АНАЛИЗ ИСХОДНОГО ТУРА**
```bash
# Открыть WordPress тур на phuketgo.aaddaa.com
# Скопировать: название, описание, цены, фото
# Определить теги: острова/сухопутные, длительность, тип
```

**ШАГ 2: СОЗДАНИЕ КОМПАКТНОГО ФАЙЛА**
```typescript
// tour-slug.tsx - ВСЁ В ОДНОМ ФАЙЛЕ
export const tourData: TourData = {
  id: 'tour-slug',
  title: 'Название тура',
  description: 'Полное описание...',
  
  // ОБЯЗАТЕЛЬНЫЕ ПОЛЯ
  priceAdult: 4900,
  priceChild: 3900,
  currency: '฿',
  duration: '2 дня / 1 ночь',
  groupSize: 'до 15 человек',
  rating: 4.8,
  
  // ЦЕНТРАЛИЗОВАННЫЕ ТЕГИ
  tags: ['острова', 'снорклинг', 'пляж'],
  
  // КОНТЕНТ
  gallery: ['/assets/tours/tour-slug/hero.jpg'],
  itinerary: [...],
  included: [...],
  notIncluded: [...],
  importantInfo: [...]
};

// КОМПОНЕНТ В ТОМ ЖЕ ФАЙЛЕ
export const TourPage: React.FC = () => {
  return (
    <div>
      {/* ОБЯЗАТЕЛЬНЫЕ ЭЛЕМЕНТЫ: */}
      {/* 1. Hero с заголовком и кнопкой */}
      {/* 2. Описание тура */}
      {/* 3. КАРТОЧКА БРОНИРОВАНИЯ с ценами */}
      {/* 4. Программа по дням */}
      {/* 5. Что включено/не включено */}
      {/* 6. Централизованные теги */}
    </div>
  );
};
```

**ШАГ 3: АВТОМАТИЧЕСКАЯ РЕГИСТРАЦИЯ**
```typescript
// В toursRegistry.ts автоматически добавится
{
  id: tourData.id,
  title: tourData.title,
  data: () => Promise.resolve(tourData)
}
```

**ШАГ 4: РОУТИНГ**
```typescript
// В App.tsx добавить
<Route path="/tour-slug" element={<TourPage />} />
```

### 🚨 КРИТИЧЕСКИЙ ЧЕКЛИСТ ПОСЛЕ ДЕПЛОЯ:
1. ✅ **Карточка тура** отображается на главной
2. ✅ **Страница тура** работает с описанием  
3. ✅ **Карточка бронирования** с ценами
4. ✅ **Кнопка "Забронировать"** работает
5. ✅ **Теги кликабельные** и ведут к фильтрации
6. ✅ **Автоматическое меню** включает тур

### ❌ ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ - НЕ ГОВОРИТЬ "ГОТОВО"!

## ⚠️ ОБЯЗАТЕЛЬНЫЙ АЛГОРИТМ ДЛЯ КАЖДОГО АГЕНТА:
1. ✅ **ПРОЧИТАТЬ ВЕСЬ ЭТОТ ФАЙЛ** от начала до конца
2. ✅ **ПОНЯТЬ АРХИТЕКТУРУ** минималистичной системы  
3. ✅ **ИЗУЧИТЬ ЗАЩИЩЕННЫЕ ФАЙЛЫ** (список ниже)
4. ✅ **СПРОСИТЬ РАЗРЕШЕНИЯ** перед любыми изменениями
5. ✅ **СЛЕДОВАТЬ ЦЕНТРАЛИЗОВАННОЙ СИСТЕМЕ** без исключений
6. ✅ **АВТОМАТИЧЕСКИ ДЕПЛОИТЬ** после важных изменений
4. ✅ **СПРОСИТЬ РАЗРЕШЕНИЯ** перед любыми изменениями
5. ✅ **СЛЕДОВАТЬ ЦЕНТРАЛИЗОВАННОЙ СИСТЕМЕ** без исключений

### 🎯 ГЛАВНЫЕ ПРИНЦИПЫ ПРОЕКТА ПОСЛЕ ОЧИСТКИ:
- **ФОКУС ТОЛЬКО НА ПХУКЕТЕ**: больше никаких других стран/городов
- **ЗАПРЕТ STOCK ФОТО**: только локальные изображения из phi-phi-2days
- **МИНИМАЛИСТИЧНАЯ АРХИТЕКТУРА**: удалены все лишние разделы
- **ЦЕНТРАЛИЗАЦИЯ ТУРОВ**: один источник данных для всех туров
- **ЗАЩИТА РАБОЧЕГО КОДА**: что работает - НЕ ТРОГАТЬ!

### 🛑 КАТЕГОРИЧЕСКИЕ ЗАПРЕТЫ:

#### ❌ СТРОГО ЗАПРЕЩЕНО:
1. **ИСПОЛЬЗОВАТЬ UNSPLASH/СТОКОВЫЕ ФОТО** - ТОЛЬКО локальные изображения!
2. **ДОБАВЛЯТЬ ДРУГИЕ НАПРАВЛЕНИЯ** - ТОЛЬКО Пхукет и окрестности!
3. **ВОЗВРАЩАТЬ УДАЛЕННЫЕ РАЗДЕЛЫ** - пляжи, WhatToVisit, Destinations УДАЛЕНЫ НАВСЕГДА!
4. **СОЗДАВАТЬ НОВЫЕ УНИВЕРСАЛЬНЫЕ СИСТЕМЫ** - работай с тем что есть
5. **ПЕРЕПИСЫВАТЬ РАБОЧИЙ КОД** - исправляй только конкретные баги
6. **ДОБАВЛЯТЬ ЗАВИСИМОСТИ** без крайней необходимости

#### 🚫 ЗАБАНЕННЫЕ ИСТОЧНИКИ ИЗОБРАЖЕНИЙ:
- ❌ https://images.unsplash.com/*
- ❌ https://pixabay.com/*  
- ❌ https://pexels.com/*
- ❌ Любые внешние стоковые ресурсы

#### ✅ РАЗРЕШЕННЫЕ ИСТОЧНИКИ ИЗОБРАЖЕНИЙ:
- ✅ `/src/assets/phi-phi-2days/*` - основная коллекция
- ✅ `/src/assets/logo.jpg` - логотип
- ✅ `/src/assets/maya-bay-sunrise.jpg` - фон героя

### 🛑 КАТЕГОРИЧЕСКИЕ ЗАПРЕТЫ:

#### ❌ НЕЛЬЗЯ ДЕЛАТЬ БЕЗ ПРЯМОГО РАЗРЕШЕНИЯ:
1. **УДАЛЯТЬ СУЩЕСТВУЮЩИЕ ФАЙЛЫ** - особенно страницы и компоненты
2. **ПЕРЕПИСЫВАТЬ РАБОЧИЙ### 🚨 ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ

### 🛑 ЕСЛИ НЕ УВЕРЕН - СПРОСИ!
**Лучше спросить 10 раз, чем сломать рабочий сайт**

### 📞 АЛГОРИТМ ПРИ СОМНЕНИЯХ:
1. "Правильно ли я понял задание?"
2. "Можно ли мне изменить файл X?"  
3. "Нужно ли сохранить функционал Y?"
4. "Нужен ли автоматический деплой для этого изменения?"

### 🔒 РАБОТА С ЗАЩИЩЕННЫМИ ФАЙЛАМИ:
**ОБЯЗАТЕЛЬНО:** 
- Спросить разрешения перед любым изменением
- Обсудить что именно нужно изменить
- Получить одобрение каждого шага
- НЕ ДЕЛАТЬ самостоятельных "улучшений"

### 🎯 ДЕВИЗ: 
**"ТОЧНО ПО ЗАДАНИЮ - НИ БОЛЬШЕ, НИ МЕНЬШЕ!"** работает, не трогай!
3. **УПРОЩАТЬ ФУНКЦИОНАЛ** - калькуляторы, формы, дизайн
4. **СОЗДАВАТЬ "УНИВЕРСАЛЬНЫЕ СИСТЕМЫ"** - работай с тем что есть
5. **МЕНЯТЬ АРХИТЕКТУРУ** без четкого задания
6. **ПРИДУМЫВАТЬ "УЛУЧШЕНИЯ"** от себя
7. **ИГНОРИРОВАТЬ ЗАЩИЩЕННЫЕ ФАЙЛЫ**

#### 🔒 ЗАЩИЩЕННЫЕ ФАЙЛЫ (ТОЛЬКО ВМЕСТЕ С ПОЛЬЗОВАТЕЛЕМ):
- `src/pages/PhiPhi2Days1Night.tsx` - единственная страница тура
- `src/pages/BookingPage.tsx` - форма бронирования  
- `src/data/phiPhiTour.ts` - данные тура
- `src/assets/phi-phi-2days/` - ВСЕ ФОТО (единственный источник изображений)
- `src/components/Tours.tsx` - карточки туров
- `src/components/UniversalBookingModal.tsx` - единая форма бронирования (УНИВЕРСАЛЬНАЯ!)
- `src/pages/AdminPanel.tsx` - админ-панель для управления заказами (CRM СИСТЕМА!)
- `src/App.tsx` - роуты приложения
- `src/components/Header.tsx` - навигация (очищена от удаленных разделов)
- `src/pages/Index.tsx` - главная страница (очищена от Destinations)
- `AI_PROMPT_INSTRUCTIONS.md` - ДАННЫЙ ФАЙЛ (описание проекта)

**ПРАВИЛО:** Эти файлы можно изменять ТОЛЬКО по прямой просьбе пользователя и ВМЕСТЕ с ним, обсуждая каждое изменение!

### ✅ ПРАВИЛА РАБОТЫ:

#### 📋 ТОЧНОЕ ВЫПОЛНЕНИЕ ЗАДАНИЙ:
1. **ЧИТАЙ ЗАДАНИЕ 3 РАЗА** перед началом работы
2. **ДЕЛАЙ ТОЛЬКО ТО ЧТО ПРОСЯТ** - ни больше, ни меньше
3. **СПРАШИВАЙ ПЕРЕД БОЛЬШИМИ ИЗМЕНЕНИЯМИ**
4. **СОХРАНЯЙ СУЩЕСТВУЮЩИЙ ДИЗАЙН** и функционал
5. **ИСПРАВЛЯЙ ТОЛЬКО КОНКРЕТНЫЕ БАГИ**

#### 🔧 АЛГОРИТМ РАБОТЫ:
```
1. ПРОЧИТАТЬ задание полностью
2. ПОНЯТЬ что именно нужно исправить
3. СПРОСИТЬ если что-то неясно
4. ИСПРАВИТЬ только указанную проблему
5. ПРОТЕСТИРОВАТЬ что не сломалось
6. АВТОМАТИЧЕСКИ СДЕЛАТЬ ДЕПЛОЙ (для важных изменений)
```

#### 🚀 АВТОМАТИЧЕСКИЙ ДЕПЛОЙ:
**ОБЯЗАТЕЛЬНО:** После каждой важной правки автоматически:
1. ✅ **`npm run build`** - проверить что сборка успешна
2. ✅ **`git add .`** - добавить все изменения
3. ✅ **`git commit -m "..."`** - закоммитить с осмысленным сообщением
4. ✅ **`git push`** - задеплоить на GitHub Pages
5. ✅ **ПРОВЕРИТЬ НА ПРОДАКШН САЙТЕ** - открыть https://johnda7.github.io/island-travel-echo-clone/ и убедиться что изменения есть
6. ✅ **Сообщить "ГОТОВО"** - только после визуальной проверки на продакшн сайте

**ПРАВИЛО:** Когда AI говорит "ГОТОВО" - значит сайт уже обновлен И ПРОВЕРЕН!

**ВАЖНЫЕ ИЗМЕНЕНИЯ** (требуют автодеплоя):
- Исправления багов в функционале
- Изменения форм, калькуляторов, модалок
- Обновления админ-панели
- Изменения логики бронирования
- Любые правки по запросу пользователя

**НЕ ТРЕБУЮТ ДЕПЛОЯ:**
- Ответы на вопросы
- Чтение/анализ кода
- Поиск информации

#### 🎯 ТИПЫ РАЗРЕШЕННЫХ ДЕЙСТВИЙ:
- ✅ **Исправление багов в существующих компонентах** - ТОЛЬКО по запросу пользователя
- ✅ **Улучшения BookingPage.tsx/PhiPhi2Days1Night.tsx** - ТОЛЬКО по запросу пользователя  
- ✅ **Деплой и тестирование** после изменений
- ✅ **Использование локальных изображений** из phi-phi-2days папки
- ❌ **СОЗДАНИЕ НОВЫХ РАЗДЕЛОВ** - сайт максимально упрощен
- ❌ **ДОБАВЛЕНИЕ ВНЕШНИХ ФОТО** - только локальные изображения
- ❌ **ВОЗВРАТ УДАЛЕННОГО КОНТЕНТА** - пляжи, достопримечательности, направления удалены навсегда

---

## 🚨 ТИПИЧНЫЕ ОШИБКИ (НЕ ПОВТОРЯТЬ!)

### ❌ ОШИБКА: "Создам универсальный компонент"
**ПРАВИЛЬНО:** Исправь конкретный баг в существующем коде

### ❌ ОШИБКА: "Упростим калькулятор"  
**ПРАВИЛЬНО:** Исправь только то что не работает

### ❌ ОШИБКА: "Удалим дублирующие файлы"
**ПРАВИЛЬНО:** Спроси разрешения перед удалением

### ❌ ОШИБКА: "Сделаем как лучше"
**ПРАВИЛЬНО:** Делай как просят, а не как считаешь лучше

### ❌ ОШИБКА: Игнорирование контекста
**ПРАВИЛЬНО:** Читай ВСЕ сообщения пользователя внимательно

---

## 🎯 ПЕРВОЕ ЗАДАНИЕ - ЦЕНТРАЛИЗАЦИЯ СИСТЕМЫ БРОНИРОВАНИЯ

### 🚨 ГЛАВНАЯ ПРОБЛЕМА:
Сейчас есть **3 разные системы бронирования** вместо одной:
1. **В популярных турах**: `Tours.tsx` → Link to="/book/phi-phi-2days" → `BookingPage`
2. **На странице тура**: `PhiPhi2Days1Night.tsx` → Модальное окно
3. **Отдельная страница**: `BookingPage.tsx` → Полная страница

### ✅ РЕШЕНИЕ - Создать универсальный `BookingModal`

#### **ШАГ 1: Создать универсальный компонент**
```typescript
// src/components/BookingModal.tsx
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourData: TourData; // любой тур
}
```

#### **ШАГ 2: Создать типизацию**
```typescript  
// src/types/Tour.ts
interface TourData {
  id: string;
  title: string;
  priceAdult: number;
  priceChild: number;
  currency: string;
  // ... остальные поля
}
```

#### **ШАГ 3: Единое использование везде**
```typescript
// Во всех компонентах одинаково:
<BookingModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  tourData={tourData}
/>
```

### 🎨 ДИЗАЙН:
- Брать лучший дизайн из популярных туров
- Убрать "можно отменить в течение 24 часов"
- Модальное окно для всех туров
- Telegram интеграция единая

### 🎯 РЕЗУЛЬТАТ:
- **WordPress принцип**: один компонент для всех туров
- **Легкое масштабирование**: новый тур = добавил данные, все работает
- **Единый UX**: пользователь всегда видит одинаковую форму
- **Простота поддержки**: исправления в одном месте

---

## � АРХИТЕКТУРА САЙТА (НЕ МЕНЯТЬ!)

### 🏗️ ТЕКУЩАЯ СТРУКТУРА:
```
ГЛАВНАЯ СТРАНИЦА (/)
├── Секция героя с кнопкой "Забронировать тур"
├── Популярные туры (кнопки "Забронировать")
└── Footer

СТРАНИЦА ТУРА (/phi-phi-2days)  
├── Галерея фотографий
├── Описание тура
├── Кнопка "Забронировать сейчас" → модальное окно
└── Кнопка "Забронировать" внизу → модальное окно

СТРАНИЦА БРОНИРОВАНИЯ (/book/phi-phi-2days)
├── Форма с выбором даты
├── Калькулятор гостей (взрослые/дети/младенцы)
├── Поля контактов
└── Кнопка "Забронировать тур" → Telegram
```

### 🔄 ЛОГИКА БРОНИРОВАНИЯ:
1. **Пользователь нажимает "Забронировать"** (где угодно)
2. **Переходит на `/book/phi-phi-2days`** (централизованно)
3. **Заполняет форму** (дата, гости, контакты)
4. **Нажимает "Забронировать тур"** 
5. **Открывается Telegram** с готовым сообщением в @Phuketga

---

## 🎯 CMS-ПРИНЦИПЫ (WordPress подход)

### 📁 ОДИН ТУР = ОДИН НАБОР ФАЙЛОВ:
```
src/data/tourName.ts         ← Все данные тура
src/pages/TourName.tsx       ← Страница тура  
src/assets/tour-name/        ← Фото тура
/book/tour-name              ← Страница бронирования
```

### 🔄 ДОБАВЛЕНИЕ НОВОГО ТУРА:
1. Создать файл данных по образцу `phiPhiTour.ts`
2. Создать страницу по образцу `PhiPhi2Days1Night.tsx`
3. Добавить фото в папку
4. Добавить роуты в `App.tsx`
5. Тур автоматически появится на сайте

### ✅ УНИВЕРСАЛЬНЫЕ СИСТЕМЫ (РАБОТАЮТ ДЛЯ ВСЕХ ТУРОВ):
- **UniversalBookingModal** - автоматически адаптируется к любому туру
- **AdminPanel** - показывает заказы всех туров с правильной нумерацией
- **localStorage** - сохраняет заказы всех туров в единой системе
- **Калькулятор цен** - работает с любыми ценами (взрослые/дети/младенцы)

---

## �🚨 КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА:

### ❌ ЗАПРЕЩЕНО ДЕЛАТЬ:
1. **НЕ ТРОГАТЬ** файл `src/pages/PhiPhi2Days1Night.tsx` - он ЗАЩИЩЕН
2. **НЕ МЕНЯТЬ** дизайн без явного разрешения
3. **НЕ ИЗОБРЕТАТЬ** новые данные - использовать только существующие
4. **НЕ СОЗДАВАТЬ** универсальные системы без согласования
5. **НЕ МЕНЯТЬ** пути к фотографиям из папки `src/assets/phi-phi-2days/`

### ✅ ОБЯЗАТЕЛЬНО ДЕЛАТЬ:
1. **СОХРАНЯТЬ** существующий дизайн и структуру
2. **ИСПОЛЬЗОВАТЬ** данные из `src/data/phiPhiTour.ts`
3. **ОПТИМИЗИРОВАТЬ** для мобильных устройств (90% трафика)
4. **ТЕСТИРОВАТЬ** все изменения локально перед деплоем
5. **ЦЕНТРИРОВАТЬ** все изображения (`object-center`)

---

## � ОБЯЗАТЕЛЬНЫЕ ДЕЙСТВИЯ

### 🔍 ПЕРЕД НАЧАЛОМ РАБОТЫ:
```bash
# 1. Прочитать задание пользователя 3 раза
echo "Что именно нужно сделать?"

# 2. Проверить текущее состояние
npm run dev
"$BROWSER" http://localhost:8080

# 3. Спросить если что-то неясно
echo "Вопрос пользователю: ..."
```

### ✅ ПОСЛЕ КАЖДОГО ИЗМЕНЕНИЯ:
```bash
# 1. Проверить что работает
npm run build

# 2. Протестировать локально  
npm run dev
"$BROWSER" http://localhost:8080

# 3. Сделать деплой
git add .
git commit -m "🔧 Краткое описание исправления"
git push

# 4. ОБЯЗАТЕЛЬНО ПРОВЕРИТЬ НА ПРОДАКШН САЙТЕ
"$BROWSER" https://johnda7.github.io/island-travel-echo-clone/

# 5. Сообщить пользователю ТОЛЬКО после проверки
echo "✅ Исправлено: [что именно]"
echo "🔗 Проверено на: https://johnda7.github.io/island-travel-echo-clone/"
```

---

## 🎯 TELEGRAM ИНТЕГРАЦИЯ

### 🤖 НАСТРОЙКИ БОТА:
- **BOT TOKEN:** `8445717266:AAHEDA4SJPUL48gpV-Q9qc-V98GSuyPFn08`
- **CHAT ID:** `@Phuketga`
- **FALLBACK:** Прямая ссылка в Telegram при ошибке API

### 📋 ФОРМАТ СООБЩЕНИЯ:
```
🏝️ НОВОЕ БРОНИРОВАНИЕ #PH123456

📋 ТУР: Название тура
📅 Дата: дд.мм.гггг
👥 ГОСТИ: X взрослых + Y детей
💰 ИТОГО: XXXX฿
👤 КОНТАКТЫ: Имя, телефон, email
⏰ Заявка от: дата время
```

---

## 🚨 ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ

### 🛑 ЕСЛИ НЕ УВЕРЕН - СПРОСИ!
**Лучше спросить 10 раз, чем сломать рабочий сайт**

### � АЛГОРИТМ ПРИ СОМНЕНИЯХ:
1. "Правильно ли я понял задание?"
2. "Можно ли мне изменить файл X?"  
3. "Нужно ли сохранить функционал Y?"
4. "Делать ли деплой после изменений?"

### � ДЕВИЗ: 
**"ТОЧНО ПО ЗАДАНИЮ - НИ БОЛЬШЕ, НИ МЕНЬШЕ!"**

---

## 📋 ЧЕКЛИСТ ПЕРЕД ДЕЙСТВИЕМ:

- [ ] Прочитал задание 3 раза
- [ ] Понял что именно нужно изменить  
- [ ] Проверил что файлы не защищены
- [ ] Не планирую удалять рабочий код
- [ ] Не планирую "улучшать" без просьбы
- [ ] Готов сделать деплой после изменений
- [ ] Буду тестировать результат

**ТОЛЬКО ПОСЛЕ ВСЕХ ГАЛОЧЕК - НАЧИНАТЬ РАБОТУ!** ✅
- Кнопки: закругленные (`rounded-lg`), крупные
- Карточки: тень (`shadow-lg`), белый фон
- Формы: padding 16px минимум (`p-4`)
- Анимации: `active:scale-95` для кнопок

## 🚀 ДЕПЛОЙ ПРОЦЕСС:

### Команды:
```bash
npm run build      # проверить сборку
git add .
git commit -m "описание изменений"
git push           # автоматический деплой через GitHub Actions
```

### Проверка:
- Локально: `npm run dev`
- Продакшн: `https://johnda7.github.io/island-travel-echo-clone/`

## 💰 ЦЕНООБРАЗОВАНИЕ:

### Пхи-Пхи 2 дня/1 ночь:
- Взрослый: **4000฿**
- Ребенок (1-11): **3500฿**
- Младенец (0-12 мес): **Бесплатно**

## 🔧 ЧАСТЫЕ ЗАДАЧИ:

### Добавить новый тур:
1. Создать отдельный файл `src/pages/[TourName].tsx`
2. Скопировать структуру из `PhiPhi2Days1Night.tsx`
3. Изменить только данные (цены, названия, фото)
4. Добавить роут в `src/App.tsx`

### Исправить фотографии:
1. Проверить пути (должны быть относительные)
2. Добавить `object-center` класс
3. Использовать `object-fit: cover` для crop

### Обновить форму бронирования:
1. Редактировать `src/pages/BookingPage.tsx`
2. Сохранить Telegram интеграцию
3. Тестировать на мобильных размерах

## ⚠️ TROUBLESHOOTING:

### Если сломалась сборка:
1. Проверить импорты
2. Убедиться что все файлы существуют
3. Проверить синтаксис TypeScript

### Если не работает деплой:
1. Проверить GitHub Actions
2. Убедиться что branch `main`
3. Проверить настройки GitHub Pages

### Если пропали фотографии:
1. Проверить папку `public/assets`
2. Скопировать из `src/assets/phi-phi-2days`
3. Обновить пути в компонентах

### Если не работает Telegram:
1. Проверить токен бота
2. Убедиться что канал @Phuketga существует
3. Использовать fallback через прямую ссылку

## 🧪 ТЕСТИРОВАНИЕ:

### Страницы для тестирования:
- **Основная форма:** `/book/phi-phi`
- **Тест Telegram:** `/test-telegram`

### Консольные команды:
```javascript
// В консоли браузера
testTelegramBot()     // тест отправки сообщений
getChatId()           // получить ID чата
```

## 📞 КОНТАКТЫ:

---

## 🛡️ ЗАЩИЩЕННЫЕ ФАЙЛЫ И КОМПОНЕНТЫ

### 🔒 ФАЙЛЫ КОТОРЫЕ МОЖНО ИЗМЕНЯТЬ ТОЛЬКО ВМЕСТЕ С ПОЛЬЗОВАТЕЛЕМ:

#### 📄 КРИТИЧЕСКИ ВАЖНЫЕ СТРАНИЦЫ:
```
✅ ЭТАЛОНЫ (работают идеально):
- src/pages/PhiPhi2Days1Night.tsx  ← главный шаблон дизайна
- src/pages/BookingPage.tsx        ← форма бронирования
- src/data/phiPhiTour.ts          ← структура данных тура

🔒 ЗАЩИЩЕННЫЕ (только с разрешением):
- src/App.tsx                     ← роуты приложения
- src/components/Tours.tsx        ← карточки туров
- src/components/UniversalBookingModal.tsx ← единая форма бронирования
- src/pages/AdminPanel.tsx        ← админ-панель для заказов
- src/components/Header.tsx       ← навигация
- src/components/Footer.tsx       ← контакты

📁 ЗАЩИЩЕННЫЕ ДИРЕКТОРИИ:
- src/assets/phi-phi-2days/       ← эталонные фото (17 шт)
- src/components/ui/              ← UI библиотека
- public/                         ← публичные файлы
```

#### 🎯 АЛГОРИТМ РАБОТЫ С ЗАЩИЩЕННЫМИ ФАЙЛАМИ:
```
ОБЯЗАТЕЛЬНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ:
1. 🗣️ СПРОСИТЬ: "Можно ли мне изменить файл X?"
2. 📝 ОБЪЯСНИТЬ: что именно нужно изменить
3. ✅ ПОЛУЧИТЬ одобрение от пользователя
4. 🔧 ИЗМЕНИТЬ только то что обсуждали
5. ✅ ПОКАЗАТЬ результат пользователю
6. 🚀 ДЕПЛОЙ только после одобрения
```

---

## 🎯 МАНДАТНАЯ СИСТЕМА РАЗРЕШЕНИЙ

### 📋 КЛАССИФИКАЦИЯ ДЕЙСТВИЙ ПО УРОВНЯМ ДОСТУПА:

#### 🟢 РАЗРЕШЕНО ВСЕГДА (Зеленый уровень):
- Чтение любых файлов для анализа
- Поиск по кодовой базе  
- Объяснение как работает код
- Деплой готовых изменений
- Тестирование функционала

#### 🟡 ТРЕБУЕТ ОБСУЖДЕНИЯ (Желтый уровень):
- Создание новых файлов
- Добавление новых зависимостей
- Изменение конфигурации (tsconfig, vite)
- Обновление стилей (CSS/Tailwind)
- Создание новых компонентов

#### 🔴 ЗАПРЕЩЕНО БЕЗ РАЗРЕШЕНИЯ (Красный уровень):
- Удаление существующих файлов
- Изменение защищенных компонентов
- Переписывание рабочего функционала
- Изменение архитектуры без мандата
- "Упрощение" существующих решений

#### ⚫ СТРОГО ЗАПРЕЩЕНО (Черный уровень):
- Самовольные "улучшения"
- Удаление рабочих функций
- Игнорирование требований пользователя
- Создание "универсальных систем" без запроса

---

## 🎯 WORDPRESS-ПРИНЦИПЫ РЕАЛИЗАЦИИ

### 🏗️ "ДОБАВИЛ В ОДНОМ МЕСТЕ = ПОЯВИЛОСЬ ВЕЗДЕ"

#### 🎯 ЦЕНТРАЛЬНАЯ СИСТЕМА УПРАВЛЕНИЯ:
```typescript
// src/data/toursRegistry.ts - СЕРДЦЕ ВСЕЙ СИСТЕМЫ!
export const TOURS_REGISTRY = [
  {
    id: 'phi-phi-2days',
    name: 'Пхи-Пхи 2 дня/1 ночь',
    category: 'islands',
    tags: ['море', 'острова', 'снорклинг', 'пляж'],
    isPopular: true,    // ← автоматически в "Популярные"
    isActive: true,     // ← автоматически в поиске
    isFeatured: true,   // ← автоматически на главной
    priority: 1,        // ← порядок в меню
    data: () => import('./phiPhiTour').then(m => m.phiPhiTourData)
  },
  // ➕ ДОБАВЛЯЕШЬ СЮДА - ПОЯВЛЯЕТСЯ ВЕЗДЕ АВТОМАТИЧЕСКИ!
];

// 🔄 АВТОМАТИЧЕСКИЕ КОЛЛЕКЦИИ:
export const getPopularTours = () => TOURS_REGISTRY.filter(t => t.isPopular && t.isActive);
export const getFeaturedTours = () => TOURS_REGISTRY.filter(t => t.isFeatured && t.isActive);
export const getIslandTours = () => TOURS_REGISTRY.filter(t => t.category === 'islands');
export const getMainlandTours = () => TOURS_REGISTRY.filter(t => t.category === 'mainland');
export const getActiveTours = () => TOURS_REGISTRY.filter(t => t.isActive);
```

#### 🎨 ЕДИНЫЕ ШАБЛОНЫ ДЛЯ ВСЕГО:
```typescript
// src/templates/TourTemplate.tsx - ОДИН ШАБЛОН ДЛЯ ВСЕХ ТУРОВ!
interface TourTemplateProps {
  tourId: string; // Получает только ID
}

export const TourTemplate = ({ tourId }: TourTemplateProps) => {
  const { tourData, isLoading } = useTourData(tourId);
  
  if (isLoading) return <TourSkeleton />;
  
  return (
    <>
      <Helmet>
        <title>{tourData?.metaTitle || tourData?.title}</title>
        <meta name="description" content={tourData?.metaDescription} />
      </Helmet>
      
      <Header />
      <BreadcrumbsComponent tourData={tourData} />
      <TourHeroComponent tourData={tourData} />
      <ImageGalleryComponent images={tourData?.images} />
      <TourDetailsComponent tourData={tourData} />
      <ItineraryComponent schedule={tourData?.itinerary} />
      <PricingComponent tourData={tourData} />
      <IncludedExcludedComponent 
        included={tourData?.included} 
        excluded={tourData?.excluded} 
      />
      <BookingSection tourId={tourId} />
      <RelatedToursComponent category={tourData?.category} />
      <Footer />
    </>
  );
};

// 🎯 ВСЕ ТУРЫ ИСПОЛЬЗУЮТ ЭТОТ ШАБЛОН:
export const PhiPhi2Days = () => <TourTemplate tourId="phi-phi-2days" />;
export const JamesBond = () => <TourTemplate tourId="james-bond" />;
export const MayaBaySunrise = () => <TourTemplate tourId="maya-bay-sunrise" />;
```

#### 🧭 АВТОГЕНЕРАЦИЯ НАВИГАЦИИ:
```typescript
// src/components/Navigation.tsx - МЕНЮ СОЗДАЕТСЯ АВТОМАТИЧЕСКИ!
export const Navigation = () => {
  const categories = [...new Set(ACTIVE_TOURS.map(t => t.category))];
  
  return (
    <nav className="main-navigation">
      <Link to="/">🏝️ Главная</Link>
      
      {/* 🔄 АВТОГЕНЕРАЦИЯ МЕНЮ ИЗ РЕЕСТРА: */}
      <div className="tours-dropdown">
        <span>🚤 Туры</span>
        <div className="dropdown-menu">
          {categories.map(category => (
            <div key={category} className="category-section">
              <h4>{getCategoryName(category)}</h4>
              {TOURS_REGISTRY
                .filter(t => t.category === category && t.isActive)
                .sort((a, b) => a.priority - b.priority)
                .map(tour => (
                  <Link key={tour.id} to={`/${tour.id}`}>
                    {tour.name}
                  </Link>
                ))
              }
            </div>
          ))}
        </div>
      </div>
      
      <Link to="/contact">📞 Контакты</Link>
    </nav>
  );
};
```

---

## 🎯 ОБЯЗАТЕЛЬНАЯ ПРОЦЕДУРА ДЛЯ КАЖДОГО АГЕНТА

### 📋 МАНДАТНЫЙ ЧЕКЛИСТ ПЕРЕД РАБОТОЙ:

#### ☑️ ОБЯЗАТЕЛЬНЫЕ ШАГИ:
```
□ Прочитал AI_PROMPT_INSTRUCTIONS.md полностью
□ Понял принципы WordPress-архитектуры  
□ Изучил список защищенных файлов
□ Понял задание пользователя правильно
□ Спросил разрешения на изменения (если нужно)
□ Готов работать по централизованной системе
□ НЕ буду удалять/упрощать рабочий код
□ НЕ буду создавать "улучшения" от себя
```

#### 🗣️ ОБЯЗАТЕЛЬНЫЕ ФРАЗЫ ПЕРЕД РАБОТОЙ:
"Я прочитал AI_PROMPT_INSTRUCTIONS.md и понимаю принципы проекта"
"Могу ли я изменить файл X для выполнения задачи Y?"
"Правильно ли я понял, что нужно делать: [краткое описание]?"

#### 🚫 ЗАПРЕЩЕННЫЕ ФРАЗЫ:
❌ "Создам универсальный компонент"
❌ "Упростим эту систему"  
❌ "Перепишем для лучшей архитектуры"
❌ "Удалю ненужные файлы"
❌ "Оптимизирую код"

---

## 🎯 ФИНАЛЬНЫЕ ПРАВИЛА

### 📜 МАНДАТ АГЕНТА:
1. **ЧИТАТЬ ПРОМТ ОБЯЗАТЕЛЬНО** - каждый раз перед работой
2. **ТОЧНО ВЫПОЛНЯТЬ ЗАДАНИЯ** - без самодеятельности
3. **СПРАШИВАТЬ РАЗРЕШЕНИЯ** - для всех изменений файлов
4. **СОХРАНЯТЬ РАБОЧИЙ КОД** - что работает, не трогать
5. **СЛЕДОВАТЬ ЦЕНТРАЛИЗАЦИИ** - WordPress-принципы

### 🎯 ГЛАВНАЯ МАНТРА:
**"ДОБАВИЛ В ОДНОМ МЕСТЕ = ПОЯВИЛОСЬ ВЕЗДЕ"**
**"ЧТО РАБОТАЕТ - НЕ ТРОГАТЬ!"**
**"ТОЧНО ПО ЗАДАНИЮ - НИ БОЛЬШЕ, НИ МЕНЬШЕ!"**

---

## 📞 КОНТАКТЫ И ПОМОЩЬ

### При проблемах:
- Пользователь: владелец репозитория
- Telegram: @Phuketga
- Сайт: https://johnda7.github.io/island-travel-echo-clone/

## 🔥 ГОРЯЧИЕ ФИШКИ:

### Многошаговая форма:
- Шаг 1: Дата + гости
- Шаг 2: Контакты
- Прогресс бар
- Валидация каждого шага

### Мобильная оптимизация:
- Sticky header с навигацией
- Анимированные счетчики +/-
- Цветовое кодирование типов гостей
- Максимальная ширина 28rem (448px)

### Telegram интеграция:
- Прямая отправка через Bot API
- Fallback на прямой чат
- Структурированные сообщения
- Уникальные ID бронирований

---

## 🚀 РЕАЛИЗОВАННАЯ УНИВЕРСАЛЬНАЯ СИСТЕМА БРОНИРОВАНИЯ (2025)

### ✅ СТАТУС: ПОЛНОСТЬЮ ЗАВЕРШЕНО
**Дата обновления:** 18 сентября 2025

### 🎯 ТЕКУЩАЯ АРХИТЕКТУРА БРОНИРОВАНИЯ:

#### 1️⃣ ЕДИНАЯ МОДАЛЬНАЯ СИСТЕМА:
- **`UniversalBookingModal.tsx`** - универсальная форма для ВСЕХ туров
- **Одноэтапный процесс** - вся информация в одном окне
- **Автоматическая совместимость** - работает с любыми новыми турами
- **Упрощенная форма** - только необходимые поля

#### 2️⃣ ФУНКЦИОНАЛЬНОСТЬ:
- ✅ **Дата выбора** - календарь с блокировкой прошедших дат
- ✅ **Калькулятор гостей** - взрослые + дети (исправлен)
- ✅ **Контактные данные** - имя, телефон, email
- ✅ **Уведомления** - отправка на anotrhers@gmail.com
- ✅ **Telegram интеграция** - прямая ссылка в @Phuketga

#### 3️⃣ АДМИНИСТРАТИВНАЯ ПАНЕЛЬ:
- **`AdminPanel.tsx`** - полноценная CRM система
- **Доступ** - скрытая ссылка "•" в Footer
- **Функции** - просмотр заказов, статистика, управление статусами
- **Хранение** - localStorage с номерами заказов #1, #2, #3
- **Защита** - файл включен в protected files list

#### 4️⃣ ИСПРАВЛЕННЫЕ ПРОБЛЕМЫ:
- ❌ **Калькулятор не считал** → ✅ Исправлен: правильно суммирует взрослых + детей
- ❌ **Двухэтапная система** → ✅ Заменена на одноэтапную модалку
- ❌ **Лишние поля формы** → ✅ Убраны: младенцы, отель, особые пожелания
- ❌ **Незащищенная админка** → ✅ Добавлена в protected files

---

## 🏗️ WORDPRESS-ПОДОБНАЯ АРХИТЕКТУРА ТУРОВ (2025)

### 🎯 ПРИНЦИПЫ АРХИТЕКТУРЫ:

#### 📋 ЦЕНТРАЛЬНАЯ СИСТЕМА УПРАВЛЕНИЯ КОНТЕНТОМ:
- **`toursRegistry.ts`** - единый реестр всех туров (как WordPress posts)
- **`useTours.ts`** - централизованный хук для работы с турами
- **Принцип:** "Добавил в реестр - появилось везде автоматически"

#### 🏷️ СИСТЕМА КАТЕГОРИЙ И ТЕГОВ:
```typescript
categories: 'islands' | 'mainland' | 'adventure' | 'cultural'
tags: ['море', 'морские', 'острова', 'снорклинг', 'пляж', '2 дня', 'семейный']
```

#### 🔍 АВТОМАТИЧЕСКИЙ ПОИСК И ФИЛЬТРАЦИЯ:
- **По названию тура**
- **По описанию** 
- **По тегам**
- **По категориям**
- **Умная типизация** - "пхи-пхи" находит "Пхи-Пхи острова"

#### ⚡ ЛЕНИВАЯ ЗАГРУЗКА:
- Данные туров загружаются по требованию
- Кэширование в React state
- Graceful fallback при ошибках

### 🎯 КАК ДОБАВИТЬ НОВЫЙ ТУР (ИНСТРУКЦИЯ):

```typescript
// 1. Добавить в TOURS_REGISTRY:
{
  id: 'james-bond',
  name: 'Остров Джеймса Бонда',
  category: 'islands',
  tags: ['море', 'морские', 'острова', 'каяки', 'пещеры'],
  isPopular: true,    // появится в популярных
  isActive: true,     // будет в поиске
  isFeatured: false,  // НЕ на главной
  priority: 2,        // порядок в меню
  data: () => import('./jamesBondTour').then(m => m.jamesBondTourData)
}

// 2. ВСЁ! Автоматически появится:
//   ✅ В поиске
//   ✅ В популярных турах
//   ✅ В категории "Морские экскурсии"
//   ✅ В фильтрах по тегам
```

### 📊 МАРКЕТИНГОВЫЕ ПРИНЦИПЫ:

#### 🎯 ПОЛЬЗОВАТЕЛЬСКИЙ ОПЫТ (UX):
- **Простота** - максимум 3 клика до бронирования
- **Скорость** - мгновенный поиск и фильтрация
- **Доверие** - отзывы, рейтинги, количество бронирований
- **Мобильность** - адаптивный дизайн для телефонов

#### 💰 КОНВЕРСИОННАЯ ОПТИМИЗАЦИЯ:
- **Социальное доказательство** - "12 бронирований сегодня"
- **Дефицит** - ограниченные места в группе
- **Ценность** - "от X ₽" вместо точных цен
- **CTA оптимизация** - яркие кнопки "Забронировать"

#### 🎨 ВИЗУАЛЬНАЯ ИЕРАРХИЯ:
- **Герой-секция** - крупное фото + главный CTA
- **Карточки туров** - единообразный дизайн
- **Бейджи категорий** - цветовое кодирование
- **Рейтинги** - звездочки + количество отзывов

#### 📈 SEO И АНАЛИТИКА:
- **Семантические URL** - `/phi-phi-2days`
- **Мета-теги** - автогенерация из данных туров
- **Структурированные данные** - Schema.org для туров
- **Отслеживание** - события бронирования в админке

### 🔧 ТЕХНИЧЕСКАЯ ДОКУМЕНТАЦИЯ:

#### Файловая структура:
```
src/
├── data/
│   ├── toursRegistry.ts          # 🎯 ЦЕНТРАЛЬНЫЙ РЕЕСТР
│   └── phiPhiTour.ts            # Данные конкретного тура
├── hooks/
│   └── useTours.ts              # 🎯 ЦЕНТРАЛЬНЫЙ ХУК
├── components/
│   ├── Tours.tsx                # Отображение туров
│   ├── UniversalBookingModal.tsx # Единая форма бронирования
│   └── Header.tsx               # Поиск + навигация
└── pages/
    ├── Tours.tsx                # Страница каталога
    ├── PhiPhi2Days1Night.tsx    # Детальная страница тура
    └── AdminPanel.tsx           # CRM система
```

#### Ключевые компоненты:
- `useTours()` - загрузка, фильтрация, поиск туров
- `TOURS_REGISTRY` - единый источник правды
- `UniversalBookingModal` - универсальная форма
- `AdminPanel` - CRM с localStorage

### 🎯 ПРЕИМУЩЕСТВА АРХИТЕКТУРЫ:

#### ✅ ДЛЯ РАЗРАБОТКИ:
- **DRY принцип** - код не дублируется
- **Type Safety** - TypeScript контроль
- **Масштабируемость** - легко добавлять туры
- **Тестируемость** - изолированные компоненты

#### ✅ ДЛЯ БИЗНЕСА:
- **Быстрое развитие** - новый тур за 5 минут
- **Консистентность** - единый UX везде
- **Аналитика** - встроенная CRM система
- **SEO готовность** - структурированные данные

#### ✅ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ:
- **Быстрый поиск** - мгновенные результаты
- **Удобная навигация** - интуитивные категории
- **Простое бронирование** - одна форма для всех
- **Мобильная версия** - адаптивный дизайн

---

## 🎓 МАРКЕТИНГОВАЯ ЭКСПЕРТИЗА В ТУРИЗМЕ

### 🏆 30-ЛЕТНИЙ ОПЫТ В ТУРИЗМЕ:

#### 🎯 ПСИХОЛОГИЯ ПОКУПАТЕЛЯ ТУРОВ:
- **Эмоциональность** - люди покупают мечты, а не услуги
- **Социальное доказательство** - отзывы важнее рекламы
- **Страх упустить** - ограниченные предложения работают
- **Простота выбора** - слишком много вариантов парализует

#### 💡 ПРОВЕРЕННЫЕ КОНВЕРСИОННЫЕ ТЕХНИКИ:
- **"От X рублей"** - снижает барьер входа
- **"12 бронирований сегодня"** - создает ажиотаж
- **"★ 4.8 (234 отзыва)"** - строит доверие
- **"До 25 человек"** - подчеркивает эксклюзивность

#### 🎨 ВИЗУАЛЬНЫЕ ПАТТЕРНЫ ТАИЛАНДА:
- **Цвета:** изумрудный + золотой + белый
- **Образы:** кристальная вода + белый песок + лонгтейлы
- **Эмоции:** свобода + приключения + релакс
- **Контраст:** современность + экзотика

### 🌴 СПЕЦИФИКА ПХУКЕТСКОГО РЫНКА:

#### 🎯 ПОРТРЕТ ЦЕЛЕВОЙ АУДИТОРИИ:
- **Возраст:** 25-45 лет
- **Доход:** средний и выше среднего  
- **Мотивация:** отдых + приключения + инстаграм
- **Поведение:** бронируют в последний момент

#### 📱 КАНАЛЫ ПРИВЛЕЧЕНИЯ:
- **Поиск Google** - "пхи пхи туры", "экскурсии пхукет"
- **Instagram** - красивые фото + stories
- **Telegram** - прямое общение + быстрое бронирование
- **Сарафанное радио** - отзывы и рекомендации

#### ⚡ КЛЮЧЕВЫЕ ФАКТОРЫ УСПЕХА:
- **Скорость ответа** - в течение 1 часа
- **Персонализация** - учет пожеланий клиента
- **Надежность** - четкое выполнение обещаний
- **Сервис** - превышение ожиданий

### 🎯 КОНКУРЕНТНЫЕ ПРЕИМУЩЕСТВА:

#### 🏆 УНИКАЛЬНОЕ ТОРГОВОЕ ПРЕДЛОЖЕНИЕ:
- **Локальная экспертиза** - знаем лучшие места
- **Персональный подход** - не массовые туры
- **Прямое общение** - без посредников
- **Русскоязычный сервис** - понимаем потребности

#### 💎 ПРЕМИУМ ПОЗИЦИОНИРОВАНИЕ:
- **Качество > Цена** - лучше дороже, но хорошо
- **Эксклюзивность** - небольшие группы
- **Фотогеничность** - инстаграм-готовые локации
- **Эмоции** - незабываемые впечатления

---

## 🧠 АРХИТЕКТУРНАЯ ФИЛОСОФИЯ

### 🏗️ ПРИНЦИПЫ ДИЗАЙНА СИСТЕМЫ:

#### 🎯 SINGLE SOURCE OF TRUTH:
- Один источник данных для всех туров
- Изменения распространяются автоматически
- Исключены противоречия в информации

#### 🔄 SEPARATION OF CONCERNS:
- Данные отделены от представления
- Бизнес-логика инкапсулирована в хуки
- UI компоненты переиспользуемые

#### ⚡ PROGRESSIVE ENHANCEMENT:
- Базовая функциональность работает всегда
- Дополнительные фичи не ломают основное
- Graceful degradation при ошибках

#### 🎨 COMPONENT COMPOSITION:

---

## 🚚 ПЕРЕНОС ТУРОВ С WORDPRESS САЙТА

### 📋 АЛГОРИТМ ПЕРЕНОСА (WordPress принципы):

#### ШАГ 1: Создать единый файл тура
```typescript
// tours/tour-slug.ts - ВСЁ В ОДНОМ ФАЙЛЕ
export const tourData = {
  // Мета-данные
  id: 'tour-slug',
  title: 'Название тура',
  categories: ['морские', 'острова'], // ← Галочки как в WordPress
  tags: ['пхи-пхи', 'снорклинг'],     // ← Автотеги
  
  // Контент
  description: '...',
  images: [...],
  itinerary: [...],
  
  // Автоматически появится:
  // - В меню (если новая категория)
  // - В поиске
  // - В рубриках
  // - На главной
};

// Страница компонент В ТОМ ЖЕ ФАЙЛЕ
export const TourPage = () => {
  return (
    <div>
      {/* ✅ ТОЛЬКО ЦЕНТРАЛИЗОВАННЫЕ теги */}
      <TourTags tags={tourData.tags} />
      
      {/* ❌ ЗАПРЕЩЕНО хардкод */}
      {/* <span>Пхи-Пхи</span> */}
    </div>
  );
};
```

#### ШАГ 2: Автоматическая регистрация
Добавить в TOURS_REGISTRY - тур автоматически появится везде.

#### ШАГ 3: Изображения в public
```
/public/assets/tours/
├── tour-slug/
│   ├── hero.jpg
│   ├── gallery-1.jpg
│   └── gallery-2.jpg
```

#### ШАГ 4: Проверка автоматизации
- ✅ Тур появился в меню
- ✅ Тур появился в поиске  
- ✅ Тур появился в категориях
- ✅ Теги кликабельные

### 🎯 РЕЗУЛЬТАТ: WordPress масштабируемость
- Добавил тур → автоматически появился везде
- Удалил файл → исчез везде без поломки
- 50+ туров без проблем управления
- Мелкие, переиспользуемые компоненты
- Четкие интерфейсы между частями
- Легкое тестирование и отладка

### 🎓 ЛУЧШИЕ ПРАКТИКИ WORDPRESS:

#### 📋 CONTENT MANAGEMENT:
- Структурированный контент (посты = туры)
- Таксономии (категории + теги)
- Кастомные поля (цены, длительность)
- Медиа-библиотека (фото туров)

#### 🔌 PLUGIN ARCHITECTURE:
- Модульная система компонентов
- Хуки для расширения функциональности
- Четкие API между модулями
- Возможность добавления новых фич

#### 🎨 THEME SYSTEM:
- Шаблоны для разных типов контента
- Переиспользуемые блоки
- Консистентный дизайн
- Адаптивная верстка

---

**ПОМНИ:** Это коммерческий проект. Каждое изменение влияет на продажи. Работай аккуратно и всегда тестируй!