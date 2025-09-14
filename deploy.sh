#!/bin/bash
# deploy.sh - Автоматический деплой на GitHub Pages для Island Travel

echo "🏝️ Island Travel - Автоматический деплой на GitHub Pages"
echo "=============================================="

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: Запустите скрипт из корня проекта island-travel-echo-clone"
    exit 1
fi

# Проверяем статус Git
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  У вас есть несохраненные изменения:"
    git status --porcelain
    echo ""
    read -p "Продолжить деплой? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Деплой отменен"
        exit 1
    fi
fi

# 1. Сборка проекта
echo "📦 Шаг 1/4: Сборка production версии..."
if ! npm run build; then
    echo "❌ Ошибка сборки проекта"
    exit 1
fi
echo "✅ Сборка завершена успешно"

# 2. Подготовка к деплою через GitHub Actions
echo "📂 Шаг 2/3: Подготовка деплоя через GitHub Actions (Pages)"
echo "ℹ️  dist/ будет загружен в Pages артефактом GitHub Actions"

# 3. Триггер деплоя (пустой коммит)
echo "🚀 Шаг 3/3: Триггер деплоя (GitHub Actions)"
BUILD_TIME=$(date -Iseconds)
git add -A >/dev/null 2>&1
git commit --allow-empty -m "🚀 Trigger deploy via GitHub Actions

📦 Build time: $BUILD_TIME
🌐 Site: https://johnda7.github.io/island-travel-echo-clone" || true
echo "📤 Отправка на GitHub..."
git push || { echo "❌ Ошибка push на GitHub"; exit 1; }

echo ""
echo "🎉 ДЕПЛОЙ ЗАВЕРШЕН УСПЕШНО!"
echo "=============================================="
echo "🌐 Сайт: https://johnda7.github.io/island-travel-echo-clone"
echo "📋 Каталог: https://johnda7.github.io/island-travel-echo-clone/tours"
echo ""
echo "⏳ GitHub Pages обновится через 2-3 минуты"
echo "🔄 Принудительное обновление в браузере: Ctrl+F5"
echo ""
echo "📊 Статус деплоя: https://github.com/johnda7/island-travel-echo-clone/actions"
echo "⚙️  Настройки Pages: https://github.com/johnda7/island-travel-echo-clone/settings/pages"