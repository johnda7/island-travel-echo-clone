// 🤖 ПХУКЕТ GO - Telegram Bot для Koyeb (Webhook режим)
// Версия 3.0 - Красивое меню + карточки туров + навигация

const { Telegraf, Markup } = require('telegraf');
const express = require('express');
require('dotenv').config();
const { tours, categories } = require('./tours-data');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
app.use(express.json());

// 📊 Конфигурация
const CONFIG = {
  MANAGER_LINK: 'https://t.me/Phuketga',
  APP_URL: 'https://phukeo.com',
  TOURS_PER_PAGE: 3,
  OWNER_CHAT_ID: '1217592929',
  PORT: process.env.PORT || 8000,
  WEBHOOK_DOMAIN: process.env.WEBHOOK_DOMAIN
};

// 🎨 Эмодзи для категорий
const CATEGORY_EMOJI = {
  islands: '🏝️',
  adventure: '🏔️',
  cultural: '🛕',
  diving: '🤿',
  fishing: '🎣'
};

// 💾 Сессии пользователей
const userSessions = new Map();

// ═══════════════════════════════════════════════════════════════
// 🌐 EXPRESS ENDPOINTS
// ═══════════════════════════════════════════════════════════════

// Health check для Koyeb
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    bot: 'Пхукет Go v3.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Главная страница
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>🏝️ Пхукет Go Bot</title>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: linear-gradient(135deg, #16a34a 0%, #2563eb 100%); min-height: 100vh; }
        .card { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
        h1 { color: #16a34a; }
        .status { background: #dcfce7; color: #16a34a; padding: 10px 20px; border-radius: 10px; display: inline-block; }
        a { color: #2563eb; text-decoration: none; }
        .btn { background: linear-gradient(135deg, #16a34a 0%, #2563eb 100%); color: white; padding: 15px 30px; border-radius: 12px; display: inline-block; margin: 10px 5px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🏝️ Пхукет Go Bot</h1>
        <p class="status">✅ Бот работает!</p>
        <p>22 экскурсии на Пхукете с русскоговорящими гидами</p>
        <p>
          <a href="https://t.me/phuketgos_bot" class="btn">📱 Открыть бот</a>
          <a href="https://phukeo.com" class="btn">🌐 Каталог</a>
        </p>
        <p><small>Uptime: ${Math.floor(process.uptime())}s</small></p>
      </div>
    </body>
    </html>
  `);
});

// ═══════════════════════════════════════════════════════════════
// 🎯 КОМАНДА /start - ГЛАВНОЕ МЕНЮ
// ═══════════════════════════════════════════════════════════════
bot.start(async (ctx) => {
  const firstName = ctx.from.first_name || 'друг';
  const startParam = ctx.message.text.split(' ')[1];
  
  console.log(`📝 START от ${firstName}, параметр: ${startParam || 'нет'}`);
  
  // 🔗 DEEP LINK - конкретный тур
  if (startParam && tours[startParam]) {
    return showTourCard(ctx, startParam);
  }
  
  // 🔗 DEEP LINK - категория
  if (startParam && categories[startParam]) {
    return showCategory(ctx, startParam);
  }
  
  // 📱 ГЛАВНОЕ ПРИВЕТСТВИЕ
  await ctx.replyWithPhoto(
    'https://phukeo.com/assets/hero-phuket.jpg',
    {
      caption: 
`🌴 *Пхукет Go* — лучшие экскурсии на Пхукете!

Привет, *${firstName}*! 👋

Я помогу выбрать идеальный тур:
• 22 уникальных экскурсии
• Честные цены без посредников  
• Русскоговорящие гиды
• Бронирование 24/7

📱 *Выберите категорию* или откройте каталог ⬇️`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🏝️ Острова', callback_data: 'cat_islands' },
            { text: '🏔️ Приключения', callback_data: 'cat_adventure' }
          ],
          [
            { text: '🤿 Дайвинг', callback_data: 'cat_diving' },
            { text: '🛕 Культурные', callback_data: 'cat_cultural' }
          ],
          [
            { text: '🎣 Рыбалка', callback_data: 'cat_fishing' },
            { text: '🔥 ТОП туры', callback_data: 'top_tours' }
          ],
          [
            { text: '📱 Открыть каталог', web_app: { url: CONFIG.APP_URL } }
          ],
          [
            { text: '☎️ Связаться с менеджером', url: CONFIG.MANAGER_LINK }
          ]
        ]
      }
    }
  );
});

// ═══════════════════════════════════════════════════════════════
// 🏷️ ОБРАБОТКА КАТЕГОРИЙ
// ═══════════════════════════════════════════════════════════════

async function showCategory(ctx, categoryId, page = 0) {
  const category = categories[categoryId];
  if (!category) return;
  
  const tourIds = category.tours;
  const startIdx = page * CONFIG.TOURS_PER_PAGE;
  const endIdx = startIdx + CONFIG.TOURS_PER_PAGE;
  const pageTours = tourIds.slice(startIdx, endIdx);
  const totalPages = Math.ceil(tourIds.length / CONFIG.TOURS_PER_PAGE);
  
  userSessions.set(ctx.from.id, { category: categoryId, page });
  
  let message = `${category.emoji} *${category.name}*\n\n`;
  message += `📄 Страница ${page + 1}/${totalPages}\n\n`;
  
  pageTours.forEach((tourId, idx) => {
    const tour = tours[tourId];
    if (tour) {
      message += `*${startIdx + idx + 1}. ${tour.name}*\n`;
      message += `💰 от ${tour.priceAdult}฿ • ⏱ ${tour.duration}\n\n`;
    }
  });
  
  const tourButtons = pageTours.map(tourId => {
    const tour = tours[tourId];
    return [{ text: `📍 ${tour.name}`, callback_data: `tour_${tourId}` }];
  });
  
  const navButtons = [];
  if (page > 0) {
    navButtons.push({ text: '◀️ Назад', callback_data: `page_${categoryId}_${page - 1}` });
  }
  if (endIdx < tourIds.length) {
    navButtons.push({ text: 'Вперёд ▶️', callback_data: `page_${categoryId}_${page + 1}` });
  }
  
  const keyboard = [
    ...tourButtons,
    navButtons.length > 0 ? navButtons : [],
    [{ text: '🏠 Главное меню', callback_data: 'main_menu' }],
    [{ text: '📱 Открыть в приложении', web_app: { url: `${CONFIG.APP_URL}/#/tours` } }]
  ].filter(row => row.length > 0);
  
  if (ctx.callbackQuery) {
    await ctx.editMessageCaption(message, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    }).catch(() => {
      ctx.reply(message, {
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: keyboard }
      });
    });
  } else {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// 🎫 КАРТОЧКА ТУРА
// ═══════════════════════════════════════════════════════════════

async function showTourCard(ctx, tourId) {
  const tour = tours[tourId];
  if (!tour) {
    return ctx.reply('❌ Тур не найден');
  }
  
  const webAppUrl = getTourWebAppUrl(tourId);
  
  const caption = 
`${CATEGORY_EMOJI[tour.category] || '🏝️'} *${tour.name}*

${tour.description}

💰 *Цена:*
• Взрослый: *${tour.priceAdult}฿*
• Ребёнок (4-11): *${tour.priceChild}฿*

⏱ *Длительность:* ${tour.duration}

✨ *Хайлайты:*
${tour.highlights ? tour.highlights.slice(0, 5).map(h => `• ${h}`).join('\n') : '• Незабываемое путешествие!'}`;

  await ctx.replyWithPhoto(
    tour.image || 'https://phukeo.com/assets/hero-phuket.jpg',
    {
      caption,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📱 Забронировать', web_app: { url: webAppUrl } }],
          [
            { text: '📝 Подробнее', web_app: { url: webAppUrl } },
            { text: '☎️ Вопрос', url: CONFIG.MANAGER_LINK }
          ],
          [{ text: '🏠 Главное меню', callback_data: 'main_menu' }]
        ]
      }
    }
  );
}

function getTourWebAppUrl(tourId) {
  const tourRoutes = {
    'phiphi2days': 'phi-phi-2days',
    'pearls': 'pearls-andaman-sea',
    'sightseeing': 'dostoprimechatelnosti-phuketa',
    'rafting': 'rafting-spa-atv-1-day',
    'raftingspa': 'rafting-spa-1day',
    'kaolak': 'kao-lak-safari-1-day',
    '11islands': 'eleven-islands-mega',
    'jamesbond': 'james-bond-island-phang-nga',
    'racha': 'racha-coral-islands-speedboat',
    'skywalk': 'phang-nga-skywalk',
    'cheolan': 'cheow-lan-lake',
    'similan': 'similan-islands',
    'similanearly': 'similan-islands-early',
    'similanspeed': 'similan-islands-speedboat',
    'fishing': 'fishing-sunrise',
    'rachasunrise': 'racha-coral-sunrise',
    'racharawai': 'racha-coral-rawai',
    'phiphisunrise': 'phi-phi-sunrise',
    '5pearls': 'five-pearls-2days',
    'phangngasamet': 'phang-nga-samet',
    'krabi': 'krabi-secrets',
    'avatarplus': 'avatar-plus-hangdong'
  };
  
  const route = tourRoutes[tourId] || tourId;
  return `${CONFIG.APP_URL}/#/excursion/${route}`;
}

// ═══════════════════════════════════════════════════════════════
// 🔥 ТОП ТУРЫ
// ═══════════════════════════════════════════════════════════════

async function showTopTours(ctx) {
  const topTourIds = ['phiphi2days', 'similan', '11islands', 'rafting', 'jamesbond'];
  
  const message = 
`🔥 *ТОП-5 популярных туров*

Самые востребованные экскурсии:

${topTourIds.map((id, idx) => {
  const tour = tours[id];
  return `*${idx + 1}. ${tour.name}*\n💰 от ${tour.priceAdult}฿`;
}).join('\n\n')}

Выберите тур ⬇️`;

  const keyboard = [
    ...topTourIds.map(id => [{ text: `📍 ${tours[id].name}`, callback_data: `tour_${id}` }]),
    [{ text: '🏠 Главное меню', callback_data: 'main_menu' }],
    [{ text: '📱 Открыть каталог', web_app: { url: CONFIG.APP_URL } }]
  ];

  if (ctx.callbackQuery) {
    await ctx.editMessageCaption(message, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    }).catch(() => {});
  } else {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// 📞 CALLBACK ОБРАБОТЧИКИ
// ═══════════════════════════════════════════════════════════════

bot.action(/^cat_(.+)$/, async (ctx) => {
  const categoryId = ctx.match[1];
  await ctx.answerCbQuery();
  await showCategory(ctx, categoryId, 0);
});

bot.action(/^page_(.+)_(\d+)$/, async (ctx) => {
  const categoryId = ctx.match[1];
  const page = parseInt(ctx.match[2]);
  await ctx.answerCbQuery();
  await showCategory(ctx, categoryId, page);
});

bot.action(/^tour_(.+)$/, async (ctx) => {
  const tourId = ctx.match[1];
  await ctx.answerCbQuery();
  await showTourCard(ctx, tourId);
});

bot.action('top_tours', async (ctx) => {
  await ctx.answerCbQuery();
  await showTopTours(ctx);
});

bot.action('main_menu', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.replyWithPhoto(
    'https://phukeo.com/assets/hero-phuket.jpg',
    {
      caption: `🌴 *Пхукет Go* — лучшие экскурсии!\n\n📱 *Выберите категорию* ⬇️`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🏝️ Острова', callback_data: 'cat_islands' },
            { text: '🏔️ Приключения', callback_data: 'cat_adventure' }
          ],
          [
            { text: '🤿 Дайвинг', callback_data: 'cat_diving' },
            { text: '🛕 Культурные', callback_data: 'cat_cultural' }
          ],
          [
            { text: '🎣 Рыбалка', callback_data: 'cat_fishing' },
            { text: '🔥 ТОП туры', callback_data: 'top_tours' }
          ],
          [{ text: '📱 Открыть каталог', web_app: { url: CONFIG.APP_URL } }],
          [{ text: '☎️ Менеджер', url: CONFIG.MANAGER_LINK }]
        ]
      }
    }
  );
});

