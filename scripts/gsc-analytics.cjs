#!/usr/bin/env node
/**
 * 📊 Аналитика из Google Search Console
 *
 * ИСПОЛЬЗОВАНИЕ:
 *   node scripts/gsc-analytics.cjs                # Обзор за 30 дней
 *   node scripts/gsc-analytics.cjs queries 50     # Топ-50 запросов
 *   node scripts/gsc-analytics.cjs pages 20       # Топ-20 страниц
 *   node scripts/gsc-analytics.cjs issues         # Проблемы
 */

const { searchconsole, SITE_URL } = require('./lib/gsc-client.cjs');

const fmt = d => d.toISOString().split('T')[0];

async function getOverview(days = 30) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  console.log(`\n📊 ОБЗОР за ${days} дней (${fmt(startDate)} — ${fmt(endDate)})\n`);

  const response = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: [],
      rowLimit: 1,
    },
  });

  if (response.data.rows?.length) {
    const r = response.data.rows[0];
    console.log('╔═══════════════════════════════════════╗');
    console.log(`║  Показы:          ${String(r.impressions).padStart(15)} ║`);
    console.log(`║  Клики:           ${String(r.clicks).padStart(15)} ║`);
    console.log(`║  CTR:             ${((r.ctr * 100).toFixed(2) + '%').padStart(15)} ║`);
    console.log(`║  Средняя позиция: ${r.position.toFixed(1).padStart(15)} ║`);
    console.log('╚═══════════════════════════════════════╝');

    if (r.ctr < 0.02) console.log('\n⚠️  CTR < 2% — улучши title/description');
    if (r.position > 30) console.log('⚠️  Позиция > 30 — нужно больше контента/ссылок');
    if (r.impressions < 500) console.log('⚠️  Мало показов — ускорь индексацию');
  } else {
    console.log('⏳ Данных пока нет (сайт новый — Google ещё собирает статистику)');
  }
}

async function getTopQueries(limit = 30, days = 30) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const response = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query'],
      rowLimit: limit,
    },
  });

  console.log(`\n🔍 ТОП-${limit} ЗАПРОСОВ за ${days} дней:\n`);
  const rows = response.data.rows || [];

  if (!rows.length) {
    console.log('⏳ Данных пока нет');
    return;
  }

  console.log('  #   Запрос                              Клики  Показы   CTR    Позиция');
  console.log('  ─── ───────────────────────────────────  ─────  ──────  ─────  ───────');

  rows.forEach((row, i) => {
    const query = row.keys[0].substring(0, 35).padEnd(35);
    const clicks = String(row.clicks).padStart(5);
    const impressions = String(row.impressions).padStart(6);
    const ctr = ((row.ctr * 100).toFixed(1) + '%').padStart(5);
    const pos = row.position.toFixed(1).padStart(7);
    console.log(`  ${String(i + 1).padStart(3)} ${query}  ${clicks}  ${impressions}  ${ctr}  ${pos}`);
  });

  const lowCtr = rows.filter(r => r.impressions > 50 && r.ctr < 0.02);
  if (lowCtr.length) {
    console.log(`\n⚠️  ${lowCtr.length} запросов с низким CTR (< 2%) и > 50 показами:`);
    lowCtr.slice(0, 5).forEach(r => {
      console.log(`   "${r.keys[0]}" — ${r.impressions} показов, ${(r.ctr * 100).toFixed(1)}% CTR`);
    });
  }
}

async function getTopPages(limit = 20, days = 30) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const response = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['page'],
      rowLimit: limit,
    },
  });

  console.log(`\n📄 ТОП-${limit} СТРАНИЦ за ${days} дней:\n`);
  const rows = response.data.rows || [];

  if (!rows.length) {
    console.log('⏳ Данных пока нет');
    return;
  }

  rows.forEach((row, i) => {
    const url = row.keys[0].replace(SITE_URL, '/');
    console.log(`  ${i + 1}. ${url}`);
    console.log(`     Клики: ${row.clicks} | Показы: ${row.impressions} | CTR: ${(row.ctr * 100).toFixed(1)}% | Позиция: ${row.position.toFixed(1)}`);
  });
}

async function getIssues() {
  console.log('\n⚠️  ПРОВЕРКА ПРОБЛЕМ ИНДЕКСАЦИИ:\n');
  try {
    const sitemaps = await searchconsole.sitemaps.list({ siteUrl: SITE_URL });
    const sm = sitemaps.data.sitemap || [];

    if (sm.length) {
      console.log('📋 Sitemaps:');
      sm.forEach(s => {
        const status = s.errors > 0 ? '❌' : '✅';
        console.log(`   ${status} ${s.path} — ошибок: ${s.errors || 0}, предупреждений: ${s.warnings || 0}`);
        if (s.contents) {
          s.contents.forEach(c => {
            console.log(`      ${c.type}: ${c.submitted} отправлено, ${c.indexed} проиндексировано`);
          });
        }
      });
    } else {
      console.log('❌ Sitemaps не найдены! Отправь sitemap.xml в Search Console.');
    }
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

const [cmd, arg1] = process.argv.slice(2);

switch (cmd) {
  case 'queries':
    getTopQueries(parseInt(arg1) || 30).catch(console.error);
    break;
  case 'pages':
    getTopPages(parseInt(arg1) || 20).catch(console.error);
    break;
  case 'issues':
    getIssues().catch(console.error);
    break;
  default:
    getOverview(parseInt(cmd) || 30).catch(console.error);
    break;
}
