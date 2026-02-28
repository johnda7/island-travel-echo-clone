#!/usr/bin/env node

/**
 * 🗺️ AUTO SITEMAP GENERATOR
 * 
 * Генерирует sitemap.xml из списка туров + статических страниц.
 * Запускается после build, кладёт файл в dist/sitemap.xml.
 * 
 * Запуск: node scripts/generate-sitemap.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://phukeo.com';
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Все 26 туров (синхронизировано с generate-og-pages.mjs)
const tours = [
  { id: 'phi-phi-2days', title: 'Пхи-Пхи 2 дня / 1 ночь', category: 'islands', priority: 0.9 },
  { id: 'pearls-andaman-sea', title: '4 жемчужины Андаманского моря', category: 'islands', priority: 0.8 },
  { id: 'dostoprimechatelnosti-phuketa', title: 'Достопримечательности Пхукета', category: 'cultural', priority: 0.8 },
  { id: 'rafting-spa-atv-1-day', title: 'Рафтинг + Слоновье СПА + ATV', category: 'adventure', priority: 0.8 },
  { id: 'rafting-spa-1day', title: 'Рафтинг + Слоновье СПА', category: 'adventure', priority: 0.7 },
  { id: 'kao-lak-safari-1-day', title: 'Као Лак Сафари', category: 'adventure', priority: 0.7 },
  { id: 'eleven-islands-mega', title: '11 островов Мега-Тур', category: 'islands', priority: 0.9 },
  { id: 'james-bond-island-phang-nga', title: 'Остров Джеймса Бонда', category: 'islands', priority: 0.9 },
  { id: 'avatar-plus-hangdong', title: 'Аватар Плюс + Хангдонг', category: 'adventure', priority: 0.7 },
  { id: 'racha-coral-islands-speedboat', title: 'Острова Рача и Корал', category: 'islands', priority: 0.8 },
  { id: 'phang-nga-skywalk', title: 'Пхангнга + Стеклянный мост', category: 'adventure', priority: 0.8 },
  { id: 'cheow-lan-lake', title: 'Чео Лан + Самет Нангше', category: 'adventure', priority: 0.8 },
  { id: 'similan-islands', title: 'Симиланские острова Standard', category: 'diving', priority: 0.9 },
  { id: 'similan-islands-early', title: 'Симиланские острова Comfort+', category: 'diving', priority: 0.8 },
  { id: 'similan-islands-speedboat', title: 'Симиланские острова спидбот', category: 'diving', priority: 0.8 },
  { id: 'fishing-sunrise', title: 'Морская рыбалка на рассвете', category: 'fishing', priority: 0.7 },
  { id: 'racha-coral-sunrise', title: 'Рача + Корал на рассвете', category: 'islands', priority: 0.7 },
  { id: 'racha-coral-rawai', title: 'Рача + Коралловый с Rawai', category: 'islands', priority: 0.7 },
  { id: 'phi-phi-sunrise', title: 'Пхи-Пхи на рассвете', category: 'islands', priority: 0.8 },
  { id: 'five-pearls-2days', title: '5 жемчужин 2 дня Deluxe', category: 'islands', priority: 0.9 },
  { id: 'phang-nga-samet', title: 'Пхангнга + Samet Nangshe', category: 'adventure', priority: 0.7 },
  { id: 'krabi-secrets', title: 'Тайны Краби', category: 'adventure', priority: 0.8 },
  { id: 'phi-phi-racha-maiton-sunset', title: 'Пхи-Пхи + Рача Яй + Sunset', category: 'islands', priority: 0.8 },
  { id: 'elephant-beach-samet-mantra-spa', title: 'Пляж слонов + Mantra Spa', category: 'adventure', priority: 0.8 },
  { id: 'coral-islands-rawai', title: 'Коралловые острова с Раваи', category: 'islands', priority: 0.7 },
  { id: 'diving-andaman', title: 'Дайвинг в Андаманском море', category: 'diving', priority: 0.8 },
];

// Статические страницы
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/tours', priority: 0.9, changefreq: 'daily' },
  { path: '/beaches', priority: 0.6, changefreq: 'monthly' },
];

// Пляжи
const beaches = [
  'patong', 'kata', 'karon', 'naiharn', 'surin',
  'kamala', 'bangtao', 'mai-khao', 'freedom'
];

console.log('🗺️  Auto Sitemap Generator — запуск...\n');

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Статические страницы
staticPages.forEach(page => {
  xml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
});

// Все туры — /tours/{slug} (основной) + /excursion/{slug} (алиас)
tours.forEach(tour => {
  xml += `  <url>
    <loc>${BASE_URL}/tours/${tour.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tour.priority}</priority>
  </url>\n`;
  xml += `  <url>
    <loc>${BASE_URL}/excursion/${tour.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${(tour.priority - 0.1).toFixed(1)}</priority>
  </url>\n`;
});

// Пляжи
beaches.forEach(beach => {
  xml += `  <url>
    <loc>${BASE_URL}/beach/${beach}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`;
});

xml += `</urlset>\n`;

// Записываем в dist/sitemap.xml
const distPath = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist/ не найден. Сначала: npm run build');
  process.exit(1);
}

const sitemapPath = path.join(distPath, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf-8');

const urlCount = staticPages.length + tours.length * 2 + beaches.length;
console.log(`✅ Создан sitemap.xml: ${urlCount} URL`);
console.log(`   📅 lastmod: ${today}`);
console.log(`   🏝️  Туры: ${tours.length} × 2 маршрута = ${tours.length * 2} URL`);
console.log(`   🏖️  Пляжи: ${beaches.length} URL`);
console.log(`   📄 Статические: ${staticPages.length} URL`);
