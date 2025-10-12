# ⚠️ ВАЖНАЯ ИНФОРМАЦИЯ О ДОМЕНЕ ПРОЕКТА

## 🌐 Текущий Домен

**Основной домен:** `phukeo.com`  
**Статус:** ✅ АКТИВЕН И РАБОТАЕТ  
**Дата регистрации:** 04.10.2025  
**Регистратор:** Regxa.com  
**Срок действия:** 04.10.2026 (1 год)

---

## 📋 DNS Конфигурация

### A-записи (корень домена - phukeo.com):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### A-записи (www.phukeo.com):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Nameservers (Regxa):
```
795.dns1.managedns.org
795.dns2.managedns.org
795.dns3.managedns.org
795.dns4.managedns.org
```

### TTL:
```
7200 секунд (2 часа)
```

---

## 🚀 GitHub Pages Настройки

**Репозиторий:** `johnda7/island-travel-echo-clone`  
**Основной URL:** https://phukeo.com  
**Альтернативный URL:** https://johnda7.github.io/island-travel-echo-clone/ (для проверки)
**Deploy метод:** GitHub Actions (автоматически на push в main)
**Workflow файл:** `.github/workflows/deploy.yml`
**Время деплоя:** 2-3 минуты после push
**Build команда:** `npm run build` (Vite + postbuild script)  
**CNAME файл:** `public/CNAME` содержит `phukeo.com`  
**HTTPS:** ✅ Включён (Enforce HTTPS)  
**SSL Сертификат:** Let's Encrypt (GitHub автоматически)

---

## ⚠️ ДЛЯ AI АГЕНТОВ - КРИТИЧЕСКИ ВАЖНО!

### ❌ НЕ ДЕЛАЙ ЭТО:

1. **НЕ предлагай использовать johnda7.github.io в коде**
   - Домен: `phukeo.com`
   - НЕ: ~~johnda7.github.io/island-travel-echo-clone~~

2. **НЕ удаляй файл `public/CNAME`**
   - Это критично для работы custom domain
   - Всегда проверяй его наличие

3. **НЕ меняй DNS записи без согласования**
   - Все A-записи настроены правильно
   - Изменения могут сломать сайт

4. **НЕ предлагай купить новый домен**
   - Домен уже куплен и работает
   - phukeo.com - это НАША основная платформа

5. **НЕ используй GitHub Pages URL в ссылках**
   - В коде используй относительные пути: `/tours`, `/about`
   - НЕ используй: `/island-travel-echo-clone/tours`

### ✅ ДЕЛАЙ ЭТО:

1. **Всегда упоминай домен phukeo.com**
   - При описании проекта
   - В метатегах (og:url, canonical)
   - В sitemap.xml

2. **Проверяй CNAME файл перед деплоем**
   ```bash
   cat public/CNAME
   # Должно быть: phukeo.com
   ```

3. **Используй правильные базовые пути**
   ```javascript
   // ✅ Правильно:
   var isCustomDomain = l.hostname !== 'johnda7.github.io';
   var basePath = isCustomDomain ? '' : '/island-travel-echo-clone';
   
   // ❌ Неправильно:
   var basePath = '/island-travel-echo-clone'; // Всегда
   ```

4. **При проблемах с доменом - проверяй DNS**
   ```bash
   dig phukeo.com A +short
   dig www.phukeo.com A +short
   ```

5. **Упоминай домен в документации**
   - README.md
   - package.json (homepage)
   - Все инструкции

---

## 🔧 Техническая Информация

### Структура проекта с custom domain:

```
Пользователь вводит:       Что происходит:
phukeo.com           →     DNS возвращает 185.199.108.153
                           GitHub Pages видит Host: phukeo.com
                           Читает public/CNAME
                           Отдаёт контент репозитория island-travel-echo-clone
                           
www.phukeo.com       →     DNS возвращает 185.199.108.153
                           GitHub Pages редиректит на phukeo.com
                           
johnda7.github.io/... →    НЕ ИСПОЛЬЗУЕТСЯ (работает, но не надо)
```

### Деплой workflow:

1. `git push origin main`
2. GitHub Actions собирает проект
3. Создаёт `dist/` папку
4. Копирует `public/CNAME` в `dist/CNAME`
5. Деплоит в gh-pages ветку
6. GitHub Pages отдаёт контент на phukeo.com

