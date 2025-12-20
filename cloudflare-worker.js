// Cloudflare Worker для отправки в Telegram
// Разверните на workers.cloudflare.com (бесплатно)

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // CORS headers для работы с любых доменов
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Обработка preflight запроса
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Только POST запросы
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  try {
    // Получаем данные от сайта
    const body = await request.json()
    const { chat_id, text } = body

    if (!chat_id || !text) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: 'Missing chat_id or text' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Ваш Bot Token (ЗАМЕНИТЕ НА СВОЙ!)
    const BOT_TOKEN = '8475227105:AAE7bu_y4nd8EpIpyQqBZg88F76yFyflWww'

    // Отправляем в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text,
        parse_mode: 'HTML'
      })
    })

    const telegramResult = await telegramResponse.json()

    // Возвращаем результат на сайт
    return new Response(JSON.stringify(telegramResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ 
      ok: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}
