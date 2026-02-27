#!/usr/bin/env node
/**
 * ✅ Тест подключения к Google Search Console API
 * Запуск: node scripts/gsc-test-connection.cjs
 */

const { searchconsole, SITE_URL } = require('./lib/gsc-client.cjs');

async function test() {
  console.log('🔍 Тестирую подключение к GSC...\n');
  console.log(`Сайт: ${SITE_URL}\n`);

  try {
    const sites = await searchconsole.sites.list();
    const siteList = sites.data.siteEntry || [];
    console.log(`✅ Найдено сайтов: ${siteList.length}`);

    const ourSite = siteList.find(s => s.siteUrl === SITE_URL);
    if (ourSite) {
      console.log(`✅ Наш сайт найден: ${ourSite.siteUrl}`);
      console.log(`   Уровень доступа: ${ourSite.permissionLevel}`);
    } else {
      console.log(`❌ Сайт ${SITE_URL} НЕ найден!`);
      console.log('   Проверь:');
      console.log('   1. Service Account добавлен в Search Console?');
      console.log('   2. SITE_URL совпадает? (проверь слеш в конце)');
      console.log('\n   Доступные сайты:');
      siteList.forEach(s => console.log(`   - ${s.siteUrl}`));
      return;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: [],
        rowLimit: 1,
      },
    });

    if (response.data.rows?.length) {
      const r = response.data.rows[0];
      console.log(`\n📊 Статистика за 7 дней:`);
      console.log(`   Показы: ${r.impressions}`);
      console.log(`   Клики: ${r.clicks}`);
      console.log(`   CTR: ${(r.ctr * 100).toFixed(2)}%`);
      console.log(`   Средняя позиция: ${r.position?.toFixed(1)}`);
    } else {
      console.log('\n⚠️  Данных пока нет (сайт новый — это нормально)');
    }

    console.log('\n🎉 Подключение работает!');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    if (error.message.includes('403')) {
      console.error('\n   Service Account не имеет доступа.');
      console.error('   Добавь его в Search Console → Settings → Users → Add user');
      console.error('   Email: phuketda-s-arch-console@phuketda-search-console.iam.gserviceaccount.com');
      console.error('   Permission: Full');
    }
    if (error.message.includes('401')) {
      console.error('\n   JSON ключ невалидный или устарел.');
    }
  }
}

test();
