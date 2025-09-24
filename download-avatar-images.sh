#!/bin/bash

# Создаем директорию для фотографий тура
mkdir -p /workspaces/island-travel-echo-clone/src/assets/avatar-plus

# Переходим в директорию
cd /workspaces/island-travel-echo-clone/src/assets/avatar-plus

# Скачиваем основную фотографию тура
wget -O main.webp https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-water-cave.webp

# Скачиваем остальные фотографии для галереи
wget -O cave.webp https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-cave.webp
wget -O jump.webp https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-jump.webp
wget -O monkey.webp https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-monkey.webp
wget -O jungle.webp https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-jungle.webp
wget -O view.webp https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-view.webp
