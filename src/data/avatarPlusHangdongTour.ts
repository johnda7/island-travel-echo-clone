import { TourData } from '@/types/Tour';
// Реальные изображения тура Аватар с phuketgo.aaddaa.com
import avatarMain from "../assets/avatar-plus-hangdong/6798780e8ebf0-17645-1200-800.jpg";
import benyaranMuseum1 from "../assets/avatar-plus-hangdong/benyaran-museum-1.jpg";
import benyaranMuseum2 from "../assets/avatar-plus-hangdong/benyaran-museum-2.jpg";
import benyaranMuseum4 from "../assets/avatar-plus-hangdong/benyaran-museum-4.jpg";
import benyaranWaterfall from "../assets/avatar-plus-hangdong/benyaran-waterfall.jpg";
import elephantShow from "../assets/avatar-plus-hangdong/elephant-show-scaled.jpg";
import elephantSpa from "../assets/avatar-plus-hangdong/elephant-spa-scaled.jpg";
import jeepSafari from "../assets/avatar-plus-hangdong/jeep.jpg";
import maDoobuaCafe from "../assets/avatar-plus-hangdong/ma-doo-bua-cafe-1-1.jpg";
import hotspringSpa1 from "../assets/avatar-plus-hangdong/the-hotspring-beach-resort-spa-1.jpeg";
import hotspringSpa2 from "../assets/avatar-plus-hangdong/the-hotspring-beach-resort-spa2.jpg";
import coldPool from "../assets/avatar-plus-hangdong/the-hotspring-beach-resort-spa-cold-iced-pool.jpg";
import watThaSai from "../assets/avatar-plus-hangdong/wat-tha-sai-temple.jpg";
import nataiBeach from "../assets/avatar-plus-hangdong/sunset-at-natai-beach.jpg";

export const avatarPlusHangdongTour: TourData = {
  id: 'avatar-plus-hangdong',
  title: 'Аватар Плюс +',
  subtitle: 'Приключения в джунглях Хангдонга',
  description: 'Окунитесь в мир фантастических приключений с нашим туром "Аватар плюс"! Исследуйте джунгли, посетите водопады, встретьтесь со слонами и насладитесь горячими источниками.',
  priceAdult: 2900,
  priceChild: 2600,
  priceInfant: 0,
  currency: "฿",
  duration: '1 день',
  groupSize: 'до 12 человек',
  rating: 4.7,
  reviewsCount: 28,
  route: '/excursion/avatar-plus-hangdong',
  mainImage: avatarMain,
  gallery: [
    avatarMain,
    benyaranMuseum1,
    benyaranMuseum2,
    benyaranMuseum4,
    benyaranWaterfall,
    elephantShow,
    elephantSpa,
    jeepSafari,
    maDoobuaCafe,
    hotspringSpa1,
    hotspringSpa2,
    coldPool,
    watThaSai,
    nataiBeach
  ],
  highlights: [
    'Посещение водопадов Бенжаран',
    'Встреча со слонами и катание',
    'Прогулка по тропическим джунглям',
    'Купание в природных горячих источниках',
    'Джип-сафари по бездорожью',
    'Посещение традиционных храмов',
    'Музей восковых фигур Бенжаран',
    'СПА-процедуры со слонами'
  ],
  itinerary: [
    { 
      day: 'День 1', 
      time: '08:00', 
      activity: 'Трансфер из отеля' 
    },
    { 
      day: 'День 1', 
      time: '10:00', 
      activity: 'Прибытие к водопадам' 
    },
    { 
      day: 'День 1', 
      time: '12:00', 
      activity: 'Обед' 
    },
    { 
      day: 'День 1', 
      time: '14:00', 
      activity: 'Встреча со слонами' 
    },
    { 
      day: 'День 1', 
      time: '17:00', 
      activity: 'Возвращение в отель' 
    }
  ],
  included: [
    'Трансфер из районов Равай, Найхарн, Ката, Карон, Патонг',
    'Русскоговорящий гид',
    'Питание по программе (обед)',
    'Входные билеты во все места по программе',
    'Медицинская страховка',
    'Джип-сафари по джунглям',
    'Посещение горячих источников',
    'Встреча со слонами'
  ],
  excluded: [
    'Трансфер из отдаленных районов (Камала, Сурин, Бангтао) - доплата 1000 бат',
    'Напитки в ресторане',
    'Личные расходы и чаевые',
    'Дополнительные развлечения'
  ],
  requirements: [
    'Удобная обувь для ходьбы по джунглям',
    'Купальные принадлежности',
    'Полотенце',
    'Защита от солнца: крем, очки, головной убор',
    'Средства от комаров',
    'Телефон, камера, желательно в непромокаемом чехле',
    'Копия паспорта',
    'Деньги на личные расходы'
  ],
  importantInfo: [
    'Детский билет 4-11 лет включительно. До 3-х лет бесплатно',
    'Программа может изменяться в зависимости от погодных условий',
    'Подходит для людей любого возраста',
    'Рекомендуется иметь при себе средства от комаров'
  ],
  isPopular: true,
  tags: [
    'приключения',
    'природа', 
    'слоны',
    'водопады',
    '1 день',
    'джунгли',
    'активный',
    'семейный'
  ]
};