# 🛡️ БЫСТРАЯ ИНСТРУКЦИЯ - ЗАЩИТА TourPageTemplate

## ⚡ ДЛЯ СРОЧНОГО ИСПОЛЬЗОВАНИЯ

### **Перед изменением шаблона:**
```bash
npm run backup-template
```

### **Если что-то сломалось - восстановить:**
```bash
npm run restore-template
```

### **Проверить здоровье шаблона:**
```bash
./scripts/check-template-health.sh
```

### **Посмотреть все бэкапы:**
```bash
npm run list-backups
```

### **Сохранить текущую версию как "золотую":**
```bash
npm run save-golden
```

---

## 🔥 ЭКСТРЕННОЕ ВОССТАНОВЛЕНИЕ

### **Если шаблон сломан - 3 способа восстановить:**

**1. Из локального бэкапа:**
```bash
npm run restore-template
```

**2. Из Git:**
```bash
git checkout HEAD~1 -- src/components/TourPageTemplate.tsx
```

**3. Из GitHub:**
```bash
git checkout 7cfacef -- src/components/TourPageTemplate.tsx
```

---

## ✅ ОБЯЗАТЕЛЬНАЯ ПРОЦЕДУРА

### **Перед ЛЮБЫМ изменением TourPageTemplate.tsx:**

```bash
# 1. Сделай бэкап
npm run backup-template

# 2. Сделай изменения в файле

# 3. Проверь компиляцию
npm run build

# 4. Запусти dev server
npm run dev

# 5. Проверь минимум 3 тура вручную

# 6. Если всё ОК - коммит
git add src/components/TourPageTemplate.tsx
git commit -m "fix: [описание]"
git push

# 7. Если что-то сломалось - ОТКАТИ:
npm run restore-template
# или
git checkout HEAD -- src/components/TourPageTemplate.tsx
```

---

## 📊 ЧТО ПРОВЕРЯТЬ ПОСЛЕ ИЗМЕНЕНИЙ

**Обязательно протестируй эти 3 тура:**
1. http://localhost:8080/#/tours/phi-phi-2-days-1-night (островной)
2. http://localhost:8080/#/tours/cheow-lan-lake (природный)
3. http://localhost:8080/#/tours/dostoprimechatelnosti-phuketa (культурный)

**Проверь что работают:**
- ✅ Галерея (стрелки + точки на мобильном)
- ✅ GPS карта с маршрутом
- ✅ Кнопки "Забронировать"
- ✅ Модальное окно
- ✅ Breadcrumbs
- ✅ Все секции отображаются

---

## 🚨 КРИТИЧЕСКОЕ ПРЕДУПРЕЖДЕНИЕ

**TourPageTemplate.tsx контролирует ВСЕ 13 ТУРОВ!**

Если он сломается - сломаются ВСЕ туры одновременно!

**НИКОГДА:**
- ❌ Не удаляй критические импорты (TourData, RoutePoint, TourRouteMap)
- ❌ Не меняй интерфейс TourPageTemplateProps без обновления всех 13 страниц
- ❌ Не коммить без тестирования на 3+ турах
- ❌ Не меняй структуру данных TourData без обновления всех tours/*/static.ts

**ВСЕГДА:**
- ✅ Делай бэкап перед изменениями
- ✅ Тестируй на 3+ турах
- ✅ Проверяй компиляцию TypeScript
- ✅ Проверяй мобильную версию
- ✅ Знай как откатить изменения

---

## 📚 ПОЛНАЯ ДОКУМЕНТАЦИЯ

См. `AI_DOCS/TOUR_TEMPLATE_PROTECTION.md` для:
- Подробного описания системы защиты
- Сценариев восстановления
- Решения конфликтов
- Автоматизации бэкапов
- Мониторинга здоровья

---

## 🎯 БЫСТРАЯ СПРАВКА

| Команда | Действие |
|---------|----------|
| `npm run backup-template` | Создать бэкап |
| `npm run restore-template` | Восстановить из GOLDEN |
| `npm run save-golden` | Сохранить текущую как GOLDEN |
| `npm run list-backups` | Показать все бэкапы |
| `./scripts/check-template-health.sh` | Проверить здоровье |
| `npm run build` | Проверить компиляцию |
| `npm run dev` | Запустить dev server |

---

**Дата:** 12 октября 2025
**Версия:** 1.0
**Статус:** ✅ АКТИВНА

**Текущий GOLDEN бэкап:**
- `backups/tour-template/TourPageTemplate-GOLDEN-20251012.tsx`
- Commit: `7cfacef`
- Строк: 683
- Статус: ✅ РАБОТАЕТ на всех 13 турах
