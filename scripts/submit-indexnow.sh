#!/bin/bash

# 🚀 Скрипт мгновенной индексации через IndexNow API
# Отправляет URL в Bing, Yandex и другие поисковики СРАЗУ

KEY="025d5c611f5bd0270c62a551c2ddba6418e6baa43380344f77e4017a6b454ad4"
HOST="phukeo.com"

# Список всех важных URL для индексации
URLS=(
  "https://phukeo.com/"
  "https://phukeo.com/beaches"
  "https://phukeo.com/what-to-visit"
  "https://phukeo.com/tours/phi-phi-2days"
  "https://phukeo.com/tours/similan-islands"
  "https://phukeo.com/tours/phang-nga-james-bond"
  "https://phukeo.com/tours/racha-island"
  "https://phukeo.com/tours/five-pearls-2days"
)

echo "🚀 Начинаю мгновенную индексацию через IndexNow..."
echo ""

# Отправляем в Bing IndexNow
echo "📤 Отправка в Bing IndexNow..."
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"$HOST\",
    \"key\": \"$KEY\",
    \"keyLocation\": \"https://$HOST/${KEY}.txt\",
    \"urlList\": [
      \"https://phukeo.com/\",
      \"https://phukeo.com/beaches\",
      \"https://phukeo.com/what-to-visit\",
      \"https://phukeo.com/tours/phi-phi-2days\",
      \"https://phukeo.com/tours/similan-islands\",
      \"https://phukeo.com/tours/phang-nga-james-bond\",
      \"https://phukeo.com/tours/racha-island\",
      \"https://phukeo.com/tours/five-pearls-2days\"
    ]
  }"

echo ""
echo ""
echo "✅ Готово! URL отправлены в IndexNow"
echo "⏰ Индексация начнется в течение 5-15 минут"
echo ""
echo "Поддерживаемые поисковики:"
echo "  - Bing"
echo "  - Yandex"
echo "  - Seznam.cz"
echo "  - Naver"
echo ""
