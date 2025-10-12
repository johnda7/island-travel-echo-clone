# 🛡️ ЗАЩИТА TourPageTemplate - КРИТИЧЕСКАЯ ИНФРАСТРУКТУРА

## ⚠️ КРИТИЧЕСКОЕ ПРЕДУПРЕЖДЕНИЕ

**TourPageTemplate.tsx - САМЫЙ ВАЖНЫЙ ФАЙЛ ПРОЕКТА!**

Этот файл контролирует отображение **ВСЕХ 13 ТУРОВ**. Если он сломается - сломаются ВСЕ туры одновременно!

---

## 📍 РАСПОЛОЖЕНИЕ

```
src/components/TourPageTemplate.tsx
```

**Размер:** ~800 строк
**Зависимости:** 13 страниц туров зависят от этого файла
**Критичность:** 🔴 МАКСИМАЛЬНАЯ

---

## 🎯 НАЗНАЧЕНИЕ

TourPageTemplate - это **единый универсальный компонент**, который рендерит ВСЕ страницы туров.

### **Принцип работы:**

```typescript
// Каждая страница тура - это 14 строк:
import { TourPageTemplate } from '@/components/TourPageTemplate';
import { tourData } from '@/data/tours/tour-name';
import { routePoints } from '@/data/routes/tour-name-route';

const TourNew = () => {
  return <TourPageTemplate tourData={tourData} routePoints={routePoints} />;
};

export default TourNew;
```

**Что делает TourPageTemplate:**
1. Принимает `tourData` (название, описание, цена, галерея и т.д.)
2. Принимает `routePoints` (GPS координаты маршрута)
3. Рендерит полную страницу тура со ВСЕМИ секциями

---

## 🔒 СИСТЕМА ЗАЩИТЫ - 5 УРОВНЕЙ

### **УРОВЕНЬ 1: Git Version Control** ✅

**Текущее состояние:**
```bash
# TourPageTemplate сохранен в Git истории
git log --oneline -- src/components/TourPageTemplate.tsx

# Можно откатиться на любую версию:
git checkout <commit-hash> -- src/components/TourPageTemplate.tsx
```

**Последний рабочий коммит:**
- Commit: `eef124d` (12 октября 2025)
- Статус: ✅ Работает на всех 13 турах

### **УРОВЕНЬ 2: Локальный бэкап** 📦

**Создадим резервную копию прямо сейчас:**

```bash
# Создать директорию для бэкапов
mkdir -p backups/tour-template

# Сделать копию с датой
cp src/components/TourPageTemplate.tsx \
   backups/tour-template/TourPageTemplate-$(date +%Y%m%d-%H%M%S).tsx

# Сделать "золотую" версию
cp src/components/TourPageTemplate.tsx \
   backups/tour-template/TourPageTemplate-GOLDEN.tsx
```

**Автоматический бэкап перед изменениями:**

```bash
# Добавь в package.json scripts:
{
  "backup-template": "mkdir -p backups/tour-template && cp src/components/TourPageTemplate.tsx backups/tour-template/TourPageTemplate-$(date +%Y%m%d-%H%M%S).tsx && echo '✅ Backup created'",
  "restore-template": "cp backups/tour-template/TourPageTemplate-GOLDEN.tsx src/components/TourPageTemplate.tsx && echo '✅ Template restored from GOLDEN backup'"
}
```

**Использование:**
```bash
# ВСЕГДА делай это перед изменением шаблона!
npm run backup-template

# Если что-то сломалось - восстанови:
npm run restore-template
```

### **УРОВЕНЬ 3: TypeScript защита** 🔐

**Интерфейсы гарантируют структуру данных:**

```typescript
// src/types/Tour.ts
export interface TourData {
  id: string;                    // Обязательно
  title: string;                 // Обязательно
  subtitle: string;              // Обязательно
  category: TourCategory;        // Обязательно
  price: {                       // Обязательно
    adult: number;
    child?: number;
  };
  duration: string;              // Обязательно
  groupSize: string;             // Обязательно
  rating: number;                // Обязательно
  gallery: string[];             // Обязательно
  description: string;           // Обязательно
  itinerary: ItineraryItem[];    // Обязательно
  highlights: string[];          // Обязательно
  included: string[];            // Обязательно
  excluded: string[];            // Обязательно
  requirements: string[];        // Обязательно
  importantInfo: string[];       // Обязательно
}
```

