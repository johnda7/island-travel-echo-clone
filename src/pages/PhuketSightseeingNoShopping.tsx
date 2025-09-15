import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, Camera } from "lucide-react";
import { Helmet } from "react-helmet";

const PhuketSightseeingNoShopping = () => {
  // Контент адаптирован под типовой маршрут обзорной экскурсии без шопинга
  const excursion = {
    title: "Достопримечательности Пхукета (1 день)",
    subtitle: "Обзорная экскурсия без шопинга",
    price: "2,190",
    currency: "₽",
    duration: "8–9 часов",
    groupSize: "до 18 человек",
    rating: 4.9,
    reviewsCount: 168,
    mainImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Классическая обзорная экскурсия по Пхукету без посещения магазинов. Лучшие смотровые площадки, Большой Будда, храм Ват Чалонг, Старый город Пхукета и легендарный мыс Промтеп.",
    highlights: [
      "Смотровая площадка Карон (Karon Viewpoint)",
      "Статуя Большого Будды",
      "Храм Ват Чалонг",
      "Старый город Пхукета (Sino-Portuguese)",
      "Мыс Промтеп — лучший закат",
      "Обед в тайском ресторане",
    ],
    included: [
      "Трансфер от/до вашего отеля",
      "Русскоговорящий гид",
      "Обед в местном ресторане",
      "Страховка",
    ],
    notIncluded: [
      "Личные расходы",
      "Напитки во время обеда",
      "Входные билеты при индивидуальных запросах",
    ],
    schedule: [
      { time: "08:00", activity: "Сбор и трансфер из отеля" },
      { time: "09:00", activity: "Смотровая площадка Karon Viewpoint" },
      { time: "10:00", activity: "Большой Будда — панорамные виды" },
      { time: "11:30", activity: "Храм Ват Чалонг" },
      { time: "12:30", activity: "Обед в аутентичном ресторане" },
      { time: "14:00", activity: "Старый город Пхукета — прогулка и фото" },
      { time: "16:00", activity: "Мыс Промтеп — смотровая и закат (по времени)" },
      { time: "17:30", activity: "Возвращение в отель" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Достопримечательности Пхукета — обзорная экскурсия без шопинга | Phuket Go</title>
        <meta
          name="description"
          content="Классическая обзорная экскурсия по Пхукету без шопинга: Большой Будда, Ват Чалонг, смотровые площадки, Старый город и мыс Промтеп. Трансфер и гид включены."
        />
        <link
          rel="canonical"
          href="https://your-domain.example/excursion/dostoprimechatelnosti-phuketa-1-den-obzornaja-jekskursija-bez-shopinga"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Достопримечательности Пхукета — обзорная экскурсия без шопинга" />
        <meta property="og:description" content="Лучшие места Пхукета за 1 день. Без посещения магазинов." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4">
                <span className="text-blue-600 font-medium">Городские экскурсии • Пхукет</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">{excursion.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{excursion.subtitle}</p>

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
                <div className="text-3xl font-bold text-blue-600">
                  {excursion.price} {excursion.currency}
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
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
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Top spots</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
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

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Описание экскурсии</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{excursion.description}</p>

                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-blue-600" /> Что вас ждёт:
                  </h3>
                  <ul className="space-y-2">
                    {excursion.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{h}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" /> Программа тура
                  </h2>
                  <div className="space-y-4">
                    {excursion.schedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                      >
                        <div className="text-blue-600 font-semibold min-w-[80px]">{item.time}</div>
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
                      {excursion.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
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
                      {excursion.notIncluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
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
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
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

export default PhuketSightseeingNoShopping;
