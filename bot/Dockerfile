# Node.js
FROM node:20-alpine

# Smart AI Bot - updated 2025-11-10
ENV BUILD_DATE=2025-11-10T00:00:00

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

# Запускаем AI бота с GPT-3.5-turbo
CMD ["node", "smart-ai-bot.js"]