**Защита:**
- ❌ TypeScript не даст удалить обязательное поле
- ❌ TypeScript не даст изменить тип данных
- ❌ Компиляция провалится, если структура нарушена

### **УРОВЕНЬ 4: Тестирование при каждом изменении** ✅

**ОБЯЗАТЕЛЬНАЯ ПРОЦЕДУРА после ЛЮБОГО изменения TourPageTemplate:**

```bash
# 1. Сделай бэкап
npm run backup-template

# 2. Внеси изменения в TourPageTemplate.tsx

# 3. Проверь компиляцию
npm run build

# 4. Если ошибки - НЕМЕДЛЕННО откати:
npm run restore-template

# 5. Если компиляция OK - запусти dev server
npm run dev

# 6. ОБЯЗАТЕЛЬНО проверь минимум 3 тура:
# - Один островной (PhiPhi2Days1Night)
# - Один природный (CheoLanLake)
# - Один культурный (DostoprimechatelnostiPhuketa)

# 7. Проверь что работают:
# - ✅ Галерея (стрелки + точки на мобильном)
# - ✅ GPS карта с маршрутом
# - ✅ Кнопки бронирования
# - ✅ Модальное окно
# - ✅ Breadcrumbs
# - ✅ Все секции отображаются

# 8. ТОЛЬКО ПОСЛЕ ПРОВЕРКИ - коммит:
git add src/components/TourPageTemplate.tsx
git commit -m "fix/feat: Update TourPageTemplate - [описание изменений]

Tested on:
- PhiPhi2Days1Night ✅
- CheoLanLake ✅
- DostoprimechatelnostiPhuketa ✅

All features working:
- Gallery ✅
- GPS map ✅
- Booking buttons ✅
- Modal ✅"
```

### **УРОВЕНЬ 5: Документация изменений** 📝

**Ведите лог изменений TourPageTemplate:**

```bash
# Создайте файл TEMPLATE_CHANGELOG.md
```

---

## 🚨 ЧТО ДЕЛАТЬ ЕСЛИ ШАБЛОН СЛОМАЛСЯ

### **Сценарий 1: После изменений все туры показывают белый экран**

```bash
# 1. НЕ ПАНИКОВАТЬ! Данные туров в безопасности!

# 2. Открой консоль браузера (F12)
# Посмотри что за ошибка

# 3. Если ошибка в TourPageTemplate - откати изменения:
npm run restore-template

# 4. Если не помогло - откати через Git:
git checkout HEAD~1 -- src/components/TourPageTemplate.tsx

# 5. Проверь что всё работает:
npm run dev
# Открой любой тур - должен загрузиться

# 6. Если работает - закоммить откат:
git add src/components/TourPageTemplate.tsx
git commit -m "revert: Restore TourPageTemplate to working state"
git push origin main
```

### **Сценарий 2: TypeScript ошибки после изменения интерфейса**

```bash
# 1. Проверь что именно сломалось:
npm run build

# Увидишь список ошибок типа:
# Property 'newField' does not exist on type 'TourData'

# 2. Два варианта:
# A) Откатить изменения (безопасно)
npm run restore-template

# B) Обновить интерфейс (если намеренно меняешь структуру):
# Отредактируй src/types/Tour.ts
# Добавь новое поле в интерфейс TourData
# Обнови ВСЕ 13 файлов tours/*/static.ts с новым полем
```

### **Сценарий 3: Git конфликт в TourPageTemplate**

```bash
# 1. Если при git pull возник конфликт:
git status
# Увидишь: both modified: src/components/TourPageTemplate.tsx

# 2. СНАЧАЛА сохрани свою версию:
cp src/components/TourPageTemplate.tsx \
   backups/tour-template/TourPageTemplate-MY-VERSION.tsx

# 3. Посмотри что изменилось:
git diff src/components/TourPageTemplate.tsx

# 4. Разреши конфликт вручную в VS Code
# Или выбери одну версию:

# Взять СВОЮ версию:
git checkout --ours src/components/TourPageTemplate.tsx

# Взять ЧУЖУЮ версию (из удаленного репо):
git checkout --theirs src/components/TourPageTemplate.tsx

# 5. ОБЯЗАТЕЛЬНО протестируй после разрешения:
npm run build
npm run dev
# Проверь 3+ тура!

# 6. Только после проверки:
git add src/components/TourPageTemplate.tsx
git commit -m "resolve: Merge conflict in TourPageTemplate"
```

