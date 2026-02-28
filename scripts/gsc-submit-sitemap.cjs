#!/usr/bin/env node
/**
 * 🗺️ Отправка sitemap.xml в Google Search Console
 *
 * Использует Search Console API (sitemaps.submit).
 * Требует прав siteFullUser (не owner).
 *
 * Запуск: node scripts/gsc-submit-sitemap.cjs
 */

const { searchconsole, SITE_URL } = require('./lib/gsc-client.cjs');

const SITEMAP_URL = 'https://phukeo.com/sitemap.xml';

async function main() {
  console.log('🗺️  Отправка sitemap в Google Search Console...\n');
  console.log(`Сайт: ${SITE_URL}`);
  console.log(`Sitemap: ${SITEMAP_URL}\n`);

  try {
    // 1. Отправить sitemap
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });
    console.log('✅ Sitemap успешно отправлен!\n');

    // 2. Проверить статус всех sitemaps
    const result = await searchconsole.sitemaps.list({ siteUrl: SITE_URL });
    const sitemaps = result.data.sitemap || [];

    if (sitemaps.length > 0) {
      console.log(`📊 Сайтмапы в GSC (${sitemaps.length}):\n`);
      sitemaps.forEach(sm => {
        console.log(`  📄 ${sm.path}`);
        console.log(`     Тип: ${sm.type || '—'}`);
        console.log(`     Статус: ${sm.isPending ? '⏳ Ожидает обработки' : '✅ Обработан'}`);
        console.log(`     Последнее скачивание: ${sm.lastDownloaded || '—'}`);
        console.log(`     Последняя отправка: ${sm.lastSubmitted || '—'}`);
        if (sm.contents) {
          sm.contents.forEach(c => {
            console.log(`     ${c.type}: ${c.submitted} отправлено, ${c.indexed} проиндексировано`);
          });
        }
        console.log('');
      });
    }

    console.log('🎉 Готово! Google начнёт обработку в ближайшие часы.');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    if (error.code === 403) {
      console.error('\n⚠️  Недостаточно прав. Убедитесь, что Service Account');
      console.error('   добавлен как Full user в Search Console.');
    }
  }
}

main();
