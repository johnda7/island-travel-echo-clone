#!/usr/bin/env node

/**
 * 🚀 МАССОВОЕ ОБНОВЛЕНИЕ ТУРОВ - TELEGRAM WEB APP ИНТЕГРАЦИЯ
 * 
 * Этот скрипт применяет все изменения из эталона DostoprimechatelnostiPhuketa.tsx
 * ко всем оставшимся турам автоматически
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Список туров для обновления
const TOURS_TO_UPDATE = [
  'RassvetnoePrikljuchenie.tsx',
  'JamesBondIslandTour.tsx', 
  'ElevenIslandsStandardTour.tsx',
  'RachaCoralIslandsTour.tsx',
  'RaftingSpaAtvTour.tsx',
  'KaoLakSafariTour.tsx',
  'AvatarPlusHangdong.tsx'
];

// Изменения для применения
const IMPORT_ADDITIONS = `
import { useTelegram } from "@/contexts/TelegramContext";
import { TelegramNav } from "@/components/TelegramNav";`;

function updateTourFile(filename) {
  const filePath = path.join(__dirname, 'src', 'pages', filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Файл не найден: ${filename}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`🔧 Обновляю ${filename}...`);
  
  // 1. Добавляем импорты
  if (!content.includes('useTelegram')) {
    content = content.replace(
      /import { ModalPortal } from "@\/components\/ModalPortal";/,
      `import { ModalPortal } from "@/components/ModalPortal";${IMPORT_ADDITIONS}`
    );
  }

  // 2. Добавляем Telegram хук
  if (!content.includes('const { isWebApp')) {
    content = content.replace(
      /const (\w+) = \(\) => {/,
      `const $1 = () => {
  const { isWebApp, user, hapticFeedback } = useTelegram();`
    );
  }

  // 3. Обновляем основной контейнер
  content = content.replace(
    /className="min-h-screen bg-white pb-20 lg:pb-0"/,
    'className={`min-h-screen bg-white overflow-x-hidden ${isWebApp ? \'pb-4\' : \'pb-20 lg:pb-0\'}`}'
  );

  // 4. Добавляем Telegram навигацию
  if (!content.includes('TelegramNav')) {
    content = content.replace(
      /<Header \/>/,
      `{/* Telegram Web App навигация */}
      {isWebApp && (
        <TelegramNav 
          title="${getTourTitle(filename)}"
        />
      )}

      {/* Обычный Header только в браузере */}
      {!isWebApp && <Header />}`
    );
  }

  // 5. Обновляем Breadcrumbs
  content = content.replace(
    /{\/\* Breadcrumbs[^}]+\*\/}\s*<section className="pt-20 pb-4">/,
    `{/* Breadcrumbs - как на tisland.travel, только в браузере */}
      {!isWebApp && (
        <section className="pt-20 pb-4">`
  );

  // Закрываем breadcrumbs
  content = content.replace(
    /(<\/section>)(\s+{\/\* Gallery)/,
    `$1
      )}$2`
  );

  // 6. Обновляем Footer
  content = content.replace(
    /<Footer \/>/,
    `{/* Footer показываем только в браузере */}
      {!isWebApp && <Footer />}`
  );

  // 7. Добавляем MobileBookingBar если нет
  if (!content.includes('MobileBookingBar') && !content.includes('import { MobileBookingBar }')) {
    // Добавляем импорт
    content = content.replace(
      /import { ModalPortal } from "@\/components\/ModalPortal";/,
      `import { ModalPortal } from "@/components/ModalPortal";
import { MobileBookingBar } from "@/components/MobileBookingBar";`
    );

    // Добавляем компонент перед Footer
    content = content.replace(
      /{\/\* Footer показываем только в браузере \*\/}/,
      `{/* Мобильная панель бронирования - показываем только в браузерном режиме */}
      {!isWebApp && (
        <MobileBookingBar
          priceAdult={excursion.priceAdult}
          priceChild={excursion.priceChild}
          currency={excursion.currency}
          onBookingClick={() => {
            hapticFeedback('light');
            setShowBookingModal(true);
          }}
        />
      )}

      {/* Footer показываем только в браузере */}`
    );
  }

  // 8. Уменьшаем отступы
  content = content
    .replace(/py-6/g, 'py-4')
    .replace(/py-16/g, 'py-8')
    .replace(/gap-12/g, 'gap-8')
    .replace(/mb-6/g, 'mb-4')
    .replace(/mb-12/g, 'mb-8')
    .replace(/space-y-3 mb-6/g, 'space-y-2 mb-4')
    .replace(/space-y-12/g, 'space-y-8')
    .replace(/p-6/g, 'p-4')
    .replace(/space-y-3/g, 'space-y-2');

  // Записываем обновленный файл
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${filename} обновлен!`);
  
  return true;
}

function getTourTitle(filename) {
  const titles = {
    'RassvetnoePrikljuchenie.tsx': 'Рассветное приключение',
    'JamesBondIslandTour.tsx': 'Остров Джеймса Бонда',
    'ElevenIslandsStandardTour.tsx': '11 островов стандарт',
    'RachaCoralIslandsTour.tsx': 'Остров Рача + Коралловый',
    'RaftingSpaAtvTour.tsx': 'Рафтинг + СПА + ATV',
    'KaoLakSafariTour.tsx': 'Као Лак сафари',
    'AvatarPlusHangdong.tsx': 'Аватар + Хангдонг'
  };
  return titles[filename] || 'Тур';
}

// Главная функция
function main() {
  console.log('🚀 МАССОВОЕ ОБНОВЛЕНИЕ ТУРОВ - TELEGRAM WEB APP ИНТЕГРАЦИЯ');
  console.log('=' .repeat(60));

  let updated = 0;
  let failed = 0;

  for (const filename of TOURS_TO_UPDATE) {
    try {
      if (updateTourFile(filename)) {
        updated++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`❌ Ошибка при обновлении ${filename}:`, error.message);
      failed++;
    }
  }

  console.log('=' .repeat(60));
  console.log(`🎯 РЕЗУЛЬТАТ: ${updated} туров обновлено, ${failed} ошибок`);
  
  if (updated > 0) {
    console.log('\n📋 СЛЕДУЮЩИЕ ШАГИ:');
    console.log('1. npm run build - проверить компиляцию'); 
    console.log('2. git add . && git commit -m "🚀 Массовое обновление 7 туров"');
    console.log('3. git push - деплой на production');
  }
}

main();