### **Сценарий 4: Удалил TourPageTemplate.tsx случайно**

```bash
# 1. Если еще не закоммитил - восстанови:
git checkout -- src/components/TourPageTemplate.tsx

# 2. Если уже закоммитил - восстанови из истории:
git log --oneline -- src/components/TourPageTemplate.tsx
git checkout <последний-рабочий-коммит> -- src/components/TourPageTemplate.tsx

# 3. Если Git не помогает - восстанови из бэкапа:
npm run restore-template

# 4. В крайнем случае - скопируй из GitHub:
curl https://raw.githubusercontent.com/johnda7/island-travel-echo-clone/main/src/components/TourPageTemplate.tsx \
  -o src/components/TourPageTemplate.tsx
```

---

## 📋 ЧЕКЛИСТ ПЕРЕД ИЗМЕНЕНИЕМ TourPageTemplate

**ОБЯЗАТЕЛЬНО ВЫПОЛНИ ВСЁ:**

- [ ] Сделал бэкап: `npm run backup-template`
- [ ] Понимаю что меняю и зачем
- [ ] Знаю как откатить изменения
- [ ] Готов протестировать минимум 3 тура
- [ ] Открыл консоль браузера для отслеживания ошибок
- [ ] Знаю что делать если что-то сломается

**ПОСЛЕ ИЗМЕНЕНИЙ:**

- [ ] `npm run build` - без ошибок
- [ ] `npm run dev` - сервер запустился
- [ ] Проверил островной тур (например, PhiPhi2Days1Night)
- [ ] Проверил природный тур (например, CheoLanLake)
- [ ] Проверил культурный тур (например, DostoprimechatelnostiPhuketa)
- [ ] Галерея работает (стрелки + точки на мобильном)
- [ ] GPS карта отображается с маршрутом
- [ ] Кнопки "Забронировать" работают
- [ ] Модальное окно открывается
- [ ] Breadcrumbs правильные
- [ ] Все секции отображаются
- [ ] Мобильная версия корректна
- [ ] Закоммитил с подробным описанием

---

## 🔍 СТРУКТУРА TourPageTemplate

### **Основные секции компонента:**

```typescript
TourPageTemplate
├── Header (навигация)
├── Breadcrumbs (хлебные крошки)
├── Hero Section (главное фото + мета-информация)
│   ├── Main Gallery (галерея фотографий)
│   ├── Meta Tags (рейтинг, время, группа)
│   └── Category Tags (категории тура)
├── Title & Description (заголовок и описание)
├── Highlights (особенности тура)
├── Itinerary (программа тура по пунктам)
├── GPS Map (карта с маршрутом - Leaflet)
├── Included/Excluded (что включено/не включено)
├── Requirements (что взять с собой)
├── Important Info (важная информация)
├── Desktop Booking Sidebar (форма справа на десктопе)
├── Mobile Booking Bar (панель внизу на мобильных)
├── Booking Modal (модальное окно бронирования)
└── Footer

// Каждая секция - это 30-80 строк кода
// Итого: ~800 строк централизованной логики
```

### **Критические зависимости:**

```typescript
// Эти импорты НЕЛЬЗЯ удалять:
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TourData, RoutePoint } from '@/types/Tour';
import 'leaflet/dist/leaflet.css';
```

### **Props интерфейс:**

```typescript
interface TourPageTemplateProps {
  tourData: TourData;           // ОБЯЗАТЕЛЬНО - данные тура
  routePoints: RoutePoint[];    // ОБЯЗАТЕЛЬНО - GPS маршрут
}
```

---

## 💾 BACKUP STRATEGY

### **Автоматические бэкапы:**