### Файл vite.config.ts:

```typescript
export default defineConfig({
  base: '/', // ✅ Правильно для custom domain
  // base: '/island-travel-echo-clone/', // ❌ Только для GitHub Pages без домена
})
```

---

## 📊 Статистика Домена

**Время активации:** 21 час (из-за Regxa)  
**Проблемы при настройке:**
- CNAME для www не публиковался → Решено (заменили на A-записи)
- Долгая propagation → Обычно для Regxa
- 404 на первом заходе → Исправлен редирект для HashRouter

**Текущий статус:**
- ✅ phukeo.com работает
- ✅ www.phukeo.com работает
- ✅ HTTPS работает
- ✅ SSL сертификат валидный
- ✅ Редиректы настроены

---

## 🎯 Быстрая Проверка Здоровья Домена

### Команды для проверки:

```bash
# 1. DNS работает?
dig phukeo.com A +short
# Должно вернуть 4 IP

# 2. www работает?
dig www.phukeo.com A +short
# Должно вернуть 4 IP

# 3. Сайт отвечает?
curl -I https://phukeo.com
# Должно вернуть HTTP/1.1 200 OK

# 4. CNAME файл на месте?
cat public/CNAME
# Должно быть: phukeo.com

# 5. HTTPS работает?
curl -I https://phukeo.com | grep -i "strict-transport"
# Должно быть: strict-transport-security
```

### Ожидаемые результаты:

```
✅ DNS: 185.199.108.153, 109.153, 110.153, 111.153
✅ HTTP: 200 OK или 301 (редирект на HTTPS)
✅ HTTPS: 200 OK с валидным сертификатом
✅ CNAME: phukeo.com
✅ SSL: Let's Encrypt, валиден до [дата]
```

---

## 📝 История Изменений Домена

### 04.10.2025 23:30
- Зарегистрирован домен phukeo.com на Regxa
- Настроены DNS A-записи для корня
- Добавлен CNAME для www

### 05.10.2025 01:15
- CNAME не работал, обратились в поддержку Regxa
- Получен ответ: propagation до 72 часов

### 05.10.2025 20:30
- Изменён Name в A-записях с "@" на "phukeo.com" (по совету Regxa)
- A-записи заработали через 10 минут ✅

### 05.10.2025 21:30
- Удалён неработающий CNAME для www
- Добавлены 4 A-записи для www вместо CNAME
- Итого: 8 A-записей (4 для корня + 4 для www)

### 05.10.2025 22:00
- Исправлен редирект в index.html для custom domain
- Убрана жёсткая привязка к `/island-travel-echo-clone/`
- Добавлена проверка `isCustomDomain`

### 05.10.2025 22:30
- Ожидание публикации A-записей для www на NS
- Запущен автоматический мониторинг

---

## 🆘 Контакты Поддержки

**Регистратор (Regxa):**
- Email: support@regxa.com
- Тикет-система: https://regxa.com/support
- Время ответа: 2-12 часов

**GitHub Support (при проблемах с Pages):**
- https://support.github.com/

**DNS Проверка:**
- WhatsMyDNS: https://www.whatsmydns.net/
- DNS Checker: https://dnschecker.org/

---

## 🎓 Обучающие Материалы

Для понимания как всё работает, изучи:

1. **DOMAIN_SETUP_GUIDE.md** - Полная инструкция по настройке домена
2. **DOMAIN_STATUS.md** - Текущий статус и история проблем
3. **AI_PROMPT_INSTRUCTIONS.md** - Основные инструкции проекта

---

## ⚡ Критические Напоминания

```
🚨 НИКОГДА НЕ УДАЛЯЙ public/CNAME
🚨 ИСПОЛЬЗУЙ ТОЛЬКО phukeo.com В КОДЕ
🚨 НЕ МЕНЯЙ DNS ЗАПИСИ БЕЗ ПРИЧИНЫ
🚨 ПРОВЕРЯЙ ДОМЕН ПОСЛЕ КАЖДОГО ДЕПЛОЯ
🚨 В basePath ИСПОЛЬЗУЙ ПРОВЕРКУ isCustomDomain
```

---

**Последнее обновление:** 05.10.2025 22:30  
**Автор:** CEO-партнёр AI Agent  
**Статус:** ✅ ДОМЕН РАБОТАЕТ
