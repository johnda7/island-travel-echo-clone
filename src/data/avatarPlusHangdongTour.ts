import type { TourData } from '@/types/Tour';

// Пути к фотографиям Avatar+ тура из public
const avatar01 = '/assets/avatar-plus-hangdong/avatar-01.jpg';
const avatar02 = '/assets/avatar-plus-hangdong/avatar-02.jpg';
const avatar03 = '/assets/avatar-plus-hangdong/avatar-03.jpg';
const avatar04 = '/assets/avatar-plus-hangdong/avatar-04.jpg';
const avatar05 = '/assets/avatar-plus-hangdong/avatar-05.jpg';
const avatar06 = '/assets/avatar-plus-hangdong/avatar-06.jpg';

export const avatarPlusHangdongTourData: TourData = {
  id: 'avatar-plus-hangdong-adventure',
  title: 'Аватар+ Экскурсия в Хангдонг',
  subtitle: 'Незабываемое приключение в мире природы',
  description: 'Окунитесь в мир фантастической природы Таиланда! Посетите живописные водопады, прокатитесь на слонах, исследуйте джунгли и насладитесь невероятными пейзажами, которые вдохновили создателей фильма "Аватар".',
  route: 'Пхукет - Хангдонг - водопады - джунгли - Пхукет',
  
  mainImage: avatar01,
  gallery: [avatar01, avatar02, avatar03, avatar04, avatar05, avatar06],
  
  priceAdult: 1800,
  priceChild: 1200,
  currency: '฿',
  duration: '11 часов',
  groupSize: 'до 8 человек',
  rating: 4.8,
  reviewsCount: 126,
  
  highlights: [
    'Посещение живописных водопадов',
    'Катание на слонах в джунглях',
    'Купание в природных бассейнах',
    'Обед с видом на горы',
    'Фотосессия в местах съемок "Аватар"',
    'Профессиональный русскоговорящий гид'
  ],
  
  included: [
    'Трансфер от/до отеля',
    'Входные билеты во все локации',
    'Обед и прохладительные напитки',
    'Страховка',
    'Русскоговорящий гид',
    'Фотосессия'
  ],
  
  excluded: [
    'Личные расходы',
    'Алкогольные напитки',
    'Чаевые гиду (по желанию)'
  ],
  
  requirements: [
    'Удобная обувь для ходьбы',
    'Купальные принадлежности',
    'Солнцезащитный крем',
    'Головной убор',
    'Фотоаппарат/телефон'
  ],
  
  importantInfo: [
    'Тур не подходит для беременных женщин',
    'Минимальный возраст - 5 лет',
    'Рекомендуется взять с собой сменную одежду',
    'В сезон дождей возможны изменения маршрута'
  ],
  
  tags: ['приключения', 'природа', 'слоны', 'водопады', '1 день', 'джунгли', 'активный', 'семейный']
};