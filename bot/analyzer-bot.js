// 🤖 AI-Аналитик для группы Пхукет Go
const { Telegraf, Markup } = require('telegraf');
const OpenAI = require('openai');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 📊 Хранилище сообщений для анализа
const messageStorage = {
  messages: [],
  maxMessages: 500, // Храним последние 500 сообщений
  groupId: -1002250501928 // ID твоей группы
};

// 🎯 КОМАНДА /start
bot.start(async (ctx) => {
  const chatType = ctx.chat.type;
  const firstName = ctx.from.first_name || 'друг';
  
  if (chatType === 'private') {
    // В личке - показываем меню для владельца
    await ctx.replyWithMarkdown(`🤖 Привет, ${firstName}!

Я бот-аналитик для группы *"ПХУКЕТ "DA" | ЧАТ"*

📊 Я собираю и анализирую сообщения в группе с помощью AI

🎯 Что я могу:
• Анализировать что людям нужно
• Находить частые вопросы
• Выявлять новые бизнес-ниши
• Давать рекомендации для сайта

💡 Используй команды:
/analyze - AI-анализ группы
/stats - Простая статистика
/help - Справка`, 
      Markup.inlineKeyboard([
        [Markup.button.callback('📊 Запустить анализ', 'run_analysis')],
        [Markup.button.callback('📈 Статистика', 'show_stats')],
        [Markup.button.url('🗺️ Открыть сайт', 'https://phukeo.com')]
      ])
    );
  } else {
    // В группе - простое приветствие
    await ctx.reply(`👋 Привет! Я помогаю с турами на Пхукете.\n\n🗺️ Каталог туров: https://t.me/phuketgos_bot/app`,
      Markup.inlineKeyboard([
        [Markup.button.url('🗺️ Открыть каталог', 'https://t.me/phuketgos_bot/app')],
        [Markup.button.url('💬 Написать нам', 'https://t.me/phuketgos_bot')]
      ])
    );
  }
});

// 📊 КОМАНДА /stats - Простая статистика
bot.command('stats', (ctx) => {
  const chatType = ctx.chat.type;
  
  if (chatType !== 'private') {
    return ctx.reply('❌ Эта команда работает только в личке с ботом');
  }
  
  const stats = {
    total: messageStorage.messages.length,
    today: messageStorage.messages.filter(m => {
      const msgDate = new Date(m.date * 1000);
      const today = new Date();
      return msgDate.toDateString() === today.toDateString();
    }).length,
    users: new Set(messageStorage.messages.map(m => m.userId)).size
  };
  
  ctx.replyWithMarkdown(`📊 *Статистика группы*

💬 Собрано сообщений: ${stats.total}
📅 Сегодня: ${stats.today}
👥 Уникальных пользователей: ${stats.users}

💡 Для AI-анализа используй /analyze`);
});

