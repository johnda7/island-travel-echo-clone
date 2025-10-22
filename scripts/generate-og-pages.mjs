#!/usr/bin/env node

/**
 * 🚀 TELEGRAM PREVIEW GENERATOR
 * 
 * Создаёт статические HTML для каждого тура с правильными Open Graph тегами.
 * Telegram краулер сможет видеть уникальные изображения и описания для каждого тура.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Список всех туров для генерации
const tours = [
  {
    id: 'phi-phi-2days',
    title: '🏝️ Пхи-Пхи 2 дня / 1 ночь - Майя Бей + Bamboo Island',
    description: '💰 4500฿ взрослый • 3950฿ ребенок | ⭐ 4.8 (342 отзыва) | 🏖️ Ночёвка на острове • 🐵 Обезьяний пляж • 🏝️ Бухта Майя • 🎣 Снорклинг',
    image: '/assets/phi-phi-maya-bay-LeJ2QhJv.jpg',
    price: '4500',
    rating: '4.8'
  },
  {
    id: 'similan-islands',
    title: '🐢 Симиланские острова - Лучший дайвинг в Таиланде',
    description: '💰 5900฿ взрослый • 5400฿ ребенок | ⭐ 4.9 (489 отзывов) | 🐢 Черепахи и скаты • 🏝️ 2 острова + Dream Bay • 🍱 3-разовое питание',
    image: '/assets/similan-1-DMNKW6Ug.jpg',
    price: '5900',
    rating: '4.9'
  },
  {
    id: 'phang-nga-james-bond',
    title: '🎬 Пханг Нга + остров Джеймса Бонда',
    description: '💰 2500฿ взрослый • 2250฿ ребенок | ⭐ 4.7 (298 отзывов) | 🎬 Остров из фильма • 🛶 Каяки по пещерам • 🏞️ Мангровые леса',
    image: '/assets/phangnga-1-DaFlKYKT.jpg',
    price: '2500',
    rating: '4.7'
  },
  {
    id: 'racha-island',
    title: '🏖️ Остров Рача - Белоснежные пляжи',
    description: '💰 2400฿ взрослый • 2150฿ ребенок | ⭐ 4.8 (312 отзывов) | 🏖️ Белый песок • 🐠 Снорклинг • 🍱 Обед включен',
    image: '/assets/racha-1-CHe2qVmV.jpg',
    price: '2400',
    rating: '4.8'
  },
  {
    id: 'pearls-andaman-sea',
    title: '💎 4 жемчужины Андаманского моря',
    description: '💰 5100฿ взрослый | ⭐ 4.8 (267 отзывов) | 🏝️ 4 острова • 🐵 Monkey Beach • 🏞️ Пещеры Краби • 🏖️ Railay Beach',
    image: '/assets/pearls-1-pXiNwwIO.jpg',
    price: '5100',
    rating: '4.8'
  }
];

console.log('🚀 Запуск генератора статических HTML для Telegram Preview...\n');

// Читаем основной index.html
const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ Ошибка: dist/index.html не найден. Запустите сначала npm run build');
  process.exit(1);
}

const templateHTML = fs.readFileSync(indexPath, 'utf-8');

console.log('✅ Прочитан шаблон из dist/index.html\n');

// Генерируем HTML для каждого тура
tours.forEach(tour => {
  console.log(`📄 Генерация HTML для тура: ${tour.title}`);
  
  const tourPath = path.join(distPath, 'tours', tour.id);
  const tourHTMLPath = path.join(tourPath, 'index.html');
  
  // Создаём папку если не существует
  if (!fs.existsSync(tourPath)) {
    fs.mkdirSync(tourPath, { recursive: true });
  }
  
  // Заменяем Open Graph теги в шаблоне
  let tourHTML = templateHTML;
  
  // Заменяем title
  tourHTML = tourHTML.replace(
    /<title>.*?<\/title>/,
    `<title>${tour.title} | ПхукетGO</title>`
  );
  
  // Заменяем og:title (может быть с пробелами или без)
  tourHTML = tourHTML.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:title" content="${tour.title}" />`
  );
  
  // Заменяем og:description
  tourHTML = tourHTML.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:description" content="${tour.description}" />`
  );
  
  // Заменяем og:image
  tourHTML = tourHTML.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:image" content="https://phukeo.com${tour.image}" />`
  );
  
  // Заменяем og:image:secure_url
  tourHTML = tourHTML.replace(
    /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:image:secure_url" content="https://phukeo.com${tour.image}" />`
  );
  
  // Заменяем og:url
  tourHTML = tourHTML.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:url" content="https://phukeo.com/tours/${tour.id}" />`
  );
  
  // Заменяем twitter:title
  tourHTML = tourHTML.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi,
    `<meta name="twitter:title" content="${tour.title}" />`
  );
  
  // Заменяем twitter:description
  tourHTML = tourHTML.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi,
    `<meta name="twitter:description" content="${tour.description}" />`
  );
  
  // Заменяем twitter:image
  tourHTML = tourHTML.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/gi,
    `<meta name="twitter:image" content="https://phukeo.com${tour.image}" />`
  );
  
  // Заменяем meta description
  tourHTML = tourHTML.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi,
    `<meta name="description" content="${tour.description}" />`
  );
  
  // Записываем файл
  fs.writeFileSync(tourHTMLPath, tourHTML, 'utf-8');
  
  console.log(`   ✅ Создан: dist/tours/${tour.id}/index.html`);
  console.log(`   🖼️ Изображение: ${tour.image}`);
  console.log(`   💰 Цена: ${tour.price}฿ | ⭐ Рейтинг: ${tour.rating}\n`);
});

console.log('🎉 Успешно! Создано', tours.length, 'статических HTML страниц');
console.log('\n📊 Теперь Telegram краулер увидит:');
console.log('   ✅ Уникальное изображение для каждого тура');
console.log('   ✅ Правильный title и description');
console.log('   ✅ Цену и рейтинг в preview');
console.log('\n🚀 Можно деплоить на GitHub Pages!');
