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
  priceAdult: 4000,
  priceChild: 3500,
  currency: "฿",
  duration: "2 дня / 1 ночь",
  groupSize: "до 30 человек",
  rating: 4.8,
  reviewsCount: 53,
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
  description: `Авторская программа, идеально подходящая для семей с детьми, беременных женщин и лиц пожилого возраста. Экскурсия также подойдет для друзей и тех, кто хочет провести больше времени на Пхи-Пхи.

Это путешествие в небольшой группе по таинственным бухтам Пхи-Пхи сочетает блаженство и спокойствие с вечеринками и огненным шоу. Включает посещение смотровой площадки и встречу заката в море. Проживание в отеле на острове Пхи-Пхи Дон.`,
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
  notIncluded: [
    "Обед на второй день не включен в программу",
    "За одноместное размещение - 1 500 бат",
    "Трансфер из отдаленных районов (Камала, Сурин, Бангтао) - 2 000 бат",
    "Личные расходы и чаевые"
  ],
  schedule: [
    {
      day: "День 1",
      time: "07:00-08:30",
      title: "Трансфер и завтрак",
      description: "Трансфер из отеля. Завтрак в ресторане на пирсе."
    },
    {
      day: "День 1", 
      time: "09:00",
      title: "Отправление на Пхи-Пхи",
      description: "Посадка на большую лодку. Поездка до Пхи-Пхи занимает 2 часа."
    },
    {
      day: "День 1",
      time: "11:00-12:00", 
      title: "Бухта Майя Бэй",
      description: "Знаменитая бухта из фильма «Пляж». Купание и фотосессия."
    },
    {
      day: "День 1",
      time: "12:00-13:00",
      title: "Лагуна Пиле", 
      description: "Изумрудная лагуна, окруженная скалами. Снорклинг."
    },
    {
      day: "День 1",
      time: "13:00-14:00",
      title: "Обед",
      description: "Обед в ресторане на острове Пхи-Пхи Дон."
    },
    {
      day: "День 1",
      time: "14:00-15:00",
      title: "Поселение в отель",
      description: "Размещение в отеле. Свободное время."
    },
    {
      day: "День 1", 
      time: "15:30-17:00",
      title: "Смотровая площадка",
      description: "Подъем на смотровую площадку Пхи-Пхи Дон с панорамным видом."
    },
    {
      day: "День 1",
      time: "17:00-18:30",
      title: "Встреча заката",
      description: "Поездка на лонгтейле для встречи заката в море."
    },
    {
      day: "День 1",
      time: "19:00-21:00", 
      title: "Ужин и огненное шоу",
      description: "Ужин в ресторане. Пляжная вечеринка с огненным шоу."
    },
    {
      day: "День 2",
      time: "07:00-08:00",
      title: "Завтрак",
      description: "Завтрак в отеле. Освобождение номеров."
    },
    {
      day: "День 2",
      time: "08:30-10:00",
      title: "Пляж обезьян",
      description: "Пляж Monkey Beach. Наблюдение за обезьянами и купание."
    },
    {
      day: "День 2", 
      time: "10:00-11:00",
      title: "Пещера викингов",
      description: "Осмотр пещеры викингов с древними наскальными рисунками."
    },
    {
      day: "День 2",
      time: "11:00-12:00",
      title: "Остров Бамбу",
      description: "Белоснежный пляж острова Бамбу. Снорклинг и отдых."
    },
    {
      day: "День 2",
      time: "12:00-14:00", 
      title: "Возвращение",
      description: "Возвращение в Пхукет на большой лодке."
    },
    {
      day: "День 2",
      time: "14:00-16:00",
      title: "Трансфер в отель",
      description: "Трансфер в отели. Окончание программы."
    }
  ],
  importantInfo: [
    "Возьмите с собой: полотенце, солнцезащитный крем, головной убор, купальник, фотоаппарат",
    "Национальный парк Пхи-Пхи входит в программу",
    "Лодка большая и безопасная, подходит для всех возрастов", 
    "В случае плохой погоды тур может быть отменен с полным возвратом",
    "Рекомендуем взять средства от укачивания",
    "Алкоголь на лодке запрещен"
  ]
};