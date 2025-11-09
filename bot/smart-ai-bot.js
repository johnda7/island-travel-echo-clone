// 🤖 Smart AI Booking Bot с GPT интеграцией
// Версия: 2.0 - AI-powered natural conversation

const { Telegraf, session } = require('telegraf');
const { OpenAI } = require('openai');
const express = require('express');
require('dotenv').config();

// ====== ИНИЦИАЛИЗАЦИЯ ======
const bot = new Telegraf(process.env.BOT_TOKEN);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();

// ====== КОНСТАНТЫ ======
const MANAGER_CHAT_ID = 1217592929; // ID менеджера
const WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN || 'small-robinia-phukeo-8b5e1e16.koyeb.app';
const PORT = process.env.PORT || 8000;

// ====== БАЗА ДАННЫХ ТУРОВ ======
const TOURS_DB = {
  'rafting': {
    name: '🚣 Рафтинг на Пхукете',
    slug: 'rafting',
    price: 'от 2900 бат',
    duration: '1 день',
    description: 'Сплав по горной реке 5км + ATV + водопад + слоновья ферма',
    details: 'Включено: трансфер, инструктор, обед, страховка'
  },
  'phi-phi': {
    name: '🏝️ Острова Пхи-Пхи',
    slug: 'phi-phi',
    price: 'от 2500 бат',
    duration: '1 день',
    description: 'Maya Bay, снорклинг, бухта Пиле, обед на пляже',
    details: 'Включено: спидбот, маски, обед, трансфер'
  },
  'similan': {
    name: '🐠 Симиланские острова',
    slug: 'similan',
    price: 'от 3500 бат',
    duration: '1 день',
    description: 'Лучший снорклинг в Таиланде, черепахи, кораллы',
    details: 'Включено: катер, завтрак, обед, снаряжение'
  },
  'james-bond': {
    name: '🏝️ Остров Джеймса Бонда',
    slug: 'james-bond',
    price: 'от 2900 бат',
    duration: '1 день',
    description: 'Залив Пханг Нга, каяки, пещерные храмы',
    details: 'Включено: лодка, обед, каякинг, трансфер'
  },
  'cheow-lan': {
    name: '🏞️ Озеро Чео Лан',
    slug: 'cheow-lan',
    price: 'от 4500 бат',
    duration: '2 дня/1 ночь',
    description: 'Плавучие бунгало, джунгли, каякинг, дикая природа',
    details: 'Включено: проживание, питание, экскурсии'
  }
};

// ====== MIDDLEWARE ======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
bot.use(session());

// ====== ХРАНИЛИЩЕ СЕССИЙ ======
const userSessions = {};

// ====== ОБРАБОТКА /START с DEEP LINKS ======
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const tourSlug = ctx.payload; // Параметр из ссылки: t.me/bot?start=rafting
  
  console.log(`📝 START: User ${userId}, Tour: ${tourSlug || 'none'}`);
  
  // Инициализация сессии пользователя
  userSessions[userId] = {
    chatId: ctx.chat.id,
    userName: ctx.from.first_name,
    username: ctx.from.username || null,
    tourSlug: tourSlug || null,
    tour: TOURS_DB[tourSlug] || null,
    messages: [],
    stage: 'initial',
    aiMode: false,
    bookingData: {}
  };

  // Уведомляем менеджера о новом клиенте
  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID, 
      `🆕 Новый клиент в боте!\n\n` +
      `👤 Имя: ${ctx.from.first_name}\n` +
      `🏷️ Username: @${ctx.from.username || 'нет'}\n` +
      `🎯 Интересует тур: ${tourSlug ? TOURS_DB[tourSlug]?.name : 'не выбран'}\n` +
      `💬 Chat ID: ${ctx.chat.id}\n` +
      `📱 User ID: ${userId}\n\n` +
      `📊 Наблюдайте за диалогом здесь.`
    );
  } catch (error) {
    console.error('Error notifying manager:', error.message);
  }

  // Если пришёл с конкретным туром из deep link
  if (tourSlug && TOURS_DB[tourSlug]) {
    await handleTourDeepLink(ctx, tourSlug);
  } else {
    // Обычный старт без параметров
    await showMainMenu(ctx);
  }
});

