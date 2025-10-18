import type { TourData } from "@/types/Tour";

// Import images from local assets
import cheoLanMain from "@/assets/cheow-lan-lake/cheow-lan-main.jpg";
import cheoLan1 from "@/assets/cheow-lan-lake/cheow-lan-1.jpg";
import cheoLan2 from "@/assets/cheow-lan-lake/cheow-lan-2.jpg";
import sametNangsheMain from "@/assets/cheow-lan-lake/samet-nangshe-main.jpg";
import sametNangshe1 from "@/assets/cheow-lan-lake/samet-nangshe-1.jpg";
import sametNangshe2 from "@/assets/cheow-lan-lake/samet-nangshe-2.jpg";
import guilinRocksMain from "@/assets/cheow-lan-lake/guilin-rocks-main.jpg";
import guilinRocks2 from "@/assets/cheow-lan-lake/guilin-rocks-2.jpg";
import safariLakeMain from "@/assets/cheow-lan-lake/safari-lake-main.jpg";
import safariLake1 from "@/assets/cheow-lan-lake/safari-lake-1.jpg";
import safariLake2 from "@/assets/cheow-lan-lake/safari-lake-2.jpg";
import bangTongMain from "@/assets/cheow-lan-lake/bang-tong-main.jpg";
import bangTong1 from "@/assets/cheow-lan-lake/bang-tong-1.jpg";
import bangTong2 from "@/assets/cheow-lan-lake/bang-tong-2.jpg";
import bangTong3 from "@/assets/cheow-lan-lake/bang-tong-3.jpg";

// Статические данные тура "Чео Лан + Самет Нангше"
export const cheoLanLakeTourData: TourData = {
  id: "cheow-lan-lake",
  
  title: "ЧЕО ЛАН + САМЕТ НАНГШЕ",
  
  subtitle: "Озеро Чео Лан • Смотровая Самет Нангше • Храм • 1 день",
  
  description: `Захватывающий тур на целый день, объединяющий лучшие природные достопримечательности региона! Встречайте рассвет на смотровой площадке Самет Нангше с панорамным видом на залив Пханг Нга, затем отправьтесь в национальный парк Као Сок на легендарное озеро Чео Лан — тайский Гуйлинь, окруженный джунглями и скалами высотой до 960 метров.

Вас ждет сафари на длинной лодке по изумрудным водам озера, фантастические виды на известняковые скалы в стиле Гуйлиня, рыбалка на красного тилапия, обед в плавучем ресторане и посещение храма Банг Тонг с удивительным монахом. Это сочетание захватывающих пейзажей, аутентичной природы и культурных открытий!`,
  
  route: '/excursion/cheow-lan-lake',
  
  mainImage: cheoLanMain,
  
  gallery: [
    cheoLanMain,
    sametNangsheMain,
    safariLakeMain,
    guilinRocksMain,
    bangTongMain,
    cheoLan1,
    cheoLan2,
    sametNangshe1,
    sametNangshe2,
    safariLake1,
    safariLake2,
    guilinRocks2,
    bangTong1,
    bangTong2,
    bangTong3
  ],
  
  priceAdult: 2500,
  priceChild: 1950,
  currency: "฿",
  
  duration: "1 день (06:00-17:00)",
  groupSize: "до 30 человек",
  rating: 4.9,
  reviewsCount: 143,
  
  highlights: [
    "🌅 Встреча рассвета на смотровой Самет Нангше с панорамным видом на залив",
    "🏞️ Озеро Чео Лан — тайский Гуйлинь в национальном парке Као Сок",
    "⛰️ Известняковые скалы высотой до 960 метров, покрытые джунглями",
    "🚤 Сафари на длинной лодке по изумрудному озеру",
    "🎣 Рыбалка на красного тилапия",
    "🍜 Обед в аутентичном плавучем ресторане",
    "🛕 Храм Банг Тонг с монахом-художником",
    "🌳 Треккинг по тропическому лесу"
  ],
  
  itinerary: [
    { day: '1-й день', time: '06:00', activity: 'Трансфер из отеля к смотровой площадке Самет Нангше' },
    { day: '1-й день', time: '08:00', activity: 'Встреча рассвета на Самет Нангше. Панорамный вид на залив Пханг Нга и известняковые скалы. Фотосессия!' },
    { day: '1-й день', time: '09:00', activity: 'Переезд на озеро Чео Лан. Живописная дорога через джунгли в национальный парк Као Сок (около 1.5 часов)' },
    { day: '1-й день', time: '11:20', activity: 'Прибытие на озеро Чео Лан. Посадка на длинную лодку и начало сафари по изумрудному озеру' },
    { day: '1-й день', time: '12:00', activity: 'Скалы Гуйлиня. Любуемся известняковыми скалами высотой до 960 метров, покрытыми джунглями. Самые красивые виды Таиланда!' },
    { day: '1-й день', time: '13:00', activity: 'Обед в плавучем ресторане. Аутентичная тайская кухня посреди озера в окружении дикой природы' },
    { day: '1-й день', time: '14:00', activity: 'Рыбалка и купание. Ловим красного тилапия, купаемся в чистейшей воде озера' },
    { day: '1-й день', time: '15:00', activity: 'Прогулка по джунглям. Небольшой треккинг по тропическому лесу, наблюдаем за флорой и фауной' },
    { day: '1-й день', time: '16:20', activity: 'Храм Банг Тонг. Посещение уникального храма с монахом-художником, который создает удивительные картины' },
    { day: '1-й день', time: '17:00', activity: 'Возвращение в отель. Трансфер обратно на Пхукет. Делимся впечатлениями!' }
  ],
  
  included: [
    "Трансфер из любой точки Пхукета",
    "Русскоговорящий гид",
    "Страховка",
    "Обед в плавучем ресторане",
    "Прогулка на лодке по озеру Чео Лан",
    "Посещение смотровой Самет Нангше",
    "Рыбалка на озере",
    "Посещение храма Банг Тонг",
    "Прогулка по джунглям"
  ],
  
  requirements: [
    "Купальные принадлежности",
    "Полотенце",
    "Солнцезащитный крем",
    "Головной убор",
    "Фотоаппарат/камера",
    "Закрытая одежда для храма (плечи и колени)"
  ],
  
  importantInfo: [
    "Выезд очень ранний (06:00), чтобы успеть на рассвет",
    "Программа может меняться в зависимости от погоды",
    "В храме требуется закрытая одежда",
    "На озере может быть прохладно — возьмите легкую кофту",
    "Для детей от 3 лет",
    "Дорога до озера около 2.5 часов"
  ],
  
  category: "adventure",
  
  tags: [
    "озеро",
    "чео лан",
    "природа",
    "смотровая",
    "самет нангше",
    "джунгли",
    "храм",
    "банг тонг",
    "1 день",
    "сафари",
    "као сок",
    "гуйлинь",
    "национальный парк"
  ]
};
