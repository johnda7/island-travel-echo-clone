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

// ====== БАЗА ДАННЫХ ТУРОВ (22 тура) ======
const TOURS_DB = {
  // === ПОПУЛЯРНЫЕ МНОГОДНЕВНЫЕ ТУРЫ ===
  'phi-phi-2days': {
    name: '🏝️ Пхи-Пхи 2 дня/1 ночь',
    slug: 'phi-phi-2days',
    price: 'от 4380 бат',
    duration: '2 дня/1 ночь',
    description: 'Maya Bay, снорклинг, закаты, ночь на острове',
    details: 'Включено: отель, питание, спидбот, трансфер'
  },
  
  'pearls-andaman-sea': {
    name: '💎 4 жемчужины Андаманского моря',
    slug: 'pearls-andaman-sea',
    price: 'от 4850 бат',
    duration: '2 дня/1 ночь',
    description: 'Комбо: Джеймс Бонд + Пхи-Пхи + Краби + Раяли',
    details: 'Включено: отель Раяли, все экскурсии, питание'
  },
  
  'five-pearls-2days': {
    name: '💎 5 Жемчужин Андаманского моря Deluxe',
    slug: 'five-pearls-2days',
    price: 'от 9900 бат',
    duration: '2 дня/1 ночь',
    description: 'Премиум: Пхи-Пхи + Краби + Изумрудное озеро + Раяли',
    details: 'Включено: делюкс отель, все экскурсии, питание'
  },
  
  // === МОРСКИЕ ОСТРОВА ===
  'phi-phi': {
    name: '🏝️ Острова Пхи-Пхи',
    slug: 'phi-phi',
    price: 'от 2500 бат',
    duration: '1 день',
    description: 'Maya Bay, снорклинг, бухта Пиле, обед на пляже',
    details: 'Включено: спидбот, маски, обед, трансфер'
  },
  
  'phi-phi-sunrise': {
    name: '🌅 Пхи-Пхи на рассвете Comfort+',
    slug: 'phi-phi-sunrise',
    price: 'от 3200 бат',
    duration: '1 день',
    description: 'Ранний выезд, Maya Bay без толп, премиум сервис',
    details: 'Включено: завтрак, комфортный катер, гид'
  },
  
  'similan-islands': {
    name: '🐠 Симиланские острова Standard',
    slug: 'similan-islands',
    price: 'от 3500 бат',
    duration: '1 день',
    description: 'Лучший снорклинг в Таиланде, черепахи, кораллы',
    details: 'Включено: катер, завтрак, обед, снаряжение'
  },
  
  'similan-islands-early': {
    name: '🌅 Симиланские острова Early Bird Comfort+',
    slug: 'similan-islands-early',
    price: 'от 4200 бат',
    duration: '1 день',
    description: 'Ранний выезд, меньше людей, комфорт катер',
    details: 'Включено: премиум катер, питание, снаряжение'
  },
  
  'similan-islands-speedboat': {
    name: '⚡ Симиланские острова Speedboat',
    slug: 'similan-islands-speedboat',
    price: 'от 4800 бат',
    duration: '1 день',
    description: 'Быстро и комфортно, больше времени на островах',
    details: 'Включено: спидбот, питание, гид'
  },
  
  'james-bond-island-phang-nga': {
    name: '🏝️ Остров Джеймса Бонда',
    slug: 'james-bond-island-phang-nga',
    price: 'от 2900 бат',
    duration: '1 день',
    description: 'Залив Пханг Нга, каяки, пещерные храмы',
    details: 'Включено: лодка, обед, каякинг, трансфер'
  },
  
  'eleven-islands-mega': {
    name: '🌟 11 ОСТРОВОВ МЕГА-ТУР',
    slug: 'eleven-islands-mega',
    price: 'от 4900 бат',
    duration: '1 день',
    description: 'Джеймс Бонд + Хонг + Пхи-Пхи в одном дне!',
    details: 'Включено: спидбот, все острова, обед, снорклинг'
  },
  
  'racha-coral-islands-speedboat': {
    name: '�️ Рача + Корал на спидботе',
    slug: 'racha-coral-islands-speedboat',
    price: 'от 2200 бат',
    duration: '1 день',
    description: 'Белый песок, снорклинг, парасейлинг опционально',
    details: 'Включено: спидбот, обед, маски'
  },
  
  'racha-coral-sunrise': {
    name: '🌅 Рача + Корал на рассвете Comfort+',
    slug: 'racha-coral-sunrise',
    price: 'от 2800 бат',
    duration: '1 день',
    description: 'Ранний выезд, меньше людей, чистая вода',
    details: 'Включено: премиум катер, завтрак, обед'
  },
  
  'racha-coral-rawai': {
    name: '🏖️ Рача + Корал с пирса Rawai',
    slug: 'racha-coral-rawai',
    price: 'от 2100 бат',
    duration: '1 день',
    description: 'Удобный выезд с юга Пхукета, семейный тур',
    details: 'Включено: катер, обед, трансфер'
  },
  
  // === ПРИКЛЮЧЕНИЯ И ПРИРОДА ===
  'rafting-spa-atv-1-day': {
    name: '🚣 Рафтинг + Слоновье SPA + ATV',
    slug: 'rafting-spa-atv-1-day',
    price: 'от 2900 бат',
    duration: '1 день',
    description: 'Сплав 5км + слоны + квадроциклы + водопад',
    details: 'Включено: трансфер, инструктор, обед, страховка'
  },
  
  'rafting-spa-1day': {
    name: '🚣 Рафтинг + Слоновье SPA',
    slug: 'rafting-spa-1day',
    price: 'от 2400 бат',
    duration: '1 день',
    description: 'Рафтинг + слоны + водопад + храм + обезьяны',
    details: 'Включено: трансфер, обед, инструктор'
  },
  
  'kao-lak-safari-1-day': {
    name: '🐘 Као Лак Сафари',
    slug: 'kao-lak-safari-1-day',
    price: 'от 3200 бат',
    duration: '1 день',
    description: 'Слоны, водопады, джунгли, бамбуковые плоты',
    details: 'Включено: трансфер из Пхукета, обед, гид'
  },
  
  'cheow-lan-lake': {
    name: '🏞️ Чео Лан + Самет Нангше',
    slug: 'cheow-lan-lake',
    price: 'от 2900 бат',
    duration: '1 день',
    description: 'Озеро как в Китае, смотровая, храм в пещере',
    details: 'Включено: трансфер, каякинг, обед'
  },
  
  'phang-nga-skywalk': {
    name: '🌉 Пхангнга + Стеклянный мост',
    slug: 'phang-nga-skywalk',
    price: 'от 2600 бат',
    duration: '1 день',
    description: 'Skywalk, храмы, слоны, SPA, водопад',
    details: 'Включено: все активности, обед, трансфер'
  },
  
  'phang-nga-samet': {
    name: '📸 Пхангнга + Смотровая Samet Nangshe',
    slug: 'phang-nga-samet',
    price: 'от 2800 бат',
    duration: '1 день',
    description: 'Лучшая смотровая, слоны, храм, пляж самолетов',
    details: 'Включено: все входные билеты, обед, гид'
  },
  
  'krabi-secrets': {
    name: '💚 Тайны Краби: Изумрудное озеро + Храм Тигра',
    slug: 'krabi-secrets',
    price: 'от 3100 бат',
    duration: '1 день',
    description: 'Изумрудное озеро, 1260 ступеней, горячие источники',
    details: 'Включено: трансфер, обед, все входные билеты'
  },
  
  // === КУЛЬТУРНЫЕ И ОБЗОРНЫЕ ===
  'dostoprimechatelnosti-phuketa': {
    name: '🛕 Достопримечательности Пхукета',
    slug: 'dostoprimechatelnosti-phuketa',
    price: 'от 1800 бат',
    duration: '1 день',
    description: 'Большой Будда, храмы, Старый город, смотровые',
    details: 'Включено: трансфер, гид, входные билеты'
  },
  
  // === АКТИВНЫЙ ОТДЫХ ===
  'fishing-sunrise': {
    name: '🎣 Рыбалка на рассвете + подводная охота',
    slug: 'fishing-sunrise',
    price: 'от 4500 бат',
    duration: '1 день',
    description: 'Троллинг, краби ловушки, подводная охота, готовка улова',
    details: 'Включено: катер, снасти, обед из улова'
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
        keyboard: [
          [{ text: '⭐ Популярные' }, { text: '🗺️ Все туры' }],
          [{ text: '🏝️ Острова' }, { text: '🚣 Приключения' }, { text: '🏞️ Природа' }],
          [{ text: '💬 AI помощь' }, { text: '📞 Менеджер' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    }
  );
  
  // Дополнительно inline кнопки для быстрого доступа
  await ctx.reply(
    'Или выберите из категорий:',
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
    '⭐ ТОП-10 популярных туров:\n\n' +
    '🏝️ Пхи-Пхи 2 дня/1 ночь - 4500฿\n' +
    '🌟 11 островов МЕГА-ТУР - 4900฿\n' +
    '🐠 Симиланы Standard - 3500฿\n' +
    '🚣 Рафтинг + SPA + ATV - 2900฿\n' +
    '🏝️ Джеймс Бонд - 2900฿\n' +
    '🏞️ Чео Лан + Самет Нангше - 2900฿\n' +
    '🌉 Пхангнга + Стеклянный мост - 2600฿\n' +
    '💚 Тайны Краби - 3100฿\n' +
    '🏖️ Рача + Корал - 2200฿\n' +
    '🎣 Рыбалка на рассвете - 4500฿\n\n' +
    'Выберите категорию или поговорите с AI:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏝️ Морские острова', callback_data: 'cat_islands' }],
          [{ text: '🚣 Приключения', callback_data: 'cat_adventure' }],
          [{ text: '🏞️ Природа и культура', callback_data: 'cat_nature' }],
          [{ text: '💬 AI консультант', callback_data: 'start_ai' }]
        ]
      }
    }
  );
});