// ====== ОБРАБОТКА DEEP LINK С КОНКРЕТНЫМ ТУРОМ ======
async function handleTourDeepLink(ctx, tourSlug) {
  const tour = TOURS_DB[tourSlug];
  
  await ctx.replyWithPhoto(
    `https://phukeo.com/assets/${tourSlug}-main.jpg`,
    {
      caption:
        `Отличный выбор! ${tour.name}\n\n` +
        `📍 ${tour.description}\n` +
        `⏱ Длительность: ${tour.duration}\n` +
        `💰 Цена: ${tour.price}\n\n` +
        `${tour.details}\n\n` +
        `Как вам удобнее забронировать?`,
      reply_markup: {
        inline_keyboard: [
          [{ text: '💬 Обсудить с AI консультантом', callback_data: 'start_ai' }],
          [{ text: '⚡ Быстрая форма', callback_data: 'quick_book' }],
          [{ text: '📞 Позвонить менеджеру', url: 'https://t.me/Phuketga' }],
          [{ text: '🗺️ Посмотреть другие туры', callback_data: 'show_tours' }]
        ]
      }
    }
  ).catch(() => {
    // Fallback если нет фото
    ctx.reply(
      `Отличный выбор! ${tour.name}\n\n` +
      `📍 ${tour.description}\n` +
      `⏱ ${tour.duration}\n` +
      `💰 ${tour.price}\n\n` +
      `Как вам удобнее?`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '💬 AI консультант', callback_data: 'start_ai' }],
            [{ text: '📞 Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
  });
}

// ====== ГЛАВНОЕ МЕНЮ (без deep link) ======
async function showMainMenu(ctx) {
  await ctx.reply(
    '🌴 Добро пожаловать в Phuket Tours!\n\n' +
    'Я умный AI-ассистент. Помогу выбрать идеальный тур.\n\n' +
    'Что вас интересует?',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '💬 Расскажите что ищу', callback_data: 'start_ai' }],
          [
            { text: '🏝️ Острова', callback_data: 'cat_islands' },
            { text: '🎢 Приключения', callback_data: 'cat_adventure' }
          ],
          [{ text: '⭐ Популярные туры', callback_data: 'popular_tours' }],
          [{ text: '📞 Связаться напрямую', url: 'https://t.me/Phuketga' }]
        ]
      }
    }
  );
}

// ====== ПОКАЗАТЬ ПОПУЛЯРНЫЕ ТУРЫ ======
bot.action('popular_tours', async (ctx) => {
  await ctx.answerCbQuery();
  
  await ctx.reply(
    '⭐ Самые популярные туры:\n\n' +
    '🏝️ Острова Пхи-Пхи - 2500฿\n' +
    '🚣 Рафтинг - 2900฿\n' +
    '🐠 Симиланы - 3500฿\n\n' +
    'Выберите или расскажите что ищете:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏝️ Пхи-Пхи', callback_data: 'select_phi-phi' }],
          [{ text: '🚣 Рафтинг', callback_data: 'select_rafting' }],
          [{ text: '🐠 Симиланы', callback_data: 'select_similan' }],
          [{ text: '💬 Поговорить с AI', callback_data: 'start_ai' }]
        ]
      }
    }
  );
});

// ====== ВЫБОР КОНКРЕТНОГО ТУРА ======
bot.action(/select_(.+)/, async (ctx) => {
  const tourSlug = ctx.match[1];
  const userId = ctx.from.id;
  
  if (!userSessions[userId]) {
    userSessions[userId] = { chatId: ctx.chat.id, userName: ctx.from.first_name };
  }
  
  userSessions[userId].tour = TOURS_DB[tourSlug];
  userSessions[userId].tourSlug = tourSlug;
  
  await ctx.answerCbQuery();
  await handleTourDeepLink(ctx, tourSlug);
});

