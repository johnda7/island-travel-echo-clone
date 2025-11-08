# Node.js
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем весь код
COPY . .

# Порт (если понадобится для health check)
EXPOSE 3000

# Запускаем бота
CMD ["node", "welcome-message.js"]
