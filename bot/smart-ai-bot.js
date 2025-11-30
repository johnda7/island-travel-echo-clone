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

// ====== ГЕНЕРАТОР НОМЕРА ЗАЯВКИ ======
const generateOrderNumber = () => {
  return Math.floor(1000000 + Math.random() * 9000000);
};

// ====== ОБРАБОТКА /START с DEEP LINKS ======
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const tourSlug = ctx.payload; // Параметр из ссылки: t.me/bot?start=rafting
  
  console.log(`📝 START: User ${userId}, Tour: ${tourSlug || 'none'}`);
  
  // Генерируем номер заявки
  const orderNumber = generateOrderNumber();
  
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
    bookingData: {},
    orderNumber: orderNumber
  };

  // Уведомляем менеджера о новом клиенте
  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID, 
      `🆕 Новый клиент #${orderNumber}\n\n` +
      `👤 ${ctx.from.first_name} (@${ctx.from.username || 'нет username'})\n` +
      `🎯 Тур: ${tourSlug ? TOURS_DB[tourSlug]?.name : 'выбирает'}\n` +
      `💬 Chat ID: ${ctx.chat.id}\n\n` +
      `Ответить: /reply ${ctx.chat.id} текст`
    );
  } catch (error) {
    console.error('Error notifying manager:', error.message);
  }

  // Если пришёл с конкретным туром из deep link
  if (tourSlug && TOURS_DB[tourSlug]) {
    await handleTourDeepLink(ctx, tourSlug);
  } else {
    // Обычный старт без параметров
    await showMainMenu(ctx, orderNumber);
  }
});

// ====== ОБРАБОТКА DEEP LINK С КОНКРЕТНЫМ ТУРОМ ======
async function handleTourDeepLink(ctx, tourSlug) {
  const tour = TOURS_DB[tourSlug];
  
  // ФОТО ОТКЛЮЧЕНЫ ПО ЗАПРОСУ
  /*
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
          [{ text: '📞 Связаться с менеджером', callback_data: 'contact_manager' }]
        ]
      }
    }
  ).catch(() => {
  */
    // Fallback (теперь основной вариант)
    await ctx.reply(
      `Отличный выбор! ${tour.name}\n\n` +
      `📍 ${tour.description}\n` +
      `⏱ Длительность: ${tour.duration}\n` +
      `💰 Цена: ${tour.price}\n\n` +
      `${tour.details}\n\n` +
      `Как вам удобнее забронировать?`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '💬 Обсудить с AI консультантом', callback_data: 'start_ai' }],
            [{ text: '📞 Связаться с менеджером', callback_data: 'contact_manager' }]
          ]
        }
      }
    );
  // End of handleTourDeepLink
}

