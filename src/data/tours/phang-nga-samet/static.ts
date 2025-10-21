import { TourData } from "@/types/Tour";

// Import 20 images
import hero1 from "@/assets/phang-nga-samet/hero-1.jpg";
import phangnga1 from "@/assets/phang-nga-samet/phangnga-1.jpg";
import phangnga2 from "@/assets/phang-nga-samet/phangnga-2.jpg";
import phangnga3 from "@/assets/phang-nga-samet/phangnga-3.jpg";
import phangnga4 from "@/assets/phang-nga-samet/phangnga-4.jpg";
import phangnga5 from "@/assets/phang-nga-samet/phangnga-5.jpg";
import phangnga6 from "@/assets/phang-nga-samet/phangnga-6.jpg";
import phangnga7 from "@/assets/phang-nga-samet/phangnga-7.jpg";
import phangnga8 from "@/assets/phang-nga-samet/phangnga-8.jpg";
import phangnga9 from "@/assets/phang-nga-samet/phangnga-9.jpg";
import phangnga10 from "@/assets/phang-nga-samet/phangnga-10.jpg";
import phangnga11 from "@/assets/phang-nga-samet/phangnga-11.jpg";
import phangnga12 from "@/assets/phang-nga-samet/phangnga-12.jpg";
import phangnga13 from "@/assets/phang-nga-samet/phangnga-13.jpg";
import phangnga14 from "@/assets/phang-nga-samet/phangnga-14.jpg";
import phangnga15 from "@/assets/phang-nga-samet/phangnga-15.jpg";
import phangnga16 from "@/assets/phang-nga-samet/phangnga-16.jpg";
import phangnga17 from "@/assets/phang-nga-samet/phangnga-17.jpg";
import phangnga18 from "@/assets/phang-nga-samet/phangnga-18.jpg";
import phangnga19 from "@/assets/phang-nga-samet/phangnga-19.jpg";

