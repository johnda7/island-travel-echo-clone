#!/usr/bin/env node
/**
 * 🔑 Добавление Service Account как Owner в GSC
 * через Site Verification API
 * 
 * Запуск: node scripts/gsc-add-sa-owner.cjs
 */

const { google } = require('googleapis');
const path = require('path');

const KEY_FILE_PATH = path.join(__dirname, '../.google/gsc-key.json');
const SITE_URL = 'https://phukeo.com/';
const SA_EMAIL = 'phuketda-s-arch-console@phuketda-search-console.iam.gserviceaccount.com';

async function main() {
  console.log('🔑 Попытка добавить Service Account как Owner...\n');
  console.log(`SA: ${SA_EMAIL}`);
  console.log(`Site: ${SITE_URL}\n`);

  // Способ 1: Попробуем через Search Console API
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/siteverification',
      ],
    });

    const siteVerification = google.siteVerification({ version: 'v1', auth });

    // Попробуем получить текущий статус верификации
    console.log('1️⃣ Проверяю текущий статус верификации...');
    try {
      const webResource = await siteVerification.webResource.get({
        id: SITE_URL,
      });
      console.log('   Текущие owners:', webResource.data.owners);
      console.log('   Site:', webResource.data.site);
    } catch (e) {
      console.log('   Статус: не верифицирован как owner (' + e.message.substring(0, 80) + ')');
    }

    // Попробуем self-verify (insert)
    console.log('\n2️⃣ Попытка верификации SA через метод SITE_META...');
    try {
      // Сначала получим токен верификации
      const tokenResp = await siteVerification.webResource.getToken({
        requestBody: {
          site: { type: 'SITE', identifier: SITE_URL },
          verificationMethod: 'META',
        },
      });
      console.log('   Токен:', tokenResp.data.token);
    } catch (e) {
      console.log('   Не удалось получить токен:', e.message.substring(0, 100));
    }

    // Попробуем insert
    console.log('\n3️⃣ Попытка самоверификации SA (insert)...');
    try {
      const insertResp = await siteVerification.webResource.insert({
        verificationMethod: 'META',
        requestBody: {
          site: { type: 'SITE', identifier: SITE_URL },
        },
      });
      console.log('   ✅ SA верифицирован как Owner!', insertResp.data);
    } catch (e) {
      console.log('   Не удалось:', e.message.substring(0, 150));
    }

    // Способ 2: Попробуем через Search Console API напрямую
    console.log('\n4️⃣ Попытка через Search Console sites.add...');
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    try {
      await searchconsole.sites.add({ siteUrl: SITE_URL });
      console.log('   ✅ Сайт добавлен через Search Console API!');
    } catch (e) {
      console.log('   Результат:', e.message.substring(0, 150));
    }

    // Проверяем что имеем
    console.log('\n5️⃣ Текущие права SA...');
    try {
      const sites = await searchconsole.sites.list();
      const ourSite = (sites.data.siteEntry || []).find(s => s.siteUrl === SITE_URL);
      if (ourSite) {
        console.log(`   Сайт: ${ourSite.siteUrl}`);
        console.log(`   Уровень: ${ourSite.permissionLevel}`);
      }
    } catch (e) {
      console.log('   Ошибка:', e.message.substring(0, 100));
    }

  } catch (error) {
    console.error('❌ Общая ошибка:', error.message);
  }

  // Способ 3: Прямой вызов Indexing API с одним URL для теста
  console.log('\n6️⃣ Тест Indexing API с одним URL...');
  try {
    const authIdx = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    const indexing = google.indexing({ version: 'v3', auth: authIdx });
    const resp = await indexing.urlNotifications.publish({
      requestBody: { url: 'https://phukeo.com/', type: 'URL_UPDATED' },
    });
    console.log('   ✅ Indexing API работает! Status:', resp.status);
  } catch (e) {
    console.log('   ❌ Indexing API:', e.message.substring(0, 150));
  }

  console.log('\n📋 ИТОГ:');
  console.log('   Если Indexing API показывает "Permission denied":');
  console.log('   → Нужно добавить SA как Owner вручную через старую Webmaster Tools.');
  console.log('   → URL: https://www.google.com/webmasters/verification/home');
  console.log('   → Или через новую GSC: Настройки → Пользователи → ⋮ рядом с SA → "Подтвердить право"');
}

main();
