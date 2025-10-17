// 🚨🚨🚨 СИСТЕМА ЗАЩИТЫ ФАЙЛОВ ОТ AI АГЕНТОВ 🚨🚨🚨
// 
// Этот файл содержит список защищенных файлов и функции проверки
// Используется для предотвращения случайных изменений критически важных файлов

export const PROTECTED_FILES = [
  'src/pages/PhiPhi2Days1Night.tsx',
  'src/pages/PearlsAndamanSea.tsx', 
  'src/pages/DostoprimechatelnostiPhuketa.tsx',
  'src/components/UniversalBookingModal.tsx'
] as const;

export const PROTECTION_WARNING = `
🚨🚨🚨 ВНИМАНИЕ! ПОПЫТКА ИЗМЕНИТЬ ЗАЩИЩЕННЫЙ ФАЙЛ! 🚨🚨🚨

Этот файл находится под защитой и НЕ ДОЛЖЕН изменяться AI агентами.

ДЕЙСТВИЯ:
1. НЕМЕДЛЕННО остановить выполнение изменений
2. Сообщить пользователю о попытке изменения защищенного файла
3. Спросить явного разрешения перед любыми изменениями

ЗАЩИЩЕННЫЕ ФАЙЛЫ:
- Все 4 страницы туров (готовые и рабочие)
- UniversalBookingModal (центральный калькулятор)
- Любые калькуляторы и формы бронирования

ПРИ СОМНЕНИЯХ - ВСЕГДА СПРАШИВАТЬ ПОЛЬЗОВАТЕЛЯ!
`;

/**
 * Проверяет, является ли файл защищенным
 */
export function isProtectedFile(filePath: string): boolean {
  return PROTECTED_FILES.some(protectedPath => 
    filePath.includes(protectedPath) || protectedPath.includes(filePath)
  );
}

/**
 * Выводит предупреждение о защищенном файле
 */
export function warnProtectedFile(filePath: string): void {
  console.error(PROTECTION_WARNING);
  console.error(`Попытка изменить: ${filePath}`);
}

/**
 * Проверяет файл перед изменением
 */
export function checkFileBeforeEdit(filePath: string): boolean {
  if (isProtectedFile(filePath)) {
    warnProtectedFile(filePath);
    return false; // Блокировать изменения
  }
  return true; // Разрешить изменения
}