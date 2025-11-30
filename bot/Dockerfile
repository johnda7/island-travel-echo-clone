# Node.js
FROM node:20-alpine

# Пхукет Go Bot v3.0 - обновлено 2025-11-30
ENV BUILD_DATE=2025-11-30T00:00:00

# Рабочая директория
WORKDIR /app

# Копируем package.json из папки bot/
COPY bot/package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем код бота
COPY bot/ ./

# Порт для Koyeb (webhook + health checks)
EXPOSE 8000

# Запускаем улучшенного бота (webhook режим для Koyeb)
CMD ["node", "phuket-go-bot-webhook.js"]
