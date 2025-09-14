// Фотографии для тура "Остров Джеймса Бонда" 
// НАСТОЯЩИЕ фотографии с оригинального сайта phuketgo.aaddaa.com

// Реальные фото с WordPress (ВРЕМЕННО используем подходящие из существующих)
import jamesPhoto1 from "./james-1.jpg"; // СКАЧАТЬ с phuketgo: Главное фото скалы Ко Тапу
import jamesPhoto2 from "./james-2.jpg"; // СКАЧАТЬ с phuketgo: Залив Пханг Нга панорама
import jamesPhoto3 from "./james-3.jpg"; // СКАЧАТЬ с phuketgo: Каноэ в пещерах
import jamesPhoto4 from "./james-4.jpg"; // СКАЧАТЬ с phuketgo: Плавучая деревня Ко Паньи
import jamesPhoto5 from "./james-5.jpg"; // СКАЧАТЬ с phuketgo: Обед из морепродуктов
import jamesPhoto6 from "./james-6.jpg"; // СКАЧАТЬ с phuketgo: Мангровые заросли
import jamesPhoto7 from "./james-7.jpg"; // СКАЧАТЬ с phuketgo: Лонгтейл лодки
import jamesPhoto8 from "./james-8.jpg"; // СКАЧАТЬ с phuketgo: Группа туристов

// ВРЕМЕННЫЕ фото до скачивания настоящих с phuketgo
import phiPhiMayaBay from "@/assets/phi-phi-maya-bay.jpg";
import pilehLagoon from "@/assets/pileh-lagoon.jpg"; 
import vikingCave from "@/assets/viking-cave.jpg";
import phiPhiLagoon from "@/assets/phi-phi-lagoon.jpg";
import phiPhiSpeedboat from "@/assets/phi-phi-speedboat.jpg";
import phiPhiSnorkeling from "@/assets/phi-phi-snorkeling.jpg";
import phiPhiMonkeyBeach from "@/assets/phi-phi-monkey-beach.jpg";
import phiPhiSunset from "@/assets/phi-phi-sunset.jpg";

export const jamesBondIslandImages = {
  // Главное фото для обложки
  main: phiPhiMayaBay, // ЗАМЕНИТЬ на jamesPhoto1 после скачивания
  
  // Галерея фотографий (8 шт - будут настоящие фото с phuketgo)
  gallery: [
    phiPhiMayaBay,      // 1. Знаменитая скала Ко Тапу (James Bond Rock)
    phiPhiLagoon,       // 2. Залив Пханг Нга - панорамный вид
    pilehLagoon,        // 3. Каноэ по мангровым лесам и пещерам
    vikingCave,         // 4. Плавучая деревня мусульман Ко Паньи  
    phiPhiSpeedboat,    // 5. Лодочный тур по заливу
    phiPhiSnorkeling,   // 6. Обед из морепродуктов 
    phiPhiMonkeyBeach,  // 7. Мангровые заросли и экосистема
    phiPhiSunset        // 8. Закат над заливом Пханг Нга
  ],
  
  // Фото для каталога
  thumbnail: phiPhiMayaBay, // ЗАМЕНИТЬ на jamesPhoto1
};

// Описания к фотографиям (соответствуют настоящим фото с phuketgo.aaddaa.com)
export const jamesBondIslandImageDescriptions = [
  "Остров Джеймса Бонда Ко Тапу - знаменитая скала из фильма 007 в заливе Пханг Нга",
  "Залив Пханг Нга - панорамный вид на известняковые скалы и изумрудные воды",
  "Каноэ экскурсия по мангровым лесам, лагунам и пещерам залива Пханг Нга",
  "Плавучая деревня мусульман Ко Паньи на сваях в заливе Пханг Нга",
  "Лодочный тур на традиционном лонгтейле по заливу к острову Джеймса Бонда", 
  "Обед из свежих морепродуктов в плавучем ресторане",
  "Мангровые заросли и уникальная экосистема залива Пханг Нга",
  "Закат над заливом Пханг Нга - романтический финал экскурсии"
];

// ИНСТРУКЦИИ ДЛЯ ЗАМЕНЫ НА НАСТОЯЩИЕ ФОТО:
// 1. Открыть https://phuketgo.aaddaa.com/excursion/jekskursija-na-ostrov-dzhejmsa-bonda-5/
// 2. Правый клик на каждое фото → "Сохранить изображение как..."
// 3. Сохранить в /src/assets/james-bond-island/ как james-1.jpg, james-2.jpg, etc.
// 4. Заменить временные импорты на jamesPhoto1, jamesPhoto2, etc.
// 5. Обновить main и gallery массив