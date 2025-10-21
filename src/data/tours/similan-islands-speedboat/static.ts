import { TourData } from "@/types/Tour";

// Import all images for Similan Islands Speedboat tour
import hero1 from "@/assets/similan-islands-speedboat/hero-1.jpg";
import img1 from "@/assets/similan-islands-speedboat/similan-1.jpg";
import img2 from "@/assets/similan-islands-speedboat/similan-2.jpg";
import img3 from "@/assets/similan-islands-speedboat/similan-3.jpg";
import img4 from "@/assets/similan-islands-speedboat/similan-4.jpg";
import img5 from "@/assets/similan-islands-speedboat/similan-5.jpg";
import img6 from "@/assets/similan-islands-speedboat/similan-6.jpg";
import img7 from "@/assets/similan-islands-speedboat/similan-7.jpg";
import img8 from "@/assets/similan-islands-speedboat/similan-8.jpg";

export const similanIslandsSpeedboatTourData: TourData = {
  id: "similan-islands-speedboat",
  title: "Симиланские острова на спидботе",
  subtitle: "Скоростное путешествие к 4 островам архипелага",
  route: "/excursion/similan-islands-speedboat",
  priceAdult: 2400,
  priceChild: 2200,
  priceInfant: 0,
  currency: "฿",
  duration: "10 часов",
  groupSize: "до 25 человек",
  rating: 4.9,
  reviewsCount: 167,
  mainImage: hero1,
  gallery: [
    hero1,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
  ],
  description: "Скоростное путешествие к жемчужине Андаманского моря. Посетите 4 острова архипелага, включая знаменитый Sail Rock и лучшие места для снорклинга с черепахами.",
  highlights: [
    "Скоростной спидбот - больше времени на островах",
    "Sail Rock - знаменитая скала-символ Симиланов",
    "Снорклинг с черепахами в кристально чистой воде",
    "Посещение 4 островов архипелага (№9, №8, №7, №4)",
    "Тайский обед на острове среди белоснежного песка",
    "Малые группы до 25 человек на спидботе",
  ],
  itinerary: [
    {
      day: "День 1",
      time: "06:30",
      activity: "Выезд из отеля и трансфер на пристань Tab Lamu",
    },
    {
      day: "День 1",
      time: "08:30",
      activity: "Отправление на скоростном спидботе к Симиланским островам",
    },
    {
      day: "День 1",
      time: "10:00",
      activity: "Остров №9 - снорклинг в лагуне Christmas Point среди коралловых садов",
    },
    {
      day: "День 1",
      time: "11:30",
      activity: "Остров №8 - подъём на Sail Rock с панорамным видом на архипелаг",
    },
    {
      day: "День 1",
      time: "13:00",
      activity: "Остров №7 - тайский обед на пляже и отдых на белоснежном песке",
    },
    {
      day: "День 1",
      time: "14:30",
      activity: "Остров №4 - снорклинг с морскими черепахами в заповедной зоне",
    },
    {
      day: "День 1",
      time: "16:00",
      activity: "Возвращение на материк на спидботе",
    },
    {
      day: "День 1",
      time: "17:00",
      activity: "Прибытие на пристань и трансфер в отели",
    },
  ],
  included: [
    "Трансфер от отеля и обратно",
    "Опытный русскоговорящий гид",
    "Скоростной спидбот с комфортными сиденьями",
    "Входной билет в Национальный парк (500 ฿)",
    "Снаряжение для снорклинга (маска, трубка, ласты)",
    "Тайский обед на острове",
    "Свежие фрукты и вода в течение дня",
    "Спасательные жилеты",
    "Страховка на время экскурсии",
  ],
  notIncluded: [
    "Алкогольные напитки",
    "Подводная фото/видео съёмка",
    "Личные расходы и сувениры",
  ],
  requirements: [
    "Купальник (наденьте под одежду)",
    "Полотенце для пляжа",
    "Солнцезащитный крем (reef-safe)",
    "Солнцезащитные очки и головной убор",
    "Лёгкая сменная одежда",
    "Водонепроницаемый чехол для телефона",
    "Деньги на сувениры и напитки",
  ],
  importantInfo: [
    "⚠️ Время в пути до пристани: 1,5-2 часа в зависимости от вашего отеля",
    "⚠️ Выезд рано утром - возьмите завтрак с собой или закажите в отеле",
    "⚠️ Возьмите солнцезащитный крем (только reef-safe для защиты кораллов)",
    "⚠️ Национальный парк работает с 15 октября по 15 мая",
    "⚠️ Спидбот быстрее, но более динамичный - не рекомендуется беременным и людям с проблемами спины",
    "⚠️ Группа до 25 человек на спидботе",
    "⚠️ Погода может измениться - администрация оставляет право отменить тур при шторме",
  ],
};
