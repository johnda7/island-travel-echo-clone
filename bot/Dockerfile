# Node.js
FROM node:20-alpine

# Smart AI Bot - новое меню без AI и Менеджера
ENV BUILD_DATE=2025-12-01T00:45:00

# Рабочая директория
WORKDIR /app

# Копируем package.json из папки bot/
COPY bot/package*.json ./

# Устанавливаем зависимости
RUN npm install --omit=dev

# Копируем код бота из папки bot/
COPY bot/*.js ./

# Порт для Koyeb (webhook + health checks)
EXPOSE 8000

# Запускаем AI бота
CMD ["node", "smart-ai-bot.js"]
