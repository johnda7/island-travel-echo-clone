// Фотографии для тура "Острова Рача и Корал"
// Временно используем существующие фото, потом заменим на настоящие

// Main tour images
import rachaBeach1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";
import rachaBeach2 from "@/assets/phi-phi-2days/maya-bay-2.jpg"; 
import coralIsland1 from "@/assets/phi-phi-snorkeling.jpg";
import coralIsland2 from "@/assets/phi-phi-2days/pileh-lagoon.jpg";
import snorkeling1 from "@/assets/phi-phi-2days/bamboo-island.webp";
import snorkeling2 from "@/assets/phi-phi-2days/rang-yai-1.jpg";
import beach1 from "@/assets/phi-phi-2days/maya-bay-3.jpg";
import beach2 from "@/assets/phi-phi-2days/maya-bay-4.jpg";

export const rachaCoralImages = {
  // Главное фото для обложки
  main: rachaBeach1,
  
  // Галерея фотографий (8 шт для полной галереи)
  gallery: [
    rachaBeach1,     // Пляж Рача Яй - Паток Бэй
    rachaBeach2,     // Пляж Рача Яй - Бунгало Бэй  
    coralIsland1,    // Остров Корал - снорклинг
    coralIsland2,    // Остров Корал - подводный мир
    snorkeling1,     // Снорклинг среди кораллов
    snorkeling2,     // Тропические рыбы
    beach1,          // Отдых на пляже
    beach2,          // Кристально чистая вода
  ],
  
  // Фото для каталога
  thumbnail: rachaBeach1,
};

// Описания к фотографиям
export const rachaCoralImageDescriptions = [
  "Пляж Паток Бэй на острове Рача Яй с белоснежным песком",
  "Пляж Бунгало Бэй - идеальное место для отдыха",
  "Снорклинг у коралловых рифов острова Корал", 
  "Богатый подводный мир и тропические рыбы",
  "Плавание с маской среди коралловых садов",
  "Разноцветные тропические рыбы в чистой воде",
  "Релаксация на белоснежных пляжах", 
  "Кристально чистая вода цвета аквамарин"
];