// ═══════════════════════════════════════════════════════════════
// 📚 КОМАНДЫ
// ═══════════════════════════════════════════════════════════════

bot.command('tours', async (ctx) => await showTopTours(ctx));
bot.command('islands', async (ctx) => await showCategory(ctx, 'islands', 0));
bot.command('adventure', async (ctx) => await showCategory(ctx, 'adventure', 0));

bot.command('help', (ctx) => {
  ctx.replyWithMarkdown(`📚 *Справка*

/start - Главное меню
/tours - ТОП туры
/islands - Острова
/adventure - Приключения

💬 Вопросы? @Phuketga`);
});

// ═══════════════════════════════════════════════════════════════
// 💬 ТЕКСТОВЫЕ СООБЩЕНИЯ
// ═══════════════════════════════════════════════════════════════

bot.on('text', async (ctx) => {
  const text = ctx.message.text.toLowerCase();
  
  if (text.includes('пхи') || text.includes('phi')) return showTourCard(ctx, 'phiphi2days');
  if (text.includes('симилан') || text.includes('similan')) return showTourCard(ctx, 'similan');
  if (text.includes('джеймс') || text.includes('бонд')) return showTourCard(ctx, 'jamesbond');
  if (text.includes('рафтинг')) return showTourCard(ctx, 'rafting');
  
  ctx.reply(`🤔 Не нашёл такой тур...\n\nПопробуй /tours или напиши @Phuketga`,
    Markup.inlineKeyboard([
      [{ text: '📱 Открыть каталог', web_app: { url: CONFIG.APP_URL } }],
      [{ text: '☎️ Менеджер', url: CONFIG.MANAGER_LINK }]
    ])
  );
});