// 🧠 КОМАНДА /analyze - AI-анализ
bot.command('analyze', async (ctx) => {
  const chatType = ctx.chat.type;
  
  if (chatType !== 'private') {
    return ctx.reply('❌ Эта команда работает только в личке с ботом');
  }
  
  if (messageStorage.messages.length < 10) {
    return ctx.reply(`❌ Недостаточно данных для анализа

Собрано сообщений: ${messageStorage.messages.length}
Минимум нужно: 10

💡 Бот накапливает сообщения автоматически. Подожди немного или перешли мне сообщения из группы.`);
  }
  
  await ctx.reply('🧠 Запускаю AI-анализ...\n⏳ Это займёт 10-30 секунд');
  
  try {
    // Готовим данные для AI
    const recentMessages = messageStorage.messages.slice(-200); // Последние 200 сообщений
    const messageTexts = recentMessages
      .map(m => `[${m.username || m.firstName}]: ${m.text}`)
      .join('\n');
    
    // Запрос к OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Ты бизнес-аналитик для туристического бизнеса на Пхукете.
          
ТЕКУЩИЙ БИЗНЕС:
- Туры по островам (Maya Bay, Phi Phi, James Bond и др.)
- Недвижимость (аренда/обмен)
- Аренда машин

ЗАДАЧА:
Проанализируй переписку в группе (4000+ подписчиков) и дай конкретные рекомендации для улучшения бизнеса и сайта phukeo.com.

ФОРМАТ ОТВЕТА:
1. ЧТО ЛЮДИ ОБСУЖДАЮТ (топ-5 тем с цифрами)
2. ЧАСТЫЕ ВОПРОСЫ (что спрашивают повторно)
3. НОВЫЕ НИШИ (что можно монетизировать)
4. РЕКОМЕНДАЦИИ ДЛЯ САЙТА (что добавить/изменить)
5. ПРОБЛЕМЫ КЛИЕНТОВ (жалобы, сложности)

Пиши по-русски, конкретно, с цифрами и примерами.`
        },
        {
          role: "user",
          content: `Вот последние сообщения из группы:\n\n${messageTexts}\n\nСделай анализ.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });
    
    const analysis = completion.choices[0].message.content;
    
    // Отправляем результат
    await ctx.replyWithMarkdown(`🧠 *AI-АНАЛИЗ ГРУППЫ*\n\n${analysis}\n\n📊 Проанализировано сообщений: ${recentMessages.length}`,
      Markup.inlineKeyboard([
        [Markup.button.callback('🔄 Повторить анализ', 'run_analysis')],
        [Markup.button.url('🗺️ Открыть сайт', 'https://phukeo.com')]
      ])
    );
    
  } catch (error) {
    console.error('Ошибка AI-анализа:', error);
    ctx.reply(`❌ Ошибка при анализе: ${error.message}\n\nПопробуй ещё раз через /analyze`);
  }
});

// 📝 СБОР СООБЩЕНИЙ ИЗ ГРУППЫ
bot.on('text', (ctx) => {
  const chatType = ctx.chat.type;
  
  // Собираем только из группы
  if (chatType === 'group' || chatType === 'supergroup') {
    const message = {
      text: ctx.message.text,
      userId: ctx.from.id,
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      date: ctx.message.date,
      chatId: ctx.chat.id
    };
    
    // Добавляем в хранилище
    messageStorage.messages.push(message);
    
    // Ограничиваем размер (храним только последние 500)
    if (messageStorage.messages.length > messageStorage.maxMessages) {
      messageStorage.messages.shift();
    }
    
    // Логируем
    console.log(`📝 [${ctx.chat.title}] ${ctx.from.first_name}: ${ctx.message.text.substring(0, 50)}...`);
  }
});

// 🔘 ОБРАБОТКА КНОПОК
bot.action('run_analysis', async (ctx) => {
  await ctx.answerCbQuery();
  
  if (messageStorage.messages.length < 10) {
    return ctx.reply(`❌ Недостаточно данных\n\nСобрано: ${messageStorage.messages.length} сообщений\nНужно минимум: 10`);
  }
  
  await ctx.reply('🧠 Запускаю AI-анализ...');
  
  // Вызываем ту же логику что в /analyze
  ctx.command = { text: '/analyze' };
  bot.handleUpdate({ message: { ...ctx.message, text: '/analyze' } });
});

bot.action('show_stats', async (ctx) => {
  await ctx.answerCbQuery();
  
  const stats = {
    total: messageStorage.messages.length,
    today: messageStorage.messages.filter(m => {
      const msgDate = new Date(m.date * 1000);
      const today = new Date();
      return msgDate.toDateString() === today.toDateString();
    }).length,
    users: new Set(messageStorage.messages.map(m => m.userId)).size
  };
  
  ctx.replyWithMarkdown(`📊 *Статистика группы*

💬 Собрано сообщений: ${stats.total}
📅 Сегодня: ${stats.today}
👥 Уникальных пользователей: ${stats.users}

💡 Для AI-анализа нажми "Запустить анализ"`);
});

// 🚀 ЗАПУСК БОТА
bot.launch().then(() => {
  console.log('✅ AI-Аналитик Пхукет Go запущен!');
  console.log('📱 Бот: https://t.me/phuketgos_bot');
  console.log('📊 Группа: ПХУКЕТ "DA" | ЧАТ');
  console.log('');
  console.log('🧠 Режим AI-анализа активирован');
  console.log('💡 Команды:');
  console.log('   /analyze - AI-анализ группы');
  console.log('   /stats - Статистика');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
