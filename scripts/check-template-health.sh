#!/bin/bash

echo "🔍 Проверка здоровья TourPageTemplate..."
echo ""

# 1. Проверка существования файла
if [ ! -f "src/components/TourPageTemplate.tsx" ]; then
  echo "❌ КРИТИЧНО: TourPageTemplate.tsx не найден!"
  exit 1
fi
echo "✅ Файл существует"

# 2. Проверка размера файла (должен быть 650-750 строк)
LINES=$(wc -l < src/components/TourPageTemplate.tsx | tr -d ' ')
echo "📏 Размер файла: $LINES строк"

if [ $LINES -lt 650 ]; then
  echo "⚠️  ПРЕДУПРЕЖДЕНИЕ: Файл слишком маленький ($LINES строк, ожидается 650-750)"
  echo "   Возможно, часть кода была удалена!"
elif [ $LINES -gt 750 ]; then
  echo "⚠️  ПРЕДУПРЕЖДЕНИЕ: Файл слишком большой ($LINES строк, ожидается 650-750)"
  echo "   Возможно, добавлен дублирующийся код!"
else
  echo "✅ Размер файла в норме"
fi

# 3. Проверка критических импортов
echo ""
echo "🔍 Проверка критических импортов..."

CRITICAL_IMPORTS=(
  "TourData"
  "RoutePoint"
  "Button"
  "Header"
  "Footer"
  "TourRouteMap"
  "UniversalBookingModal"
)

ALL_OK=true
for import in "${CRITICAL_IMPORTS[@]}"; do
  if ! grep -q "$import" src/components/TourPageTemplate.tsx; then
    echo "❌ КРИТИЧНО: Отсутствует импорт или использование '$import'"
    ALL_OK=false
  fi
done

if [ "$ALL_OK" = true ]; then
  echo "✅ Все критические импорты на месте"
fi

# 4. Проверка критических компонентов
echo ""
echo "🔍 Проверка критических компонентов..."

CRITICAL_COMPONENTS=(
  "Breadcrumbs"
  "Gallery"
  "TourRouteMap"
  "UniversalBookingModal"
  "itinerary"
  "highlights"
  "included"
)

ALL_OK=true
for component in "${CRITICAL_COMPONENTS[@]}"; do
  if ! grep -qi "$component" src/components/TourPageTemplate.tsx; then
    echo "❌ КРИТИЧНО: Не найден компонент/секция '$component'"
    ALL_OK=false
  fi
done

if [ "$ALL_OK" = true ]; then
  echo "✅ Все критические компоненты на месте"
fi

# 5. TypeScript проверка
echo ""
echo "📝 Проверка TypeScript компиляции..."

if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
  echo "✅ TypeScript компиляция успешна"
else
  echo "❌ Найдены TypeScript ошибки!"
  echo "   Запусти 'npm run build' для подробностей"
  exit 1
fi

# 6. Проверка существования бэкапов
echo ""
echo "💾 Проверка бэкапов..."

if [ -d "backups/tour-template" ]; then
  BACKUP_COUNT=$(ls -1 backups/tour-template/*.tsx 2>/dev/null | wc -l | tr -d ' ')
  echo "✅ Найдено бэкапов: $BACKUP_COUNT"
  
  if [ $BACKUP_COUNT -eq 0 ]; then
    echo "⚠️  ПРЕДУПРЕЖДЕНИЕ: Нет бэкапов! Создай GOLDEN версию:"
    echo "   npm run save-golden"
  fi
else
  echo "⚠️  ПРЕДУПРЕЖДЕНИЕ: Директория backups/tour-template не существует"
  echo "   Создай бэкап: npm run backup-template"
fi

# 7. Итоговый статус
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 ФИНАЛЬНЫЙ СТАТУС:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $LINES -ge 650 ] && [ $LINES -le 750 ] && [ "$ALL_OK" = true ]; then
  echo "✅ TourPageTemplate ЗДОРОВ!"
  echo ""
  echo "Все 22 тура должны работать корректно."
  exit 0
else
  echo "⚠️  TourPageTemplate ТРЕБУЕТ ВНИМАНИЯ!"
  echo ""
  echo "Рекомендации:"
  echo "1. Проверь изменения: git diff src/components/TourPageTemplate.tsx"
  echo "2. Протестируй туры локально: npm run dev"
  echo "3. Если что-то сломано - восстанови: npm run restore-template"
  exit 1
fi