// ====== КАТЕГОРИИ ТУРОВ ======
bot.action('cat_islands', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    '🏝️ МОРСКИЕ ОСТРОВА (13 туров):\n\n' +
    '🌅 ПХИ-ПХИ:\n' +
    '• Пхи-Пхи 2 дня/1 ночь - 4500฿\n' +
    '• Пхи-Пхи на рассвете Comfort+ - 3200฿\n' +
    '• Пхи-Пхи Standard - 2500฿\n\n' +
    '🐠 СИМИЛАНЫ:\n' +
    '• Early Bird Comfort+ - 4200฿\n' +
    '• Standard - 3500฿\n' +
    '• Speedboat - 4800฿\n\n' +
    '🏖️ РАЧА + КОРАЛ:\n' +
    '• Спидбот - 2200฿\n' +
    '• На рассвете - 2800฿\n' +
    '• С Rawai - 2100฿\n\n' +
    '🌟 МЕГА-ТУРЫ:\n' +
    '• 11 островов - 4900฿\n' +
    '• 4 Жемчужины - 7900฿\n' +
    '• 5 Жемчужин Deluxe - 9900฿\n\n' +
    'Выберите тур или поговорите с AI:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏝️ Пхи-Пхи 2 дня', callback_data: 'select_phi-phi-2days' }],
          [{ text: '🌟 11 островов МЕГА', callback_data: 'select_eleven-islands-mega' }],
          [{ text: '🐠 Симиланы', callback_data: 'select_similan-islands' }],
          [{ text: '💬 AI консультант', callback_data: 'start_ai' }]
        ]
      }
    }
  );
});

