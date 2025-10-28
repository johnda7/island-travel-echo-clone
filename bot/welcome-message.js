// 🤖 Telegram Bot - Welcome Message для Пхукет Go
// Файл: bot/  // Текст приветствия
  const welcomeText = `🌴 Привет, ${firstName}!

Тропический рай Пхукета ждёт тебя!

🏝️ Острова с белоснежными пляжами
🌊 Бирюзовые лагуны и коралловые рифы
🎬 Легендарные места из кино
🐘 Дикая природа и настоящие джунгли

✨ Каждая экскурсия — это незабываемое приключение!

📱 Открой каталог и выбери свой идеальный день ⬇️`;ge.js

/**
 * УСТАНОВКА (Node.js):
 * 
 * npm init -y
 * npm install telegraf dotenv
 * 
 * Создай файл .env:
 * BOT_TOKEN=твой_токен_от_BotFather
 * 
 * Запуск:
 * node bot/welcome-message.js
 */

const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// 📊 АНАЛИТИКА ГРУППЫ
const groupStats = {
  messages: 0,
  tourMentions: {
    'Maya Bay': 0,
    'Phi Phi': 0,
    'James Bond': 0,
    'Similan': 0,
    'Bamboo Island': 0,
    'Coral Island': 0,
    'Banana Beach': 0,
    'Racha Island': 0,
    'Khai Islands': 0,
    'Promthep Cape': 0,
    'Cheow Lan Lake': 0
  },
  users: new Set(),
  questions: 0,
  lastReset: new Date()
};

// Ключевые слова для анализа
const keywords = {
  questions: ['цена', 'стоимость', 'сколько', 'когда', 'где', 'как забронировать', 'booking'],
  tours: {
    'Maya Bay': ['maya', 'майя', 'бухта майя', 'мая бей'],
    'Phi Phi': ['phi phi', 'пхи пхи', 'фи фи'],
    'James Bond': ['james', 'джеймс', 'бонд', 'джеймс бонд'],
    'Similan': ['similan', 'симилан'],
    'Bamboo Island': ['bamboo', 'бамбук'],
    'Coral Island': ['coral', 'коралл'],
    'Banana Beach': ['banana', 'банан'],
    'Racha Island': ['racha', 'рача'],
    'Khai Islands': ['khai', 'кхай'],
    'Promthep Cape': ['promthep', 'промтеп'],
    'Cheow Lan Lake': ['cheow lan', 'чео лан', 'озеро']
  }
};

// 🎯 КОМАНДА /start - ГЛАВНАЯ ТОЧКА ВХОДА
bot.start(async (ctx) => {
  const firstName = ctx.from.first_name || 'друг';
  
  // Текст приветствия
  const welcomeText = `🌴 Привет, ${firstName}!

Тропический рай Пхукета ждёт тебя!

🏝️ Острова с белоснежными пляжами
🌊 Бирюзовые лагуны и коралловые рифы
� Легендарные места из кино
🐘 Дикая природа и настоящие джунгли

✨ Каждая экскурсия — это незабываемое приключение!

📱 Открой каталог и выбери свой идеальный день ⬇️`;

  // Клавиатура с кнопками
  await ctx.replyWithMarkdown(welcomeText, 
    Markup.inlineKeyboard([
      [
        Markup.button.webApp(
          '🗺️ Открыть каталог туров', 
          'https://phukeo.com/#/'
        )
      ],
      [
        Markup.button.url(
          '📱 Открыть в полном экране',
          'https://t.me/phuketgos_bot/app'
        )
      ],
      [
        Markup.button.callback('ℹ️ О нас', 'about'),
        Markup.button.callback('☎️ Контакты', 'contacts')
      ]
    ])
  );
});

// ℹ️ КОМАНДА /help
bot.help((ctx) => {
  ctx.reply(`📚 **Как пользоваться ботом:**

1️⃣ Нажми "🗺️ Открыть каталог туров"
2️⃣ Выбери понравившийся тур
3️⃣ Заполни форму бронирования
4️⃣ Мы свяжемся с тобой в течение 1 часа!

💡 **Команды:**
/start - Главное меню
/tours - Список туров
/help - Помощь
/contacts - Наши контакты`);
});

