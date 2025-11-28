// 🤖 Telegram Bot - Welcome Message для Пхукет Go
// Файл: bot/welcome-message-v2.js

const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const { tours, categories } = require('./tours-data');

const bot = new Telegraf(process.env.BOT_TOKEN);

// 💾 ХРАНИЛИЩЕ СЕССИЙ (для диалога бронирования)
const sessions = {};

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
          `• Взрослый: от 4380฿\n` +
          `• Ребёнок (4-11 лет): от 3780฿\n\n` +
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
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/rafting-spa-atv-1-day' } }],
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
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/kao-lak-safari-1-day' } }],
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
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/james-bond-island-phang-nga' } }],
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
  
  // 9️⃣.5️⃣ ОЗЕРО ЧЕО ЛАН + ХАНГДОНГ (АВАТАР ПЛЮС)
  if (startParam === 'avatarplus' || startParam === 'hangdong') {
    await ctx.replyWithPhoto(
      'https://phukeo.com/assets/avatar-hangdong.jpg',
      {
        caption: 
          `🏞️ Привет, ${firstName}!\n\n` +
          `✅ Вы выбрали: Озеро Чео Лан + Хангдонг\n\n` +
          `📋 ЧТО ВХОДИТ:\n` +
          `• Озеро Чео Лан (Аватар)\n` +
          `• Пещера Хангдонг\n` +
          `• Каякинг\n` +
          `• Плавучие бунгало\n` +
          `• Питание + трансфер\n\n` +
          `💰 ЦЕНА:\n` +
          `• Взрослый: 3200฿\n` +
          `• Ребёнок (4-11 лет): 2500฿\n\n` +
          `📅 Выберите дату! ⬇️`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/avatar-plus-hangdong' } }],
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
            [{ text: '📱 Забронировать', web_app: { url: 'https://phukeo.com/#/tours/racha-coral-islands-speedboat' } }],
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
  
  // Обычное приветствие (если без параметра) - показываем главное меню
  await ctx.reply(
    `🌴 Пхукет Go — экскурсии на Пхукете!\n\n` +
    `Я помогу выбрать идеальный тур на Пхукете! 🏝️\n\n` +
    `Выберите действие:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🗺️ Смотреть туры', 'show_catalog')],
      [Markup.button.callback('� Задать вопрос', 'ask_question')],
      [Markup.button.url('☎️ Связаться с менеджером', 'https://t.me/Phuketga')]
    ])
  );
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

💬 Отвечаем максимально быстро!`);
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

// 🔔 CALLBACK КНОПКИ ДЛЯ ГЛАВНОГО МЕНЮ

// 🗺️ КНОПКА "Смотреть туры" - Показать категории
bot.action('show_catalog', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `🗺️ Выберите категорию туров:\n\n` +
    `🏝️ Острова - самые популярные туры на острова\n` +
    `🏔️ Приключения - активный отдых и экстрим\n` +
    `🛕 Культурные - храмы, достопримечательности\n` +
    `🤿 Дайвинг - подводный мир и снорклинг\n` +
    `🎣 Рыбалка - морская рыбалка на рассвете`,
    Markup.inlineKeyboard([
      [Markup.button.callback(`🏝️ Острова (${categories.islands.tours.length})`, 'cat_islands')],
      [Markup.button.callback(`🏔️ Приключения (${categories.adventure.tours.length})`, 'cat_adventure')],
      [Markup.button.callback(`🛕 Культурные (${categories.cultural.tours.length})`, 'cat_cultural')],
      [Markup.button.callback(`🤿 Дайвинг (${categories.diving.tours.length})`, 'cat_diving')],
      [Markup.button.callback(`🎣 Рыбалка (${categories.fishing.tours.length})`, 'cat_fishing')],
      [Markup.button.callback('« Назад в меню', 'back_to_menu')]
    ])
  );
});

// 💬 КНОПКА "Задать вопрос" (placeholder для будущего ChatGPT)
bot.action('ask_question', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `💬 Вы можете задать любой вопрос о турах!\n\n` +
    `Например:\n` +
    `• "Какой тур лучше для детей?"\n` +
    `• "Сколько стоит поездка на Пхи-Пхи?"\n` +
    `• "Что взять с собой на экскурсию?"\n\n` +
    `🤖 Скоро здесь появится AI-помощник!\n` +
    `А пока вы можете связаться с менеджером:`,
    Markup.inlineKeyboard([
      [Markup.button.url('☎️ Написать менеджеру', 'https://t.me/Phuketga')],
      [Markup.button.callback('« Назад в меню', 'back_to_menu')]
    ])
  );
});

