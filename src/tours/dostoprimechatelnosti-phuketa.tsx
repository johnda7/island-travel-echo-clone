import { TourData } from "@/types/Tour";

// 📸 ИЗОБРАЖЕНИЯ ДОСТОПРИМЕЧАТЕЛЬНОСТЕЙ ПХУКЕТА
import bigBuddhaMain from "../assets/dostoprimechatelnosti-phuketa/big-buddha.jpg";
import watChalong from "../assets/dostoprimechatelnosti-phuketa/wat-chalong.jpg";
import oldTown from "../assets/dostoprimechatelnosti-phuketa/old-town.jpg";
import promthepCape from "../assets/dostoprimechatelnosti-phuketa/promthep-cape.jpg";
import karonViewpoint from "../assets/dostoprimechatelnosti-phuketa/karon-viewpoint.jpg";
import cashewFactory from "../assets/dostoprimechatelnosti-phuketa/cashew-factory.jpg";

// 🎯 ЕДИНЫЙ ИСТОЧНИК ДАННЫХ В ОДНОМ ФАЙЛЕ - как WordPress пост
export const dostoprimechatelnostiPhuketaTourData: TourData = {
  id: "dostoprimechatelnosti-phuketa",
  title: "Достопримечательности Пхукета",
  subtitle: "Обзорная экскурсия без шопинга (1 день)",
  description: "Познакомьтесь с главными достопримечательностями Пхукета за один день: Большой Будда, храм Ват Чалонг, старый город Пхукета, мыс Промтеп и многое другое!",
  
  // Ценообразование
  priceAdult: 1900,
  priceChild: 1400,
  currency: "฿",
  
  // Характеристики
  duration: "1 день (8 часов)",
  groupSize: "до 30 человек",
  rating: 4.8,
  reviewsCount: 243,
  route: "Пхукет → Большой Будда → Ват Чалонг → Старый город → Мыс Промтеп → Пхукет",
  
  mainImage: bigBuddhaMain,
  highlights: [
    "Большой Будда - символ Пхукета высотой 45 метров",
    "Храм Ват Чалонг - самый почитаемый храм острова",
    "Прогулка по историческому старому городу",
    "Мыс Промтеп - лучшая смотровая площадка для заката",
    "Фабрика кешью с дегустацией местных продуктов",
    "Панорамные виды на весь остров с высоты птичьего полёта"
  ],
  gallery: [
    bigBuddhaMain,
    watChalong,
    oldTown,
    promthepCape,
    karonViewpoint,
    cashewFactory
  ],
  
  // Программа тура
  itinerary: [
    {
      day: "1",
      time: "08:00",
      activity: "Трансфер из отеля, начало обзорной экскурсии"
    },
    {
      day: "1",
      time: "09:00",
      activity: "Посещение Большого Будды - главной достопримечательности Пхукета"
    },
    {
      day: "1",
      time: "10:30",
      activity: "Храм Ват Чалонг - самый важный буддийский храм острова"
    },
    {
      day: "1",
      time: "12:00",
      activity: "Обед в местном ресторане тайской кухни"
    },
    {
      day: "1",
      time: "13:30",
      activity: "Прогулка по старому городу Пхукета - сино-португальская архитектура"
    },
    {
      day: "1",
      time: "15:00",
      activity: "Посещение фабрики кешью с дегустацией местных продуктов"
    },
    {
      day: "1",
      time: "16:30",
      activity: "Мыс Промтеп - лучшая смотровая площадка на острове"
    },
    {
      day: "1",
      time: "17:30",
      activity: "Трансфер обратно в отель"
    }
  ],
  
  // Что включено
  included: [
    "Трансфер туда-обратно",
    "Обед в местном ресторане",
    "Экскурсионная программа",
    "Входные билеты на фабрику кешью",
    "Дегустация местных продуктов",
    "Русскоговорящий гид",
    "Страховка"
  ],
  
  // Что НЕ включено  
  excluded: [
    "Личные расходы",
    "Алкогольные напитки",
    "Сувениры",
    "Чаевые гиду"
  ],
  
  // Важная информация
  importantInfo: [
    "Детский билет 4-11 лет включительно. До 3-х лет включительно бесплатно",
    "Программа тура может изменяться в зависимости от дорожной ситуации",
    "При посещении храмов необходима закрытая одежда (плечи и колени)",
    "Рекомендуем взять с собой головной убор и солнцезащитный крем",
    "Программа подходит для людей любого возраста"
  ],
  
  isPopular: true,
  
  // 🏷️ ЦЕНТРАЛИЗОВАННЫЕ ТЕГИ - автоматически появятся везде
  tags: [
    "культурные экскурсии",
    "достопримечательности", 
    "храмы",
    "обзорные экскурсии",
    "старый город",
    "большой будда",
    "смотровые площадки",
    "местная культура"
  ],
};