```bash
# 1. Создай директорию для бэкапов
mkdir -p backups/tour-template

# 2. Настрой git hook для автоматического бэкапа
# Создай файл .git/hooks/pre-commit:

#!/bin/bash
# Автоматический бэкап TourPageTemplate перед каждым коммитом

if git diff --cached --name-only | grep -q "src/components/TourPageTemplate.tsx"; then
  echo "🔒 TourPageTemplate изменён - создаю бэкап..."
  
  mkdir -p backups/tour-template
  
  BACKUP_FILE="backups/tour-template/TourPageTemplate-$(date +%Y%m%d-%H%M%S).tsx"
  
  cp src/components/TourPageTemplate.tsx "$BACKUP_FILE"
  
  echo "✅ Бэкап создан: $BACKUP_FILE"
  echo "⚠️  ВНИМАНИЕ: Изменения в TourPageTemplate влияют на ВСЕ 13 туров!"
  echo "📝 Обязательно протестируй минимум 3 тура перед push!"
  
  # Спросить подтверждение
  read -p "Ты протестировал изменения на 3+ турах? (yes/no): " response
  
  if [ "$response" != "yes" ]; then
    echo "❌ Коммит отменён. Протестируй изменения!"
    exit 1
  fi
fi

exit 0
```

**Сделать hook исполняемым:**
```bash
chmod +x .git/hooks/pre-commit
```

### **Ротация бэкапов:**

```bash
# Создай скрипт для очистки старых бэкапов
# scripts/cleanup-backups.sh:

#!/bin/bash
# Оставляет только последние 10 бэкапов

cd backups/tour-template

# Оставить GOLDEN версию и последние 10 бэкапов
ls -t | grep -v GOLDEN | tail -n +11 | xargs -r rm

echo "✅ Старые бэкапы удалены. Осталось последние 10."
```

---

## 🛠️ ИНСТРУМЕНТЫ ВОССТАНОВЛЕНИЯ

### **1. Быстрое восстановление (npm scripts):**

```json
{
  "scripts": {
    "backup-template": "mkdir -p backups/tour-template && cp src/components/TourPageTemplate.tsx backups/tour-template/TourPageTemplate-$(date +%Y%m%d-%H%M%S).tsx",
    
    "restore-template": "cp backups/tour-template/TourPageTemplate-GOLDEN.tsx src/components/TourPageTemplate.tsx",
    
    "restore-template-git": "git checkout HEAD -- src/components/TourPageTemplate.tsx",
    
    "list-backups": "ls -lh backups/tour-template/",
    
    "save-golden": "cp src/components/TourPageTemplate.tsx backups/tour-template/TourPageTemplate-GOLDEN.tsx && echo '✅ GOLDEN version saved'",
    
    "diff-template": "git diff src/components/TourPageTemplate.tsx"
  }
}
```

### **2. Восстановление из конкретного коммита:**

```bash
# Посмотреть историю изменений TourPageTemplate:
git log --oneline --follow -- src/components/TourPageTemplate.tsx

# Вывод:
# eef124d docs: Add comprehensive cleanup report
# 71addc2 docs: Update documentation and fix infrastructure
# d27768c feat: Complete 100% tour migration to TourPageTemplate
# ...

# Восстановить конкретную версию:
git show <commit-hash>:src/components/TourPageTemplate.tsx > src/components/TourPageTemplate.tsx

# Или откатиться на N коммитов назад:
git checkout HEAD~3 -- src/components/TourPageTemplate.tsx
```

### **3. Сравнение версий:**

```bash
# Сравнить текущую версию с последним коммитом:
git diff src/components/TourPageTemplate.tsx

# Сравнить с конкретным коммитом:
git diff <commit-hash> src/components/TourPageTemplate.tsx

# Сравнить с бэкапом:
diff src/components/TourPageTemplate.tsx backups/tour-template/TourPageTemplate-GOLDEN.tsx
```

---

## 📊 МОНИТОРИНГ ЗДОРОВЬЯ ШАБЛОНА

### **Автоматические проверки:**

