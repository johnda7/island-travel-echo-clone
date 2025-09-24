// Avatar Plus + Hangdong - РЕАЛЬНЫЕ ФОТО С WORDPRESS
// Все изображения скачаны с https://phuketgo.aaddaa.com/excursion/avatar-pljus/

// Главное фото горячих источников
import hotspringMain from './main-hotspring.jpeg'

// Музей Бенджаран
import benyaranMuseum from './benyaran-museum.jpg'

export const avatarPlusImages = {
  // Главное фото для карточки тура
  main: hotspringMain,
  
  // Главное фото для героической секции страницы
  hero: hotspringMain,
  
  // Миниатюра для каталога
  thumbnail: hotspringMain,
  
  // Все фото для галереи (упрощенная версия с реальными фото)
  gallery: [
    hotspringMain,    // Главное фото горячих источников
    benyaranMuseum    // Музей Бенджаран
  ]
}

// Экспорт отдельных изображений для гибкости
export {
  hotspringMain,
  benyaranMuseum
}