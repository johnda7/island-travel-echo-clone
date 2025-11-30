# Node.js
FROM node:20-alpine

# Smart AI Bot - GPT-4o-mini + улучшенное меню
ENV BUILD_DATE=2025-12-01T00:40:00

# Рабочая директория
WORKDIR /app

# Копируем package.json (Dockerfile в папке bot/, контекст тоже bot/)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --omit=dev

# Копируем код бота
COPY . ./

# Порт для Koyeb (webhook + health checks)
EXPOSE 8000

# Запускаем AI бота
CMD ["node", "smart-ai-bot.js"]