bot.action('cat_adventure', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    '🚣 ПРИКЛЮЧЕНИЯ И АКТИВНОСТИ:\n\n' +
    '🚣 Рафтинг + SPA + ATV - 2900฿\n' +
    '🚣 Рафтинг + SPA - 2400฿\n' +
    '🐘 Као Лак Сафари - 3200฿\n' +
    '🎣 Рыбалка на рассвете - 4500฿\n\n' +
    'Выберите тур:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚣 Рафтинг + ATV', callback_data: 'select_rafting-spa-atv-1-day' }],
          [{ text: '� Као Лак', callback_data: 'select_kao-lak-safari-1-day' }],
          [{ text: '🎣 Рыбалка', callback_data: 'select_fishing-sunrise' }],
          [{ text: '💬 AI консультант', callback_data: 'start_ai' }]
        ]
      }
    }
  );
});

bot.action('cat_nature', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    '🏞️ ПРИРОДА И КУЛЬТУРА:\n\n' +
    '🏞️ Чео Лан + Самет Нангше - 2900฿\n' +
    '🌉 Пхангнга + Стеклянный мост - 2600฿\n' +
    '📸 Пхангнга + Samet Nangshe - 2800฿\n' +
    '💚 Тайны Краби - 3100฿\n' +
    '🛕 Достопримечательности Пхукета - 1800฿\n\n' +
    'Выберите тур:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏞️ Чео Лан', callback_data: 'select_cheow-lan-lake' }],
          [{ text: '💚 Тайны Краби', callback_data: 'select_krabi-secrets' }],
          [{ text: '🛕 Пхукет', callback_data: 'select_dostoprimechatelnosti-phuketa' }],
          [{ text: '💬 AI консультант', callback_data: 'start_ai' }]
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

