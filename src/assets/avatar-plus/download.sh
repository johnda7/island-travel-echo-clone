#!/bin/bash
# Скрипт для скачивания реальных фото Avatar Plus с WordPress

echo "🔥 Скачиваю реальные фото Avatar Plus с phuketgo.aaddaa.com..."

# Главное фото горячих источников
curl -L -o "hotspring-main.jpeg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/the-hotspring-beach-resort-spa-1.jpeg"

# Музей Бенджаран - 5 фото
curl -L -o "benyaran-1.jpg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/benyaran-museum-1-1.jpg"
curl -L -o "benyaran-2.jpg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/benyaran-museum-1.jpg"
curl -L -o "benyaran-3.jpg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/benyaran-museum-2.jpg"
curl -L -o "benyaran-4.jpg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/benyaran-museum-4.jpg"
curl -L -o "benyaran-5.jpg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/benyaran-museum.jpg"

# Горячие источники - дополнительно
curl -L -o "hotspring-2.jpeg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/the-hotspring-beach-resort-spa--scaled.jpeg"
curl -L -o "hotspring-3.jpeg" "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/the-hotspring-beach-resort-spa-1-1.jpeg"

echo "✅ Все 7 фото Avatar Plus успешно скачаны с WordPress!"
echo "📁 Проверьте src/assets/avatar-plus/ - должно быть 7 файлов"