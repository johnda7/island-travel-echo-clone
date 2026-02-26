// 🤖 Telegram Bot - Welcome Message для Пхукет Go
// Файл: bot/welcome-message-v2.js

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
    'Cheow Lan Lake': 0,
    'Phi Phi Racha Maiton': 0,
    'Elephant Beach Spa': 0,
    'Coral Islands Rawai': 0,
    'Diving Andaman': 0
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
    'Cheow Lan Lake': ['cheow lan', 'чео лан', 'озеро'],
    'Phi Phi Racha Maiton': ['майтон', 'maiton', 'рача яй', 'racha yai', 'закат'],
    'Elephant Beach Spa': ['слон', 'elephant', 'самет', 'мантра', 'mantra', 'спа'],
    'Coral Islands Rawai': ['раваи', 'rawai', 'коралловые острова'],
    'Diving Andaman': ['дайвинг', 'diving', 'погружение', 'андаман']
  }
};

// 🎯 КОМАНДА /start
bot.start(async (ctx) => {
  const firstName = ctx.from.first_name || 'друг';
  const chatType = ctx.chat.type;
  
  const welcomeText = `🌴 Привет, ${firstName}!

Тропический рай Пхукета ждёт тебя!

🏝️ Острова с белоснежными пляжами
🌊 Бирюзовые лагуны и коралловые рифы
🎬 Легендарные места из кино
🐘 Дикая природа и настоящие джунгли

✨ Каждая экскурсия — это незабываемое приключение!

📱 Открой каталог и выбери свой идеальный день ⬇️`;

  //  В группах - простые URL кнопки (webApp не работает в группах)
  if (chatType === 'group' || chatType === 'supergroup') {
    await ctx.replyWithMarkdown(welcomeText, 
      Markup.inlineKeyboard([
        [Markup.button.url('🗺️ Открыть каталог туров', 'https://t.me/phuketgos_bot/app')],
        [Markup.button.url('💬 Написать боту', 'https://t.me/phuketgos_bot')]
      ])
    );
  } else {
    // В личке - полная клавиатура с webApp
    await ctx.replyWithMarkdown(welcomeText, 
      Markup.inlineKeyboard([
        [Markup.button.webApp('🗺️ Открыть каталог туров', 'https://phukeo.com/#/')],
        [Markup.button.url('📱 Открыть в полном экране', 'https://t.me/phuketgos_bot/app')],
        [Markup.button.callback('ℹ️ О нас', 'about'), Markup.button.callback('☎️ Контакты', 'contacts')]
      ])
    );
  }
});

// 📚 КОМАНДА /help
bot.command('help', (ctx) => {
  ctx.replyWithMarkdown(`📚 **Справка по боту**

🎯 **Основные команды:**
/start - Главное меню
/tours - Список туров
/help - Эта справка
/contacts - Наши контакты

📱 **Как забронировать:**
1️⃣ Открой каталог туров
2️⃣ Выбери тур
3️⃣ Нажми "Забронировать"
4️⃣ Заполни форму

💬 **Нужна помощь?** Просто напиши свой вопрос!`);
});

// 🗺️ КОМАНДА /tours
bot.command('tours', (ctx) => {
  ctx.replyWithMarkdown(`🏝️ **Наши туры:**

1️⃣ Maya Bay Sunrise 🌅
2️⃣ Phi Phi Islands Premium 🏝️
3️⃣ James Bond Island 🎬
4️⃣ Similan Islands 🐠
5️⃣ 4 Islands by Speedboat ⚡
6️⃣ Coral Island Paradise 🪸
7️⃣ Banana Beach Escape 🍌
8️⃣ Racha Island Diving 🤿
9️⃣ Khai Islands Snorkeling 🏖️
🔟 Promthep Sunset 🌅
1️⃣1️⃣ Cheow Lan Lake 🏞️
1️⃣2️⃣ Пхи-Пхи + Рача Яй + Майтон 🌅
1️⃣3️⃣ Слоны + пляж Самет + Мантра Спа 🐘
1️⃣4️⃣ Коралловые острова с Раваи 🪸
1️⃣5️⃣ Дайвинг в Андаманском море 🤿

📱 [Открыть каталог](https://t.me/phukeo_bot/app)`);
});

// ☎️ КОМАНДА /contacts
bot.command('contacts', (ctx) => {
  ctx.replyWithMarkdown(`☎️ **Свяжись с нами:**

📱 Telegram: @phuketgos_bot
🌐 Сайт: https://phukeo.com
📧 Email: info@phukeo.com

⏰ **Режим работы:**
Понедельник - Воскресенье: 8:00 - 22:00 (Bangkok Time)

💬 Отвечаем в течение 30 минут!`);
});

// 🔍 КОМАНДА /getid - Получить ID группы/чата
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

// 📊 КОМАНДА /stats - Статистика группы
bot.command('stats', async (ctx) => {
  const chatType = ctx.chat.type;
  
  if (chatType === 'private') {
    return ctx.reply('❌ Эта команда работает только в группах');
  }
  
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

// 🔄 КОМАНДА /resetstats
bot.command('resetstats', (ctx) => {
  groupStats.messages = 0;
  Object.keys(groupStats.tourMentions).forEach(key => groupStats.tourMentions[key] = 0);
  groupStats.users.clear();
  groupStats.questions = 0;
  groupStats.lastReset = new Date();
  
  ctx.reply('✅ Статистика сброшена!');
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
• 💯 Гарантия возврата денег`);
});

bot.action('contacts', (ctx) => {
  ctx.answerCbQuery();
  ctx.replyWithMarkdown(`☎️ **Контакты:**

📱 Telegram: @phuketgos_bot
🌐 Сайт: https://phukeo.com
📧 Email: info@phukeo.com

⏰ Работаем: 8:00 - 22:00 (Bangkok Time)
💬 Ответим в течение 30 минут!`);
});

// 💬 ОБРАБОТКА ТЕКСТОВЫХ СООБЩЕНИЙ
bot.on('message', async (ctx) => {
  if (!ctx.message.text) return;
  
  const chatType = ctx.chat.type;
  const text = ctx.message.text.toLowerCase();
  
  // В группах только собираем статистику (не отвечаем на каждое сообщение)
  if (chatType === 'group' || chatType === 'supergroup') {
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
    
    // Логируем
    console.log(`📊 [${ctx.chat.title}] ${ctx.from.first_name}: "${text.substring(0, 50)}..."`);
    
    return; // Не отвечаем на каждое сообщение в группе
  }
  
  // В личке - отвечаем на ключевые слова
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

// 🚀 ЗАПУСК БОТА
bot.launch().then(() => {
  console.log('✅ Бот Пхукет Go запущен!');
  console.log('📱 Тестируй: https://t.me/phuketgos_bot');
  console.log('🗺️ Mini App: https://t.me/phuketgos_bot/app');
  console.log('');
  console.log('📊 Режим аналитики групп активирован');
  console.log('💡 Команды для групп:');
  console.log('   /getid - получить ID группы');
  console.log('   /stats - посмотреть статистику');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
