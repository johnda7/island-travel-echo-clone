import React from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react'    // Маркетинговый подход - готовая заявка с ценой!

import { Header } from '@/components/Header';

import { Footer } from '@/components/Footer';import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { ArrowLeft, Phone } from 'lucide-react';import { Header } from '@/components/Header';import { Link } from 'react-router-dom';



const PhiPhiReservation = () => {import { Footer } from '@/components/Footer';

  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">import { ArrowLeft, Calendar, Users, MapPin, Phone, CheckCircle } from 'lucide-react';import { Header } from '@/components/Header';import { ArrowLeft, Calendar, Users, MapPin, Phone, CheckCircle } from 'lucide-react';

      <Header />

      

      <main className="container mx-auto px-4 py-8">

        <Link const PhiPhiReservation = () => {import { Footer } from '@/components/Footer';

          to="/excursion/phi-phi-2-days-1-night" 

          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"  const [formData, setFormData] = useState({

        >

          <ArrowLeft className="w-4 h-4" />    name: '',import { ArrowLeft, Calendar, Users, MapPin, Phone, CheckCircle } from 'lucide-react';import { Link } from 'react-router-dom';import { ArrowLeft, Calendar, Users, MapPin, Phone, CheckCircle } from 'lucide-react';

          Назад к экскурсии

        </Link>    phone: '',



        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">    date: '',

          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">

            Бронирование тура Пхи-Пхи    adults: 2,

          </h1>

              children: 0const PhiPhiReservation = () => {import { Header } from '@/components/Header';

          <div className="text-center space-y-4">

            <p className="text-lg text-gray-600">  });

              Для бронирования данной экскурсии свяжитесь с нами через Telegram

            </p>  const [formData, setFormData] = useState({

            

            <a   // Цены

              href="https://t.me/phuketGoo" 

              target="_blank"   const pricing = {    name: '',import { Footer } from '@/components/Footer';import { Link } from 'react-router-dom';import { ArrowLeft, Calendar, Users, MapPin, Phone, CheckCircle } from 'lucide-react';

              rel="noopener noreferrer"

              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"    adultPrice: 4900,

            >

              <Phone className="w-5 h-5" />    childPrice: 3500    phone: '',

              Связаться в Telegram

            </a>  };

            

            <p className="text-sm text-gray-500 mt-4">    date: '',

              Наши менеджеры ответят в течение нескольких минут

            </p>  const [totalPrice, setTotalPrice] = useState(0);

          </div>

        </div>    adults: 2,

      </main>

        // Автоматический расчет цены

      <Footer />

    </div>  useEffect(() => {    children: 0const PhiPhiReservation = () => {import { Header } from '@/components/Header';

  );

};    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);



export default PhiPhiReservation;    setTotalPrice(total);  });

  }, [formData.adults, formData.children]);

  const [formData, setFormData] = useState({

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const { name, value } = e.target;  // Цены

    setFormData(prev => ({

      ...prev,  const pricing = {    name: '',import { Footer } from '@/components/Footer';import { Link } from 'react-router-dom';import { ArrowLeft, Calendar, Users, MapPin, Phone, CheckCircle } from 'lucide-react';    const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

      [name]: value

    }));    adultPrice: 4900,

  };

    childPrice: 3500    phone: '',

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();  };

    

    const formatDate = (dateStr: string) => {    date: '',

      if (!dateStr) return 'Обсудим при связи';

      const date = new Date(dateStr);  const [totalPrice, setTotalPrice] = useState(0);

      return date.toLocaleDateString('ru-RU', {

        day: 'numeric',    adults: 2,

        month: 'long',

        year: 'numeric'  // Автоматический расчет цены

      });

    };  useEffect(() => {    children: 0const PhiPhiReservation = () => {import { Header } from '@/components/Header';



    // Готовая заявка с ценой    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);

    const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

    setTotalPrice(total);  });

🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)

📅 ДАТА: ${formatDate(formData.date)}  }, [formData.adults, formData.children]);