export const phangNgaSametTourData: TourData = {
  id: "phang-nga-samet",
  title: "Удивительная Пхангнга + Смотровая Samet Nangshe",
  subtitle: "Слоновий СПА, мангровые леса и захватывающие виды залива",
  description: "Пханг Нга — живописная провинция Таиланда с богатой природой, уникальными достопримечательностями и самобытной культурой. Захватывающие виды с Samet Nangshe, храмы с обезьянами, прогулка на лонгтейле, деревня морских цыган, слоновий СПА с грязевыми процедурами и купанием, водопад и уникальный пляж с самолетами!",
  route: "/excursion/phang-nga-samet",
  priceAdult: 2000,
  priceChild: 1600,
  priceInfant: 0,
  currency: "฿",
  duration: "1 день (06:30-17:30)",
  groupSize: "До 40 человек",
  rating: 4.9,
  reviewsCount: 312,
  mainImage: hero1,
  gallery: [
    hero1, phangnga1, phangnga2, phangnga3, phangnga4, phangnga5,
    phangnga6, phangnga7, phangnga8, phangnga9, phangnga10,
    phangnga11, phangnga12, phangnga13, phangnga14, phangnga15,
    phangnga16, phangnga17, phangnga18, phangnga19
  ],
  
  included: [
    "Трансфер из отеля и обратно на комфортабельном автобусе",
    "Профессиональный русскоязычный гид",
    "Страховка на всё время экскурсии",
    "Обед из свежих морепродуктов (краб, креветки, рыба, кальмары)",
    "Входные билеты в национальные парки",
    "Программа со слонами (грязь, купание, душ, шоу, катание)",
    "Прогулка на традиционной лодке-лонгтейл",
    "Посещение смотровой площадки Samet Nangshe",
    "Визит в храм Суван Куха с пещерой обезьян",
    "Остановка у статуи Черного монаха",
    "Посещение деревни морских цыган",
    "Остановка у водопада",
    "Фотосессия на пляже с самолетами"
  ],
  
  itinerary: [
    { day: "День 1", time: "06:30", activity: "Отправление из отеля на комфортабельном автобусе" },
    { day: "День 1", time: "08:40", activity: "Восхождение на пикапе на смотровую площадку Samet Nangshe - захватывающие виды залива, напоминающие бухту Халонг и Пандору. Время для фотосессий" },
    { day: "День 1", time: "10:30", activity: "Остановка у пещеры обезьян. Посещение древнего храма Суван Куха и впечатляющей пещеры со сталактитами" },
    { day: "День 1", time: "11:00", activity: "Визит к величественной статуе Черного монаха" },
    { day: "День 1", time: "11:20", activity: "Прогулка на традиционной тайской лодке-лонгтейл среди живописных мангровых лесов" },
    { day: "День 1", time: "11:50", activity: "Знакомство с уникальной культурой в плавучей деревне морских цыган. Возможность приобрести сушеные морепродукты, жемчуг и колоритные сувениры" },
    { day: "День 1", time: "12:00", activity: "Гастрономическое наслаждение: обед из свежих морепродуктов в деревне (краб, креветки, рыба, кальмары)" },
    { day: "День 1", time: "13:00", activity: "По пути к слоновьему СПА проедете мимо экзотических фруктовых плантаций и плантаций каучукового дерева. Гид расскажет истории о выращивании тропических фруктов" },
    { day: "День 1", time: "13:40", activity: "Посещение слоновьего СПА - незабываемые впечатления: грязевые процедуры со слоном, купание со слоном, душ со слоном, шоу слонёнка, катание на слонах (ВСЕ активности включены)" },
    { day: "День 1", time: "16:00", activity: "Остановка у живописного водопада для освежающего отдыха" },
    { day: "День 1", time: "17:00", activity: "Пляж с самолетами - уникальная фотозона на фоне взлетающих и садящихся воздушных судов" },
    { day: "День 1", time: "17:30", activity: "Отправление в отель после насыщенного дня" }
  ],
  
  importantInfo: [
    "⚠️ Программа может меняться в связи с погодными условиями или непредвиденными обстоятельствами",
    "👕 Что взять: полотенце, купальные принадлежности, солнцезащитный крем, головной убор, сменную одежду",
    "📸 Фото/видео камеру для незабываемых кадров",
    "💰 Деньги на сувениры и личные расходы",
    "🌧️ Дождевики на случай плохой погоды",
    "🏛️ Одежду для храмов (закрытые плечи и колени обязательно)",
    "⚠️ При посещении храмов, если туристы одеты ненадлежащим образом, одежда предоставляется храмом за дополнительную плату",
    "📱 Программа может быть организована индивидуально с изменением таймингов и последовательности",
    "🐘 ВСЕ активности со слонами включены в стоимость: грязь, купание, душ, шоу, катание",
    "🍤 Обед включает свежие морепродукты: краб, креветки, рыба, кальмары",
    "📷 Инстаграмные виды с Samet Nangshe - как бухта Халонг во Вьетнаме",
    "✈️ Пляж с самолетами - уникальная локация для фото"
  ],
  
  highlights: [
    "📸 Смотровая Samet Nangshe - виды как Халонг и Пандора",
    "🐘 Слоновий СПА: грязь, купание, душ, шоу, катание",
    "🛶 Лодка-лонгтейл в мангровых лесах",
    "🏛️ Храм Суван Куха с пещерой и обезьянами",
    "🍤 Обед из свежих морепродуктов",
    "🏝️ Деревня морских цыган",
    "✈️ Пляж с самолетами - уникальное фото",
    "💎 Статуя Черного монаха",
    "💧 Живописный водопад",
    "🌴 Фруктовые и каучуковые плантации",
    "🎭 Погружение в тайскую культуру и буддизм",
    "👥 Небольшие группы для комфортного отдыха"
  ],
  
  category: "adventure",
  tags: [
    "пханг-нга",
    "природа",
    "слоны",
    "храмы",
    "культура",
    "смотровая",
    "морепродукты",
    "приключения",
    "1 день",
    "семейный"
  ]
};