// ↩️ КНОПКА "Назад в меню"
bot.action('back_to_menu', async (ctx) => {
  await ctx.answerCbQuery();
  const firstName = ctx.from.first_name || 'друг';
  await ctx.reply(
    `👋 Привет, ${firstName}!\n\n` +
    `Я помогу выбрать идеальный тур на Пхукете! 🏝️\n\n` +
    `Выберите действие:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🗺️ Смотреть туры', 'show_catalog')],
      [Markup.button.callback('💬 Задать вопрос', 'ask_question')],
      [Markup.button.url('☎️ Связаться с менеджером', 'https://t.me/Phuketga')]
    ])
  );
});

// � ОБРАБОТЧИКИ КАТЕГОРИЙ

// 🏝️ Категория "Острова"
bot.action('cat_islands', async (ctx) => {
  await ctx.answerCbQuery();
  const categoryData = categories.islands;
  const buttons = categoryData.tours.map(tourId => {
    const tour = tours[tourId];
    return [Markup.button.callback(
      `${tour.name} - от ${tour.priceAdult}฿`,
      `tour_${tourId}`
    )];
  });
  buttons.push([Markup.button.callback('« Назад к категориям', 'show_catalog')]);
  
  await ctx.reply(
    `${categoryData.emoji} ${categoryData.name}\n\n` +
    `Выберите тур для подробностей:`,
    Markup.inlineKeyboard(buttons)
  );
});

// 🏔️ Категория "Приключения"
bot.action('cat_adventure', async (ctx) => {
  await ctx.answerCbQuery();
  const categoryData = categories.adventure;
  const buttons = categoryData.tours.map(tourId => {
    const tour = tours[tourId];
    return [Markup.button.callback(
      `${tour.name} - от ${tour.priceAdult}฿`,
      `tour_${tourId}`
    )];
  });
  buttons.push([Markup.button.callback('« Назад к категориям', 'show_catalog')]);
  
  await ctx.reply(
    `${categoryData.emoji} ${categoryData.name}\n\n` +
    `Выберите тур для подробностей:`,
    Markup.inlineKeyboard(buttons)
  );
});

// 🛕 Категория "Культурные"
bot.action('cat_cultural', async (ctx) => {
  await ctx.answerCbQuery();
  const categoryData = categories.cultural;
  const buttons = categoryData.tours.map(tourId => {
    const tour = tours[tourId];
    return [Markup.button.callback(
      `${tour.name} - от ${tour.priceAdult}฿`,
      `tour_${tourId}`
    )];
  });
  buttons.push([Markup.button.callback('« Назад к категориям', 'show_catalog')]);
  
  await ctx.reply(
    `${categoryData.emoji} ${categoryData.name}\n\n` +
    `Выберите тур для подробностей:`,
    Markup.inlineKeyboard(buttons)
  );
});

// 🤿 Категория "Дайвинг"
bot.action('cat_diving', async (ctx) => {
  await ctx.answerCbQuery();
  const categoryData = categories.diving;
  const buttons = categoryData.tours.map(tourId => {
    const tour = tours[tourId];
    return [Markup.button.callback(
      `${tour.name} - от ${tour.priceAdult}฿`,
      `tour_${tourId}`
    )];
  });
  buttons.push([Markup.button.callback('« Назад к категориям', 'show_catalog')]);
  
  await ctx.reply(
    `${categoryData.emoji} ${categoryData.name}\n\n` +
    `Выберите тур для подробностей:`,
    Markup.inlineKeyboard(buttons)
  );
});

// 🎣 Категория "Рыбалка"
bot.action('cat_fishing', async (ctx) => {
  await ctx.answerCbQuery();
  const categoryData = categories.fishing;
  const buttons = categoryData.tours.map(tourId => {
    const tour = tours[tourId];
    return [Markup.button.callback(
      `${tour.name} - от ${tour.priceAdult}฿`,
      `tour_${tourId}`
    )];
  });
  buttons.push([Markup.button.callback('« Назад к категориям', 'show_catalog')]);
  
  await ctx.reply(
    `${categoryData.emoji} ${categoryData.name}\n\n` +
    `Выберите тур для подробностей:`,
    Markup.inlineKeyboard(buttons)
  );
});
// 🎴 УНИВЕРСАЛЬНЫЙ ОБРАБОТЧИК КАРТОЧЕК ТУРОВ
// Создаём обработчики для всех 22 туров
Object.keys(tours).forEach(tourId => {
  bot.action(`tour_${tourId}`, async (ctx) => {
    await ctx.answerCbQuery();
    const tour = tours[tourId];
    
    // Формируем текст карточки
    let cardText = 
      `${tour.name}\n\n` +
      `${tour.description}\n\n` +
      `⏱ Длительность: ${tour.duration}\n` +
      `💰 Цена: ${tour.priceAdult}฿ взрослый / ${tour.priceChild}฿ ребёнок\n\n`;
    
    // Если есть программа - показываем её
    if (tour.program && tour.program.length > 0) {
      cardText += `📋 ПРОГРАММА ТУРА:\n` + tour.program.map(p => p.startsWith('День') ? `\n${p}` : `• ${p}`).join('\n') + '\n\n';
    }
    
    // Если есть детали о включённом - показываем
    if (tour.included && tour.included.length > 0) {
      cardText += `✅ ЧТО ВКЛЮЧЕНО:\n` + tour.included.join('\n') + '\n\n';
    } else if (tour.highlights) {
      // Старый формат - только highlights
      cardText += `✨ Что включено:\n` + tour.highlights.map(h => `• ${h}`).join('\n') + '\n\n';
    }
    
    // Если есть список "что взять" - показываем
    if (tour.whatToBring && tour.whatToBring.length > 0) {
      cardText += `🎒 ЧТО ВЗЯТЬ С СОБОЙ:\n` + tour.whatToBring.join('\n');
    }
    
    // ФОТО ОТКЛЮЧЕНЫ ПО ЗАПРОСУ (не грузятся)
    // Отправляем только текст
    await ctx.reply(cardText, 
      Markup.inlineKeyboard([
        [Markup.button.callback('🎫 Хочу забронировать!', `book_new_${tourId}`)],
        [Markup.button.callback('« Назад к турам', `cat_${tour.category}`)]
      ])
    );
    /*
    // Если есть фото - отправляем с фото
    if (tour.image) {
      try {
        await ctx.replyWithPhoto(tour.image, {
          caption: cardText,
          reply_markup: {
            inline_keyboard: [
              [{ text: '🎫 Хочу забронировать!', callback_data: `book_new_${tourId}` }],
              [{ text: '« Назад к турам', callback_data: `cat_${tour.category}` }]
            ]
          }
        });
      } catch (error) {
        // Если фото не загрузилось - отправляем только текст
        await ctx.reply(cardText, 
          Markup.inlineKeyboard([
            [Markup.button.callback('🎫 Хочу забронировать!', `book_new_${tourId}`)],
            [Markup.button.callback('« Назад к турам', `cat_${tour.category}`)]
          ])
        );
      }
    } else {
      // Если фото нет - только текст
      await ctx.reply(cardText, 
        Markup.inlineKeyboard([
          [Markup.button.callback('🎫 Хочу забронировать!', `book_new_${tourId}`)],
          [Markup.button.callback('« Назад к турам', `cat_${tour.category}`)]
        ])
      );
    }
    */
  });
}); // ← ЗАКРЫВАЕМ forEach для tour cards!

// 📋 СИСТЕМА БРОНИРОВАНИЯ (НОВАЯ)
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '1217592929';

// Универсальные обработчики для всех туров
Object.keys(tours).forEach(tourId => {
  // Старт бронирования
  bot.action(`book_new_${tourId}`, async (ctx) => {
    await ctx.answerCbQuery();
    const userId = ctx.from.id;
    const tour = tours[tourId];
    
    // Инициализируем сессию
    sessions[userId] = {
      tour: tourId,
      tourName: tour.name,
      step: 'waiting_name',
      name: null,
      date: null,
      adults: null,
      children: null,
      contact: null
    };
    
    await ctx.reply(
      `🎫 Бронирование тура: ${tour.name}\n\n` +
      `Давайте оформим вашу заявку!\n\n` +
      `👤 Шаг 1/5: Как вас зовут?\n` +
      `Напишите ваше имя:`
    );
  });
});

// Обработка текстовых сообщений (диалог бронирования)
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;
  
  // Проверяем, есть ли активная сессия бронирования
  if (!sessions[userId]) {
    return; // Пропускаем, это не часть диалога бронирования
  }
  
  const session = sessions[userId];
  
  // ШАГ 1: Получили имя
  if (session.step === 'waiting_name') {
    session.name = text;
    session.step = 'waiting_date';
    
    await ctx.reply(
      `Приятно познакомиться, ${session.name}! 👋\n\n` +
      `📅 Шаг 2/5: На какую дату планируете тур?\n` +
      `Напишите дату (например: 25 декабря или 25.12.2025):`
    );
    return;
  }
  
  // ШАГ 2: Получили дату
  if (session.step === 'waiting_date') {
    session.date = text;
    session.step = 'waiting_adults';
    
    await ctx.reply(
      `📅 Отлично! Запланируем на ${session.date}\n\n` +
      `👥 Шаг 3/5: Сколько взрослых поедет? (от 18 лет)\n` +
      `Выберите:`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback('1 👤', 'adults_1'),
          Markup.button.callback('2 👥', 'adults_2'),
          Markup.button.callback('3 👥', 'adults_3')
        ],
        [
          Markup.button.callback('4 👥', 'adults_4'),
          Markup.button.callback('5+ 👥', 'adults_5plus')
        ]
      ])
    );
    return;
  }
  
  // ШАГ 5: Получили контакт (если отправили текстом, а не через кнопку)
  if (session.step === 'waiting_contact') {
    session.contact = text;
    
    // Отправка заявки менеджеру
    const tour = tours[session.tour];
    const totalPrice = (tour.priceAdult * session.adults) + (tour.priceChild * session.children);
    
    const adminMessage = 
      `🔔 *НОВАЯ БРОНЬ ТУРА!*\n\n` +
      `🏝️ *Тур:* ${session.tourName}\n` +
      `👤 *Имя:* ${session.name}\n` +
      `📅 *Дата:* ${session.date}\n` +
      `👥 *Людей:* ${session.adults} взрослых${session.children > 0 ? `, ${session.children} детей` : ''}\n` +
      `📱 *Контакт:* ${session.contact}\n\n` +
      `💰 *Примерная цена:* ${totalPrice}฿\n` +
      `(${tour.priceAdult}฿ × ${session.adults} взр${session.children > 0 ? ` + ${tour.priceChild}฿ × ${session.children} дет` : ''})\n\n` +
      `⏰ Заявка от: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bangkok' })}`;
    
    try {
      await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMessage, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Ошибка отправки админу:', error);
    }
    
    // Подтверждение клиенту
    await ctx.reply(
      `✅ *Заявка отправлена!*\n\n` +
      `📋 Ваша бронь:\n` +
      `🏝️ Тур: ${session.tourName}\n` +
      `📅 Дата: ${session.date}\n` +
      `👥 Людей: ${session.adults} взрослых${session.children > 0 ? `, ${session.children} детей` : ''}\n` +
      `💰 Примерная цена: ${totalPrice}฿\n\n` +
      `☎️ Менеджер свяжется с вами для подтверждения наличия мест!\n\n` +
      `Спасибо что выбрали Пхукет Go! 🌴`,
      { parse_mode: 'Markdown' }
    );
    
    // Очищаем сессию
    delete sessions[userId];
    return;
  }
});

