# 🌐 Полная Инструкция: Регистрация и Настройка Домена для GitHub Pages

## 📋 Оглавление
1. [Выбор регистратора](#выбор-регистратора)
2. [Регистрация домена](#регистрация-домена)
3. [Настройка DNS](#настройка-dns)
4. [Подключение к GitHub Pages](#подключение-к-github-pages)
5. [Активация HTTPS](#активация-https)
6. [Проверка и диагностика](#проверка-и-диагностика)
7. [Частые проблемы](#частые-проблемы)

---

## 1. Выбор Регистратора

### ✅ Рекомендуемые (быстро работают):
- **Cloudflare** - бесплатный DNS, работает за 5-10 минут
- **Namecheap** - надёжный, DNS за 10-30 минут
- **Google Domains** - простой, DNS за 15-30 минут
- **GoDaddy** - популярный, DNS за 30-60 минут

### ⚠️ Не рекомендуем:
- **Regxa** - глючит CNAME, долгая propagation (использовали для phukeo.com, были проблемы)

### 💰 Стоимость:
- `.com` домен: $10-15/год
- `.net` домен: $12-18/год
- `.io` домен: $30-50/год

---

## 2. Регистрация Домена

### Шаг 1: Выбор имени
```
Примеры хороших имен:
- phukeo.com ✅
- phuketgo.com ✅
- island-travel.com ✅

Избегайте:
- Длинных имен (>15 символов)
- Сложного написания
- Цифр в середине
```

### Шаг 2: Покупка
1. Зайди на сайт регистратора
2. Найди свободный домен
3. Добавь в корзину
4. **ВАЖНО:** Отключи дополнительные услуги:
   - ❌ Privacy Protection (не нужно для бизнеса)
   - ❌ Email hosting (настроим потом отдельно)
   - ❌ Website builder (у нас свой сайт)
5. Оплати картой

### Шаг 3: Подтверждение
- Проверь email
- Подтверди владение доменом (письмо от ICANN)
- Дождись активации (обычно 5-30 минут)

---

## 3. Настройка DNS

### 🎯 Для GitHub Pages нужно:
- **4 A-записи** для корня домена
- **4 A-записи** для www поддомена
- **CNAME файл** в репозитории

### Шаг 1: Зайди в DNS Management

**Cloudflare:**
```
Dashboard → Websites → [твой домен] → DNS → Records
```

**Namecheap:**
```
Domain List → [твой домен] → Manage → Advanced DNS
```

**GoDaddy:**
```
My Products → Domains → [твой домен] → DNS Management
```

### Шаг 2: Добавь A-записи для корня

**Удали все существующие A-записи!** Затем добавь 4 новых:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| A | @ (или пусто, или твой-домен.com) | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Важно:**
- **Name/Host:** используй **@** (это корень домена)
- Если не принимает @, пиши **твой-домен.com** (например: phukeo.com)
- **НЕ** пиши `www` или другой поддомен!

### Шаг 3: Добавь A-записи для www

**Добавь ещё 4 записи:**

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| A | www | 185.199.108.153 | 3600 |
| A | www | 185.199.109.153 | 3600 |
| A | www | 185.199.110.153 | 3600 |
| A | www | 185.199.111.153 | 3600 |

**Альтернатива:** Можно использовать 1 CNAME вместо 4 A для www:
```
Type: CNAME
Name: www
Value: твой-username.github.io
TTL: 3600
```

**НО:** У некоторых регистраторов (Regxa) CNAME глючит. Безопаснее использовать A-записи.

### Шаг 4: Проверь настройки

**Итого должно быть 8 DNS записей:**
```
✅ 4 A-записи для @ (корень домена)
✅ 4 A-записи для www
```

### Шаг 5: Сохрани изменения
- Нажми Save/Apply/Update
- Если есть кнопка "Publish Zone" - нажми её!

---

## 4. Подключение к GitHub Pages

### Шаг 1: Создай CNAME файл в репозитории

**Путь:** `public/CNAME`

**Содержимое:**
```
твой-домен.com
```

**Пример для phukeo.com:**
```
phukeo.com
```

**Важно:**
- БЕЗ https://
- БЕЗ www
- БЕЗ слэшей
- Только доменное имя!

### Шаг 2: Задеплой изменения

```bash
git add public/CNAME
git commit -m "feat: добавлен CNAME для custom domain"
git push origin main
```

Подожди 2-3 минуты пока GitHub Actions задеплоит.

### Шаг 3: Настрой GitHub Pages

1. Зайди в Settings → Pages:
   ```
   https://github.com/твой-username/твой-репо/settings/pages
   ```

2. В разделе **Custom domain** введи:
   ```
   твой-домен.com
   ```

3. Нажми **Save**

4. Подожди 10-30 секунд

5. Обнови страницу (F5)

### Шаг 4: Проверь статус

**Хороший статус:**
```
✅ DNS check successful
Your site is published at https://твой-домен.com
```

**Плохой статус:**
```
❌ DNS check unsuccessful
Domain's DNS record could not be retrieved
```

**Если ошибка:**
- Подожди ещё 5-10 минут (DNS propagation)
- Проверь DNS записи (см. раздел 6)
- Попробуй нажать "Check again"

---

## 5. Активация HTTPS

### Когда DNS check успешен:

1. Поставь галочку **"Enforce HTTPS"**

2. Подожди 5-10 минут

3. GitHub выпустит SSL сертификат от Let's Encrypt

4. Сайт будет доступен на:
   - ✅ https://твой-домен.com
   - ✅ https://www.твой-домен.com
   - ✅ http://твой-домен.com (редирект на HTTPS)

### Если кнопка неактивна:
```
⚠️ Not yet available for your site because the certificate has not finished being issued
```

**Решение:** Подожди 10-30 минут. GitHub генерирует сертификат.

---

## 6. Проверка и Диагностика

### Проверка DNS через терминал:

**1. Проверь корень домена:**
```bash
dig твой-домен.com A +short
```

**Должно вернуть 4 IP:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**2. Проверь www:**
```bash
dig www.твой-домен.com A +short
```

**Должно вернуть те же 4 IP (или CNAME).**

**3. Проверь сайт:**
```bash
curl -I http://твой-домен.com
```

**Должно вернуть:**
```
HTTP/1.1 200 OK
или
HTTP/1.1 301 Moved Permanently (редирект на HTTPS)
```

### Проверка через онлайн-инструменты:

**DNS Propagation:**
```
https://www.whatsmydns.net/
```
Введи `твой-домен.com`, выбери `A`, проверь по всему миру.

**SSL Certificate:**
```
https://www.ssllabs.com/ssltest/
```
Проверь качество SSL сертификата (должно быть A или A+).

---

## 7. Частые Проблемы

### ❌ Проблема 1: DNS check unsuccessful

**Причины:**
- DNS ещё не распространились (подожди 10-60 минут)
- Неправильные DNS записи
- Nameservers не обновились

**Решение:**
```bash
# Проверь прямо на авторитетных NS провайдера
# Узнай nameservers:
dig твой-домен.com NS +short

# Проверь A-записи:
dig @nameserver1 твой-домен.com A +short
```

Если пусто → проблема у регистратора, пиши в поддержку.

### ❌ Проблема 2: www не работает

**Причины:**
- CNAME не публикуется (глюк провайдера)
- Нет A-записей для www

**Решение:**
Замени CNAME на 4 A-записи для www (как в разделе 3).

### ❌ Проблема 3: 404 страница

**Причины:**
- GitHub Pages не привязал домен к репозиторию
- CNAME файл отсутствует или неправильный
- HashRouter в React требует редирект

**Решение:**
1. Проверь `public/CNAME` - должен содержать только домен
2. Убедись что файл задеплоен (есть в ветке gh-pages или main)
3. Для React HashRouter добавь скрипт редиректа в index.html:

```javascript
<script>
  (function() {
    var l = window.location;
    var isCustomDomain = l.hostname !== 'username.github.io';
    var basePath = isCustomDomain ? '' : '/repo-name';
    
    if (!l.hash) {
      if (isCustomDomain && l.pathname !== '/') {
        l.replace(basePath + '/#' + l.pathname + l.search);
      } else if (!isCustomDomain && l.pathname !== basePath + '/' && l.pathname !== basePath) {
        var path = l.pathname.replace(basePath, '') || '/';
        l.replace(basePath + '/#' + path + l.search);
      } else {
        l.replace(basePath + '/#/');
      }
    }
  })();
</script>
```

### ❌ Проблема 4: HTTPS не работает

**Причины:**
- Enforce HTTPS не включён
- Сертификат ещё генерируется
- DNS недавно изменились

**Решение:**
1. Подожди 30 минут после DNS check success
2. Включи Enforce HTTPS
3. Подожди ещё 10 минут
4. Очисти кэш браузера (Ctrl+Shift+Delete)

### ❌ Проблема 5: Долгая propagation (>6 часов)

**Причины:**
- Провайдер не публикует записи в зону
- Nameservers не обновились

**Решение:**
1. Проверь записи напрямую на NS:
```bash
dig @nameserver1 твой-домен.com A +short
```

2. Если пусто → пиши в поддержку регистратора:
```
Hello,

DNS records for my domain [домен] are configured in control panel 
but not published to authoritative nameservers ([NS1, NS2]).

dig @[NS] [домен] A +short returns empty.

Please verify zone publication/synchronization.

Thank you.
```

3. Если долго не отвечают → **смени регистратора на Cloudflare:**
   - Transfer domain или
   - Смени только Nameservers на Cloudflare NS

---

## 🎯 Чеклист Успешной Настройки

```
✅ Домен куплен и активирован
✅ 4 A-записи для @ (корень) добавлены
✅ 4 A-записи для www добавлены
✅ TTL установлен на 3600 или меньше
✅ Изменения сохранены в DNS панели
✅ CNAME файл создан в public/CNAME
✅ CNAME файл задеплоен на GitHub
✅ Custom domain добавлен в GitHub Pages Settings
✅ DNS check successful в GitHub Pages
✅ Enforce HTTPS включён
✅ Сайт открывается на https://твой-домен.com
✅ www редиректит на основной домен
✅ SSL сертификат валидный (зелёный замок)
```

---

## ⏱️ Таймлайн Настройки

**Оптимальный сценарий (Cloudflare):**
- Регистрация домена: 5 минут
- DNS настройка: 3 минуты
- DNS propagation: 5-10 минут
- GitHub Pages активация: 2 минуты
- HTTPS сертификат: 10 минут
- **Итого: 25-30 минут** ✅

**Средний сценарий (Namecheap, Google Domains):**
- Регистрация домена: 10 минут
- DNS настройка: 5 минут
- DNS propagation: 30-60 минут
- GitHub Pages активация: 5 минут
- HTTPS сертификат: 15 минут
- **Итого: 65-95 минут** ⚠️

**Плохой сценарий (Regxa, некоторые дешёвые провайдеры):**
- Регистрация домена: 15 минут
- DNS настройка: 10 минут
- DNS propagation: 4-72 часа (!!)
- Проблемы с CNAME: +2 часа
- GitHub Pages активация: 10 минут
- HTTPS сертификат: 20 минут
- **Итого: 6-75 часов** ❌

---

## 💡 Советы и Лайфхаки

### 1. Быстрая проверка DNS
```bash
# Алиас для удобства (добавь в ~/.zshrc или ~/.bashrc):
alias checkdns='f(){ dig @8.8.8.8 $1 A +short && dig @1.1.1.1 $1 A +short; }; f'

# Использование:
checkdns phukeo.com
```

### 2. Автоматический мониторинг
Создай скрипт `check_dns.sh`:
```bash
#!/bin/bash
DOMAIN="твой-домен.com"
while true; do
  RESULT=$(dig @8.8.8.8 $DOMAIN A +short)
  if [ -n "$RESULT" ]; then
    echo "✅ DNS заработал! IP: $RESULT"
    # macOS notification:
    osascript -e "display notification \"DNS активирован!\" with title \"✅ $DOMAIN\""
    break
  fi
  echo "⏳ $(date '+%H:%M:%S') - Ждём DNS..."
  sleep 60
done
```

Запусти:
```bash
chmod +x check_dns.sh
./check_dns.sh
```

### 3. GitHub Actions для деплоя с CNAME
Убедись что workflow сохраняет CNAME:
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
    cname: твой-домен.com  # ← Важно!
```

### 4. Редирект www → без www (или наоборот)
Это делает сам GitHub Pages автоматически! Не нужно ничего настраивать.

### 5. Мультидоменность
Можно купить несколько доменов и все направить на один сайт:
- phukeo.com (основной)
- phuketgo.com (редирект)
- phukettours.com (редирект)

Настрой DNS для всех, но в GitHub Pages укажи только один основной.

---

## 📚 Полезные Ссылки

**Официальная документация GitHub:**
```
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
```

**Проверка DNS:**
```
https://www.whatsmydns.net/
https://dnschecker.org/
```

**Проверка SSL:**
```
https://www.ssllabs.com/ssltest/
```

**Регистраторы:**
```
https://www.cloudflare.com/products/registrar/
https://www.namecheap.com/
https://domains.google/
```

---

## 📝 История Изменений

- **05.10.2025** - Создан на основе опыта настройки phukeo.com
- Проблемы с Regxa: CNAME не публиковался, propagation 21+ часов
- Решение: замена CNAME на A-записи для www

---

**Автор:** CEO-партнёр AI Agent  
**Проект:** Island Travel (phukeo.com)  
**Дата:** 05.10.2025
