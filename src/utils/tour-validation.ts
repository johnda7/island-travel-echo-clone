import { validateTour } from '../lib/tours';
import { tours } from '../data/tours';

// Запуск валидации всех туров
export const validateAllTours = () => {
  console.log('🔍 Запуск валидации туров...\n');
  
  let totalErrors = 0;
  let totalWarnings = 0;
  
  tours.forEach((tour, index) => {
    console.log(`📋 Проверка тура ${index + 1}/${tours.length}: "${tour.title}"`);
    
    const validation = validateTour(tour);
    
    if (!validation.isValid) {
      console.log(`❌ Ошибки (${validation.errors.length}):`);
      validation.errors.forEach(error => {
        console.log(`   • ${error}`);
      });
      totalErrors += validation.errors.length;
    } else {
      console.log('✅ Все обязательные поля корректны');
    }
    
    if (validation.warnings && validation.warnings.length > 0) {
      console.log(`⚠️  Предупреждения (${validation.warnings.length}):`);
      validation.warnings.forEach(warning => {
        console.log(`   • ${warning}`);
      });
      totalWarnings += validation.warnings.length;
    }
    
    console.log(''); // Пустая строка для разделения
  });
  
  // Итоговый отчёт
  console.log('📊 Итоговый отчёт валидации:');
  console.log(`   Всего туров: ${tours.length}`);
  console.log(`   Валидных туров: ${tours.filter(tour => validateTour(tour).isValid).length}`);
  console.log(`   Туров с ошибками: ${tours.filter(tour => !validateTour(tour).isValid).length}`);
  console.log(`   Общее количество ошибок: ${totalErrors}`);
  console.log(`   Общее количество предупреждений: ${totalWarnings}`);
  
  if (totalErrors === 0) {
    console.log('🎉 Все туры прошли валидацию успешно!');
  } else {
    console.log('🚨 Обнаружены ошибки в данных туров. Требуется исправление.');
  }
  
  return {
    totalTours: tours.length,
    validTours: tours.filter(tour => validateTour(tour).isValid).length,
    totalErrors,
    totalWarnings
  };
};

// Валидация конкретного тура по slug
export const validateTourBySlug = (slug: string) => {
  const tour = tours.find(t => t.slug === slug);
  
  if (!tour) {
    console.log(`❌ Тур с slug "${slug}" не найден`);
    return null;
  }
  
  console.log(`🔍 Валидация тура: "${tour.title}"`);
  const validation = validateTour(tour);
  
  if (validation.isValid) {
    console.log('✅ Тур валиден');
  } else {
    console.log('❌ Обнаружены ошибки:');
    validation.errors.forEach(error => console.log(`   • ${error}`));
  }
  
  if (validation.warnings?.length) {
    console.log('⚠️  Предупреждения:');
    validation.warnings.forEach(warning => console.log(`   • ${warning}`));
  }
  
  return validation;
};

// Автоматический запуск валидации в dev режиме
if (import.meta.env.DEV) {
  // Запускаем валидацию при загрузке модуля в dev режиме
  setTimeout(() => {
    console.log('\n🚀 Автоматическая валидация туров в dev режиме:\n');
    validateAllTours();
  }, 1000);
}

export default validateAllTours;