// ====== ЗАПУСК AI ЧАТА ======
bot.action('start_ai', async (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];
  
  if (!session) {
    userSessions[userId] = {
      chatId: ctx.chat.id,
      userName: ctx.from.first_name,
      username: ctx.from.username,
      messages: []
    };
  }
  
  // Включаем AI режим
  userSessions[userId].aiMode = true;
  
  // Инициализация контекста GPT
  const tourContext = session?.tour ? 
    `Клиент интересуется туром: ${session.tour.name} (${session.tour.price})` : 
    'Помоги клиенту выбрать подходящий тур';
  
  userSessions[userId].messages = [
    {
      role: "system",
      content: `Ты дружелюбный консультант Phuket Tours. ${tourContext}

ДОСТУПНЫЕ ТУРЫ:
- Острова Пхи-Пхи (от 2500 бат) - Maya Bay, снорклинг
- Симиланские острова (от 3500 бат) - лучший снорклинг
- Джеймс Бонд (от 2900 бат) - залив Пханг Нга, каяки
- Рафтинг (от 2900 бат) - сплав + ATV + слоны
- Озеро Чео Лан (от 4500 бат) - 2 дня, плавучие бунгало

ТВОИ ЗАДАЧИ:
1. Узнай когда хочет поехать (дата или диапазон)
2. Количество взрослых и детей
3. Особые пожелания (если есть)
4. Имя для обращения

СТИЛЬ:
- Будь кратким (2-3 предложения)
- Используй эмодзи 🏝️ 🌊 ✨
- НЕ называй точные цены, говори "от X бат"
- Задавай уточняющие вопросы

ВАЖНО:
После сбора всей информации скажи:
"Отлично! Передаю вашу заявку менеджеру. Он проверит наличие мест на выбранную дату и ответит вам здесь в течение 10-15 минут с точной ценой 📱"`
    }
  ];

  await ctx.answerCbQuery();
  await ctx.reply(
    '💬 Отлично! Я помогу подобрать идеальный тур.\n\n' +
    (session?.tour ? 
      `Вы выбрали ${session.tour.name}. Когда планируете поездку?` : 
      'Расскажите, какой отдых вас интересует? Море, приключения, культура?')
  );
  
  // Уведомляем менеджера
  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID,
      `💬 ${ctx.from.first_name} начал диалог с AI\n` +
      `Тур: ${session?.tour?.name || 'выбирает'}\n` +
      `Chat ID: ${ctx.chat.id}`
    );
  } catch (error) {
    console.error('Error notifying manager:', error.message);
  }
});

// ====== ОБРАБОТКА ТЕКСТОВЫХ СООБЩЕНИЙ (AI РЕЖИМ) ======
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];
  
  // Игнорируем команды
  if (ctx.message.text.startsWith('/')) return;
  
  // Проверяем что включен AI режим
  if (!session?.aiMode) {
    await ctx.reply(
      'Выберите действие из меню выше ☝️\n\n' +
      'Или нажмите /start чтобы начать заново'
    );
    return;
  }

  const userMessage = ctx.message.text;
  console.log(`💬 [${ctx.from.first_name}]: ${userMessage}`);

  // Дублируем сообщение менеджеру для наблюдения
  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID,
      `💬 [${ctx.from.first_name}]: ${userMessage}\n` +
      `Chat ID: ${ctx.chat.id}`
    );
  } catch (error) {
    console.error('Error forwarding to manager:', error.message);
  }

  // Добавляем в историю диалога
  session.messages.push({
    role: "user",
    content: userMessage
  });

  // Получаем ответ от GPT
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: session.messages,
      temperature: 0.7,
      max_tokens: 200
    });

    const aiResponse = completion.choices[0].message.content;
    session.messages.push({ role: "assistant", content: aiResponse });

    console.log(`🤖 [AI]: ${aiResponse}`);

    // Отправляем ответ клиенту
    await ctx.reply(aiResponse);

    // Дублируем ответ менеджеру
    try {
      await bot.telegram.sendMessage(MANAGER_CHAT_ID,
        `🤖 [AI]: ${aiResponse}`
      );
    } catch (error) {
      console.error('Error forwarding AI response:', error.message);
    }

    // Проверяем, закончился ли сбор данных
    if (aiResponse.toLowerCase().includes("передаю") && 
        aiResponse.toLowerCase().includes("менеджер")) {
      await handleBookingComplete(ctx, session);
    }

  } catch (error) {
    console.error('❌ GPT Error:', error);
    
    await ctx.reply(
      '😔 Извините, произошла ошибка при обработке.\n' +
      'Сейчас подключу менеджера для уточнения деталей.\n\n' +
      'Он ответит в этом чате в течение 5 минут! 📱'
    );
    
    await notifyManagerTakeover(ctx, session, error.message);
  }
});

