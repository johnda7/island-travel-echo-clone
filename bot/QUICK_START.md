# 🚀 Быстрая настройка Koyeb - 5 минут

## 1️⃣ Переменные окружения в Koyeb

```
BOT_TOKEN=<ваш_токен_от_BotFather>
PORT=8000
WEBHOOK_DOMAIN=<ваш-домен>.koyeb.app
```

❗ **ВАЖНО**: Скопируйте домен из Koyeb (без `https://`)

## 2️⃣ Service Settings

- **Port**: `8000`
- **Health check path**: `/health`
- **Instance**: Nano или Micro

## 3️⃣ Деплой

```bash
git add bot/
git commit -m "fix: webhook mode для Koyeb"
git push
```

Или нажмите **Redeploy** в Koyeb Dashboard.

## 4️⃣ Проверка

```bash
# Health check
curl https://ваш-домен.koyeb.app/health

# Webhook status
curl https://api.telegram.org/bot<ТОКЕН>/getWebhookInfo

# Тест бота
# Напишите /start в Telegram
```

## ✅ Что должно работать

- [ ] `/health` возвращает `{"status":"ok"}`
- [ ] Webhook URL установлен правильно
- [ ] Бот отвечает на `/start` в Telegram
- [ ] Логи показывают "✅ Webhook установлен"

---

📖 Полная инструкция: `KOYEB_DEPLOY_INSTRUCTIONS.md`
