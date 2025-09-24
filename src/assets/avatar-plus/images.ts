// Avatar Plus + Hangdong - РЕАЛЬНЫЕ ФОТО С WORDPRESS
// Все изображения скачаны с https://phuketgo.aaddaa.com/excursion/avatar-pljus/

// Главное фото горячих источников
import hotspringMain from './hotspring-main.jpeg'

// Музей Бенджаран (5 фото)
import benyaran1 from './benyaran-1.jpg'
import benyaran2 from './benyaran-2.jpg'
import benyaran3 from './benyaran-3.jpg'
import benyaran4 from './benyaran-4.jpg'
import benyaran5 from './benyaran-5.jpg'

// Горячие источники (дополнительные фото)
import hotspring2 from './hotspring-2.jpeg'
import hotspring3 from './hotspring-3.jpeg'

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
    benyaran1,      // Музей Бенджаран - вход
    benyaran2,      // Музей Бенджаран - экспозиция 1
    benyaran3,      // Музей Бенджаран - экспозиция 2
    benyaran4,      // Музей Бенджаран - экспозиция 3
    benyaran5,      // Музей Бенджаран - общий вид
    hotspring2,     // Горячие источники - панорама
    hotspring3      // Горячие источники - крупный план
  ]
}

// Экспорт отдельных изображений для гибкости
export {
  hotspringMain,
  benyaran1,
  benyaran2,
  benyaran3,
  benyaran4,
  benyaran5,
  hotspring2,
  hotspring3
}