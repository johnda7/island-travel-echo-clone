// Проверка регистрации Avatar+ тура
import { TOURS_REGISTRY } from './src/data/toursRegistry.ts';

const avatarTour = TOURS_REGISTRY.find(t => t.id === 'avatar-plus-hangdong-adventure');
console.log('Avatar tour found:', !!avatarTour);

if (avatarTour) {
  console.log('Tour details:', {
    id: avatarTour.id,
    name: avatarTour.name,
    isActive: avatarTour.isActive,
    category: avatarTour.category
  });
  
  // Попробуем загрузить данные
  avatarTour.data().then(data => {
    console.log('Tour data loaded:', {
      title: data.title,
      galleryLength: data.gallery.length,
      mainImage: data.mainImage
    });
  }).catch(err => {
    console.log('Error loading tour data:', err);
  });
}