⚠️ СТРОГИЕ ПРАВИЛА:
1. Ты консультант ТОЛЬКО по турам на Пхукете
2. НЕ отвечай на вопросы НЕ о турах (погода, визы, отели, рестораны и т.д.)
3. Если спрашивают не о турах - вежливо перенаправь: "Я специализируюсь на бронировании экскурсий. По этому вопросу лучше спросить у менеджера @Phuketga 📞"
4. НЕ давай общие советы о Пхукете - ТОЛЬКО о турах!
5. НЕ поддерживай разговоры на отвлечённые темы
6. Если клиент пытается флудить или троллить - игнорируй и возвращай к теме туров

ДОСТУПНЫЕ ТУРЫ (22 тура):

🏝️ МНОГОДНЕВНЫЕ ТУРЫ:
• Пхи-Пхи 2 дня/1 ночь (4500฿) - Maya Bay, ночь на острове, закаты
• 4 Жемчужины Андаманского моря (7900฿) - Джеймс Бонд + Пхи-Пхи + Краби + Раяли
• 5 Жемчужин Deluxe (9900฿) - Премиум: Пхи-Пхи + Изумрудное озеро + делюкс отель

🌊 МОРСКИЕ ОСТРОВА:
• Пхи-Пхи (2500฿) - Maya Bay, снорклинг, классика
• Пхи-Пхи на рассвете Comfort+ (3200฿) - без толп, ранний выезд
• Симиланы Standard (3500฿) - лучший снорклинг в Таиланде
• Симиланы Early Bird (4200฿) - ранний выезд, меньше людей
• Симиланы Speedboat (4800฿) - быстро и комфортно
• Джеймс Бонд (2900฿) - залив Пханг Нга, каяки, пещеры
• 11 островов МЕГА-ТУР (4900฿) - Джеймс Бонд + Хонг + Пхи-Пхи за день!
• Рача + Корал спидбот (2200฿) - белый песок, парасейлинг
• Рача + Корал на рассвете (2800฿) - ранний выезд, чистая вода
• Рача + Корал с Rawai (2100฿) - удобно с юга Пхукета

🚣 ПРИКЛЮЧЕНИЯ И АКТИВНОСТИ:
• Рафтинг + SPA + ATV (2900฿) - сплав 5км + слоны + квадроциклы
• Рафтинг + SPA (2400฿) - сплав + слоны + водопад
• Као Лак Сафари (3200฿) - слоны, джунгли, водопады
• Рыбалка на рассвете (4500฿) - троллинг, подводная охота

