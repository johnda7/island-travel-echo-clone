import { RoutePoint } from '@/types/tour';

export const jamesBondRoutePoints: RoutePoint[] = [
  { 
    name: 'Пхукет', 
    coordinates: [7.8804, 98.3923], 
    type: 'start', 
    time: '07:30' 
  },
  { 
    name: 'Пристань Ао По', 
    coordinates: [8.0294, 98.4227], 
    type: 'stop', 
    time: '08:30' 
  },
  { 
    name: 'Остров Панак (морские цыгане)', 
    coordinates: [8.2694, 98.5017], 
    type: 'stop', 
    time: '09:30' 
  },
  { 
    name: 'Пещера Лод (Hang Lot)', 
    coordinates: [8.2747, 98.5108], 
    type: 'stop', 
    time: '10:15' 
  },
  { 
    name: 'Остров Джеймса Бонда (Ко Тапу)', 
    coordinates: [8.2753, 98.4997], 
    type: 'destination', 
    time: '11:00' 
  },
  { 
    name: 'Остров Хонг (обед)', 
    coordinates: [8.2783, 98.5133], 
    type: 'stop', 
    time: '12:30' 
  },
  { 
    name: 'Деревня на воде Ко Паньи', 
    coordinates: [8.2617, 98.5050], 
    type: 'stop', 
    time: '14:00' 
  },
  { 
    name: 'Пхукет (возвращение)', 
    coordinates: [7.8804, 98.3923], 
    type: 'stop', 
    time: '16:30' 
  }
];
