// Скрипт для извлечения всех URL туров для prerendering
import { TOURS_REGISTRY } from './src/data/toursRegistry.ts';

// Генерируем массив URL всех туров
const tourRoutes = TOURS_REGISTRY.map(tour => `/tours/${tour.id}`);

// Добавляем главную страницу
const allRoutes = [
  '/',
  ...tourRoutes
];

console.log('🚀 Prerendering routes:');
console.log(JSON.stringify(allRoutes, null, 2));

export { allRoutes };