// ====== ЗАВЕРШЕНИЕ СБОРА ДАННЫХ ======
async function handleBookingComplete(ctx, session) {
  console.log('✅ Booking complete, extracting data...');
  
  // Извлекаем данные из диалога
  const bookingInfo = extractBookingInfo(session.messages);
  
  // Формируем сообщение для менеджера
  const managerMessage = 
    `🎯 **ЗАЯВКА ГОТОВА К ОБРАБОТКЕ!**\n\n` +
    `👤 **Клиент**: ${session.userName}\n` +
    `📱 **Username**: @${session.username || 'нет'}\n` +
    `💬 **Chat ID**: \`${session.chatId}\`\n` +
    `🆔 **User ID**: ${ctx.from.id}\n\n` +
    `🏝️ **Тур**: ${session.tour?.name || bookingInfo.tour}\n` +
    `📅 **Дата**: ${bookingInfo.date}\n` +
    `👥 **Взрослых**: ${bookingInfo.adults}\n` +
    `👶 **Детей**: ${bookingInfo.children}\n` +
    `📝 **Особые пожелания**: ${bookingInfo.notes || 'нет'}\n\n` +
    `⚡ **ДЕЙСТВИЯ**:\n` +
    `1. Проверьте наличие мест у оператора\n` +
    `2. Подтвердите цену с учётом сезона\n` +
    `3. Ответьте клиенту командой:\n` +
    `   \`/reply ${session.chatId} Ваш текст\`\n\n` +
    `🔥 **Клиент ждёт ответ!**`;

  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID, managerMessage, {
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Error sending booking to manager:', error.message);
  }

  // Отправляем клиенту подтверждение
  await ctx.reply(
    '✅ Отлично! Я передал вашу заявку менеджеру.\n\n' +
    '🔍 **Что происходит сейчас:**\n' +
    '• Проверяет наличие мест на вашу дату\n' +
    '• Уточняет финальную стоимость\n' +
    '• Готовит специальное предложение\n\n' +
    '⏱ **Ответит здесь в течение 10-15 минут!**\n\n' +
    'А пока можете посмотреть отзывы:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '⭐ Отзывы о турах', url: 'https://phukeo.com/#/reviews' }],
          [{ text: '📸 Фото с туров', url: 'https://phukeo.com/#/gallery' }],
          [{ text: '❓ Частые вопросы', url: 'https://phukeo.com/#/faq' }]
        ]
      }
    }
  );

  // Сбрасываем AI режим, клиент теперь ждёт менеджера
  session.aiMode = false;
  session.waitingManager = true;
}

// ====== КОМАНДА /REPLY ДЛЯ МЕНЕДЖЕРА ======
bot.command('reply', async (ctx) => {
  // Проверяем, что это менеджер
  if (ctx.from.id !== MANAGER_CHAT_ID) {
    await ctx.reply('❌ Эта команда только для менеджера');
    return;
  }

  const args = ctx.message.text.split(' ');
  const chatId = args[1];
  const message = args.slice(2).join(' ');

  if (!chatId || !message) {
    await ctx.reply(
      '📝 Формат команды:\n' +
      '`/reply CHAT_ID Ваше сообщение`\n\n' +
      'Пример:\n' +
      '`/reply 123456789 Добрый день! Места есть, цена 2800 бат`',
      { parse_mode: 'Markdown' }
    );
    return;
  }

  try {
    // Отправляем сообщение клиенту от имени менеджера
    await bot.telegram.sendMessage(chatId, 
      `💬 **Менеджер Phuket Tours**:\n\n${message}`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '✅ Подтверждаю бронь', callback_data: 'confirm_booking' }],
            [{ text: '❓ У меня вопрос', callback_data: 'ask_question' }],
            [{ text: '📞 Позвонить', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );

    await ctx.reply(`✅ Сообщение отправлено клиенту (Chat ID: ${chatId})`);
    
  } catch (error) {
    await ctx.reply(`❌ Ошибка отправки: ${error.message}`);
  }
});

// ====== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ======
function extractBookingInfo(messages) {
  const dialog = messages.map(m => m.content).join('\n').toLowerCase();
  
  // Извлекаем дату
  const datePatterns = [
    /(\d{1,2}[\s./-]\d{1,2})/i,
    /(завтра|послезавтра)/i,
    /(этой недел|след недел)/i,
    /(понедельник|вторник|среда|четверг|пятница|суббота|воскресенье)/i
  ];
  let date = 'Уточнить';
  for (const pattern of datePatterns) {
    const match = dialog.match(pattern);
    if (match) {
      date = match[0];
      break;
    }
  }
  
  // Извлекаем количество взрослых
  const adultsMatch = dialog.match(/(\d+)\s*(взросл|adult|челов|людей|персон)/i);
  const adults = adultsMatch?.[1] || '2';
  
  // Извлекаем количество детей
  const childrenMatch = dialog.match(/(\d+)\s*(дет|реб|ребенок|child)/i);
  const children = childrenMatch?.[1] || '0';
  
  // Извлекаем тур
  const tourMatch = dialog.match(/(пхи|phi|симилан|similan|рафтинг|rafting|джеймс|james|чео лан|cheow)/i);
  const tour = tourMatch ? 'Указан в диалоге' : 'Уточнить';
  
  return {
    tour,
    date,
    adults,
    children,
    notes: dialog.slice(-150) // Последние сообщения как заметки
  };
}

