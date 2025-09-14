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

# 2. Копирование файлов
echo "📂 Шаг 2/4: Копирование файлов из dist/ в корень..."
cp dist/index.html . || { echo "❌ Ошибка копирования index.html"; exit 1; }
cp dist/404.html . || { echo "❌ Ошибка копирования 404.html"; exit 1; }
cp -r dist/assets . || { echo "❌ Ошибка копирования assets/"; exit 1; }
echo "✅ Файлы скопированы в корень для GitHub Pages"

# 3. Проверка изменений
echo "📝 Шаг 3/4: Проверка изменений..."
CHANGES=$(git status --porcelain)
if [ -z "$CHANGES" ]; then
    echo "ℹ️  Нет изменений для коммита. Возможно сайт уже обновлен."
    read -p "Продолжить принудительный деплой? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "✅ Деплой завершен (без изменений)"
        exit 0
    fi
fi

# 4. Git операции
echo "🚀 Шаг 4/4: Коммит и деплой на GitHub..."
BUILD_TIME=$(date -Iseconds)
git add index.html 404.html assets/

# Запрашиваем сообщение коммита
echo ""
echo "Введите описание изменений (или нажмите Enter для стандартного):"
read -r COMMIT_MESSAGE

if [ -z "$COMMIT_MESSAGE" ]; then
    COMMIT_MESSAGE="🚀 Deploy production build

✅ Updated static files for GitHub Pages  
📦 Build time: $BUILD_TIME
🌐 Site: https://johnda7.github.io/island-travel-echo-clone"
else
    COMMIT_MESSAGE="🚀 Deploy: $COMMIT_MESSAGE

📦 Build time: $BUILD_TIME
🌐 https://johnda7.github.io/island-travel-echo-clone"
fi

git commit -m "$COMMIT_MESSAGE" || { echo "❌ Ошибка коммита"; exit 1; }

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