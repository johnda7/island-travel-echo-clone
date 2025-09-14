// Фотографии для тура "4 жемчужины Андаманского моря"
// НАСТОЯЩИЕ фотографии с оригинального сайта phuketgo.aaddaa.com

// Реальные фото с phuketgo
import pearlsPhoto1 from "./pearls-1.jpg";
import pearlsPhoto2 from "./pearls-2.jpg"; 
import pearlsPhoto3 from "./pearls-3.jpg";
import pearlsPhoto4 from "./pearls-4.jpg";
import pearlsPhoto5 from "./pearls-5.jpg";
import pearlsPhoto6 from "./pearls-6.jpg";
import pearlsPhoto7 from "./pearls-7.jpg";
import pearlsPhoto8 from "./pearls-8.jpg";

export const fourPearlsImages = {
  // Главное фото для обложки
  main: pearlsPhoto1,
  
  // Галерея фотографий (8 шт - настоящие фото с phuketgo)
  gallery: [
    pearlsPhoto1,     // Railay Beach - главное фото
    pearlsPhoto2,     // Railay Beach - вертикальный вид
    pearlsPhoto3,     // Railay Beach - пляжная зона
    pearlsPhoto4,     // Railay Beach - скалы и лагуны
    pearlsPhoto5,     // Railay Beach - закат и романтика
    pearlsPhoto6,     // Railay Beach - экскурсионная зона
    pearlsPhoto7,     // Railay Beach - панорамные виды
    pearlsPhoto8,     // Hong Island - одна из 4 жемчужин
  ],
  
  // Фото для каталога
  thumbnail: pearlsPhoto1,
};

// Описания к фотографиям (соответствуют настоящим фото с phuketgo.aaddaa.com)
export const fourPearlsImageDescriptions = [
  "Railay Beach - знаменитый пляж с белоснежным песком",
  "Railay Beach - живописные известняковые скалы",
  "Railay Beach - кристально чистые воды Андаманского моря", 
  "Railay Beach - тропическая растительность и скалы",
  "Railay Beach - романтические закаты и уединенные бухты",
  "Railay Beach - экскурсионные маршруты и пещеры",
  "Railay Beach - панорамные виды с высоты птичьего полета",
  "Hong Island - одна из 4 жемчужин Андаманского моря"
];