// ====== ГЛАВНОЕ МЕНЮ (без deep link) ======
async function showMainMenu(ctx, orderNumber) {
  // Отправляем фото с меню
  await ctx.replyWithPhoto(
    'https://phukeo.com/assets/hero-phuket.jpg',
    {
      caption: 
        `🌴 *Пхукет Go* — лучшие экскурсии!\n\n` +
        `👨‍💼 Менеджер уже в чате\n\n` +
        `Выберите категорию или напишите что ищете:`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🏝️ Острова', callback_data: 'cat_islands' },
            { text: '🚣 Приключения', callback_data: 'cat_adventure' }
          ],
          [
            { text: '🏞️ Природа', callback_data: 'cat_nature' },
            { text: '⭐ ТОП туры', callback_data: 'popular_tours' }
          ],
          [{ text: '📞 Написать менеджеру', url: 'https://t.me/Phuketga' }]
        ]
      }
    }
  ).catch(async () => {
    // Fallback без фото
    await ctx.reply(
      `🌴 *Пхукет Go* — лучшие экскурсии!\n\n` +
      `👨‍💼 Менеджер уже в чате\n\n` +
      `Выберите категорию:`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🏝️ Острова', callback_data: 'cat_islands' },
              { text: '🚣 Приключения', callback_data: 'cat_adventure' }
            ],
            [
              { text: '🏞️ Природа', callback_data: 'cat_nature' },
              { text: '⭐ ТОП туры', callback_data: 'popular_tours' }
            ],
            [{ text: '📞 Написать менеджеру', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
  });
}

// ====== ОБРАБОТКА ДАННЫХ ИЗ MINI APP ======
bot.on('web_app_data', async (ctx) => {
  const userId = ctx.from.id;
  const data = JSON.parse(ctx.webAppData.data);
  
  console.log('📱 WebApp data received:', data);
  
  // Данные бронирования из Mini App
  if (data.type === 'booking') {
    const booking = data.booking;
    
    // Сохраняем в сессию
    if (!userSessions[userId]) {
      userSessions[userId] = { 
        chatId: ctx.chat.id, 
        userName: ctx.from.first_name,
        username: ctx.from.username
      };
    }
    userSessions[userId].bookingData = booking;
    
    // Формируем сообщение для менеджера
    const managerMessage = 
      `🎯 **ЗАЯВКА ИЗ MINI APP!**\n\n` +
      `👤 **Клиент**: ${ctx.from.first_name}\n` +
      `📱 **Username**: @${ctx.from.username || 'нет'}\n` +
      `💬 **Chat ID**: \`${ctx.chat.id}\`\n\n` +
      `🏝️ **Тур**: ${booking.tourName}\n` +
      `📅 **Дата**: ${booking.date}\n` +
      `👥 **Взрослых**: ${booking.adults}\n` +
      `👶 **Детей**: ${booking.children || 0}\n` +
      `💰 **Сумма**: ${booking.totalPrice} ${booking.currency}\n\n` +
      `📞 **Телефон**: ${booking.phone || 'не указан'}\n\n` +
      `⚡ Ответьте: \`/reply ${ctx.chat.id} текст\``;

    try {
      await bot.telegram.sendMessage(MANAGER_CHAT_ID, managerMessage, {
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Error sending to manager:', error.message);
    }

    // Подтверждение клиенту
  await ctx.reply(
      `✅ Заявка принята!\n\n` +
      `🏝️ ${booking.tourName}\n` +
      `📅 ${booking.date}\n` +
      `👥 ${booking.adults} взр.${booking.children > 0 ? ` + ${booking.children} дет.` : ''}\n` +
      `💰 ${booking.totalPrice} ${booking.currency}\n\n` +
      `⏱ Менеджер проверит наличие мест и напишет вам здесь!`
    );
      }
});

// ====== ПОКАЗАТЬ МОРСКИЕ ТУРЫ С КАРТИНКОЙ ======
async function showSeaTours(ctx) {
  await ctx.replyWithPhoto(
    'https://phukeo.com/assets/phi-phi-maya-bay-LeJ2QhJv.jpg',
    {
      caption: 
        '🏝️ *МОРСКИЕ ОСТРОВА* — ТОП-3:\n\n' +
        '1️⃣ *Пхи-Пхи* — Maya Bay, снорклинг\n' +
        '   💰 от 2500฿\n\n' +
        '2️⃣ *Симиланы* — лучший снорклинг!\n' +
        '   💰 от 3500฿\n\n' +
        '3️⃣ *Рача + Корал* — белый песок\n' +
        '   💰 от 2200฿\n\n' +
        'Выберите тур:',
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏝️ Пхи-Пхи — 2500฿', callback_data: 'select_phi-phi' }],
          [{ text: '🐠 Симиланы — 3500฿', callback_data: 'select_similan-islands' }],
          [{ text: '🏖️ Рача+Корал — 2200฿', callback_data: 'select_racha-coral-islands-speedboat' }],
          [{ text: '🌟 Больше островов...', callback_data: 'cat_islands' }],
          [{ text: '📞 Спросить менеджера', url: 'https://t.me/Phuketga' }]
        ]
      }
    }
  ).catch(async () => {
    // Fallback без фото
    await ctx.reply(
      '🏝️ *МОРСКИЕ ОСТРОВА* — ТОП-3:\n\n' +
      '1️⃣ Пхи-Пхи — 2500฿\n' +
      '2️⃣ Симиланы — 3500฿\n' +
      '3️⃣ Рача+Корал — 2200฿',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🏝️ Пхи-Пхи', callback_data: 'select_phi-phi' }],
            [{ text: '🐠 Симиланы', callback_data: 'select_similan-islands' }],
            [{ text: '🏖️ Рача+Корал', callback_data: 'select_racha-coral-islands-speedboat' }]
          ]
        }
      }
    );
  });
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
    `Клиент УЖЕ ВЫБРАЛ тур: ${session.tour.name} (${session.tour.price}). НЕ СПРАШИВАЙ какой тур нужен! Сразу переходи к дате.` : 
    'Помоги клиенту выбрать подходящий тур. Сначала узнай предпочтения.';
  
  userSessions[userId].messages = [
    {
      role: "system",
      content: `Ты дружелюбный консультант Пхукет Go. ${tourContext}

⚠️ ПРАВИЛА РАБОТЫ:
1. Ты консультант по турам на Пхукете - ПОМОГАЙ выбрать тур!
2. Если клиент пишет "море", "острова", "пляж" - СРАЗУ предложи 3 морских тура с ценами
3. Если клиент пишет "приключения", "активный" - предложи рафтинг, сафари, квадроциклы
4. Если клиент пишет "природа", "культура" - предложи Чео Лан, Краби, храмы
5. НЕ отправляй к менеджеру если можешь сам помочь с выбором тура!
6. К менеджеру отправляй ТОЛЬКО если вопрос НЕ о турах (визы, отели, билеты)

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

ТВОИ ЗАДАЧИ (СТРОГО ПО ОДНОМУ ВОПРОСУ ЗА РАЗ!):
1. Если тур НЕ выбран: Узнай какой тур интересует.
2. Если тур выбран: Узнай КОГДА хотят поехать (дата).
3. Узнай КОЛИЧЕСТВО взрослых и детей (одним вопросом!).
4. ЕСЛИ есть дети: Уточни возраст (до 12 лет - детская цена).
5. После сбора данных - СРАЗУ передай менеджеру!

⚠️ НЕ СПРАШИВАЙ ИМЯ! Имя уже известно из Telegram профиля.
⚠️ Максимум 3 вопроса до передачи менеджеру!

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

⚠️ КЛЮЧЕВЫЕ СЛОВА → ДЕЙСТВИЯ:
- "море", "острова", "пляж", "снорклинг" → Предложи: Пхи-Пхи (2500฿), Симиланы (3500฿), Рача+Корал (2200฿)
- "приключения", "активный", "экстрим" → Предложи: Рафтинг+ATV (2900฿), Као Лак Сафари (3200฿)
- "природа", "озеро", "храм" → Предложи: Чео Лан (2900฿), Краби (3100฿), Достопримечательности (1800฿)
- "дешево", "бюджет" → Предложи: Достопримечательности (1800฿), Рача с Rawai (2100฿)
- "премиум", "люкс" → Предложи: 5 Жемчужин Deluxe (9900฿), Пхи-Пхи 2 дня (4500฿)
- "семья", "дети" → Предложи: Рача+Корал (спокойно), Достопримечательности, Пхи-Пхи

⚠️ К МЕНЕДЖЕРУ только если спрашивают:
- про погоду, визы, билеты, отели, рестораны → "По этому вопросу лучше к @Phuketga"

ВАЖНО - ФИНАЛЬНОЕ СООБЩЕНИЕ:
После сбора данных (дата + количество людей) сразу скажи:
"Отлично! 📋 Передаю заявку менеджеру:

🏝️ Тур: [название]
📅 Дата: [дата]
👥 Гостей: [взрослых] взр. + [детей] дет.

⏱ Менеджер проверит места и напишет вам здесь!"

ПОМНИ: Ты ТОЛЬКО консультант по турам, НЕ универсальный помощник!`
    }
  ];

  await ctx.answerCbQuery();
  
  // Если тур уже выбран - показываем кнопки для быстрого выбора даты
  if (session?.tour) {
    // Функция для форматирования даты
    const formatDate = (daysFromNow) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromNow);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}.${month}`;
    };
    
    await ctx.reply(
      `🏝️ Отличный выбор: ${session.tour.name}\n` +
      `💰 Цена: ${session.tour.price}\n\n` +
      `📅 Когда планируете поездку?`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: `📅 Завтра (${formatDate(1)})`, callback_data: 'date_tomorrow' },
              { text: `📅 Послезавтра (${formatDate(2)})`, callback_data: 'date_day_after' }
            ],
            [
              { text: `📅 Через 3 дня (${formatDate(3)})`, callback_data: 'date_3days' },
              { text: `📅 Через неделю`, callback_data: 'date_week' }
            ],
            [{ text: '✏️ Другая дата (напишу)', callback_data: 'date_custom' }]
          ]
        }
      }
    );
  } else {
  await ctx.reply(
    '💬 Отлично! Я помогу подобрать идеальный тур.\n\n' +
      'Расскажите, что вы ищете? Море, приключения, культура?'
  );
  }
  
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

// ====== ОБРАБОТКА КНОПОК ВЫБОРА ДАТЫ ======
bot.action(/date_(.+)/, async (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];
  const dateType = ctx.match[1];
  
  await ctx.answerCbQuery();
  
  // Вычисляем дату
  const getDateString = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  
  let selectedDate;
  switch (dateType) {
    case 'tomorrow': selectedDate = getDateString(1); break;
    case 'day_after': selectedDate = getDateString(2); break;
    case '3days': selectedDate = getDateString(3); break;
    case 'week': selectedDate = getDateString(7); break;
    case 'custom':
      await ctx.reply('✏️ Напишите желаемую дату (например: 15.12 или 20 декабря)');
      if (session) session.stage = 'waiting_date';
      return;
  }
  
  // Сохраняем дату в сессию
  if (session) {
    session.bookingData = session.bookingData || {};
    session.bookingData.date = selectedDate;
    session.stage = 'waiting_guests';
  }
  
  // Спрашиваем количество гостей
  await ctx.reply(
    `📅 Дата: ${selectedDate}\n\n` +
    `👥 Сколько человек поедет?`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1 взрослый', callback_data: 'guests_1_0' },
            { text: '2 взрослых', callback_data: 'guests_2_0' }
          ],
          [
            { text: '2 взр + 1 реб', callback_data: 'guests_2_1' },
            { text: '2 взр + 2 реб', callback_data: 'guests_2_2' }
          ],
          [
            { text: '3 взрослых', callback_data: 'guests_3_0' },
            { text: '4 взрослых', callback_data: 'guests_4_0' }
          ],
          [{ text: '✏️ Другое количество', callback_data: 'guests_custom' }]
        ]
      }
    }
  );
});

// ====== ОБРАБОТКА КНОПОК ВЫБОРА ГОСТЕЙ ======
bot.action(/guests_(\d+)_(\d+)/, async (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];
  const adults = parseInt(ctx.match[1]);
  const children = parseInt(ctx.match[2]);
  
  await ctx.answerCbQuery();
  
  if (session) {
    session.bookingData = session.bookingData || {};
    session.bookingData.adults = adults;
    session.bookingData.children = children;
  }
  
  // Если есть дети - спрашиваем возраст
  if (children > 0) {
    session.stage = 'waiting_children_age';
    await ctx.reply(
      `👶 Укажите возраст ${children > 1 ? 'детей' : 'ребёнка'} (до 12 лет - детская цена)`
    );
    return;
  }
  
  // Если детей нет - сразу завершаем бронирование
  await completeQuickBooking(ctx, session);
});

bot.action('guests_custom', async (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];
  
  await ctx.answerCbQuery();
  if (session) session.stage = 'waiting_guests_text';
  
  await ctx.reply('✏️ Напишите сколько взрослых и детей (например: 2 взрослых и 1 ребёнок 8 лет)');
});

// ====== БЫСТРОЕ ЗАВЕРШЕНИЕ БРОНИРОВАНИЯ ======
async function completeQuickBooking(ctx, session) {
  const userId = ctx.from.id;
  const booking = session?.bookingData || {};
  const tour = session?.tour;
  
  // Формируем сообщение для менеджера
  const managerMessage = 
    `🎯 **НОВАЯ ЗАЯВКА!**\n\n` +
    `👤 **Клиент**: ${session?.userName || ctx.from.first_name}\n` +
    `📱 **Username**: @${session?.username || ctx.from.username || 'нет'}\n` +
    `💬 **Chat ID**: \`${ctx.chat.id}\`\n\n` +
    `🏝️ **Тур**: ${tour?.name || 'не выбран'}\n` +
    `📅 **Дата**: ${booking.date || 'не указана'}\n` +
    `👥 **Взрослых**: ${booking.adults || 0}\n` +
    `👶 **Детей**: ${booking.children || 0}${booking.childrenAge ? ` (${booking.childrenAge})` : ''}\n\n` +
    `⚡ Ответьте клиенту: \`/reply ${ctx.chat.id} текст\``;

  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID, managerMessage, {
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Error sending to manager:', error.message);
  }

  // Подтверждение клиенту
  await ctx.reply(
    `✅ Отлично! Заявка отправлена менеджеру:\n\n` +
    `🏝️ ${tour?.name || 'Тур'}\n` +
    `📅 ${booking.date}\n` +
    `👥 ${booking.adults} взр.${booking.children > 0 ? ` + ${booking.children} дет.` : ''}\n\n` +
    `⏱ Менеджер проверит наличие мест и напишет вам здесь в ближайшее время!`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📋 Посмотреть другие туры', callback_data: 'popular_tours' }]
        ]
      }
    }
  );
  
  // Сбрасываем состояние
  if (session) {
    session.stage = 'completed';
    session.aiMode = false;
  }
}

