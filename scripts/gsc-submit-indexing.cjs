#!/usr/bin/env node
/**
 * 🚀 Отправка URL на индексацию через Google Indexing API
 *
 * ИСПОЛЬЗОВАНИЕ:
 *   node scripts/gsc-submit-indexing.cjs https://phukeo.com/page
 *   node scripts/gsc-submit-indexing.cjs --from-sitemap 0 200
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEY_FILE_PATH = path.join(__dirname, '../.google/gsc-key.json');
const SITE_URL = 'https://phukeo.com';

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const indexing = google.indexing({ version: 'v3', auth });

function getUrlsFromSitemap() {
  const paths = [
    path.join(__dirname, '../sitemap.xml'),
    path.join(__dirname, '../public/sitemap.xml'),
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8');
      const urls = [];
      const regex = /<loc>([^<]+)<\/loc>/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        urls.push(match[1]);
      }
      return urls;
    }
  }
  console.error('❌ sitemap.xml не найден');
  process.exit(1);
}

async function submitUrl(url) {
  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' },
    });
    return { url, success: true, status: response.status };
  } catch (error) {
    return { url, success: false, error: error.message };
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === '--from-sitemap') {
    const from = parseInt(args[1]) || 0;
    const to = parseInt(args[2]) || 200;
    const urls = getUrlsFromSitemap();

    console.log(`📊 Всего URL в sitemap: ${urls.length}`);
    console.log(`🚀 Отправляю URL с ${from} по ${Math.min(to, urls.length) - 1}\n`);

    const batch = urls.slice(from, to);
    let success = 0, fail = 0;

    for (let i = 0; i < batch.length; i++) {
      const result = await submitUrl(batch[i]);
      if (result.success) {
        success++;
        console.log(`✅ [${from + i + 1}/${urls.length}] ${batch[i]}`);
      } else {
        fail++;
        console.log(`❌ [${from + i + 1}/${urls.length}] ${batch[i]} — ${result.error}`);
        if (result.error.includes('429') || result.error.includes('quota')) {
          console.log('\n⚠️  Квота исчерпана! Продолжи завтра:');
          console.log(`   node scripts/gsc-submit-indexing.cjs --from-sitemap ${from + i + 1} ${to}`);
          break;
        }
      }
      await new Promise(r => setTimeout(r, 1500));
    }

    console.log(`\n📊 Результат: ✅ ${success} отправлено, ❌ ${fail} ошибок`);
    if (from + batch.length < urls.length) {
      console.log(`\n📌 Следующий батч (завтра):`);
      console.log(`   node scripts/gsc-submit-indexing.cjs --from-sitemap ${from + batch.length} ${from + batch.length + 200}`);
    }
  } else if (args[0]) {
    const result = await submitUrl(args[0]);
    if (result.success) {
      console.log(`✅ Отправлено: ${args[0]}`);
    } else {
      console.log(`❌ Ошибка: ${result.error}`);
    }
  } else {
    console.log('ИСПОЛЬЗОВАНИЕ:');
    console.log('  Один URL:     node scripts/gsc-submit-indexing.cjs https://phukeo.com/page');
    console.log('  Батч:         node scripts/gsc-submit-indexing.cjs --from-sitemap 0 200');
  }
}

main();
