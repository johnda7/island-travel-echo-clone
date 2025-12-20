// Netlify Function
// Файл: netlify/functions/send-telegram.js

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { chat_id, text } = JSON.parse(event.body);

    // ✅ Отправка через Koyeb (токен безопасно на сервере)
    const KOYEB_NOTIFY_URL = 'https://small-robinia-phukeo-8b5e1e16.koyeb.app/api/notify';

    const response = await fetch(KOYEB_NOTIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          text,
          parse_mode: 'HTML'
        })
      }
    );

    const result = await response.json();

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
