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

// 🎯 КОМАНДА /start
bot.start(async (ctx) => {
  const firstName = ctx.from.first_name || 'друг';
  const chatType = ctx.chat.type;
  
  // 🔗 DEEP LINK: Получаем параметр из /start [параметр]
  const startParam = ctx.message.text.split(' ')[1];
  
  console.log('📝 START:', ctx.message.text, '| Параметр:', startParam);
  
  // 🔗 DEEP LINKS ДЛЯ ВСЕХ ТУРОВ
  
  // 1️⃣ ПХИ-ПХИ 2 ДНЯ/1 НОЧЬ
  if (startParam === 'phiphi2days') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/phiphi-main.jpg',
      {
        caption: 
          `�️ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Пхи-Пхи 2 дня/1 ночь\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Проживание в отеле на Пхи-Пхи\n` +
          `• Посещение бухты Майя Бэй\n` +
          `• Снорклинг в лагунах\n` +
          `• 2 завтрака + 1 обед + 1 ужин\n` +
          `• Трансфер от отеля и обратно\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: от 6500฿\n` +
          `• Ребёнок (4-11 лет): от 5500฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/phi-phi-2days' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 2️⃣ 4 ЖЕМЧУЖИНЫ АНДАМАНСКОГО МОРЯ
  if (startParam === 'pearls') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/pearls-main.jpg',
      {
        caption: 
          `💎 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: 4 жемчужины Андаманского моря\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Пхи-Пхи + Джеймс Бонд + Краби + Раяли\n` +
          `• 2 дня, 1 ночь\n` +
          `• Комбо-тур по лучшим местам\n` +
          `• Проживание + все трансферы\n` +
          `• Питание включено\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: от 8500฿\n` +
          `• Ребёнок (4-11 лет): от 7000฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/pearls-andaman-sea' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 3️⃣ ДОСТОПРИМЕЧАТЕЛЬНОСТИ ПХУКЕТА
  if (startParam === 'sightseeing') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/bigbuddha-main.jpg',
      {
        caption: 
          `🛕 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Достопримечательности Пхукета\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Большой Будда (45 метров!)\n` +
          `• Храм Ват Чалонг\n` +
          `• Старый город Пхукета\n` +
          `• Мыс Промтеп (закат)\n` +
          `• Смотровые площадки\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 1800฿\n` +
          `• Ребёнок (4-11 лет): 1200฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/dostoprimechatelnosti-phuketa' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 4️⃣ РАФТИНГ + СПА + ATV
  if (startParam === 'rafting') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/rafting-scaled-BRXUzIbt.jpg',
      {
        caption: 
          `🌊 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Рафтинг + СПА + ATV\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Рафтинг 5 км по горной реке\n` +
          `• СПА массаж и процедуры\n` +
          `• ATV квадроциклы (1 час)\n` +
          `• Обед и трансфер от отеля\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2500฿\n` +
          `• Ребёнок (4-11 лет): 1800฿\n\n` +
          `📅 Выберите дату и количество человек! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/rafting-spa-atv' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 5️⃣ РАФТИНГ + СПА (1 ДЕНЬ)
  if (startParam === 'raftingspa') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/rafting-spa.jpg',
      {
        caption: 
          `🌊 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Рафтинг + СПА (1 день)\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Рафтинг 5 км\n` +
          `• СПА-массаж 1,5 часа\n` +
          `• Обед и трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2200฿\n` +
          `• Ребёнок (4-11 лет): 1600฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/rafting-spa-1day' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 6️⃣ КАО ЛАК САФАРИ
  if (startParam === 'kaolak') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/kaolak-main.jpg',
      {
        caption: 
          `� Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Као Лак Сафари\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Катание на слонах\n` +
          `• Бамбуковые плоты\n` +
          `• Водопады\n` +
          `• Джунгли\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2400฿\n` +
          `• Ребёнок (4-11 лет): 1700฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/kao-lak-safari' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 7️⃣ 11 ОСТРОВОВ МЕГА-ТУР
  if (startParam === '11islands') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/11islands-main.jpg',
      {
        caption: 
          `🏝️ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: 11 островов за 1 день!\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• 11 островов на скоростной лодке\n` +
          `• Снорклинг в лучших местах\n` +
          `• Обед на пляже\n` +
          `• Полный день приключений\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 3500฿\n` +
          `• Ребёнок (4-11 лет): 2800฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/eleven-islands-mega' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 8️⃣ ДЖЕЙМС БОНД + ПХАНГ НГА
  if (startParam === 'jamesbond') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/jamesbond-main.jpg',
      {
        caption: 
          `🎬 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Джеймс Бонд + Пханг Нга\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Остров Джеймса Бонда (из фильма!)\n` +
          `• Пещеры Пханг Нга\n` +
          `• Каноэ по мангровым лесам\n` +
          `• Мусульманская деревня\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2300฿\n` +
          `• Ребёнок (4-11 лет): 1600฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/james-bond-island' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 9️⃣ ОЗЕРО ЧЕО ЛАН (АВАТАР)
  if (startParam === 'cheolan' || startParam === 'avatar') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/cheolan-main.jpg',
      {
        caption: 
          `🏞️ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Озеро Чео Лан (Аватар)\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Плавучие бунгало на озере\n` +
          `• Каякинг между скалами\n` +
          `• Джунгли и водопады\n` +
          `• Плот по озеру\n` +
          `• Питание + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2900฿\n` +
          `• Ребёнок (4-11 лет): 2200฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/cheow-lan-lake' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 🔟 РАЧА + КОРАЛ ОСТРОВА
  if (startParam === 'racha') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/racha-main.jpg',
      {
        caption: 
          `🏝️ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Рача + Корал острова\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Остров Рача (белый песок!)\n` +
          `• Остров Корал (снорклинг)\n` +
          `• Обед на пляже\n` +
          `• Скоростная лодка\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2100฿\n` +
          `• Ребёнок (4-11 лет): 1500฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/racha-coral-islands' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣1️⃣ ПХАНГ НГА СКАЙВОК
  if (startParam === 'skywalk') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/skywalk-main.jpg',
      {
        caption: 
          `🌉 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Пханг Нга Скайвок\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Стеклянный мост над джунглями\n` +
          `• Смотровые площадки\n` +
          `• Водопады\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 1900฿\n` +
          `• Ребёнок (4-11 лет): 1400฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/phang-nga-skywalk' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣2️⃣ ОСТРОВА СИМИЛАН
  if (startParam === 'similan') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/similan-main.jpg',
      {
        caption: 
          `🐠 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Острова Симилан\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Лучший снорклинг в Таиланде!\n` +
          `• Белоснежные пляжи\n` +
          `• Черепахи и тропические рыбы\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2800฿\n` +
          `• Ребёнок (4-11 лет): 2200฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/similan-islands' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣3️⃣ СИМИЛАН РАННИЙ ВЫЕЗД
  if (startParam === 'similanearly') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/similan-early.jpg',
      {
        caption: 
          `🌅 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Симилан ранний выезд\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Выезд в 4:00 - первые на островах!\n` +
          `• Больше времени на снорклинг\n` +
          `• Меньше туристов\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 3000฿\n` +
          `• Ребёнок (4-11 лет): 2400฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/similan-islands-early' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣4️⃣ СИМИЛАН СПИДБОТ
  if (startParam === 'similanspeed') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/similan-speed.jpg',
      {
        caption: 
          `⚡ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Симилан на спидботе\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Скоростная лодка (быстрее!)\n` +
          `• Меньше группа = больше комфорта\n` +
          `• Все острова за день\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 3200฿\n` +
          `• Ребёнок (4-11 лет): 2600฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/similan-islands-speedboat' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣5️⃣ РЫБАЛКА НА РАССВЕТЕ
  if (startParam === 'fishing') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/fishing-main.jpg',
      {
        caption: 
          `🎣 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Рыбалка на рассвете\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Рыбалка на рассвете (5:00-11:00)\n` +
          `• Все снасти и наживка\n` +
          `• Приготовим ваш улов!\n` +
          `• Завтрак на лодке\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 1800฿\n` +
          `• Ребёнок (4-11 лет): 1200฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/fishing-sunrise' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣6️⃣ РАЧА + КОРАЛ РАССВЕТ
  if (startParam === 'rachasunrise') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/racha-sunrise.jpg',
      {
        caption: 
          `🌅 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Рача + Корал рассвет\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Ранний выезд - первые на островах!\n` +
          `• Рассвет на пляже\n` +
          `• Больше времени для купания\n` +
          `• Завтрак + обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2300฿\n` +
          `• Ребёнок (4-11 лет): 1700฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/racha-coral-sunrise' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣7️⃣ РАЧА + КОРАЛ РАВАИ
  if (startParam === 'racharawai') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/racha-rawai.jpg',
      {
        caption: 
          `🏖️ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Рача + Корал (из Раваи)\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Выезд из Раваи (ближе к островам!)\n` +
          `• Меньше в пути = больше времени на пляже\n` +
          `• Снорклинг\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2000฿\n` +
          `• Ребёнок (4-11 лет): 1400฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/racha-coral-rawai' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣8️⃣ ПХИ-ПХИ РАССВЕТ
  if (startParam === 'phiphisunrise') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/phiphi-sunrise.jpg',
      {
        caption: 
          `🌅 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Пхи-Пхи рассвет\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Выезд в 5:00 - встречаем рассвет!\n` +
          `• Майя Бэй БЕЗ толп туристов\n` +
          `• Снорклинг в лагунах\n` +
          `• Завтрак + обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2600฿\n` +
          `• Ребёнок (4-11 лет): 2000฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/phi-phi-sunrise' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 1️⃣9️⃣ 5 ЖЕМЧУЖИН 2 ДНЯ
  if (startParam === '5pearls') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/5pearls-main.jpg',
      {
        caption: 
          `💎 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: 5 жемчужин за 2 дня\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• 5 лучших островов\n` +
          `• Проживание + питание\n` +
          `• Снорклинг везде\n` +
          `• Все трансферы\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 8000฿\n` +
          `• Ребёнок (4-11 лет): 6500฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/five-pearls-2days' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 2️⃣0️⃣ ПХАНГ НГА + САМЕТ
  if (startParam === 'phangngasamet') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/phangnga-samet.jpg',
      {
        caption: 
          `🏝️ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Пханг Нга + Самет\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Пханг Нга залив\n` +
          `• Остров Самет\n` +
          `• Каноэ\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2200฿\n` +
          `• Ребёнок (4-11 лет): 1600฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/phang-nga-samet' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // 2️⃣1️⃣ СЕКРЕТЫ КРАБИ
  if (startParam === 'krabi') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/krabi-main.jpg',
      {
        caption: 
          `🗻 Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Секреты Краби\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Скрытые пляжи Краби\n` +
          `• Изумрудный бассейн\n` +
          `• Горячие источники\n` +
          `• Храм тигра\n` +
          `• Обед + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 2400฿\n` +
          `• Ребёнок (4-11 лет): 1800฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/krabi-secrets' } }],
            [{ text: '🗺️ Все туры', web_app: { url: 'https://phukeo.com' } }],
            [{ text: '☎️ Менеджер', url: 'https://t.me/Phuketga' }]
          ]
        }
      }
    );
    return;
  }
  
  // Обычное приветствие (если без параметра)
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

📱 [Открыть каталог](https://t.me/phuketgos_bot/app)`);
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

// 🏥 Health check сервер для Koyeb
const http = require('http');
const healthServer = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      bot: 'running',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 8000;
healthServer.listen(PORT, () => {
  console.log(`🏥 Health check server running on port ${PORT}`);
});

// Graceful shutdown
process.once('SIGINT', () => {
  healthServer.close();
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  healthServer.close();
  bot.stop('SIGTERM');
});
