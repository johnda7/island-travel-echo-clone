# Node.js
FROM node:20-alpine

# Smart AI Bot - новое меню
ENV BUILD_DATE=2025-12-01T01:10:00

# Рабочая директория
WORKDIR /app

# Копируем package.json из папки bot/
COPY bot/package.json ./

# Устанавливаем зависимости
RUN npm install --omit=dev

# Копируем код бота
COPY bot/ ./

# Порт для Koyeb (webhook + health checks)
EXPOSE 8000

# Запускаем AI бота
CMD ["node", "smart-ai-bot.js"]
