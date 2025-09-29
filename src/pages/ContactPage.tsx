
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Контакты
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь 
              спланировать ваше идеальное путешествие.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Позвоните нам</h3>
                <p className="text-blue-600 font-semibold">+7 (495) 123-45-67</p>
                <p className="text-sm text-gray-500 mt-1">Пн-Пт: 9:00-20:00</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Напишите нам</h3>
                <p className="text-blue-600 font-semibold">info@tisland.travel</p>
                <p className="text-sm text-gray-500 mt-1">Ответим в течение часа</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">WhatsApp</h3>
                <p className="text-blue-600 font-semibold">+7 (968) 123-45-67</p>
                <p className="text-sm text-gray-500 mt-1">Онлайн круглосуточно</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Приходите к нам</h3>
                <p className="text-blue-600 font-semibold">Москва, Тверская 1</p>
                <p className="text-sm text-gray-500 mt-1">БЦ "Островский", 504</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <Contact />

      {/* Map Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Как нас найти</h2>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="bg-gray-300 h-96 rounded-2xl flex items-center justify-center">
                <p className="text-gray-600">Здесь будет интерактивная карта</p>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Наш офис
                  </h3>
                  <p className="text-gray-600 mb-2">БЦ "Островский"</p>
                  <p className="text-gray-600 mb-2">ул. Тверская, дом 1, офис 504</p>
                  <p className="text-gray-600">Москва, 125009</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Часы работы
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Понедельник - Пятница</span>
                      <span>9:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Суббота - Воскресенье</span>
                      <span>10:00 - 18:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Парковка</h3>
                  <p className="text-gray-600 text-sm">
                    Подземная парковка доступна для клиентов. 
                    Первые 2 часа бесплатно при оформлении тура.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
