# 🏗️ CMS ИНТЕГРАЦИЯ ПЛАН

## ТЕКУЩИЕ ПРОБЛЕМЫ:
- ❌ Нет админки для управления турами
- ❌ Изображения не отображаются
- ❌ Данные захардкожены
- ❌ Нет централизованного шаблона

## РЕШЕНИЯ:

### 1. STRAPI (РЕКОМЕНДУЕТСЯ)
```bash
# Установка
npx create-strapi-app@latest phuket-tours-cms --quickstart

# Структура
/phuket-tours-cms  # CMS админка
/island-travel     # React фронтенд
```

**Что получите:**
- 🎯 WordPress-подобная админка
- 🎯 Автоматический API
- 🎯 Загрузка фото через интерфейс
- 🎯 Управление турами

### 2. CONTENT MODEL (ТУРЫ):
```javascript
// В Strapi создаём Content Type "Tour"
{
  title: "String",           // Пхи-Пхи 2 дня
  slug: "String",           // phi-phi-2-days
  description: "Text",      // Описание
  priceAdult: "Number",     // 4000
  priceChild: "Number",     // 3500
  duration: "String",       // 2 дня / 1 ночь
  gallery: "Media",         // Массив фото
  schedule: "JSON",         // Программа тура
  included: "JSON",         // Что включено
  category: "Enumeration"   // marine, adventure
}
```

### 3. АРХИТЕКТУРА:
```
STRAPI CMS ──► API ──► REACT APP
    ↓              ↓         ↓
  Админка      tours.json   Tours
  Фото         /api/tours   Gallery
  Цены         Real-time    Calculator
```

### 4. INTEGRATION STEPS:
1. Установить Strapi CMS
2. Создать Content Types
3. Настроить API endpoints  
4. Подключить к React
5. Создать единый TourTemplate

### 5. TEMPLATE PROTECTION:
```javascript
// Создаём locked template
const MASTER_TEMPLATE = "PhiPhiMaster";
// Запрещаем изменения через TypeScript
```

## СЛЕДУЮЩИЕ ШАГИ:
1. Выбрать CMS (Strapi рекомендую)
2. Настроить структуру данных
3. Создать единый шаблон
4. Интегрировать Telegram API
5. Настроить деплой

## ПРЕИМУЩЕСТВА:
✅ Админка как в WordPress
✅ Не теряются данные  
✅ Централизованный контент
✅ Автоматические бэкапы
✅ Масштабируемость