// 🗺️ КОМАНДА /tours - СПИСОК ТУРОВ
bot.command('tours', (ctx) => {
  ctx.replyWithMarkdown(`🗺️ **Наши туры (11 шт):**

🌊 **ОСТРОВА:**
• Пхи-Пхи 2 дня/1 ночь
• 4 жемчужины Андаманского моря
• Остров Джеймса Бонда
• 11 островов МЕГА-тур
• Остров Рача + Коралловый

🎬 **ПРИКЛЮЧЕНИЯ:**
• Рафтинг + СПА + ATV
• Као Лак Сафари
• Аватар Плюс + Хангдонг
• Пханг Нга + Стеклянный мост
• Чео Лан + Самет Нангше

🏛️ **КУЛЬТУРА:**
• Достопримечательности Пхукета

📱 [Открыть каталог](https://t.me/phuketgos_bot/app)`,
    Markup.inlineKeyboard([
      [Markup.button.url('🗺️ Открыть каталог', 'https://t.me/phuketgos_bot/app')]
    ])
  );
});

// ☎️ КОМАНДА /contacts
bot.command('contacts', (ctx) => {
  ctx.replyWithMarkdown(`📞 **Наши контакты:**

🏢 **Офис:** Пхукет, Таиланд
📱 **Telegram:** @phuketgos_bot
🌐 **Сайт:** https://phukeo.com
📧 **Email:** info@phukeo.com

⏰ **Режим работы:** Ежедневно 8:00-20:00 (GMT+7)

💬 Напиши нам прямо сейчас, и мы поможем выбрать идеальный тур!`);
});

// 🔔 CALLBACK КНОПКИ
bot.action('about', (ctx) => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`🌴 **О компании Пхукет Go**

Мы — команда профессионалов с 10+ летним опытом работы на Пхукете.

✨ **Почему мы:**
• 🏆 Лучшие цены без наценок
• ⭐ Рейтинг 4.9/5.0 (2000+ отзывов)
• 🚗 Трансфер включён
• 🎯 Русскоговорящие гиды
• 💯 Гарантия возврата денег

📊 **Статистика:**
• 22 экскурсии
• 50,000+ счастливых туристов
• Большая часть туров — хиты продаж

🎉 Присоединяйся к нам!`);
});

bot.action('contacts', (ctx) => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`📞 **Связаться с нами:**

💬 **Telegram:** @phuketgo_support
📱 **WhatsApp:** +66 XX XXX XXXX
📧 **Email:** booking@phukeo.com

⚡ **Быстрая связь:** 
Напиши прямо в этот чат, и мы ответим в течение 30 минут!

🕐 Работаем: 8:00-20:00 (GMT+7)`);
});

// 💬 ОБРАБОТКА ТЕКСТОВЫХ СООБЩЕНИЙ
bot.on('text', (ctx) => {
  const text = ctx.message.text.toLowerCase();
  
  // Ключевые слова для быстрых ответов
  if (text.includes('цена') || text.includes('стоимость') || text.includes('сколько')) {
    ctx.reply('💰 Цены на туры смотри в каталоге: https://t.me/phuketgos_bot/app\n\nВыбери тур и увидишь точную стоимость!');
  } else if (text.includes('забронировать') || text.includes('заказать')) {
    ctx.reply('✅ Отлично! Открой каталог и выбери тур:\nhttps://t.me/phuketgos_bot/app\n\nЗатем нажми "Забронировать" и заполни форму.');
  } else if (text.includes('контакт') || text.includes('связь')) {
    ctx.reply('📞 Пиши прямо сюда! Мы отвечаем в течение 30 минут.\n\nИли используй команду /contacts');
  } else {
    ctx.reply(`👋 Привет! Я бот Пхукет Go.\n\n🗺️ Хочешь посмотреть туры? Нажми /start\n📚 Нужна помощь? Нажми /help`);
  }
});

// � КОМАНДА /getid - Получить ID группы/чата
bot.command('getid', (ctx) => {
  const chatId = ctx.chat.id;
  const chatType = ctx.chat.type;
  const chatTitle = ctx.chat.title || 'Личный чат';
  
  ctx.reply(`📊 Информация о чате:

🆔 ID: \`${chatId}\`
📝 Тип: ${chatType}
🏷️ Название: ${chatTitle}

${chatType === 'private' ? '💡 Добавь бота в группу и используй эту команду там, чтобы получить ID группы' : '✅ Сохрани этот ID для настройки бота'}`, 
    { parse_mode: 'Markdown' }
  );
});

