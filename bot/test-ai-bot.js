// 🧪 Тестовый скрипт для проверки GPT интеграции
// Запуск: node test-ai-bot.js

const { OpenAI } = require('openai');
require('dotenv').config();

console.log('🧪 Тестирование GPT интеграции...\n');

// Проверяем наличие API ключа
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY не найден в .env файле!');
  console.log('\n📝 Добавьте в bot/.env:');
  console.log('OPENAI_API_KEY=sk-...ваш_ключ\n');
  process.exit(1);
}

console.log('✅ API ключ найден');
console.log(`🔑 Ключ: ${process.env.OPENAI_API_KEY.substring(0, 20)}...`);

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

async function testGPT() {
  try {
    console.log('\n📡 Отправляю запрос к GPT-3.5...\n');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "Ты консультант по турам на Пхукете. Отвечай кратко и дружелюбно." 
        },
        { 
          role: "user", 
          content: "Хочу на острова завтра, 2 взрослых" 
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });
    
    const response = completion.choices[0].message.content;
    
    console.log('✅ GPT работает!');
    console.log('\n💬 Тестовый вопрос:');
    console.log('   "Хочу на острова завтра, 2 взрослых"');
    console.log('\n🤖 Ответ GPT:');
    console.log(`   ${response}`);
    console.log('\n📊 Статистика:');
    console.log(`   Модель: ${completion.model}`);
    console.log(`   Токенов использовано: ${completion.usage.total_tokens}`);
    console.log(`   Стоимость: ~$${(completion.usage.total_tokens * 0.002 / 1000).toFixed(4)}`);
    
    console.log('\n✅ Тест пройден успешно!');
    console.log('🚀 Можете запускать AI бота: npm run start:ai\n');
    
  } catch (error) {
    console.error('\n❌ Ошибка GPT:', error.message);
    
    if (error.message.includes('401') || error.message.includes('Incorrect API key')) {
      console.log('\n💡 Проблема с API ключом:');
      console.log('   1. Проверьте что ключ правильный');
      console.log('   2. Получите новый на https://platform.openai.com/api-keys');
      console.log('   3. Обновите bot/.env файл\n');
    } else if (error.message.includes('insufficient_quota')) {
      console.log('\n💡 Недостаточно средств на балансе OpenAI:');
      console.log('   1. Пополните баланс на https://platform.openai.com/account/billing');
      console.log('   2. Минимум $5 для тестирования\n');
    } else {
      console.log('\n💡 Проверьте:');
      console.log('   1. Интернет соединение');
      console.log('   2. Правильность API ключа');
      console.log('   3. Баланс на OpenAI аккаунте\n');
    }
    
    process.exit(1);
  }
}

// Запуск теста
testGPT();
