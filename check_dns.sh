#!/bin/bash

# Скрипт автоматической проверки DNS для phukeo.com
# Проверяет каждый час и уведомляет когда DNS заработают

echo "🔄 АВТОМАТИЧЕСКАЯ ПРОВЕРКА DNS ДЛЯ PHUKEO.COM"
echo "Проверка каждый час (нажми Ctrl+C для остановки)"
echo ""

CHECK_COUNT=0

while true; do
  CHECK_COUNT=$((CHECK_COUNT + 1))
  CURRENT_TIME=$(date '+%d.%m.%Y %H:%M:%S')
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🕐 Проверка #$CHECK_COUNT: $CURRENT_TIME"
  echo ""
  
  # Проверяем Regxa nameservers
  echo "1️⃣ Regxa Nameservers (795.dns1.managedns.org):"
  REGXA_RESULT=$(dig @795.dns1.managedns.org phukeo.com A +short)
  
  if [ -n "$REGXA_RESULT" ]; then
    echo "✅ ЗАРАБОТАЛО! Regxa отдаёт A-записи:"
    echo "$REGXA_RESULT"
    echo ""
    echo "🎉🎉🎉 DNS АКТИВИРОВАНЫ! 🎉🎉🎉"
    echo ""
    echo "Что делать дальше:"
    echo "1. Обнови страницу GitHub Pages Settings"
    echo "2. Статус должен стать зелёным ✅"
    echo "3. Включи 'Enforce HTTPS'"
    echo "4. Открой https://phukeo.com в браузере"
    echo ""
    
    # Отправляем звуковое уведомление (для macOS)
    osascript -e 'display notification "DNS для phukeo.com заработали!" with title "✅ DNS АКТИВИРОВАНЫ"'
    
    exit 0
  else
    echo "❌ Пока пусто"
  fi
  
  echo ""
  echo "2️⃣ Google DNS (8.8.8.8):"
  GOOGLE_RESULT=$(dig @8.8.8.8 phukeo.com A +short)
  
  if [ -n "$GOOGLE_RESULT" ]; then
    echo "✅ Google DNS видит: $GOOGLE_RESULT"
  else
    echo "❌ Пока пусто"
  fi
  
  echo ""
  echo "⏳ Статус: Ждём DNS propagation..."
  echo "⏰ Следующая проверка через 1 час"
  echo ""
  
  # Ждём 1 час (3600 секунд)
  sleep 3600
done