// Кнопки для выбора количества взрослых
bot.action('adults_1', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].adults = 1;
  sessions[userId].step = 'waiting_children';
  
  await ctx.reply(
    `✅ 1 взрослый\n\n` +
    `👶 Шаг 4/5: Сколько детей? (до 12 лет)\n` +
    `Выберите:`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Нет детей', 'children_0'),
        Markup.button.callback('1 👶', 'children_1')
      ],
      [
        Markup.button.callback('2 👶', 'children_2'),
        Markup.button.callback('3+ 👶', 'children_3plus')
      ]
    ])
  );
});

bot.action('adults_2', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].adults = 2;
  sessions[userId].step = 'waiting_children';
  
  await ctx.reply(
    `✅ 2 взрослых\n\n` +
    `👶 Шаг 4/5: Сколько детей? (до 12 лет)\n` +
    `Выберите:`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Нет детей', 'children_0'),
        Markup.button.callback('1 👶', 'children_1')
      ],
      [
        Markup.button.callback('2 👶', 'children_2'),
        Markup.button.callback('3+ 👶', 'children_3plus')
      ]
    ])
  );
});

bot.action('adults_3', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].adults = 3;
  sessions[userId].step = 'waiting_children';
  
  await ctx.reply(
    `✅ 3 взрослых\n\n` +
    `👶 Шаг 4/5: Сколько детей? (до 12 лет)\n` +
    `Выберите:`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Нет детей', 'children_0'),
        Markup.button.callback('1 👶', 'children_1')
      ],
      [
        Markup.button.callback('2 👶', 'children_2'),
        Markup.button.callback('3+ 👶', 'children_3plus')
      ]
    ])
  );
});