🏞️ ПРИРОДА И КУЛЬТУРА:
• Чео Лан + Самет Нангше (2900฿) - озеро как в Китае, смотровая
• Пхангнга + Стеклянный мост (2600฿) - Skywalk, храмы, SPA
• Пхангнга + Samet Nangshe (2800฿) - лучшая смотровая, фото
• Тайны Краби (3100฿) - Изумрудное озеро, Храм Тигра, 1260 ступеней
• Достопримечательности Пхукета (1800฿) - Большой Будда, храмы

ТВОИ ЗАДАЧИ (В ТАКОМ ПОРЯДКЕ!):
1. Узнай КОГДА хочет поехать (конкретная дата или диапазон)
2. Узнай КОЛИЧЕСТВО взрослых и детей (возраст детей!)
3. Узнай ИМЯ для обращения
4. После сбора ВСЕХ данных - передай менеджеру

СОВЕТЫ ПО ВЫБОРУ:
- Для семей с детьми: Рача+Корал, Пхи-Пхи, Достопримечательности (спокойные)
- Для активных: Рафтинг, Као Лак Сафари, 11 островов (много движения)
- Лучший снорклинг: Симиланы (но ТОЛЬКО ноябрь-апрель! сейчас закрыты)
- Романтика пар: Пхи-Пхи 2 дня, 4 Жемчужины (красиво и уединённо)
- Уникальное: Чео Лан, Тайны Краби, Стеклянный мост (необычные места)
- Бюджетно: Рача+Корал с Rawai (2100฿), Достопримечательности (1800฿)

СТИЛЬ ОБЩЕНИЯ:
- Будь КРАТКИМ (максимум 2-3 предложения за раз!)
- Используй эмодзи 🏝️ 🌊 ✨ (но не переборщи)
- НЕ называй точные цены, говори "от 2500 бат" или "около 3000 бат"
- Задавай ПО ОДНОМУ вопросу за раз (не перегружай!)
- Если клиент не отвечает на вопрос - мягко переспроси
- НЕ пиши длинные списки - максимум 3 варианта

⚠️ ЧТО ДЕЛАТЬ ЕСЛИ:
- Спрашивают про погоду → "Я специализируюсь на бронировании. Лучше уточните у менеджера @Phuketga"
- Спрашивают про отели → "Я помогаю только с экскурсиями. Отели лучше обсудить с @Phuketga"
- Спрашивают про визы/билеты → "Это не моя специализация, напишите @Phuketga"
- Флуд/троллинг → Игнорируй, возвращай к выбору тура
- Хамство → "Я здесь чтобы помочь с выбором тура. Если вопросы - обращайтесь к менеджеру"

ВАЖНО - ФИНАЛЬНОЕ СООБЩЕНИЕ:
После сбора ВСЕХ данных (дата, люди, имя) скажи:
"Отлично, [Имя]! 📋 Передаю вашу заявку менеджеру:

Тур: [название]
Дата: [дата]
Человек: [взрослых + детей]

Менеджер проверит наличие мест и свяжется с вами для подтверждения 📱✨"

