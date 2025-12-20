#!/bin/bash

# 🚀 INSTANT INDEX - Мгновенная индексация сайта во всех поисковиках
# Использование: ./scripts/instant-index.sh

SITE_URL="https://phukeo.com"
SITEMAP_URL="https://phukeo.com/sitemap.xml"

echo "🚀 ЗАПУСК МГНОВЕННОЙ ИНДЕКСАЦИИ для $SITE_URL"
echo ""

# 1. Google Ping
echo "📍 Пингуем Google..."
curl -s "https://www.google.com/ping?sitemap=$SITEMAP_URL" > /dev/null
echo "✅ Google уведомлён"

# 2. Bing Ping
echo "📍 Пингуем Bing..."
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP_URL" > /dev/null
echo "✅ Bing уведомлён"

# 3. Yandex Ping
echo "📍 Пингуем Yandex..."
curl -s "https://webmaster.yandex.ru/ping?sitemap=$SITEMAP_URL" > /dev/null
echo "✅ Yandex уведомлён"

# 4. IndexNow (мгновенная индексация для Bing, Yandex, Seznam)
echo "📍 Отправляем через IndexNow API..."
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"phukeo.com\",
    \"key\": \"instant-index-key-2025\",
    \"keyLocation\": \"https://phukeo.com/instant-index-key-2025.txt\",
    \"urlList\": [
      \"$SITE_URL\",
      \"$SITE_URL/beaches\",
      \"$SITE_URL/what-to-visit\",
      \"$SITE_URL/tours/phi-phi-2days\",
      \"$SITE_URL/tours/similan-islands\",
      \"$SITE_URL/tours/phang-nga-james-bond\",
      \"$SITE_URL/tours/racha-island\",
      \"$SITE_URL/tours/pearls-andaman-sea\"
    ]
  }" > /dev/null 2>&1
echo "✅ IndexNow уведомлён"

# 5. Пинг через RapidURL (альтернативный сервис)
echo "📍 Пингуем RapidURL..."
curl -s "http://www.rapidurl.info/ping.php?url=$SITE_URL" > /dev/null
echo "✅ RapidURL уведомлён"

# 6. Пинг через TopList (чешский поисковик)
echo "📍 Пингуем Seznam (Чехия)..."
curl -s "https://search.seznam.cz/ping?url=$SITEMAP_URL" > /dev/null
echo "✅ Seznam уведомлён"

echo ""
echo "🎉 ГОТОВО! Ваш сайт отправлен в индекс:"
echo "   ✅ Google"
echo "   ✅ Bing"
echo "   ✅ Yandex"
echo "   ✅ Seznam"
echo "   ✅ IndexNow (20+ поисковиков)"
echo ""
echo "⏱️ Индексация начнётся в течение 1-24 часов"
echo "📊 Проверить статус:"
echo "   Google: site:phukeo.com"
echo "   Yandex: https://webmaster.yandex.ru"
