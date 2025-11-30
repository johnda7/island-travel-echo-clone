# Node.js
FROM node:20-alpine

# Smart AI Bot - обновлено 2025-11-30
ENV BUILD_DATE=2025-11-30T18:30:00

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

# Запускаем AI бота (как было раньше - работает стабильно)
CMD ["node", "smart-ai-bot.js"]
