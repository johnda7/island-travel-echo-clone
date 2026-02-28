import { TourData } from "@/types/Tour";

// Import all images for Similan Islands tour
import hero1 from "@/assets/similan-islands/hero-1.jpg";
import img1 from "@/assets/similan-islands/similan-1.jpg";
import img2 from "@/assets/similan-islands/similan-2.jpg";
import img3 from "@/assets/similan-islands/similan-3.jpg";
import img4 from "@/assets/similan-islands/similan-4.jpg";
import img5 from "@/assets/similan-islands/similan-5.jpg";
import img6 from "@/assets/similan-islands/similan-6.jpg";
import img7 from "@/assets/similan-islands/similan-7.jpg";
import img8 from "@/assets/similan-islands/similan-8.jpg";
import img9 from "@/assets/similan-islands/similan-9.jpg";
import img10 from "@/assets/similan-islands/similan-10.jpg";
import img11 from "@/assets/similan-islands/similan-11.jpg";
import img12 from "@/assets/similan-islands/similan-12.jpg";
import img13 from "@/assets/similan-islands/similan-13.jpg";
import img14 from "@/assets/similan-islands/similan-14.jpg";
import img15 from "@/assets/similan-islands/similan-15.jpg";
import img16 from "@/assets/similan-islands/similan-16.jpg";
import img17 from "@/assets/similan-islands/similan-17.jpg";
import img18 from "@/assets/similan-islands/similan-18.jpg";
import img19 from "@/assets/similan-islands/similan-19.jpg";
import img20 from "@/assets/similan-islands/similan-20.jpg";
import img21 from "@/assets/similan-islands/similan-21.jpg";
import img22 from "@/assets/similan-islands/similan-22.jpg";
import img23 from "@/assets/similan-islands/similan-23.jpg";
import img24 from "@/assets/similan-islands/similan-24.jpg";
import img25 from "@/assets/similan-islands/similan-25.jpg";
import img26 from "@/assets/similan-islands/similan-26.jpg";
import img27 from "@/assets/similan-islands/similan-27.jpg";
import img28 from "@/assets/similan-islands/similan-28.jpg";
import img29 from "@/assets/similan-islands/similan-29.jpg";
import img30 from "@/assets/similan-islands/similan-30.jpg";
import img31 from "@/assets/similan-islands/similan-31.jpg";
import img32 from "@/assets/similan-islands/similan-32.jpg";
import img33 from "@/assets/similan-islands/similan-33.jpg";
import img34 from "@/assets/similan-islands/similan-34.jpg";