👥 УЧАСТНИКИ:  return (

• Взрослые: ${formData.adults} чел. × ${pricing.adultPrice.toLocaleString('ru')} ₽ = ${(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽

${formData.children > 0 ? `• Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽ = ${(formData.children * pricing.childPrice).toLocaleString('ru')} ₽` : ''}  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {



💰 ИТОГО: ${totalPrice.toLocaleString('ru')} ₽    const { name, value } = e.target;  const pricing = {



${formData.name ? `👤 ИМЯ: ${formData.name}` : '👤 ИМЯ: не указано'}    setFormData(prev => ({

${formData.phone ? `📞 ТЕЛЕФОН: ${formData.phone}` : '📞 ТЕЛЕФОН: свяжется в Telegram'}

      ...prev,    adultPrice: 4900,    <>import { Footer } from '@/components/Footer';import { Link } from 'react-router-dom';

✅ Клиент готов к бронированию!

🚀 ПРИОРИТЕТНАЯ ЗАЯВКА - ответить быстро`;      [name]: value



    const encodedMessage = encodeURIComponent(message);    }));    childPrice: 3500

    const telegramUrl = `https://t.me/phuketGoo?text=${encodedMessage}`;

  };

    // Открыть Telegram

    window.open(telegramUrl, '_blank');  };      <Header />

    

    // Показать подтверждение  const handleSubmit = (e: React.FormEvent) => {

    alert('✅ Заявка отправлена в Telegram!\n\nМы ответим в течение 5 минут.');

  };    e.preventDefault();



  return (    

    <>

      <Header />    const formatDate = (dateStr: string) => {  const [totalPrice, setTotalPrice] = useState(0);      <div className="min-h-screen bg-gray-50 pt-16">

      

      <div className="min-h-screen bg-gray-50 pt-16">      if (!dateStr) return 'Обсудим при связи';

        {/* Breadcrumb */}

        <div className="bg-white border-b">      const date = new Date(dateStr);

          <div className="max-w-7xl mx-auto px-4 py-4">

            <Link       return date.toLocaleDateString('ru-RU', {

              to="/excursion/phi-phi-2-days-1-night"

              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"        day: 'numeric',  useEffect(() => {        <div className="max-w-7xl mx-auto px-4 py-8">

            >

              <ArrowLeft className="w-4 h-4 mr-2" />        month: 'long',

              Назад к туру

            </Link>        year: 'numeric'    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);

          </div>

        </div>      });



        {/* Заголовок */}    };    setTotalPrice(total);          <h1>Бронирование тура</h1>const PhiPhiReservation = () => {import { Header } from '@/components/Header';🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)

        <div className="bg-white">

          <div className="max-w-7xl mx-auto px-4 py-6">

            <div className="flex items-start space-x-4">

              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">    // Готовая заявка с ценой  }, [formData.adults, formData.children]);

                <MapPin className="w-10 h-10 text-white" />

              </div>    const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

              <div className="flex-1">

                <h1 className="text-3xl font-bold text-gray-900 mb-2">        </div>

                  Пхи-Пхи 2 дня / 1 ночь

                </h1>🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)

                <p className="text-lg text-gray-600">Стандартная программа</p>

              </div>📅 ДАТА: ${formatDate(formData.date)}  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

            </div>

          </div>

        </div>

👥 УЧАСТНИКИ:    const { name, value } = e.target;      </div>  const [formData, setFormData] = useState({

        <div className="max-w-7xl mx-auto px-4 py-8">

          <div className="grid lg:grid-cols-3 gap-8">• Взрослые: ${formData.adults} чел. × ${pricing.adultPrice.toLocaleString('ru')} ₽ = ${(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽

            

            {/* Форма - МИНИМУМ ПОЛЕЙ */}${formData.children > 0 ? `• Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽ = ${(formData.children * pricing.childPrice).toLocaleString('ru')} ₽` : ''}    setFormData(prev => ({

            <div className="lg:col-span-2">

              <div className="bg-white rounded-2xl shadow-sm border p-8">

                <h2 className="text-2xl font-bold mb-8 text-gray-900">

                  Быстрое бронирование💰 ИТОГО: ${totalPrice.toLocaleString('ru')} ₽      ...prev,      <Footer />

                </h2>



                <form onSubmit={handleSubmit} className="space-y-8">

                  ${formData.name ? `👤 ИМЯ: ${formData.name}` : '👤 ИМЯ: не указано'}      [name]: value

                  {/* Участники тура */}

                  <div>${formData.phone ? `📞 ТЕЛЕФОН: ${formData.phone}` : '📞 ТЕЛЕФОН: свяжется в Telegram'}

                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">

                      <Users className="w-5 h-5 mr-2 text-green-600" />    }));    </>    name: '',import { Footer } from '@/components/Footer';📅 ДАТА: ${formatDate(formData.date)}

                      Сколько человек едет?

                    </h3>✅ Клиент готов к бронированию!

                    <div className="grid md:grid-cols-2 gap-6">

                      <div>🚀 ПРИОРИТЕТНАЯ ЗАЯВКА - ответить быстро`;  };

                        <label className="block text-sm font-medium text-gray-700 mb-3">

                          Взрослые

                        </label>

                        <select    const encodedMessage = encodeURIComponent(message);  );

                          name="adults"

                          value={formData.adults}    const telegramUrl = `https://t.me/phuketGoo?text=${encodedMessage}`;

                          onChange={handleInputChange}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"      return (

                        >

                          {[1,2,3,4,5,6,7,8,9,10].map(num => (    // Открыть Telegram

                            <option key={num} value={num}>{num} чел.</option>

                          ))}    window.open(telegramUrl, '_blank');    <>};    phone: '',

                        </select>

                      </div>    

                      <div>

                        <label className="block text-sm font-medium text-gray-700 mb-3">    // Показать подтверждение      <Header />

                          Дети (до 12 лет)

                        </label>    alert('✅ Заявка отправлена в Telegram!\n\nМы ответим в течение 5 минут.');

                        <select

                          name="children"  };      

                          value={formData.children}

                          onChange={handleInputChange}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                        >  return (      <div className="min-h-screen bg-gray-50 pt-16">

                          {[0,1,2,3,4,5].map(num => (

                            <option key={num} value={num}>{num === 0 ? 'Нет детей' : `${num} чел.`}</option>    <>

                          ))}

                        </select>      <Header />        <div className="bg-white border-b">export default PhiPhiReservation;    date: '',

                      </div>

                    </div>      

                  </div>

      <div className="min-h-screen bg-gray-50 pt-16">          <div className="max-w-7xl mx-auto px-4 py-4">

                  {/* Дата и контакты - ОПЦИОНАЛЬНО */}

                  <div>        {/* Breadcrumb */}

                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">

                      <Calendar className="w-5 h-5 mr-2 text-green-600" />        <div className="bg-white border-b">            <Link     adults: 2,

                      Дополнительно (можно не заполнять)

                    </h3>          <div className="max-w-7xl mx-auto px-4 py-4">

                    <div className="grid md:grid-cols-3 gap-6">

                      <div>            <Link               to="/excursion/phi-phi-2-days-1-night"

                        <label className="block text-sm font-medium text-gray-700 mb-3">

                          Желаемая дата              to="/excursion/phi-phi-2-days-1-night"

                        </label>

                        <input              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"    children: 0const PhiPhiReservation = () => {👥 УЧАСТНИКИ:

                          type="date"

                          name="date"            >

                          value={formData.date}

                          onChange={handleInputChange}              <ArrowLeft className="w-4 h-4 mr-2" />            >

                          min={new Date().toISOString().split('T')[0]}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"              Назад к туру

                        />

                      </div>            </Link>              <ArrowLeft className="w-4 h-4 mr-2" />  });

                      <div>

                        <label className="block text-sm font-medium text-gray-700 mb-3">          </div>

                          Ваше имя

                        </label>        </div>              Назад к туру

                        <input

                          type="text"

                          name="name"

                          value={formData.name}        {/* Заголовок */}            </Link>  const [formData, setFormData] = useState({• Взрослые: ${formData.adults} чел. × ${pricing.adultPrice.toLocaleString('ru')} ₽ = ${(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽

                          onChange={handleInputChange}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"        <div className="bg-white">

                          placeholder="Не обязательно"

                        />          <div className="max-w-7xl mx-auto px-4 py-6">          </div>

                      </div>

                      <div>            <div className="flex items-start space-x-4">

                        <label className="block text-sm font-medium text-gray-700 mb-3">

                          Телефон              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">        </div>  // Цены - показываем сразу!

                        </label>

                        <input                <MapPin className="w-10 h-10 text-white" />

                          type="tel"

                          name="phone"              </div>

                          value={formData.phone}

                          onChange={handleInputChange}              <div className="flex-1">

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                          placeholder="Не обязательно"                <h1 className="text-3xl font-bold text-gray-900 mb-2">        <div className="bg-white">  const pricing = {    name: '',${formData.children > 0 ? `• Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽ = ${(formData.children * pricing.childPrice).toLocaleString('ru')} ₽` : ''}

                        />

                      </div>                  Пхи-Пхи 2 дня / 1 ночь

                    </div>

                  </div>                </h1>          <div className="max-w-7xl mx-auto px-4 py-6">



                  {/* Что включено */}                <p className="text-lg text-gray-600">Стандартная программа</p>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">

                    <h4 className="font-semibold text-green-800 mb-4 flex items-center">              </div>            <div className="flex items-start space-x-4">    adultPrice: 4900,

                      <CheckCircle className="w-5 h-5 mr-2" />

                      Все уже включено в стоимость:            </div>

                    </h4>

                    <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">          </div>              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">

                      <div>✓ Трансфер туда-обратно</div>

                      <div>✓ Проживание в бунгало</div>        </div>

                      <div>✓ Лодка + бензин</div>

                      <div>✓ Завтрак, обед, ужин</div>                <MapPin className="w-10 h-10 text-white" />    childPrice: 3500    phone: '',

                      <div>✓ Экскурсионная программа</div>

                      <div>✓ Снаряжение для снорклинга</div>        <div className="max-w-7xl mx-auto px-4 py-8">

                      <div>✓ Русскоговорящий гид</div>

                      <div>✓ Страховка</div>          <div className="bg-white rounded-2xl shadow-sm border p-8">              </div>

                    </div>

                  </div>            <h2 className="text-2xl font-bold mb-8 text-gray-900">



                  <button              Быстрое бронирование              <div className="flex-1">  };

                    type="submit"

                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"            </h2>

                  >

                    <Phone className="w-6 h-6" />                            <h1 className="text-3xl font-bold text-gray-900 mb-2">

                    <span>Забронировать за {totalPrice.toLocaleString('ru')} ₽</span>

                  </button>            <div className="text-center py-8">

                  

                  <p className="text-center text-sm text-gray-500">              <h3 className="text-lg font-semibold text-gray-900 mb-4">                  Пхи-Пхи 2 дня / 1 ночь    date: '',💰 ИТОГО: ${totalPrice.toLocaleString('ru')} ₽

                    📱 Заявка отправится в Telegram • ⚡ Ответим в течение 5 минут

                  </p>                Цена: {totalPrice.toLocaleString('ru')} ₽

                  

                </form>              </h3>                </h1>

              </div>

            </div>              <p className="text-gray-600">



            {/* Сводка заказа */}                Взрослые: {formData.adults} чел. × {pricing.adultPrice.toLocaleString('ru')} ₽<br/>                <p className="text-lg text-gray-600">Стандартная программа</p>  const [totalPrice, setTotalPrice] = useState(0);

            <div className="lg:col-span-1">

              <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-8">                {formData.children > 0 && `Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽`}

                <h3 className="text-xl font-bold text-gray-900 mb-6">Ваш заказ</h3>

                              </p>              </div>

                <div className="space-y-6">

                  <div className="flex justify-between items-start">              

                    <div>

                      <p className="text-lg font-semibold text-gray-900">Пхи-Пхи 2 дня / 1 ночь</p>              <form onSubmit={handleSubmit} className="mt-8 space-y-6">            </div>    adults: 2,

                      <p className="text-sm text-gray-600">Стандартная программа</p>

                    </div>                <div className="grid md:grid-cols-2 gap-6">

                  </div>

                  <div>          </div>

                  <div className="border-t pt-6 space-y-4">

                    <div className="flex items-center justify-between text-gray-600">                    <label className="block text-sm font-medium text-gray-700 mb-2">

                      <div className="flex items-center">

                        <Users className="w-4 h-4 mr-2" />                      Взрослые        </div>  // Автоматический расчет цены

                        <span>Взрослые:</span>

                      </div>                    </label>

                      <span className="font-medium">{formData.adults} чел.</span>

                    </div>                    <select

                    {formData.children > 0 && (

                      <div className="flex items-center justify-between text-gray-600">                      name="adults"

                        <div className="flex items-center">

                          <Users className="w-4 h-4 mr-2" />                      value={formData.adults}        <div className="max-w-7xl mx-auto px-4 py-8">  useEffect(() => {    children: 0${formData.name ? `👤 ИМЯ: ${formData.name}` : '👤 ИМЯ: не указано'}

                          <span>Дети:</span>

                        </div>                      onChange={handleInputChange}

                        <span className="font-medium">{formData.children} чел.</span>

                      </div>                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"          <div className="bg-white rounded-2xl shadow-sm border p-8">

                    )}

                    {formData.date && (                    >

                      <div className="flex items-center justify-between text-gray-600">

                        <div className="flex items-center">                      {[1,2,3,4,5,6].map(num => (            <h2 className="text-2xl font-bold mb-8 text-gray-900">    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);

                          <Calendar className="w-4 h-4 mr-2" />

                          <span>Дата:</span>                        <option key={num} value={num}>{num} чел.</option>

                        </div>

                        <span className="font-medium">{new Date(formData.date).toLocaleDateString('ru-RU')}</span>                      ))}              Быстрое бронирование

                      </div>

                    )}                    </select>

                  </div>

                  </div>            </h2>    setTotalPrice(total);  });${formData.phone ? `📞 ТЕЛЕФОН: ${formData.phone}` : '📞 ТЕЛЕФОН: свяжется в Telegram'}

                  <div className="border-t pt-6">

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">                  

                      <div className="space-y-2 mb-4 text-sm">

                        <div className="flex justify-between">                  <div>            

                          <span>Взрослые ({formData.adults} чел.)</span>

                          <span>{(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽</span>                    <label className="block text-sm font-medium text-gray-700 mb-2">

                        </div>

                        {formData.children > 0 && (                      Дети (до 12 лет)            <div className="text-center py-8">  }, [formData.adults, formData.children]);

                          <div className="flex justify-between">

                            <span>Дети ({formData.children} чел.)</span>                    </label>

                            <span>{(formData.children * pricing.childPrice).toLocaleString('ru')} ₽</span>

                          </div>                    <select              <h3 className="text-lg font-semibold text-gray-900 mb-4">

                        )}

                      </div>                      name="children"

                      <div className="flex items-center justify-between border-t pt-4">

                        <span className="text-lg font-semibold text-green-700">К доплате</span>                      value={formData.children}                Цена: {totalPrice.toLocaleString('ru')} ₽

                        <span className="text-3xl font-bold text-green-700">{totalPrice.toLocaleString('ru')} ₽</span>

                      </div>                      onChange={handleInputChange}

                      <p className="text-sm text-green-600 mt-2">

                        💳 Предоплата 30% • 💰 Доплата на месте                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"              </h3>

                      </p>

                    </div>                    >

                  </div>

                      {[0,1,2,3,4].map(num => (              <p className="text-gray-600">  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

                  <div className="border-t pt-6">

                    <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">                        <option key={num} value={num}>{num === 0 ? 'Нет детей' : `${num} чел.`}</option>

                      <Phone className="w-5 h-5 text-green-600" />

                      <div>                      ))}                Взрослые: {formData.adults} чел. × {pricing.adultPrice.toLocaleString('ru')} ₽<br/>

                        <p className="font-medium text-gray-900">Есть вопросы?</p>

                        <p>Telegram: @phuketGoo</p>                    </select>

                      </div>

                    </div>                  </div>                {formData.children > 0 && `Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽`}    const { name, value } = e.target;  // Цены - показываем сразу!✅ Клиент готов к бронированию!

                  </div>

                </div>                </div>

              </div>

            </div>                              </p>

          </div>

        </div>                <div className="grid md:grid-cols-2 gap-6">

      </div>

                        <div>            </div>    setFormData(prev => ({

      <Footer />

    </>                    <label className="block text-sm font-medium text-gray-700 mb-2">

  );

};                      Ваше имя (опционально)          </div>



export default PhiPhiReservation;                    </label>

                    <input        </div>      ...prev,  const pricing = {🚀 ПРИОРИТЕТНАЯ ЗАЯВКА - ответить быстро`;eft, Calendar, Users, MapPin, Phone, Mail, User, Clock, Star, CheckCircle } from 'lucide-react';

                      type="text"

                      name="name"      </div>

                      value={formData.name}

                      onChange={handleInputChange}            [name]: value

                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"

                      placeholder="Как к вам обращаться"      <Footer />

                    />

                  </div>    </>    }));    adultPrice: 4900,import { Link } from 'react-router-dom';

                  

                  <div>  );

                    <label className="block text-sm font-medium text-gray-700 mb-2">

                      Телефон (опционально)};  };

                    </label>

                    <input

                      type="tel"

                      name="phone"export default PhiPhiReservation;    childPrice: 3500import { Header } from '@/components/Header';

                      value={formData.phone}

                      onChange={handleInputChange}  const handleSubmit = (e: React.FormEvent) => {

                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"

                      placeholder="Для звонков"    e.preventDefault();  };import { Footer } from '@/components/Footer';

                    />

                  </div>    

                </div>

    const formatDate = (dateStr: string) => {

                <button

                  type="submit"      if (!dateStr) return 'Обсудим при связи';

                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl"

                >      const date = new Date(dateStr);  const [totalPrice, setTotalPrice] = useState(0);const PhiPhiReservation = () => {

                  <Phone className="w-5 h-5" />

                  <span>Отправить заявку в Telegram</span>      return date.toLocaleDateString('ru-RU', {

                </button>

                        day: 'numeric',  const [formData, setFormData] = useState({

                <p className="text-center text-sm text-gray-500">

                  📱 Откроется Telegram • ⚡ Ответим в течение 5 минут        month: 'long',

                </p>

              </form>        year: 'numeric'  // Автоматический расчет цены    name: '',

            </div>

          </div>      });

        </div>

      </div>    };  useEffect(() => {    phone: '',

      

      <Footer />

    </>

  );    // Готовая заявка с ценой!    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);    date: '',

};

    const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

export default PhiPhiReservation;
    setTotalPrice(total);    adults: 2,

🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)

📅 ДАТА: ${formatDate(formData.date)}  }, [formData.adults, formData.children]);    children: 0



👥 УЧАСТНИКИ:  });

• Взрослые: ${formData.adults} чел. × ${pricing.adultPrice.toLocaleString('ru')} ₽ = ${(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽

${formData.children > 0 ? `• Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽ = ${(formData.children * pricing.childPrice).toLocaleString('ru')} ₽` : ''}  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {



💰 ИТОГО: ${totalPrice.toLocaleString('ru')} ₽    const { name, value } = e.target;  // Цены (как маркетолог - показываем цену сразу!)



${formData.name ? `👤 ИМЯ: ${formData.name}` : '👤 ИМЯ: не указано'}    setFormData(prev => ({  const pricing = {

${formData.phone ? `📞 ТЕЛЕФОН: ${formData.phone}` : '📞 ТЕЛЕФОН: свяжется в Telegram'}

      ...prev,    adultPrice: 4900, // цена за взрослого

✅ Клиент готов к бронированию!

🚀 ПРИОРИТЕТНАЯ ЗАЯВКА - ответить быстро`;      [name]: value    childPrice: 3500  // цена за ребенка



    const encodedMessage = encodeURIComponent(message);    }));  };

    const telegramUrl = `https://t.me/phuketGoo?text=${encodedMessage}`;

      };

    // Открыть Telegram

    window.open(telegramUrl, '_blank');  const [totalPrice, setTotalPrice] = useState(0);

    

    // Показать подтверждение  const handleSubmit = (e: React.FormEvent) => {

    alert('✅ Заявка отправлена в Telegram!\n\nМы ответим в течение 5 минут.');

  };    e.preventDefault();  // Автоматический расчет цены при изменении количества



  return (      useEffect(() => {

    <>

      <Header />    const formatDate = (dateStr: string) => {    const total = (formData.adults * pricing.adultPrice) + (formData.children * pricing.childPrice);

      

      <div className="min-h-screen bg-gray-50 pt-16">      if (!dateStr) return 'Обсудим при связи';    setTotalPrice(total);

        {/* Кнопка назад */}

        <div className="bg-white border-b">      const date = new Date(dateStr);  }, [formData.adults, formData.children]);

          <div className="max-w-7xl mx-auto px-4 py-4">

            <Link       return date.toLocaleDateString('ru-RU', {

              to="/excursion/phi-phi-2-days-1-night"

              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"        day: 'numeric',  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

            >

              <ArrowLeft className="w-4 h-4 mr-2" />        month: 'long',    const { name, value } = e.target;

              Назад к туру

            </Link>        year: 'numeric'    setFormData(prev => ({

          </div>

        </div>      });      ...prev,



        {/* Заголовок */}    };      [name]: value

        <div className="bg-white">

          <div className="max-w-7xl mx-auto px-4 py-6">    }));

            <div className="flex items-start space-x-4">

              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">    // Готовая заявка с ценой!  };

                <MapPin className="w-10 h-10 text-white" />

              </div>    const message = `🏝️ НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ

              <div className="flex-1">

                <h1 className="text-3xl font-bold text-gray-900 mb-2">  const handleSubmit = (e: React.FormEvent) => {

                  Пхи-Пхи 2 дня / 1 ночь

                </h1>🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)    e.preventDefault();

                <p className="text-lg text-gray-600">Стандартная программа</p>

              </div>📅 ДАТА: ${formatDate(formData.date)}    

            </div>

          </div>    const formatDate = (dateStr: string) => {

        </div>

👥 УЧАСТНИКИ:      if (!dateStr) return 'Обсудим при связи';

        <div className="max-w-7xl mx-auto px-4 py-8">

          <div className="grid lg:grid-cols-3 gap-8">• Взрослые: ${formData.adults} чел. × ${pricing.adultPrice.toLocaleString('ru')} ₽ = ${(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽      const date = new Date(dateStr);

            

            {/* Форма - МИНИМУМ ПОЛЕЙ */}${formData.children > 0 ? `• Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽ = ${(formData.children * pricing.childPrice).toLocaleString('ru')} ₽` : ''}      return date.toLocaleDateString('ru-RU', {

            <div className="lg:col-span-2">

              <div className="bg-white rounded-2xl shadow-sm border p-8">        day: 'numeric',

                <h2 className="text-2xl font-bold mb-8 text-gray-900">

                  Быстрое бронирование💰 ИТОГО: ${totalPrice.toLocaleString('ru')} ₽        month: 'long',

                </h2>

        year: 'numeric'

                <form onSubmit={handleSubmit} className="space-y-8">

                  ${formData.name ? `👤 ИМЯ: ${formData.name}` : '👤 ИМЯ: не указано'}      });

                  {/* Участники тура */}

                  <div>${formData.phone ? `📞 ТЕЛЕФОН: ${formData.phone}` : '📞 ТЕЛЕФОН: свяжется в Telegram'}    };

                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">

                      <Users className="w-5 h-5 mr-2 text-green-600" />

                      Сколько человек едет?

                    </h3>✅ Клиент готов к бронированию!    // Маркетинговый подход - готовая заявка с ценой!

                    <div className="grid md:grid-cols-2 gap-6">

                      <div>🚀 ПРИОРИТЕТНАЯ ЗАЯВКА - ответить быстро`;    const message = `🏝️ ЗАЯВКА НА БРОНИРОВАНИЕ

                        <label className="block text-sm font-medium text-gray-700 mb-3">

                          Взрослые

                        </label>

                        <select    const encodedMessage = encodeURIComponent(message);🎯 ТУР: Пхи-Пхи 2 дня/1 ночь (Стандарт)

                          name="adults"

                          value={formData.adults}    const telegramUrl = `https://t.me/phuketGoo?text=${encodedMessage}`;📅 ДАТА: ${formatDate(formData.date)}

                          onChange={handleInputChange}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"    

                        >

                          {[1,2,3,4,5,6,7,8,9,10].map(num => (    // Открыть Telegram👥 УЧАСТНИКИ:

                            <option key={num} value={num}>{num} чел.</option>

                          ))}    window.open(telegramUrl, '_blank');• Взрослые: ${formData.adults} чел. × ${pricing.adultPrice.toLocaleString('ru')} ₽ = ${(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽

                        </select>

                      </div>    ${formData.children > 0 ? `• Дети: ${formData.children} чел. × ${pricing.childPrice.toLocaleString('ru')} ₽ = ${(formData.children * pricing.childPrice).toLocaleString('ru')} ₽` : ''}

                      <div>

                        <label className="block text-sm font-medium text-gray-700 mb-3">    // Показать подтверждение

                          Дети (до 12 лет)

                        </label>    alert('✅ Заявка отправлена в Telegram!\n\nМы ответим в течение 5 минут.');💰 ИТОГО: ${totalPrice.toLocaleString('ru')} ₽

                        <select

                          name="children"  };

                          value={formData.children}

                          onChange={handleInputChange}👤 КОНТАКТ: ${formData.name}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                        >  return (� ТЕЛЕФОН: ${formData.phone}

                          {[0,1,2,3,4,5].map(num => (

                            <option key={num} value={num}>{num === 0 ? 'Нет детей' : `${num} чел.`}</option>    <>

                          ))}

                        </select>      <Header />✅ Клиент готов к бронированию!

                      </div>

                    </div>      🚀 Обработать заявку в приоритете`;

                  </div>

      <div className="min-h-screen bg-gray-50 pt-16">

                  {/* Дата и контакты - ОПЦИОНАЛЬНО */}

                  <div>        {/* Кнопка назад */}    const encodedMessage = encodeURIComponent(message);

                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">

                      <Calendar className="w-5 h-5 mr-2 text-green-600" />        <div className="bg-white border-b">    window.open(`https://t.me/phuketGoo?text=${encodedMessage}`, '_blank');

                      Дополнительно (можно не заполнять)

                    </h3>          <div className="max-w-7xl mx-auto px-4 py-4">  };

                    <div className="grid md:grid-cols-3 gap-6">

                      <div>            <Link 

                        <label className="block text-sm font-medium text-gray-700 mb-3">

                          Желаемая дата              to="/excursion/phi-phi-2-days-1-night"  return (

                        </label>

                        <input              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"    <>

                          type="date"

                          name="date"            >      <Header />

                          value={formData.date}

                          onChange={handleInputChange}              <ArrowLeft className="w-4 h-4 mr-2" />      

                          min={new Date().toISOString().split('T')[0]}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"              Назад к туру      <div className="min-h-screen bg-gray-50 pt-16">

                        />

                      </div>            </Link>        {/* Breadcrumb и кнопка назад */}

                      <div>

                        <label className="block text-sm font-medium text-gray-700 mb-3">          </div>        <div className="bg-white border-b">

                          Ваше имя

                        </label>        </div>          <div className="max-w-7xl mx-auto px-4 py-4">

                        <input

                          type="text"            <div className="flex items-center justify-between">

                          name="name"

                          value={formData.name}        {/* Заголовок */}              <Link 

                          onChange={handleInputChange}

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"        <div className="bg-white">                to="/excursion/phi-phi-2-days-1-night"

                          placeholder="Не обязательно"

                        />          <div className="max-w-7xl mx-auto px-4 py-6">                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"

                      </div>

                      <div>            <div className="flex items-start space-x-4">              >

                        <label className="block text-sm font-medium text-gray-700 mb-3">

                          Телефон              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">                <ArrowLeft className="w-4 h-4 mr-2" />

                        </label>

                        <input                <MapPin className="w-10 h-10 text-white" />                Назад к туру

                          type="tel"

                          name="phone"              </div>              </Link>

                          value={formData.phone}

                          onChange={handleInputChange}              <div className="flex-1">              

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                          placeholder="Не обязательно"                <h1 className="text-3xl font-bold text-gray-900 mb-2">              <nav className="text-sm text-gray-500">

                        />

                      </div>                  Пхи-Пхи 2 дня / 1 ночь                <div className="flex items-center space-x-2">

                    </div>

                  </div>                </h1>                  <Link to="/" className="hover:text-green-600">Главная</Link>



                  {/* Что включено */}                <p className="text-lg text-gray-600">Стандартная программа</p>                  <span>›</span>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">

                    <h4 className="font-semibold text-green-800 mb-4 flex items-center">              </div>                  <Link to="/tours" className="hover:text-green-600">Туры</Link>

                      <CheckCircle className="w-5 h-5 mr-2" />

                      Все уже включено в стоимость:            </div>                  <span>›</span>

                    </h4>

                    <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">          </div>                  <span className="text-gray-900">Бронирование</span>

                      <div>✓ Трансфер туда-обратно</div>

                      <div>✓ Проживание в бунгало</div>        </div>                </div>

                      <div>✓ Лодка + бензин</div>

                      <div>✓ Завтрак, обед, ужин</div>              </nav>

                      <div>✓ Экскурсионная программа</div>

                      <div>✓ Снаряжение для снорклинга</div>        <div className="max-w-7xl mx-auto px-4 py-8">            </div>

                      <div>✓ Русскоговорящий гид</div>

                      <div>✓ Страховка</div>          <div className="grid lg:grid-cols-3 gap-8">          </div>

                    </div>

                  </div>                    </div>



                  <button            {/* Форма - МИНИМУМ ПОЛЕЙ */}

                    type="submit"

                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"            <div className="lg:col-span-2">        {/* Заголовок тура */}

                  >

                    <Phone className="w-6 h-6" />              <div className="bg-white rounded-2xl shadow-sm border p-8">        <div className="bg-white">

                    <span>Забронировать за {totalPrice.toLocaleString('ru')} ₽</span>

                  </button>                <h2 className="text-2xl font-bold mb-8 text-gray-900">          <div className="max-w-7xl mx-auto px-4 py-6">

                  

                  <p className="text-center text-sm text-gray-500">                  Быстрое бронирование            <div className="flex items-start space-x-4">

                    📱 Заявка отправится в Telegram • ⚡ Ответим в течение 5 минут

                  </p>                </h2>              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">

                  

                </form>                <MapPin className="w-10 h-10 text-white" />

              </div>

            </div>                <form onSubmit={handleSubmit} className="space-y-8">              </div>



            {/* Сводка заказа */}                                <div className="flex-1">

            <div className="lg:col-span-1">

              <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-8">                  {/* Участники тура */}                <h1 className="text-3xl font-bold text-gray-900 mb-2">

                <h3 className="text-xl font-bold text-gray-900 mb-6">Ваш заказ</h3>

                                  <div>                  Пхи-Пхи 2 дня / 1 ночь

                <div className="space-y-6">

                  <div className="flex justify-between items-start">                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">                </h1>

                    <div>

                      <p className="text-lg font-semibold text-gray-900">Пхи-Пхи 2 дня / 1 ночь</p>                      <Users className="w-5 h-5 mr-2 text-green-600" />                <p className="text-lg text-gray-600 mb-3">Стандартная программа</p>

                      <p className="text-sm text-gray-600">Стандартная программа</p>

                    </div>                      Сколько человек едет?                <div className="flex items-center space-x-6 text-sm text-gray-500">

                  </div>

                    </h3>                  <div className="flex items-center">

                  <div className="border-t pt-6 space-y-4">

                    <div className="flex items-center justify-between text-gray-600">                    <div className="grid md:grid-cols-2 gap-6">                    <Clock className="w-4 h-4 mr-1" />

                      <div className="flex items-center">

                        <Users className="w-4 h-4 mr-2" />                      <div>                    <span>2 дня / 1 ночь</span>

                        <span>Взрослые:</span>

                      </div>                        <label className="block text-sm font-medium text-gray-700 mb-3">                  </div>

                      <span className="font-medium">{formData.adults} чел.</span>

                    </div>                          Взрослые                  <div className="flex items-center">

                    {formData.children > 0 && (

                      <div className="flex items-center justify-between text-gray-600">                        </label>                    <Users className="w-4 h-4 mr-1" />

                        <div className="flex items-center">

                          <Users className="w-4 h-4 mr-2" />                        <select                    <span>до 30 человек</span>

                          <span>Дети:</span>

                        </div>                          name="adults"                  </div>

                        <span className="font-medium">{formData.children} чел.</span>

                      </div>                          value={formData.adults}                  <div className="flex items-center">

                    )}

                    {formData.date && (                          onChange={handleInputChange}                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />

                      <div className="flex items-center justify-between text-gray-600">

                        <div className="flex items-center">                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"                    <span>4.8 (53 отзыва)</span>

                          <Calendar className="w-4 h-4 mr-2" />

                          <span>Дата:</span>                        >                  </div>

                        </div>

                        <span className="font-medium">{new Date(formData.date).toLocaleDateString('ru-RU')}</span>                          {[1,2,3,4,5,6,7,8,9,10].map(num => (                </div>

                      </div>

                    )}                            <option key={num} value={num}>{num} чел.</option>              </div>

                  </div>

                          ))}            </div>

                  <div className="border-t pt-6">

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">                        </select>          </div>

                      <div className="space-y-2 mb-4 text-sm">

                        <div className="flex justify-between">                      </div>        </div>

                          <span>Взрослые ({formData.adults} чел.)</span>

                          <span>{(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽</span>                      <div>

                        </div>

                        {formData.children > 0 && (                        <label className="block text-sm font-medium text-gray-700 mb-3">        <div className="max-w-7xl mx-auto px-4 py-8">

                          <div className="flex justify-between">

                            <span>Дети ({formData.children} чел.)</span>                          Дети (до 12 лет)          <div className="grid lg:grid-cols-3 gap-8">

                            <span>{(formData.children * pricing.childPrice).toLocaleString('ru')} ₽</span>

                          </div>                        </label>            

                        )}

                      </div>                        <select            {/* Основная форма */}

                      <div className="flex items-center justify-between border-t pt-4">

                        <span className="text-lg font-semibold text-green-700">К доплате</span>                          name="children"            <div className="lg:col-span-2 space-y-6">

                        <span className="text-3xl font-bold text-green-700">{totalPrice.toLocaleString('ru')} ₽</span>

                      </div>                          value={formData.children}              

                      <p className="text-sm text-green-600 mt-2">

                        💳 Предоплата 30% • 💰 Доплата на месте                          onChange={handleInputChange}              {/* Форма бронирования */}

                      </p>

                    </div>                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"              <div className="bg-white rounded-2xl shadow-sm border p-8">

                  </div>

                        >                <h2 className="text-2xl font-bold mb-8 text-gray-900">

                  <div className="border-t pt-6">

                    <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">                          {[0,1,2,3,4,5].map(num => (                  Форма бронирования

                      <Phone className="w-5 h-5 text-green-600" />

                      <div>                            <option key={num} value={num}>{num === 0 ? 'Нет детей' : `${num} чел.`}</option>                </h2>

                        <p className="font-medium text-gray-900">Есть вопросы?</p>

                        <p>Telegram: @phuketGoo</p>                          ))}

                      </div>

                    </div>                        </select>                <form onSubmit={handleSubmit} className="space-y-8">

                  </div>

                </div>                      </div>                  

              </div>

            </div>                    </div>                  {/* Контактная информация - ТОЛЬКО НЕОБХОДИМОЕ */}

          </div>

        </div>                  </div>                  <div>

      </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">

      <Footer />

    </>                  {/* Дата и контакты - ОПЦИОНАЛЬНО */}                      <User className="w-5 h-5 mr-2 text-green-600" />

  );

};                  <div>                      Ваши контакты



export default PhiPhiReservation;                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">                    </h3>

                      <Calendar className="w-5 h-5 mr-2 text-green-600" />                    <div className="grid md:grid-cols-2 gap-6">

                      Дополнительно (можно не заполнять)                      <div>

                    </h3>                        <label className="block text-sm font-medium text-gray-700 mb-3">

                    <div className="grid md:grid-cols-3 gap-6">                          Как вас зовут? (опционально)

                      <div>                        </label>

                        <label className="block text-sm font-medium text-gray-700 mb-3">                        <input

                          Желаемая дата                          type="text"

                        </label>                          name="name"

                        <input                          value={formData.name}

                          type="date"                          onChange={handleInputChange}

                          name="date"                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                          value={formData.date}                          placeholder="Ваше имя (можно не указывать)"

                          onChange={handleInputChange}                        />

                          min={new Date().toISOString().split('T')[0]}                      </div>

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"                      <div>

                        />                        <label className="block text-sm font-medium text-gray-700 mb-3">

                      </div>                          Телефон (опционально)

                      <div>                        </label>

                        <label className="block text-sm font-medium text-gray-700 mb-3">                        <input

                          Ваше имя                          type="tel"

                        </label>                          name="phone"

                        <input                          value={formData.phone}

                          type="text"                          onChange={handleInputChange}

                          name="name"                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                          value={formData.name}                          placeholder="Укажите, если хотите звонок"

                          onChange={handleInputChange}                        />

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"                      </div>

                          placeholder="Не обязательно"                    </div>

                        />                  </div>

                      </div>

                      <div>                  {/* Детали тура */}

                        <label className="block text-sm font-medium text-gray-700 mb-3">                  <div>

                          Телефон                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">

                        </label>                      <Calendar className="w-5 h-5 mr-2 text-green-600" />

                        <input                      Детали тура

                          type="tel"                    </h3>

                          name="phone"                    <div className="grid md:grid-cols-3 gap-6">

                          value={formData.phone}                      <div>

                          onChange={handleInputChange}                        <label className="block text-sm font-medium text-gray-700 mb-3">

                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"                          Желаемая дата (обсудим в Telegram)

                          placeholder="Не обязательно"                        </label>

                        />                        <input

                      </div>                          type="date"

                    </div>                          name="date"

                  </div>                          value={formData.date}

                          onChange={handleInputChange}

                  {/* Что включено */}                          min={new Date().toISOString().split('T')[0]}

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                    <h4 className="font-semibold text-green-800 mb-4 flex items-center">                        />

                      <CheckCircle className="w-5 h-5 mr-2" />                      </div>

                      Все уже включено в стоимость:                      <div>

                    </h4>                        <label className="block text-sm font-medium text-gray-700 mb-3">

                    <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">                          Взрослые

                      <div>✓ Трансфер туда-обратно</div>                        </label>

                      <div>✓ Проживание в бунгало</div>                        <select

                      <div>✓ Лодка + бензин</div>                          name="adults"

                      <div>✓ Завтрак, обед, ужин</div>                          value={formData.adults}

                      <div>✓ Экскурсионная программа</div>                          onChange={handleInputChange}

                      <div>✓ Снаряжение для снорклинга</div>                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                      <div>✓ Русскоговорящий гид</div>                        >

                      <div>✓ Страховка</div>                          {[1,2,3,4,5,6,7,8,9,10].map(num => (

                    </div>                            <option key={num} value={num}>{num} чел.</option>

                  </div>                          ))}

                        </select>

                  <button                      </div>

                    type="submit"                      <div>

                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"                        <label className="block text-sm font-medium text-gray-700 mb-3">

                  >                          Дети

                    <Phone className="w-6 h-6" />                        </label>

                    <span>Забронировать за {totalPrice.toLocaleString('ru')} ₽</span>                        <select

                  </button>                          name="children"

                                            value={formData.children}

                  <p className="text-center text-sm text-gray-500">                          onChange={handleInputChange}

                    📱 Заявка отправится в Telegram • ⚡ Ответим в течение 5 минут                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"

                  </p>                        >

                                            {[0,1,2,3,4,5].map(num => (

                </form>                            <option key={num} value={num}>{num === 0 ? 'Нет детей' : `${num} чел.`}</option>

              </div>                          ))}

            </div>                        </select>

                      </div>

            {/* Сводка заказа */}                    </div>

            <div className="lg:col-span-1">                  </div>

              <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-8">

                <h3 className="text-xl font-bold text-gray-900 mb-6">Ваш заказ</h3>                  {/* Маркетинговое преимущество - показываем что включено */}

                                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">

                <div className="space-y-6">                    <h4 className="font-semibold text-green-800 mb-4 flex items-center">

                  <div className="flex justify-between items-start">                      <CheckCircle className="w-5 h-5 mr-2" />

                    <div>                      Все уже включено в стоимость:

                      <p className="text-lg font-semibold text-gray-900">Пхи-Пхи 2 дня / 1 ночь</p>                    </h4>

                      <p className="text-sm text-gray-600">Стандартная программа</p>                    <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">

                    </div>                      <div>✓ Трансфер туда-обратно</div>

                  </div>                      <div>✓ Проживание в бунгало</div>

                      <div>✓ Лодка + бензин</div>

                  <div className="border-t pt-6 space-y-4">                      <div>✓ Завтрак, обед, ужин</div>

                    <div className="flex items-center justify-between text-gray-600">                      <div>✓ Экскурсионная программа</div>

                      <div className="flex items-center">                      <div>✓ Снаряжение для снорклинга</div>

                        <Users className="w-4 h-4 mr-2" />                      <div>✓ Русскоговорящий гид</div>

                        <span>Взрослые:</span>                      <div>✓ Страховка</div>

                      </div>                    </div>

                      <span className="font-medium">{formData.adults} чел.</span>                  </div>

                    </div>

                    {formData.children > 0 && (                  <button

                      <div className="flex items-center justify-between text-gray-600">                    type="submit"

                        <div className="flex items-center">                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"

                          <Users className="w-4 h-4 mr-2" />                  >

                          <span>Дети:</span>                    <Phone className="w-6 h-6" />

                        </div>                    <span>

                        <span className="font-medium">{formData.children} чел.</span>                      Забронировать за {totalPrice.toLocaleString('ru')} ₽

                      </div>                    </span>

                    )}                  </button>

                    {formData.date && (                  

                      <div className="flex items-center justify-between text-gray-600">                  <p className="text-center text-sm text-gray-500 mt-4">

                        <div className="flex items-center">                    📱 Заявка отправится в Telegram • ⚡ Ответим в течение 5 минут

                          <Calendar className="w-4 h-4 mr-2" />                  </p>

                          <span>Дата:</span>                  

                        </div>                </form>

                        <span className="font-medium">{new Date(formData.date).toLocaleDateString('ru-RU')}</span>              </div>

                      </div>            </div>

                    )}

                  </div>            {/* Сводка заказа */}

            <div className="lg:col-span-1">

                  <div className="border-t pt-6">              <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-8">

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">                <h3 className="text-xl font-bold text-gray-900 mb-6">Сводка заказа</h3>

                      <div className="space-y-2 mb-4 text-sm">                

                        <div className="flex justify-between">                <div className="space-y-6">

                          <span>Взрослые ({formData.adults} чел.)</span>                  <div className="flex justify-between items-start">

                          <span>{(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽</span>                    <div>

                        </div>                      <p className="text-lg font-semibold text-gray-900">Пхи-Пхи 2 дня / 1 ночь</p>

                        {formData.children > 0 && (                      <p className="text-sm text-gray-600">Стандартная программа</p>

                          <div className="flex justify-between">                    </div>

                            <span>Дети ({formData.children} чел.)</span>                  </div>

                            <span>{(formData.children * pricing.childPrice).toLocaleString('ru')} ₽</span>

                          </div>                  <div className="border-t pt-6 space-y-4">

                        )}                    <div className="flex items-center justify-between text-gray-600">

                      </div>                      <div className="flex items-center">

                      <div className="flex items-center justify-between border-t pt-4">                        <Users className="w-4 h-4 mr-2" />

                        <span className="text-lg font-semibold text-green-700">К доплате</span>                        <span>Взрослые:</span>

                        <span className="text-3xl font-bold text-green-700">{totalPrice.toLocaleString('ru')} ₽</span>                      </div>

                      </div>                      <span className="font-medium">{formData.adults} чел.</span>

                      <p className="text-sm text-green-600 mt-2">                    </div>

                        💳 Предоплата 30% • 💰 Доплата на месте                    {formData.children > 0 && (

                      </p>                      <div className="flex items-center justify-between text-gray-600">

                    </div>                        <div className="flex items-center">

                  </div>                          <Users className="w-4 h-4 mr-2" />

                          <span>Дети:</span>

                  <div className="border-t pt-6">                        </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">                        <span className="font-medium">{formData.children} чел.</span>

                      <Phone className="w-5 h-5 text-green-600" />                      </div>

                      <div>                    )}

                        <p className="font-medium text-gray-900">Есть вопросы?</p>                    {formData.date && (

                        <p>Telegram: @phuketGoo</p>                      <div className="flex items-center justify-between text-gray-600">

                      </div>                        <div className="flex items-center">

                    </div>                          <Calendar className="w-4 h-4 mr-2" />

                  </div>                          <span>Дата:</span>

                </div>                        </div>

              </div>                        <span className="font-medium">{new Date(formData.date).toLocaleDateString('ru-RU')}</span>

            </div>                      </div>

          </div>                    )}

        </div>                  </div>

      </div>

                        <div className="border-t pt-6">

      <Footer />                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">

    </>                      {formData.adults > 0 && (

  );                        <div className="space-y-2 mb-4 text-sm">

};                          <div className="flex justify-between">

                            <span>Взрослые ({formData.adults} чел.)</span>

export default PhiPhiReservation;                            <span>{(formData.adults * pricing.adultPrice).toLocaleString('ru')} ₽</span>
                          </div>
                          {formData.children > 0 && (
                            <div className="flex justify-between">
                              <span>Дети ({formData.children} чел.)</span>
                              <span>{(formData.children * pricing.childPrice).toLocaleString('ru')} ₽</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-lg font-semibold text-green-700">Итого к доплате</span>
                        <span className="text-3xl font-bold text-green-700">{totalPrice.toLocaleString('ru')} ₽</span>
                      </div>
                      <p className="text-sm text-green-600 mt-2">
                        💳 Предоплата 30% • 💰 Доплата на месте
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Что включено:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Трансфер из отеля и обратно
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Лодка туда и обратно
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Размещение в бунгало
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        3-разовое питание
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Экскурсионная программа
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Снаряжение для снорклинга
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Страховка
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Русскоговорящий гид
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Есть вопросы?</p>
                        <p>Telegram: @phuketGoo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PhiPhiReservation;