bot.action('adults_4', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].adults = 4;
  sessions[userId].step = 'waiting_children';
  
  await ctx.reply(
    `✅ 4 взрослых\n\n` +
    `👶 Шаг 4/5: Сколько детей? (до 12 лет)\n` +
    `Выберите:`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Нет детей', 'children_0'),
        Markup.button.callback('1 👶', 'children_1')
      ],
      [
        Markup.button.callback('2 👶', 'children_2'),
        Markup.button.callback('3+ 👶', 'children_3plus')
      ]
    ])
  );
});

bot.action('adults_5plus', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].adults = 5;
  sessions[userId].step = 'waiting_children';
  
  await ctx.reply(
    `✅ 5+ взрослых\n\n` +
    `👶 Шаг 4/5: Сколько детей? (до 12 лет)\n` +
    `Выберите:`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Нет детей', 'children_0'),
        Markup.button.callback('1 👶', 'children_1')
      ],
      [
        Markup.button.callback('2 👶', 'children_2'),
        Markup.button.callback('3+ 👶', 'children_3plus')
      ]
    ])
  );
});

// Кнопки для выбора количества детей
bot.action('children_0', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].children = 0;
  sessions[userId].step = 'waiting_contact';
  
  await ctx.reply(
    `✅ без детей\n\n` +
    `📱 Шаг 5/5: Как с вами связаться?\n\n` +
    `Отправьте ваш телефон или Telegram username:`,
    Markup.inlineKeyboard([
      [Markup.button.contactRequest('📞 Поделиться контактом')]
    ])
  );
});