export const similanIslandsTourData: TourData = {
  id: "similan-islands",
  title: "Симиланские острова",
  subtitle: "Тур на Симиланские острова на большой лодке",
  route: "/excursion/similan-islands",
  priceAdult: 2500,
  priceChild: 2300,
  priceInfant: 0,
  currency: "฿",
  duration: "12 часов",
  groupSize: "до 30 человек",
  rating: 4.9,
  mainImage: img13,
  gallery: [
    img13,
    // Горизонтальные фото вперёд
    img4,   // 1280x720
    img5,   // 1280x960
    img6,   // 4608x3072
    img7,   // 4608x3072
    img8,   // 4608x3072
    img13,  // 4608x3072
    img14,  // 4608x3072
    img15,  // 4608x3072
    img17,  // 4608x3072
    img18,  // 4608x3072
    img19,  // 4608x3072
    img25,  // 4608x3072
    // Вертикальные фото
    img1,   // 720x1280
    img2,   // 720x1280
    img3,   // 720x1280
    img9,   // 3072x4608
    img10,  // 3072x4608
    img11,  // 3072x4608
    img12,  // 720x1280
    img16,  // 3072x4608
    img20,  // 3072x4608
    img21,  // 3072x4608
    img22,  // 3072x4608
    img23,  // 720x1280
    img24,  // 3072x4608
    img26,  // 3072x4608
    img27,  // 3072x4608
    img28,  // 720x1280
    img29,  // 720x1280
    img30,  // 720x1280
    img31,  // 720x1280
    img32,  // 720x1280
    img33,  // 720x1280
    img34,  // 959x1280
  ],
  
  description: `Симиланские острова — одно из самых живописных мест Таиланда, настоящий рай для любителей подводного мира и первозданной природы. Этот архипелаг состоит из 9 островов, каждый из которых уникален своей красотой.

Вас ждёт незабываемое путешествие на комфортабельной большой лодке с русскоговорящим гидом. Вы посетите самые красивые острова архипелага, искупаетесь в кристально чистой воде, позагораете на белоснежных пляжах и увидите потрясающий подводный мир во время снорклинга.

Симиланы находятся под охраной национального парка, поэтому здесь сохранилась нетронутая природа и богатейший подводный мир. Это место обязательно к посещению для каждого, кто приезжает в Таиланд!`,

  highlights: [
    "Посещение 4 островов архипелага",
    "2 снорклинга в самых живописных бухтах",
    "Белоснежные пляжи и бирюзовая вода",
    "Смотровая площадка Sail Rock",
    "Русскоговорящий гид",
    "Трансфер из отеля и обратно",
    "Обед (тайский шведский стол)",
    "Все напитки включены"
  ],

  itinerary: [
    {
      day: "День 1",
      time: "05:30-06:30",
      activity: "Трансфер из отеля - встреча в отеле и переезд в порт Tablemu (1,5 часа)"
    },
    {
      day: "День 1",
      time: "07:30",
      activity: "Отправление из порта - завтрак на лодке, инструктаж по безопасности, отплытие к островам"
    },
    {
      day: "День 1",
      time: "09:00",
      activity: "Остров №9 - первый снорклинг, знакомство с подводным миром Симилан, плавание с маской среди коралловых рифов"
    },
    {
      day: "День 1",
      time: "10:00",
      activity: "Остров №8 - смотровая Sail Rock, подъём на знаменитую смотровую площадку, потрясающие виды на архипелаг"
    },
    {
      day: "День 1",
      time: "11:00",
      activity: "Остров №8 - пляжный отдых, свободное время на белоснежном пляже, купание в бирюзовой воде"
    },
    {
      day: "День 1",
      time: "12:30",
      activity: "Обед на лодке - тайский шведский стол: курица, рыба, овощи, рис, фрукты, вода, кофе"
    },
    {
      day: "День 1",
      time: "13:30",
      activity: "Остров №7 - второй снорклинг, снорклинг в бухте с богатой морской жизнью, разноцветные рыбы и кораллы"
    },
    {
      day: "День 1",
      time: "14:30",
      activity: "Остров №4 - пляж и купание, последний пляж для купания и фотографий, отдых перед возвращением"
    },
    {
      day: "День 1",
      time: "15:30-18:00",
      activity: "Возвращение - отплытие в порт, трансфер в отель. Прибытие около 18:00"
    }
  ],

  included: [
    "Трансфер из/в отель (Пхукет, Као Лак)",
    "Русскоговорящий гид",
    "Завтрак и обед (шведский стол)",
    "Питьевая вода, кофе, чай, фрукты",
    "Маска и трубка для снорклинга",
    "Жилеты спасательные",
    "Входные билеты в национальный парк",
    "Страховка"
  ],

  excluded: [
    "Личные расходы",
    "Алкогольные напитки (можно купить на лодке)",
    "Фото и видео съёмка дроном",
    "Чаевые гиду и команде (по желанию)"
  ],

  requirements: [
    "Паспорт или копия паспорта",
    "Купальник, полотенце, сменная одежда",
    "Солнцезащитный крем (reef-safe)",
    "Головной убор, солнечные очки",
    "Водонепроницаемый чехол для телефона",
    "Наличные деньги (для дополнительных покупок)",
    "Лекарства от укачивания (если нужны)"
  ],

  importantInfo: [
    "⚠️ Тур не подходит для беременных, людей с проблемами спины/коленей",
    "⚠️ Дети до 2 лет бесплатно (без отдельного места)",
    "⚠️ Острова закрыты с 15 мая по 15 октября (сезон дождей)",
    "⚠️ Возьмите теплую кофту - на лодке может быть прохладно",
    "⚠️ На островах нет туалетов и магазинов",
    "⚠️ Погодные условия могут изменить программу тура",
    "⚠️ Время трансфера зависит от расположения отеля"
  ]
};