```bash
# Создай скрипт scripts/check-template-health.sh:

#!/bin/bash

echo "🔍 Проверка здоровья TourPageTemplate..."

# 1. Проверка существования файла
if [ ! -f "src/components/TourPageTemplate.tsx" ]; then
  echo "❌ КРИТИЧНО: TourPageTemplate.tsx не найден!"
  exit 1
fi

# 2. Проверка размера файла (должен быть 700-900 строк)
LINES=$(wc -l < src/components/TourPageTemplate.tsx)
if [ $LINES -lt 700 ] || [ $LINES -gt 900 ]; then
  echo "⚠️  ПРЕДУПРЕЖДЕНИЕ: Необычный размер файла ($LINES строк)"
fi

# 3. Проверка критических импортов
CRITICAL_IMPORTS=(
  "react-leaflet"
  "TourData"
  "RoutePoint"
  "Button"
  "Dialog"
)

for import in "${CRITICAL_IMPORTS[@]}"; do
  if ! grep -q "$import" src/components/TourPageTemplate.tsx; then
    echo "❌ КРИТИЧНО: Отсутствует импорт $import"
    exit 1
  fi
done

# 4. TypeScript проверка
echo "📝 Проверка TypeScript..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
  echo "✅ TourPageTemplate здоров!"
else
  echo "❌ Найдены TypeScript ошибки"
  exit 1
fi
```

**Запуск:**
```bash
chmod +x scripts/check-template-health.sh
./scripts/check-template-health.sh
```

---

## 🎓 ОБУЧЕНИЕ: КАК БЕЗОПАСНО МЕНЯТЬ ШАБЛОН

### **Правило 1: Всегда делай бэкап**
```bash
npm run backup-template
```

### **Правило 2: Меняй по одной вещи за раз**
❌ Не меняй сразу галерею + карту + модалку
✅ Сначала галерею, протестируй, закоммить
✅ Потом карту, протестируй, закоммить
✅ Потом модалку, протестируй, закоммить

### **Правило 3: Тестируй на разных турах**
- Островной тур (много фото, сложный маршрут)
- Природный тур (длинное описание)
- Культурный тур (много пунктов программы)

### **Правило 4: Проверяй мобильную версию**
```bash
# Открой DevTools (F12)
# Переключись на iPhone/Android режим
# Проверь что галерея работает правильно (1 фото + стрелки)
```

### **Правило 5: Читай ошибки в консоли**
```bash
# Открой консоль браузера (F12)
# Смотри на красные ошибки
# Гугли текст ошибки если не понятно
```

---

## 📞 ЭКСТРЕННЫЕ КОНТАКТЫ

### **Если всё сломалось и ничего не помогает:**

1. **Откат на последний рабочий коммит:**
```bash
git checkout eef124d -- src/components/TourPageTemplate.tsx
```

2. **Скачать с GitHub:**
```bash
curl https://raw.githubusercontent.com/johnda7/island-travel-echo-clone/eef124d/src/components/TourPageTemplate.tsx \
  -o src/components/TourPageTemplate.tsx
```

3. **Восстановить из GOLDEN бэкапа:**
```bash
npm run restore-template
```

4. **В крайнем случае - создать с нуля:**
См. `AI_DOCS/TEMPLATE_RECONSTRUCTION_GUIDE.md` (создам отдельно)

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ

### **Перед изменением:**
- [ ] Прочитал эту документацию
- [ ] Сделал бэкап: `npm run backup-template`
- [ ] Понимаю что меняю
- [ ] Знаю как откатить

### **После изменения:**
- [ ] Компиляция без ошибок: `npm run build`
- [ ] Dev server запущен: `npm run dev`
- [ ] Протестировал 3+ тура
- [ ] Проверил мобильную версию
- [ ] Нет ошибок в консоли браузера
- [ ] Все секции отображаются
- [ ] GPS карта работает
- [ ] Галерея работает
- [ ] Кнопки работают
- [ ] Закоммитил с описанием

### **Перед push:**
- [ ] Всё работает локально
- [ ] Сделал финальную проверку
- [ ] Готов откатить если что-то пойдет не так

---

**Дата создания:** 12 октября 2025
**Версия:** 1.0
**Статус:** ✅ АКТИВНА

**ПОМНИ: TourPageTemplate - это сердце всего проекта. Береги его! 🛡️**
