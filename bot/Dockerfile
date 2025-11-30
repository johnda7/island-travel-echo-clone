# Node.js
FROM node:20-alpine

# Smart AI Bot - Mini App после бронирования
ENV BUILD_DATE=2025-12-01T01:15:00

# Рабочая директория
WORKDIR /app

# Копируем package.json (контекст = папка bot/)
COPY package.json ./

# Устанавливаем зависимости
RUN npm install --omit=dev

# Копируем код бота
COPY *.js ./

# Порт для Koyeb (webhook + health checks)
EXPOSE 8000

# Запускаем AI бота
CMD ["node", "smart-ai-bot.js"]