ПОМНИ: Ты ТОЛЬКО консультант по турам, НЕ универсальный помощник!`
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

// ====== ОБРАБОТКА ТЕКСТОВЫХ КНОПОК (REPLY KEYBOARD) ======
bot.hears('⭐ Популярные', async (ctx) => {
  await ctx.answerCbQuery?.() || Promise.resolve();
  await bot.handleUpdate({
    update_id: Date.now(),
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'popular_tours'
    }
  });
});

bot.hears('🗺️ Все туры', async (ctx) => {
  await ctx.reply(
    '🗺️ ВСЕ ТУРЫ (22):\n\n' +
    'Выберите категорию:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏝️ Острова (13)', callback_data: 'cat_islands' }],
          [{ text: '🚣 Приключения (4)', callback_data: 'cat_adventure' }],
          [{ text: '🏞️ Природа (5)', callback_data: 'cat_nature' }],
          [{ text: '⭐ Популярные', callback_data: 'popular_tours' }]
        ]
      }
    }
  );
});

bot.hears('🏝️ Острова', async (ctx) => {
  // Вызываем существующий handler
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'cat_islands'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.hears('🚣 Приключения', async (ctx) => {
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'cat_adventure'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.hears('🏞️ Природа', async (ctx) => {
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'cat_nature'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.hears('💬 AI помощь', async (ctx) => {
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'start_ai'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.hears('📞 Менеджер', async (ctx) => {
  await ctx.reply(
    '📞 Напишите напрямую менеджеру:\n\n' +
    '👤 @Phuketga\n\n' +
    'Он ответит в течение 5-10 минут! 💬',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📞 Написать @Phuketga', url: 'https://t.me/Phuketga' }]
        ]
      }
    }
  );
});

// ====== КОМАНДЫ ДЛЯ MENU BUTTON ======
bot.command('tours', async (ctx) => {
  await ctx.reply(
    '🗺️ ВСЕ ТУРЫ (22):\n\n' +
    'Выберите категорию:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏝️ Острова (13)', callback_data: 'cat_islands' }],
          [{ text: '🚣 Приключения (4)', callback_data: 'cat_adventure' }],
          [{ text: '🏞️ Природа (5)', callback_data: 'cat_nature' }]
        ]
      }
    }
  );
});

bot.command('popular', async (ctx) => {
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'popular_tours'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.command('islands', async (ctx) => {
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'cat_islands'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.command('adventure', async (ctx) => {
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'cat_adventure'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.command('nature', async (ctx) => {
  const fakeUpdate = {
    callback_query: {
      id: String(Date.now()),
      from: ctx.from,
      message: ctx.message,
      data: 'cat_nature'
    }
  };
  await bot.handleUpdate(fakeUpdate);
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    '❓ **ПОМОЩЬ**\n\n' +
    '**Команды:**\n' +
    '/start - Главное меню\n' +
    '/tours - Все 22 тура\n' +
    '/popular - Популярные туры\n' +
    '/islands - Острова (13)\n' +
    '/adventure - Приключения (4)\n' +
    '/nature - Природа (5)\n\n' +
    '**Кнопки меню:**\n' +
    'Используйте кнопки внизу экрана для быстрого доступа!\n\n' +
    '**AI помощь:**\n' +
    'Нажмите "💬 AI помощь" и опишите что ищете - ' +
    'умный ассистент подберёт идеальный тур!\n\n' +
    '**Менеджер:**\n' +
    'Нажмите "📞 Менеджер" для прямой связи с @Phuketga',
    { parse_mode: 'Markdown' }
  );
});

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
    
    // Устанавливаем Menu Button (кнопка рядом с полем ввода)
    
    // Устанавливаем команды ТОЛЬКО для приватных чатов
    await bot.telegram.setMyCommands(
      [
        { command: 'start', description: '🏠 Главное меню' },
        { command: 'tours', description: '🗺️ Все туры (22)' },
        { command: 'popular', description: '⭐ Популярные туры' },
        { command: 'islands', description: '🏝️ Острова (13)' },
        { command: 'adventure', description: '🚣 Приключения (4)' },
        { command: 'nature', description: '🏞️ Природа (5)' },
        { command: 'help', description: '❓ Помощь' }
      ],
      { scope: { type: 'all_private_chats' } }
    );
    
    // Для групп убираем команды
    await bot.telegram.setMyCommands([], {
      scope: { type: 'all_group_chats' }
    });
    
    // Menu Button только для приватных чатов
    await bot.telegram.setChatMenuButton({
      menu_button: { type: 'commands' }
    });
    
    console.log('✅ Команды и меню установлены (только для личных чатов)');

    // Уведомляем менеджера о запуске
    await bot.telegram.sendMessage(MANAGER_CHAT_ID,
      '🚀 **AI Бот запущен и готов к работе!**\n\n' +
      '🧠 Функции:\n' +
      '• AI консультант с GPT-3.5\n' +
      '• Deep links из Telegram канала\n' +
      '• Полный контроль менеджера\n' +
      '• Menu Button + Reply Keyboard\n\n' +
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
