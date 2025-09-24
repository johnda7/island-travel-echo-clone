#!/bin/bash

# 🌿 СКРИПТ ЗАГРУЗКИ ИЗОБРАЖЕНИЙ ДЛЯ ТУРА "АВАТАР ПЛЮС"
# 🎯 Источник: https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/
# 📂 Назначение: /src/assets/avatar-plus/

echo "🌿 Начинаем загрузку изображений для тура 'Аватар Плюс'..."

# Создаем директорию для фотографий тура
mkdir -p /home/runner/work/island-travel-echo-clone/island-travel-echo-clone/src/assets/avatar-plus

# Переходим в директорию
cd /home/runner/work/island-travel-echo-clone/island-travel-echo-clone/src/assets/avatar-plus

echo "📂 Директория создана: $(pwd)"

# Базовый URL для изображений
BASE_URL="https://phuketgo.aaddaa.com/img/excursion/avatar-pljus"

echo "🔗 Базовый URL: $BASE_URL"

# Скачиваем основную фотографию тура
echo "⬇️ Загружаем главное изображение..."
wget -O main.webp "$BASE_URL/avatar-water-cave.webp" || {
    echo "❌ Ошибка загрузки main.webp"
    exit 1
}

# Скачиваем остальные фотографии для галереи
echo "⬇️ Загружаем изображение пещеры..."
wget -O cave.webp "$BASE_URL/avatar-cave.webp" || {
    echo "❌ Ошибка загрузки cave.webp" 
    exit 1
}

echo "⬇️ Загружаем изображение прыжков..."
wget -O jump.webp "$BASE_URL/avatar-jump.webp" || {
    echo "❌ Ошибка загрузки jump.webp"
    exit 1
}

echo "⬇️ Загружаем изображение обезьян..."
wget -O monkey.webp "$BASE_URL/avatar-monkey.webp" || {
    echo "❌ Ошибка загрузки monkey.webp"
    exit 1
}

echo "⬇️ Загружаем изображение джунглей..."
wget -O jungle.webp "$BASE_URL/avatar-jungle.webp" || {
    echo "❌ Ошибка загрузки jungle.webp"
    exit 1
}

echo "⬇️ Загружаем изображение смотровой площадки..."
wget -O view.webp "$BASE_URL/avatar-view.webp" || {
    echo "❌ Ошибка загрузки view.webp"
    exit 1
}

echo "✅ Все изображения успешно загружены!"
echo "📋 Список загруженных файлов:"
ls -la

echo "🎯 Готово! Тур 'Аватар Плюс' готов к использованию."