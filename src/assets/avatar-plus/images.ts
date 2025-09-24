// Avatar Plus + Hangdong - РЕАЛЬНЫЕ ФОТО С WORDPRESS
// Все изображения скачаны с https://phuketgo.aaddaa.com/excursion/avatar-pljus/

// Главное фото горячих источников
import hotspringMain from './hotspring-main.jpeg'

// Avatar Plus фотографии (6 фото)
import avatar1 from './avatar-01.jpg'
import avatar2 from './avatar-02.jpg'
import avatar3 from './avatar-03.jpg'
import avatar4 from './avatar-04.jpg'
import avatar5 from './avatar-05.jpg'
import avatar6 from './avatar-06.jpg'

export const avatarPlusImages = {
  // Главное фото для карточки тура
  main: hotspringMain,
  
  // Главное фото для героической секции страницы
  hero: hotspringMain,
  
  // Миниатюра для каталога
  thumbnail: hotspringMain,
  
  // Все фото для галереи (7 штук)
  gallery: [
    hotspringMain,  // Главное фото горячих источников
    avatar1,        // Аватар фото 1
    avatar2,        // Аватар фото 2
    avatar3,        // Аватар фото 3
    avatar4,        // Аватар фото 4
    avatar5,        // Аватар фото 5
    avatar6         // Аватар фото 6
  ]
}

// Экспорт отдельных изображений для гибкости
export {
  hotspringMain,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6
}