// ═══════════════════════════════════════════════════════════════
// 🚀 ЗАПУСК (WEBHOOK MODE)
// ═══════════════════════════════════════════════════════════════

const WEBHOOK_PATH = '/telegram-webhook';

async function startBot() {
  if (CONFIG.WEBHOOK_DOMAIN) {
    // Webhook режим для Koyeb
    const webhookUrl = `https://${CONFIG.WEBHOOK_DOMAIN}${WEBHOOK_PATH}`;
    
    app.use(bot.webhookCallback(WEBHOOK_PATH));
    
    await bot.telegram.setWebhook(webhookUrl);
    console.log(`✅ Webhook установлен: ${webhookUrl}`);
    
    app.listen(CONFIG.PORT, () => {
      console.log(`🚀 Пхукет Go Bot v3.0 запущен!`);
      console.log(`📱 Бот: @phuketgos_bot`);
      console.log(`🌐 Порт: ${CONFIG.PORT}`);
      console.log(`🔗 Health: http://localhost:${CONFIG.PORT}/health`);
    });
  } else {
    // Polling режим для локальной разработки
    await bot.launch();
    console.log('🤖 Пхукет Go Bot запущен (polling режим)');
  }
}

startBot().catch(err => {
  console.error('❌ Ошибка запуска:', err);
  process.exit(1);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = { bot, app };