// ====== ОБРАБОТКА ТЕКСТОВЫХ СООБЩЕНИЙ (AI РЕЖИМ) ======
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];
  
  // Игнорируем команды
  if (ctx.message.text.startsWith('/')) return;
  
  // Обработка ввода даты вручную
  if (session?.stage === 'waiting_date') {
    session.bookingData = session.bookingData || {};
    session.bookingData.date = ctx.message.text;
    session.stage = 'waiting_guests';
    
    await ctx.reply(
      `📅 Дата: ${ctx.message.text}\n\n👥 Сколько человек поедет?`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '1 взрослый', callback_data: 'guests_1_0' },
              { text: '2 взрослых', callback_data: 'guests_2_0' }
            ],
            [
              { text: '2 взр + 1 реб', callback_data: 'guests_2_1' },
              { text: '2 взр + 2 реб', callback_data: 'guests_2_2' }
            ],
            [{ text: '✏️ Другое количество', callback_data: 'guests_custom' }]
          ]
        }
      }
    );
    return;
  }
  
  // Обработка ввода возраста детей
  if (session?.stage === 'waiting_children_age') {
    session.bookingData.childrenAge = ctx.message.text;
    await completeQuickBooking(ctx, session);
    return;
  }
  
  // Обработка ручного ввода гостей
  if (session?.stage === 'waiting_guests_text') {
    // Парсим текст для извлечения взрослых/детей
    const text = ctx.message.text.toLowerCase();
    const adultsMatch = text.match(/(\d+)\s*(взросл|чел)/);
    const childrenMatch = text.match(/(\d+)\s*(реб|дет)/);
    
    session.bookingData.adults = adultsMatch ? parseInt(adultsMatch[1]) : 1;
    session.bookingData.children = childrenMatch ? parseInt(childrenMatch[1]) : 0;
    
    if (session.bookingData.children > 0 && !text.includes('лет') && !text.includes('год')) {
      session.stage = 'waiting_children_age';
      await ctx.reply(`👶 Укажите возраст ${session.bookingData.children > 1 ? 'детей' : 'ребёнка'}`);
      return;
    }
    
    // Если возраст уже указан в тексте
    if (session.bookingData.children > 0) {
      const ageMatch = text.match(/(\d+)\s*(лет|год)/);
      if (ageMatch) session.bookingData.childrenAge = ageMatch[1] + ' лет';
    }
    
    await completeQuickBooking(ctx, session);
    return;
  }
  
  // Проверяем что включен AI режим
  if (!session?.aiMode) {
    // Проверяем ключевые слова даже без AI режима
    const text = ctx.message.text.toLowerCase();
    
    // МОРСКИЕ ТУРЫ
    if (text.includes('море') || text.includes('остров') || text.includes('пляж') || text.includes('снорклинг')) {
      await showSeaTours(ctx);
      return;
    }
    // ПРИКЛЮЧЕНИЯ
    if (text.includes('приключен') || text.includes('актив') || text.includes('рафтинг') || text.includes('сафари')) {
      await ctx.answerCbQuery?.();
      // Эмулируем нажатие на категорию
      await ctx.reply(
        '🚣 *ПРИКЛЮЧЕНИЯ* — выберите тур:\n\n' +
        '🚣 Рафтинг + SPA + ATV — *2900฿*\n' +
        '🐘 Као Лак Сафари — *3200฿*\n' +
        '🎣 Рыбалка на рассвете — *4500฿*',
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🚣 Рафтинг + ATV', callback_data: 'select_rafting-spa-atv-1-day' }],
              [{ text: '🐘 Као Лак Сафари', callback_data: 'select_kao-lak-safari-1-day' }],
              [{ text: '📞 Спросить менеджера', url: 'https://t.me/Phuketga' }]
            ]
          }
        }
      );
      return;
    }
    // ПРИРОДА
    if (text.includes('природ') || text.includes('озеро') || text.includes('храм') || text.includes('культур')) {
      await ctx.reply(
        '🏞️ *ПРИРОДА И КУЛЬТУРА* — выберите тур:\n\n' +
        '🏞️ Чео Лан + Смотровая — *2900฿*\n' +
        '💚 Тайны Краби — *3100฿*\n' +
        '🛕 Достопримечательности — *1800฿*',
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🏞️ Чео Лан', callback_data: 'select_cheow-lan-lake' }],
              [{ text: '💚 Краби', callback_data: 'select_krabi-secrets' }],
              [{ text: '📞 Спросить менеджера', url: 'https://t.me/Phuketga' }]
            ]
          }
        }
      );
      return;
    }
    
    await ctx.reply(
      'Выберите категорию:\n\n' +
      '🏝️ /islands — Морские острова\n' +
      '🚣 /adventure — Приключения\n' +
      '🏞️ /nature — Природа\n\n' +
      'Или нажмите /start'
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
      model: "gpt-4o-mini",  // Улучшенная модель - умнее чем 3.5
      messages: session.messages,
      temperature: 0.7,
      max_tokens: 300
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
    '🔍 Что происходит сейчас:\n' +
    '• Проверяет наличие мест на вашу дату\n' +
    '• Уточняет финальную стоимость\n' +
    '• Готовит специальное предложение\n\n' +
    '⏱ Менеджер ответит вам тут же в боте в ближайшее время!\n\n' +
    'А пока можете посмотреть отзывы:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '⭐ Отзывы о турах', url: 'https://phukeo.com/#/reviews' }],
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
    '🗺️ Каталог туров:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🗺️ Открыть каталог', url: 'https://phukeo.com/#/tours' }],
          [{ text: '💬 Подобрать тур', callback_data: 'start_ai' }]
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
    '🗺️ Каталог туров:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🗺️ Открыть каталог', url: 'https://phukeo.com/#/tours' }],
          [{ text: '💬 Подобрать тур', callback_data: 'start_ai' }]
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
    '❓ Помощь\n\n' +
    '/start — Главное меню\n' +
    '/tours — Каталог туров\n\n' +
    'Напишите что ищете — подберём тур! 🏝️',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🗺️ Открыть каталог', url: 'https://phukeo.com/#/tours' }]
        ]
      }
    }
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
      `💬 **Менеджер Пхукет Go**:\n\n${message}`,
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
        { command: 'tours', description: '🗺️ Каталог туров' },
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
    
    console.log('✅ Команды и меню установлены');

    // Уведомляем менеджера о запуске
    await bot.telegram.sendMessage(MANAGER_CHAT_ID,
      '🚀 Пхукет Go бот запущен!\n\n' +
      '/reply CHAT_ID текст — ответить клиенту\n' +
      '/stats — статистика',
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

// ====== ОБРАБОТКА КНОПКИ "СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ" ======
bot.action('contact_manager', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  const session = userSessions[userId] || {};
  const tourName = session.tour ? session.tour.name : 'Тур не выбран';
  
  // 1. Уведомляем менеджера
  try {
    await bot.telegram.sendMessage(MANAGER_CHAT_ID, 
      `🔔 **КЛИЕНТ ХОЧЕТ СВЯЗАТЬСЯ!**\n\n` +
      `👤 Имя: ${ctx.from.first_name}\n` +
      `🏷️ Username: @${ctx.from.username || 'нет'}\n` +
      `🎯 Контекст: ${tourName}\n` +
      `💬 Chat ID: ${ctx.chat.id}\n\n` +
      `Клиент нажал кнопку "Связаться с менеджером".`
    );
  } catch (error) {
    console.error('Error notifying manager:', error);
  }
  
  // 2. Отправляем клиенту ссылку
  await ctx.reply(
    `📞 Соединяю с менеджером...\n\n` +
    `Я уже отправил уведомление, что вы хотите пообщаться. \n` +
    `Нажмите на кнопку ниже, чтобы открыть чат:`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '👩‍💻 Открыть чат с менеджером', url: 'https://t.me/Phuketga' }]
        ]
      }
    }
  );
});
