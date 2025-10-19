# 📝 КРАТКАЯ СПРАВКА ПО ПРОЕКТУ (Обновлено: 20.10.2025)

## ✅ ТЕКУЩЕЕ СОСТОЯНИЕ

### 🎯 **ГЛАВНОЕ:**
- **11 активных туров** с единым TourPageTemplate
- **iOS 26 Design System** с emoji в меню  
- **Коллекции туров** - beginners, family, active, premium, multiday
- **Статические туры** имеют приоритет над CMS версиями

### 📁 **СТРУКТУРА:**
```
src/data/tours/
├── phi-phi-2days/           (index.ts + static.ts)
├── pearls-andaman-sea/      (index.ts + static.ts)
├── dostoprimechatelnosti-phuketa/ (index.ts + static.ts)
└── ... (всего 11 туров)
```

### 🎨 **ВАЖНЫЕ ПРАВИЛА:**
- **Один синий цвет** - `#007AFF` для ВСЕХ интерактивных элементов
- **Glassmorphism везде** - `backdrop-filter: blur(20px) saturate(180%)`
- **Emoji в меню** - обязательно для iOS 26 стиля
- **Footer темный** - `#1C1C1E` (НЕ фиолетовый!)

---

## 🗂️ КОЛЛЕКЦИИ И КАТЕГОРИИ

### **📋 КОЛЛЕКЦИИ (useAutoMenu.ts):**
- **beginners** (3) - для новичков: pearls-andaman-sea, dostoprimechatelnosti-phuketa, james-bond-island-phang-nga
- **family** (7) - семейные: все кроме rafting-spa-atv и активных
- **active** (5) - активные: eleven-islands-mega, rafting-spa-atv, avatar-plus-hangdong, kao-lak-safari, phi-phi-2days
- **premium** (3) - премиум: phi-phi-2days, eleven-islands-mega, cheow-lan-lake
- **multiday** (2) - многодневные: phi-phi-2days, cheow-lan-lake

### **🏷️ КАТЕГОРИИ (toursRegistry.ts):**
- **islands** (5) - острова: Пхи-Пхи, Жемчужины, Рача, Джеймс Бонд, 11 островов
- **adventure** (5) - приключения: Рафтинг, Каo Лак, Аватар+, Пханг Нга скайволк, Чео Лан
- **cultural** (1) - культура: Достопримечательности Пхукета

### **⚠️ ПРИОРИТЕТ ФИЛЬТРАЦИИ:**
```typescript
collection > category > tag
```

---

## 🔍 КАК РАБОТАЕТ ПОИСК

**Индексация:**
- `tourData.name` (ID тура)
- `tourData.tags` (массив тегов: ['пхи-пхи', 'ночевка'])
- `tourData.title` (заголовок)
- `tourData.subtitle` (подзаголовок)
- `tourData.description` (описание)

**Пример:** Поиск "пхи пхи" → находит Phi Phi 2 Days и 4 Pearls

---

## 🗂️ КАК РАБОТАЕТ МЕНЮ

**Автоматическая генерация из `toursRegistry.ts`:**

```typescript
{
  id: 'phi-phi-2days',
  tourDataLoader: () => import('./tours/phi-phi-2days'),
  tags: ['пхи-пхи', 'ночевка', 'море', 'острова'],  // ← Теги для фильтрации
  isActive: true,
  category: 'islands',            // ← Категория для меню
}
```

**Результат:**
- Тур появляется в разделе "Морские туры"
- Поиск по тегам "пхи-пхи" и "ночевка"
- Автоматически в главном меню

---

## ➕ КАК ДОБАВИТЬ НОВЫЙ ТУР

**1. Создай структуру:**
```bash
mkdir -p src/data/tours/new-tour-slug
```

**2. Создай файлы:**
```typescript
// index.ts
export * from './static';

// static.ts
import { TourData } from "@/types/Tour";
import image1 from "@/assets/new-tour/image1.jpg"; // ← @/assets!

export const newTourData: TourData = {
  id: "new-tour-slug",
  title: "Новый тур",
  // ... заполни поля
};
```

**3. Добавь в toursRegistry.ts:**
```typescript
// НЕ НУЖЕН импорт вверху!

{
  id: 'new-tour-slug',
  data: () => import('./tours/new-tour-slug').then(m => m.newTourData),
  tags: ['морские', 'семейные'],
  isActive: true,
  category: 'морские',
}
```

**4. Создай страницу:**
```typescript
// YourNewTour.tsx
import { newTourData } from "@/data/tours/new-tour-slug";
```

**5. Добавь Route в App.tsx**

**6. Деплой:**
```bash
npm run build && git add -A && git commit -m "feat: new tour" && git push
```

**✅ ГОТОВО!** Тур автоматически в меню и поиске!

---

## 🎯 ВАЖНЫЕ ПРАВИЛА

### ✅ ПРАВИЛЬНО:
```typescript
// Импорты через @/
import { tourData } from "@/data/tours/tour-name";
import image from "@/assets/tour-name/image.jpg";
```

### ❌ НЕПРАВИЛЬНО:
```typescript
// НЕ используй относительные пути!
import { tourData } from "../data/tourName";
import image from "../assets/image.jpg";
```

---

## 📚 ДОКУМЕНТАЦИЯ

- **Полное описание:** `MODULAR_TOURS_UPDATE.md`
- **Структура туров:** `TOURS_STRUCTURE.md`
- **Инструкции AI:** `AI_PROMPT_OPTIMIZED.md`
- **Стандарты шаблонов:** `TEMPLATE_STANDARDS_GUIDE.md`

---

## 🚀 ДЕПЛОЙ

**Коммиты:**
- `64e38f2` - Модульная структура туров (10.10.2025, 14:00)
- `c48c17f` - Обновлённая документация (10.10.2025, 14:30)

**Статус:** ✅ Всё задеплоено на phukeo.com

---

*Обновлено: 10 октября 2025 г. 14:30*
