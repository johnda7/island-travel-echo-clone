import { TourData } from "@/types/Tour";

// Import images from phuketgo
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

export const phiPhi2DaysTourData: TourData = {
  id: "phi-phi-2days",
  title: "Пхи-Пхи 2 дня / 1 ночь",
  subtitle: "Экскурсия с ночёвкой на островах Пхи-Пхи",
  route: "/excursion/phi-phi-2-days-1-night",
  priceAdult: 4500,
  priceChild: 3950,
  currency: "฿",
  duration: "2 дня / 1 ночь",
  groupSize: "до 30 человек",
  rating: 4.8,
  reviewsCount: 53,
  mainImage: pilehLagoon,
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
  description: "Острова Пхи-Пхи — это архипелаг из 6 островов с лазурной водой и белыми песчаными пляжами. Двухдневная экскурсия с ночевкой на Пхи-Пхи Дон позволяет насладиться в полной мере бухтами, пляжами, видами одного из красивейших мест планеты и окунуться в ночную жизнь острова.",
  highlights: [
    "Множество остановок для фотографирования с захватывающими видами",
    "Возможность увидеть живописную природу одного из самого крупного Национального парка Таиланда",
    "Узнайте больше о тайской культуре, Буддизме",
    "Полюбуйтесь очаровательными пляжами и незабываемыми видами островов Андаманского моря",
    "Познакомитесь с подводным миром и их обитателями",
    "Окунитесь в ночную жизнь острова Пхи-Пхи Дон"
  ],
  included: [
    "2 обеда, 1 ужин, 1 завтрак",
    "Транспорт (автобус и лодка)",
    "Входные билеты в национальные парки",
    "Прохладительные безалкогольные напитки",
    "Угощение фруктами на борту",
    "Страховка",
    "Русский гид",
    "Спасательные жилеты",
    "Маски, трубки",
    "Размещение в отеле"
  ],
  notIncluded: [
    "Входные билеты на смотровую площадку Пхи-Пхи Дон (50 Бат)",
    "Личные расходы"
  ],
  schedule: [
    {
      day: "День 1",
      time: "06:50",
      title: "Выезд из отеля",
      description: "Выезд из отеля"
    },
    {
      day: "День 1",
      time: "07:50",
      title: "Прибытие к причалу",
      description: "Прибытие к причалу, знакомство с гидом, перерыв на чай, кофе"
    },
    {
      day: "День 1",
      time: "08:50",
      title: "Отправление с причала",
      description: "Отправление с причала"
    },
    {
      day: "День 1",
      time: "09:50",
      title: "Бухта Майя",
      description: "Посещение бухты Майя, где проходили съемки фильма «Пляж» с Леонардо ДиКаприо"
    },
    {
      day: "День 1",
      time: "10:50",
      title: "Лагуна Пиле",
      description: "Плавание в Лагуне Пиле"
    },
    {
      day: "День 1",
      time: "11:30",
      title: "Пещера Викингов",
      description: "Осмотр Пещеры Викингов"
    },
    {
      day: "День 1",
      time: "11:50",
      title: "Плавание с масками",
      description: "Плавание с масками. Созерцание разнообразных видов рыб"
    },
    {
      day: "День 1",
      time: "12:50",
      title: "Остров Бамбу",
      description: "Отдых на прекрасном острове Бамбу"
    },
    {
      day: "День 1",
      time: "14:20",
      title: "Обед",
      description: "Прибытие на острова Пхи Пхи Дон. Обед в пляжном ресторане"
    },
    {
      day: "День 1",
      time: "15:50",
      title: "Заселение в отель",
      description: "Заселение в отель на острове Пхи-Пхи Дон. Посещение улиц деревни Пхи-Пхи, где есть множество модных баров, ресторанов и магазинов, время для отдыха"
    },
    {
      day: "День 1",
      time: "19:50",
      title: "Ужин в отеле",
      description: "Ужин в отеле"
    },
    {
      day: "День 1",
      time: "20:30",
      title: "Огненное шоу",
      description: "До начала пляжных вечеринок, посещение бара и возможность увидеть невероятное огненное шоу от чемпионов Таиланда, а также насладиться коктейлем на пляже"
    },
    {
      day: "День 1",
      time: "22:50",
      title: "Тайский Бокс",
      description: "Посещение бара, где самые смелые гости смогут попытать свои навыки в Тайском Боксе"
    },
    {
      day: "День 1",
      time: "23:20",
      title: "Ночная жизнь",
      description: "Ночная жизнь острова. Вечеринки на пляже"
    },
    {
      day: "День 2",
      time: "07:00-10:00",
      title: "Завтрак",
      description: "Завтрак в отеле"
    },
    {
      day: "День 2",
      time: "09:00",
      title: "Отдых на пляже",
      description: "Время для отдыха после вечеринки на пляже, отдых на пляже"
    },
    {
      day: "День 2",
      time: "10:30",
      title: "Смотровая площадка",
      description: "Потрясающая возможность посетить обзорную площадку откуда открывается изумительный вид на остров"
    },
    {
      day: "День 2",
      time: "11:00",
      title: "Выселение с отеля",
      description: "Выселение с отеля"
    },
    {
      day: "День 2",
      time: "11:10",
      title: "Свободное время",
      description: "Свободное время"
    },
    {
      day: "День 2",
      time: "13:30",
      title: "Обед",
      description: "Обед на острове Пхи Пхи Дон"
    },
    {
      day: "День 2",
      time: "14:30",
      title: "Пляж обезьян",
      description: "Осмотр пляжа обезьян в заливе Йонг Касем"
    },
    {
      day: "День 2",
      time: "15:30",
      title: "Снорклинг",
      description: "Плавание с масками возле острова Пхи-Пхи Дон. Созерцание разнообразных видов рыб"
    },
    {
      day: "День 2",
      time: "16:30",
      title: "Рыбалка",
      description: "Отдых на жемчужине Андаманского моря, острове Ранг Яй. Глубоководная рыбалка, желающие могут попробовать свои рыбацкие навыки вместе с нашим капитаном и матросами. Возможность поймать множество различных видов рыб. (Внимание: в случае неблагоприятных погодных условий рыбалка может быть отменена)"
    },
    {
      day: "День 2",
      time: "17:00",
      title: "Возвращение",
      description: "Прибытие к причалу, отправление в отель"
    }
  ],
  whatToBring: [
    "Купальные принадлежности",
    "Солнцезащитные крема",
    "Крем после загара",
    "Головной убор",
    "Тапочки",
    "Личные деньги"
  ],
  importantInfo: [
    "Программа и расписание могут изменяться в зависимости от погодных условий и работы национального парка",
    "Гид может изменить очередность посещения локаций или заменить локации на схожие по насыщенности и красоте"
  ]
};