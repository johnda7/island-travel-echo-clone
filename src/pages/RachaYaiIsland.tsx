
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, Sun, Camera } from "lucide-react";

const RachaYaiIsland = () => {
  const excursion = {
    title: "Racha Yai Island",
    subtitle: "Остров Рача Яй",
    price: "2,290",
    currency: "₽",
    duration: "8 часов",
    groupSize: "до 25 человек",
    rating: 4.7,
    reviewsCount: 198,
    mainImage: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Откройте для себя райский остров Рача Яй с его белоснежными пляжами и кристально чистой водой! Идеальное место для релакса, снорклинга и наслаждения тропическим раем.",
    highlights: [
      "Белоснежные пляжи",
      "Кристально чистая вода",
      "Снорклинг",
      "Пляж Патак",
      "Пляж Ла",
      "Обед на пляже",
      "Релакс и загар",
      "Фотосессия"
    ],
    included: [
      "Трансфер от отеля",
      "Скоростная лодка",
      "Профессиональный гид",
      "Снорклинг оборудование",
      "Обед",
      "Фрукты и напитки",
      "Страховка",
      "Пляжные лежаки"
    ],
    notIncluded: [
      "Личные расходы",
      "Алкогольные напитки",
      "Массаж на пляже",
      "Сувениры"
    ],
    schedule: [
      { time: "08:00", activity: "Трансфер из отеля" },
      { time: "09:00", activity: "Отправление на лодке" },
      { time: "10:30", activity: "Прибытие на остров Рача Яй" },
      { time: "11:00", activity: "Пляж Патак - релакс" },
      { time: "12:30", activity: "Обед на пляже" },
      { time: "14:00", activity: "Снорклинг" },
      { time: "15:30", activity: "Пляж Ла - свободное время" },
      { time: "16:30", activity: "Возвращение" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4">
                <span className="text-teal-600 font-medium">Морские экскурсии • Релакс</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                {excursion.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {excursion.subtitle}
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{excursion.rating}</span>
                  <span className="text-gray-600">({excursion.reviewsCount} отзывов)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{excursion.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{excursion.groupSize}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-teal-600">
                  {excursion.price} {excursion.currency}
                </div>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8">
                  Забронировать
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={excursion.mainImage} 
                alt={excursion.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-2 rounded-lg flex items-center gap-2">
                <Sun className="w-5 h-5" />
                <span className="font-semibold">Райский остров</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            {excursion.gallery.map((image, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={`Галерея ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Описание экскурсии</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {excursion.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-teal-600" />
                    Что вас ждет:
                  </h3>
                  <ul className="space-y-2">
                    {excursion.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-teal-600" />
                    Программа тура
                  </h2>
                  <div className="space-y-4">
                    {excursion.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                        <div className="text-teal-600 font-semibold min-w-[80px]">
                          {item.time}
                        </div>
                        <div className="text-gray-700">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-600">Включено в стоимость</h3>
                    <ul className="space-y-2">
                      {excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Не включено</h3>
                    <ul className="space-y-2">
                      {excursion.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-teal-600 mb-2">
                      {excursion.price} {excursion.currency}
                    </div>
                    <div className="text-gray-600">за человека</div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>Продолжительность: {excursion.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span>Группа: {excursion.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>Ежедневно</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>Трансфер включен</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sun className="w-5 h-5 text-gray-400" />
                      <span>Релакс</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-4">
                    Забронировать сейчас
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Задать вопрос
                  </Button>
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

export default RachaYaiIsland;
