// Фотографии для тура "Остров Джеймса Бонда"
// ВАЖНО: В продакшене заменить на реальные фото с WordPress
// Источник: https://phuketgo.aaddaa.com/excursion/jekskursija-na-ostrov-dzhejmsa-bonda-5/

// Временные импорты (заменить на реальные фото)
import jamesBond1 from "@/assets/phi-phi-maya-bay.jpg"; // PLACEHOLDER - заменить на james-1.jpg
import jamesBond2 from "@/assets/phi-phi-lagoon.jpg";   // PLACEHOLDER - заменить на james-2.jpg  
import jamesBond3 from "@/assets/phi-phi-speedboat.jpg"; // PLACEHOLDER - заменить на james-3.jpg
import jamesBond4 from "@/assets/phi-phi-sunset.jpg";   // PLACEHOLDER - заменить на james-4.jpg
import jamesBond5 from "@/assets/phi-phi-snorkeling.jpg"; // PLACEHOLDER - заменить на james-5.jpg
import jamesBond6 from "@/assets/phi-phi-monkey-beach.jpg"; // PLACEHOLDER - заменить на james-6.jpg
import jamesBond7 from "@/assets/maya-bay-sunrise.jpg";  // PLACEHOLDER - заменить на james-7.jpg
import jamesBond8 from "@/assets/phi-phi-maya-bay.jpg";  // PLACEHOLDER - заменить на james-8.jpg

export const jamesBondImages = {
  // Главное фото для обложки
  main: jamesBond1,
  
  // Галерея фотографий (8 шт)
  gallery: [
    jamesBond1, // Знаменитая скала Ко Тапу 
    jamesBond2, // Панорама залива Пханг Нга
    jamesBond3, // Каноэ в пещере/лагуне
    jamesBond4, // Плавучая деревня мусульман
    jamesBond5, // Обед из морепродуктов
    jamesBond6, // Мангровые заросли
    jamesBond7, // Лонгтейл лодки
    jamesBond8, // Туристы на фоне скал
  ],
  
  // Фото для каталога
  thumbnail: jamesBond1,
};

// Описания к фотографиям (для accessibility)
export const jamesBondImageDescriptions = [
  "Остров Джеймса Бонда Ко Тапу в заливе Пханг Нга, место съемок фильма",
  "Залив Пханг Нга с изумрудными водами и известняковыми утесами", 
  "Каноэ экскурсия по пещерам и лагунам залива Пханг Нга",
  "Плавучая деревня Ко Паньи традиционный быт мусульман на воде",
  "Свежие морепродукты обед в ресторане на воде Пханг Нга",
  "Мангровые заросли экосистема залива Пханг Нга Таиланд", 
  "Традиционные лонгтейл лодки в заливе Пханг Нга",
  "Туристы на экскурсии среди известняковых скал Пханг Нга"
];

// Экспорт отдельных изображений для использования в компоненте
export {
  jamesBond1,
  jamesBond2, 
  jamesBond3,
  jamesBond4,
  jamesBond5,
  jamesBond6,
  jamesBond7,
  jamesBond8
};