async function notifyManagerTakeover(ctx, session, errorMsg) {
  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID,
      `🚨 **ТРЕБУЕТСЯ ВМЕШАТЕЛЬСТВО МЕНЕДЖЕРА**\n\n` +
      `👤 Клиент: ${session?.userName || ctx.from.first_name}\n` +
      `💬 Chat ID: \`${ctx.chat.id}\`\n` +
      `❌ Причина: ${errorMsg || 'AI не справился'}\n\n` +
      `Ответьте командой:\n` +
      `\`/reply ${ctx.chat.id} Ваш текст\``,
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    console.error('Error notifying manager takeover:', error.message);
  }
}

// ====== КОМАНДЫ МЕНЕДЖЕРА ======
bot.command('stats', async (ctx) => {
  if (ctx.from.id !== MANAGER_CHAT_ID) return;
  
  const totalUsers = Object.keys(userSessions).length;
  const activeAI = Object.values(userSessions).filter(s => s.aiMode).length;
  const waitingManager = Object.values(userSessions).filter(s => s.waitingManager).length;
  
  await ctx.reply(
    `📊 **Статистика бота**\n\n` +
    `👥 Всего пользователей: ${totalUsers}\n` +
    `💬 Активных AI диалогов: ${activeAI}\n` +
    `⏳ Ожидают менеджера: ${waitingManager}\n\n` +
    `🤖 Бот работает: ${process.uptime().toFixed(0)}с`,
    { parse_mode: 'Markdown' }
  );
});

// ====== HEALTH CHECK ENDPOINT ======
app.get('/', (req, res) => {
  res.send(`
    <h1>🤖 Smart AI Booking Bot</h1>
    <p>✅ Status: Running</p>
    <p>⏱️ Uptime: ${Math.floor(process.uptime())}s</p>
    <p>📱 Bot: @phuketgos_bot</p>
    <p>🌐 Website: <a href="https://phukeo.com">phukeo.com</a></p>
    <p>🧠 AI: GPT-3.5 Turbo</p>
  `);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    bot: 'running',
    ai: 'enabled',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ====== WEBHOOK ENDPOINT ======
const WEBHOOK_PATH = '/telegram-webhook';

app.post(WEBHOOK_PATH, async (req, res) => {
  // Логирование для отладки
  if (req.body?.callback_query) {
    console.log('📞 Callback:', req.body.callback_query.data);
  }
  if (req.body?.message?.text) {
    console.log('💬 Message:', req.body.message.text.substring(0, 50));
  }
  
  try {
    await bot.handleUpdate(req.body, res);
  } catch (error) {
    console.error('❌ Update error:', error);
    res.sendStatus(500);
  }
});

// ====== ЗАПУСК СЕРВЕРА ======
app.listen(PORT, async () => {
  console.log(`✅ Smart AI Bot running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log('📱 Bot: @phuketgos_bot');
  console.log('🌐 Website: https://phukeo.com');
  console.log('');
  
  // Устанавливаем webhook
  const WEBHOOK_URL = `https://${WEBHOOK_DOMAIN}${WEBHOOK_PATH}`;
  
  try {
    await bot.telegram.setWebhook(WEBHOOK_URL);
    console.log(`✅ Webhook установлен: ${WEBHOOK_URL}`);
    
    // Уведомляем менеджера о запуске
    await bot.telegram.sendMessage(MANAGER_CHAT_ID,
      '🚀 **AI Бот запущен и готов к работе!**\n\n' +
      '🧠 Функции:\n' +
      '• AI консультант с GPT-3.5\n' +
      '• Deep links из Telegram канала\n' +
      '• Полный контроль менеджера\n\n' +
      '⌨️ **Команды**:\n' +
      '`/reply CHAT_ID текст` - ответить клиенту\n' +
      '`/stats` - статистика\n\n' +
      '📊 Все диалоги дублируются сюда',
      { parse_mode: 'Markdown' }
    );
    
  } catch (error) {
    console.error('❌ Webhook error:', error.message);
    console.log('💡 Проверьте WEBHOOK_DOMAIN в .env');
  }
});

// ====== GRACEFUL SHUTDOWN ======
process.once('SIGINT', () => {
  console.log('⏸️ SIGINT: stopping bot...');
  bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log('⏸️ SIGTERM: stopping bot...');
  bot.stop('SIGTERM');
  process.exit(0);
});
