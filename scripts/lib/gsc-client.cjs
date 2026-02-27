#!/usr/bin/env node
/**
 * 🔍 Google Search Console API Client
 * Базовый клиент для работы с GSC API.
 * Проект: phukeo.com | GSC email: anotherstoriz@gmail.com
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEY_FILE_PATH = path.join(__dirname, '../../.google/gsc-key.json');
const SITE_URL = 'https://phukeo.com/';

if (!fs.existsSync(KEY_FILE_PATH)) {
  console.error('❌ Файл credentials не найден!');
  console.error(`   Ожидаемый путь: ${KEY_FILE_PATH}`);
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/indexing',
  ],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

module.exports = { searchconsole, SITE_URL, auth };
