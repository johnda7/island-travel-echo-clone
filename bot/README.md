# 🤖 Telegram Bot Setup - Пхукет Go

## 📋 **Быстрый старт (5 минут)**

### **1. Установка зависимостей**

```bash
cd bot
npm init -y
npm install telegraf dotenv
```

### **2. Создать файл .env**

```bash
cp .env.example .env
```

Открой `.env` и вставь свой токен:
```
BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

### **3. Запустить бота**

```bash
node welcome-message.js
```

Должно появиться:
```
✅ Бот Пхукет Go запущен!
📱 Тестируй: https://t.me/phuketgos_bot
🗺️ Mini App: https://t.me/phuketgos_bot/app
```

---

## 🎯 **Что умеет бот**

### **Команды:**
- `/start` — главное меню с кнопками
- `/tours` — список всех 11 туров
- `/help` — помощь
- `/contacts` — контактная информация

### **Кнопки:**
- 🗺️ **Открыть каталог туров** — WebApp кнопка (встроенная)
- 📱 **Открыть в полном экране** — Direct Link на Mini App
- ℹ️ **О нас** — информация о компании
- ☎️ **Контакты** — способы связи

### **Умные ответы на ключевые слова:**
- "цена", "стоимость" → ссылка на каталог
- "забронировать", "заказать" → инструкция
- "контакт", "связь" → контактная информация

---

## 🚀 **Deploy на сервер (продакшн)**

### **Вариант A: PM2 (Node.js сервер)**

```bash
# Установить PM2
npm install -g pm2

# Запустить бота
pm2 start welcome-message.js --name phuket-bot

# Автозапуск при перезагрузке
pm2 startup
pm2 save

# Мониторинг
pm2 status
pm2 logs phuket-bot
```

### **Вариант B: Docker**

Создай `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["node", "welcome-message.js"]
```

Запуск:
```bash
docker build -t phuket-bot .
docker run -d --env-file .env --name phuket-bot phuket-bot
```

### **Вариант C: Heroku (бесплатно)**

```bash
# Установить Heroku CLI
heroku login
heroku create phuket-bot

# Добавить токен
heroku config:set BOT_TOKEN=your_token

# Deploy
git push heroku main
```

---

## 📊 **Дополнительные фичи**

### **1. Статистика пользователей**

В `welcome-message.js` раскомментируй блок:
```javascript
// 📊 СТАТИСТИКА ПОЛЬЗОВАТЕЛЕЙ
```

Команда для админа:
```
/stats — посмотреть количество пользователей
```

### **2. Рассылка сообщений**

В `.env` добавь свой ID:
```
ADMIN_ID=твой_telegram_id
```

Команда для рассылки:
```
/broadcast Привет! Новый тур со скидкой 20%!
```

### **3. Webhook вместо polling**

Для продакшна лучше использовать webhook:

```javascript
// Замени bot.launch() на:
const express = require('express');
const app = express();

app.use(bot.webhookCallback('/webhook'));
bot.telegram.setWebhook('https://your-server.com/webhook');

app.listen(3000, () => console.log('Webhook running'));
```

---

## 🧪 **Тестирование**

### **1. Локально:**
```bash
node welcome-message.js
```

Открой бота в Telegram и напиши `/start`

### **2. Проверка команд:**
```
/start    — главное меню
/tours    — список туров
/help     — помощь
/contacts — контакты
```

### **3. Проверка кнопок:**
- Нажми "🗺️ Открыть каталог туров"
- Должен открыться Mini App встроенно

---

## ⚠️ **Важно!**

### **1. Безопасность:**
- ❌ **НЕ КОММИТЬ** файл `.env` в Git!
- ✅ Добавь `.env` в `.gitignore`

### **2. Rate Limits:**
Telegram ограничивает:
- 30 сообщений в секунду
- 20 рассылок в минуту

### **3. Токен бота:**
Получить новый токен:
```
@BotFather → /newbot → следуй инструкциям
```

---

## 📱 **Интеграция с сайтом**

Бот уже настроен на работу с:
- ✅ `https://phukeo.com/#/` — сайт с турами
- ✅ `https://t.me/phuketgos_bot/app` — Mini App ссылка

Все бронирования с сайта приходят в Telegram!

---

## 🎯 **Следующие шаги:**

1. **Кастомизация текстов** — измени приветствие под себя
2. **Добавить фотографии** — `ctx.replyWithPhoto()`
3. **Интеграция с CRM** — сохранение заявок в базу
4. **Telegram Payments** — приём оплат через бота
5. **Уведомления** — автоматические напоминания

---

**Вопросы? Пиши в чат!** 🚀