bot.action('children_1', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].children = 1;
  sessions[userId].step = 'waiting_contact';
  
  await ctx.reply(
    `✅ 1 ребёнок\n\n` +
    `📱 Шаг 5/5: Как с вами связаться?\n\n` +
    `Отправьте ваш телефон или Telegram username:`,
    Markup.inlineKeyboard([
      [Markup.button.contactRequest('📞 Поделиться контактом')]
    ])
  );
});

bot.action('children_2', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].children = 2;
  sessions[userId].step = 'waiting_contact';
  
  await ctx.reply(
    `✅ 2 детей\n\n` +
    `📱 Шаг 5/5: Как с вами связаться?\n\n` +
    `Отправьте ваш телефон или Telegram username:`,
    Markup.inlineKeyboard([
      [Markup.button.contactRequest('📞 Поделиться контактом')]
    ])
  );
});

bot.action('children_3plus', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  if (!sessions[userId]) return;
  
  sessions[userId].children = 3;
  sessions[userId].step = 'waiting_contact';
  
  await ctx.reply(
    `✅ 3+ детей\n\n` +
    `📱 Шаг 5/5: Как с вами связаться?\n\n` +
    `Отправьте ваш телефон или Telegram username:`,
    Markup.inlineKeyboard([
      [Markup.button.contactRequest('📞 Поделиться контактом')]
    ])
  );
});

// Обработка контакта (кнопка "Поделиться контактом")
bot.on('contact', async (ctx) => {
  const userId = ctx.from.id;
  if (!sessions[userId] || sessions[userId].step !== 'waiting_contact') return;
  
  const contact = ctx.message.contact;
  const session = sessions[userId];
  session.contact = contact.phone_number;
  
  // Отправка заявки менеджеру
  const tour = tours[session.tour];
  const totalPrice = (tour.priceAdult * session.adults) + (tour.priceChild * session.children);
  
  const adminMessage = 
    `🔔 *НОВАЯ БРОНЬ ТУРА!*\n\n` +
    `🏝️ *Тур:* ${session.tourName}\n` +
    `👤 *Имя:* ${session.name}\n` +
    `📅 *Дата:* ${session.date}\n` +
    `👥 *Людей:* ${session.adults} взрослых${session.children > 0 ? `, ${session.children} детей` : ''}\n` +
    `📱 *Телефон:* +${session.contact}\n\n` +
    `💰 *Примерная цена:* ${totalPrice}฿\n` +
    `(${tour.priceAdult}฿ × ${session.adults} взр${session.children > 0 ? ` + ${tour.priceChild}฿ × ${session.children} дет` : ''})\n\n` +
    `⏰ Заявка от: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bangkok' })}`;
  
  try {
    await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMessage, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Ошибка отправки админу:', error);
  }
  
  // Подтверждение клиенту
  await ctx.reply(
    `✅ *Заявка отправлена!*\n\n` +
    `📋 Ваша бронь:\n` +
    `🏝️ Тур: ${session.tourName}\n` +
    `📅 Дата: ${session.date}\n` +
    `👥 Людей: ${session.adults} взрослых${session.children > 0 ? `, ${session.children} детей` : ''}\n` +
    `💰 Примерная цена: ${totalPrice}฿\n\n` +
    `☎️ Менеджер свяжется с вами для подтверждения наличия мест!\n\n` +
    `Спасибо что выбрали Пхукет Go! 🌴`,
    { parse_mode: 'Markdown' }
  );
  
  // Очищаем сессию
  delete sessions[userId];
  return;
});

