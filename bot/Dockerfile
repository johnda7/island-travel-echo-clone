# Node.js
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json из папки bot/
COPY bot/package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем код бота
COPY bot/ ./

# Порт (если понадобится для health check)
EXPOSE 3000

# Запускаем бота
CMD ["node", "welcome-message.js"]
