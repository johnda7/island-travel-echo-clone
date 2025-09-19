// ЕДИНСТВЕННЫЙ ИСТОЧНИК ДАННЫХ для тура Пхи-Пхи
// Импортируем фото
import mayaBay1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";
import mayaBay2 from "@/assets/phi-phi-2days/maya-bay-2.jpg";
import mayaBay3 from "@/assets/phi-phi-2days/maya-bay-3.jpg";
import mayaBay4 from "@/assets/phi-phi-2days/maya-bay-4.jpg";
import mayaBay5 from "@/assets/phi-phi-2days/mayabay-1.jpg";
import mayaBay6 from "@/assets/phi-phi-2days/mayabay-2.jpg";
import mayaBay7 from "@/assets/phi-phi-2days/mayabay-3.jpg";
import mayaBay8 from "@/assets/phi-phi-2days/mayabay-5.jpg";
import mayaBay9 from "@/assets/phi-phi-2days/mayabay-6.jpg";
import pilehLagoon from "@/assets/phi-phi-2days/pileh-lagoon.jpg";
import vikingCave from "@/assets/phi-phi-2days/viking-cave.jpg";
import bambooIsland from "@/assets/phi-phi-2days/bamboo-island.webp";
import fireShow1 from "@/assets/phi-phi-2days/fire-show-1.jpg";
import fireShow2 from "@/assets/phi-phi-2days/fire-show-2.jpg";
import fireShow3 from "@/assets/phi-phi-2days/fire-show-3.jpg";
import rangYai1 from "@/assets/phi-phi-2days/rang-yai-1.jpg";
import rangYai2 from "@/assets/phi-phi-2days/rang-yai-2.jpg";

import { TourData } from "@/types/Tour";

// ЕДИНСТВЕННЫЙ ИСТОЧНИК ДАННЫХ - как в CMS
export const phiPhiTourData: TourData = {
  id: "phi-phi-2days",
  title: "Пхи-Пхи 2 дня / 1 ночь",
  subtitle: "Экскурсия с ночёвкой на островах Пхи-Пхи",
  description: "Незабываемое путешествие с ночевкой на острове. Бухта Майя, огненное шоу, снорклинг и множество приключений!",
  priceAdult: 4000,
  priceChild: 3500,
  priceInfant: 0, // Младенцы бесплатно
  currency: "฿",
  duration: "2 дня / 1 ночь",
  groupSize: "до 30 человек",
  rating: 4.8,
  reviewsCount: 53,
  route: "/phi-phi-2days",
  mainImage: mayaBay1,
  gallery: [
    mayaBay1,
    mayaBay2,
    mayaBay3,
    mayaBay4,
    mayaBay5,
    mayaBay6,
    mayaBay7,
    mayaBay8,
    mayaBay9,
    pilehLagoon,
    vikingCave,
    bambooIsland,
    fireShow1,
    fireShow2,
    fireShow3,
    rangYai1,
    rangYai2
  ],
  highlights: [
    "Бухта Майя Бэй и лагуна Пиле",
    "Пляж обезьян и пещера викингов", 
    "Встреча заката в море",
    "Смотровая площадка Пхи-Пхи Дон",
    "Пляжная вечеринка с огненным шоу",
    "Снорклинг в кристально чистой воде"
  ],
  included: [
    "Трансфер из районов Равай, Найхарн, Ката, Карон, Патонг",
    "Русскоговорящий гид",
    "Питание по программе (завтрак, обед, ужин)",
    "Проживание в отеле 3*, стандартный номер",
    "Входные билеты в Национальный парк",
    "Билет на смотровую площадку Пхи-Пхи Дон",
    "Универсальные маски для снорклинга",
    "Спасательные жилеты на лонгтейле",
    "Медицинская страховка"
  ],
  excluded: [
    "Обед на второй день не включен в программу",
    "За одноместное размещение - 1 500 бат",
    "Трансфер из отдаленных районов (Камала, Сурин, Бангтао) - 2 000 бат",
    "Личные расходы и чаевые"
  ],
  itinerary: [
    { day: "1-й день", time: "07:00-07:30", activity: "Сбор гостей из отелей" },
    { day: "1-й день", time: "08:00-08:30", activity: "Прибытие на пирс и встреча с гидом" },
    { day: "1-й день", time: "08:30-09:00", activity: "Отправление на острова Пхи-Пхи на большом тихоходном пароме" },
    { day: "1-й день", time: "10:30-11:00", activity: "Прибытие на остров, заселение в отель, отдых в отеле и у бассейна" },
    { day: "1-й день", time: "12:30", activity: "Обед в ресторане отеля" },
    { day: "1-й день", time: "15:00", activity: "Прогулка по близлежащим островам на традиционной тайской лодке-лонгтейле: бухта Майя Бей, бухта Ло Самах, лагуна Пиле, пляж обезьян. Снорклинг" },
    { day: "1-й день", time: "18:00", activity: "Встреча заката в море" },
    { day: "1-й день", time: "19:30", activity: "Ужин в ресторане отеля" },
    { day: "1-й день", time: "20:30", activity: "Вечеринка на пляже с огненным шоу и дискотекой" },
    { day: "2-й день", time: "07:00-08:00", activity: "Завтрак в отеле" },
    { day: "2-й день", time: "08:00", activity: "Посещение смотровой площадки на острове Пхи-Пхи Дон (по желанию)" },
    { day: "2-й день", time: "11:00", activity: "Выселение из отеля. Свободное время для прогулок, купания в море или бассейне, шоппинга" },
    { day: "2-й день", time: "14:30", activity: "Отправление на Пхукет" },
    { day: "2-й день", time: "16:00", activity: "Прибытие на Пхукет и отправление в отели" }
  ],
  requirements: [
    "Купальные принадлежности (надеть сразу на себя)",
    "Полотенце",
    "Защита от солнца: крем с SPF 50+, солнцезащитные очки, головной убор",
    "Пляжная обувь: шлепки, сандалии, кроксы",
    "Коралловые тапочки (если есть)",
    "Комплект сухой сменной одежды",
    "Предметы личной гигиены",
    "Средства от комаров",
    "Телефон, камера, по желанию — непромокаемые чехлы",
    "Копия паспорта или фото в телефоне",
    "Деньги на личные расходы и чаевые"
  ],
  importantInfo: [
    "Детский билет 4-11 лет включительно. До 3-х лет включительно бесплатно без места в минивэне",
    "Программа тура может изменяться в зависимости от погодных условий, приливов и отливов", 
    "Бухта Майя Бэй закрыта для посещения с 1 августа по 30 сентября",
    "Программа подходит для беременных, детей до года, людей любого возраста и веса"
  ],
  isPopular: true, // Показывать в популярных турах
  tags: [
    "морские экскурсии",
    "острова",
    "снорклинг",
    "пляжи",
    "пхи пхи",
    "ночёвка",
    "майя бэй",
    "приключения"
  ],
};