// 📊 КОМАНДА /stats - Статистика группы (для админа)
bot.command('stats', async (ctx) => {
  const chatType = ctx.chat.type;
  
  // Только для групп
  if (chatType === 'private') {
    return ctx.reply('❌ Эта команда работает только в группах');
  }
  
  // Формируем отчёт
  const topTours = Object.entries(groupStats.tourMentions)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 0)
    .slice(0, 5)
    .map(([tour, count]) => `${tour}: ${count} упоминаний`)
    .join('\n') || 'Пока нет данных';
  
  const report = `📊 **Статистика группы**

💬 Всего сообщений: ${groupStats.messages}
👥 Уникальных пользователей: ${groupStats.users.size}
❓ Вопросов: ${groupStats.questions}

🏆 **Топ туров:**
${topTours}

📅 Период: с ${groupStats.lastReset.toLocaleDateString('ru-RU')}`;

  ctx.replyWithMarkdown(report);
});

// 🔄 КОМАНДА /resetstats - Сбросить статистику (для тестирования)
bot.command('resetstats', (ctx) => {
  groupStats.messages = 0;
  Object.keys(groupStats.tourMentions).forEach(key => groupStats.tourMentions[key] = 0);
  groupStats.users.clear();
  groupStats.questions = 0;
  groupStats.lastReset = new Date();
  
  ctx.reply('✅ Статистика сброшена!');
});

// 📝 ОБРАБОТЧИК ВСЕХ СООБЩЕНИЙ В ГРУППЕ
bot.on('text', (ctx) => {
  const chatType = ctx.chat.type;
  
  // Работаем только в группах/супергруппах
  if (chatType !== 'group' && chatType !== 'supergroup') {
    return; // В личке обработка идёт выше через bot.on('message')
  }
  
  const text = ctx.message.text.toLowerCase();
  const userId = ctx.from.id;
  
  // Собираем статистику
  groupStats.messages++;
  groupStats.users.add(userId);
  
  // Анализируем упоминания туров
  Object.entries(keywords.tours).forEach(([tourName, tourKeywords]) => {
    if (tourKeywords.some(keyword => text.includes(keyword.toLowerCase()))) {
      groupStats.tourMentions[tourName]++;
    }
  });
  
  // Считаем вопросы
  if (keywords.questions.some(keyword => text.includes(keyword))) {
    groupStats.questions++;
  }
  
  // Логируем в консоль для мониторинга
  console.log(`📊 [${ctx.chat.title}] Сообщение от ${ctx.from.first_name}: "${text.substring(0, 50)}..."`);
});

// �🚀 ЗАПУСК БОТА
bot.launch().then(() => {
  console.log('✅ Бот Пхукет Go запущен!');
  console.log('📱 Тестируй: https://t.me/phuketgos_bot');
  console.log('🗺️ Mini App: https://t.me/phuketgos_bot/app');
  console.log('');
  console.log('📊 Режим аналитики групп активирован');
  console.log('💡 Добавь бота в группу и используй команды:');
  console.log('   /getid - получить ID группы');
  console.log('   /stats - посмотреть статистику');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// 🎯 ДОПОЛНИТЕЛЬНЫЕ ФИЧИ (раскомментируй если нужно):

/*
// 📊 СТАТИСТИКА ПОЛЬЗОВАТЕЛЕЙ
const stats = new Map();

bot.use(async (ctx, next) => {
  const userId = ctx.from?.id;
  if (userId) {
    stats.set(userId, {
      username: ctx.from.username,
      first_name: ctx.from.first_name,
      last_visit: new Date()
    });
    console.log(`👤 Пользователей: ${stats.size}`);
  }
  return next();
});

// 🔔 РАССЫЛКА (только для админа)
const ADMIN_ID = 123456789; // Твой Telegram ID

bot.command('broadcast', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    return ctx.reply('❌ Только для админа');
  }
  
  const message = ctx.message.text.replace('/broadcast ', '');
  let sent = 0;
  
  for (const [userId] of stats) {
    try {
      await bot.telegram.sendMessage(userId, message);
      sent++;
    } catch (e) {
      console.error(`Ошибка отправки ${userId}:`, e.message);
    }
  }
  
  ctx.reply(`✅ Рассылка завершена: ${sent}/${stats.size}`);
});

// 📈 АНАЛИТИКА
bot.command('stats', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    return ctx.reply('❌ Только для админа');
  }
  
  ctx.reply(`📊 Статистика бота:
👤 Всего пользователей: ${stats.size}
📅 Запущен: ${new Date().toLocaleString('ru-RU')}`);
});
*/