// 🔔 CALLBACK КНОПКИ (старые)
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
💬 Ответим максимально быстро!`);
});

// ===== СТАРАЯ СИСТЕМА УДАЛЕНА - ИСПОЛЬЗУЕТСЯ ТОЛЬКО НОВАЯ СИСТЕМА ВЫШЕ =====

// 💬 ОБРАБОТКА ТЕКСТОВЫХ СООБЩЕНИЙ (старая система удалена - используется новая выше)
bot.on('message', async (ctx) => {
  if (!ctx.message.text) return;
  
  const chatType = ctx.chat.type;
  const text = ctx.message.text;
  const userId = ctx.from.id;
  
  // Для групп и обычных сообщений
  const textLower = text.toLowerCase();
  
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
    ctx.reply('📞 Пиши прямо сюда! Мы отвечаем максимально быстро.\n\nИли используй команду /contacts');
  } else {
    ctx.reply(`👋 Привет! Я бот Пхукет Go.\n\n🗺️ Хочешь посмотреть туры? Нажми /start\n📚 Нужна помощь? Нажми /help`);
  }
});

// 🚀 ЗАПУСК БОТА С WEBHOOK (для Koyeb/облачных платформ)
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;
const WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN || 'small-robinia-phukeo-8b5e1e16.koyeb.app';
const WEBHOOK_PATH = '/telegram-webhook';

// ⚠️ КРИТИЧЕСКИ ВАЖНО: Middleware для парсинга JSON (БЕЗ НЕГО КНОПКИ НЕ РАБОТАЮТ!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🏥 Health check endpoints
app.get('/', (req, res) => {
  res.send(`
    <h1>🏝️ Пхукет Go Bot</h1>
    <p>✅ Status: Running</p>
    <p>⏱️ Uptime: ${Math.floor(process.uptime())}s</p>
    <p>📱 Bot: @phuketgos_bot</p>
    <p>🌐 Website: <a href="https://phukeo.com">phukeo.com</a></p>
  `);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    bot: 'running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 🎯 Telegram Webhook endpoint
app.post(WEBHOOK_PATH, async (req, res) => {
  // Логируем для отладки
  if (req.body?.callback_query) {
    console.log('📞 Callback query:', req.body.callback_query.data);
  }
  if (req.body?.message?.text) {
    console.log('💬 Message:', req.body.message.text);
  }
  
  try {
    await bot.handleUpdate(req.body, res);
  } catch (error) {
    console.error('❌ Ошибка обработки update:', error);
    res.sendStatus(500);
  }
});

// Запускаем Express сервер
app.listen(PORT, async () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log('📱 Бот: @phuketgos_bot');
  console.log('🗺️ Сайт: https://phukeo.com');
  console.log('');
  
  // Устанавливаем webhook
  const webhookUrl = `https://${WEBHOOK_DOMAIN}${WEBHOOK_PATH}`;
  
  try {
    await bot.telegram.setWebhook(webhookUrl);
    console.log(`✅ Webhook установлен: ${webhookUrl}`);
    console.log('📊 Режим аналитики групп активирован');
    console.log('💡 Команды для групп:');
    console.log('   /getid - получить ID группы');
    console.log('   /stats - посмотреть статистику');
  } catch (error) {
    console.error('❌ Ошибка установки webhook:', error.message);
    console.log('💡 Проверьте WEBHOOK_DOMAIN в переменных окружения');
    console.log('📝 Пример: WEBHOOK_DOMAIN=your-app.koyeb.app');
  }
});

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('⏸️ Получен SIGINT, останавливаем бот...');
  bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log('⏸️ Получен SIGTERM, останавливаем бот...');
  bot.stop('SIGTERM');
  process.exit(0);
});
