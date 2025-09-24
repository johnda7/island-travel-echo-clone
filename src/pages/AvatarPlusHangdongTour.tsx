/**
 * 🚫 ЗАПРЕТ НА ОБМАН
 * Любые изменения должны быть РЕАЛЬНО выполнены через инструменты
 */

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Star, MapPin, Camera, Sun } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { avatarPlusHangdongTourData as excursion } from "@/data/avatarPlusHangdongTour";

const AvatarPlusHangdongTour = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const galleryImages = useMemo(() => {
    const unique = excursion.gallery.filter((image, index, arr) => arr.indexOf(image) === index);
    if (!unique.includes(excursion.mainImage)) {
      return [excursion.mainImage, ...unique];
    }
    return [excursion.mainImage, ...unique.filter((image) => image !== excursion.mainImage)];
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-green-600 mb-2">Сухопутная экскурсия</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{excursion.title}</h1>
              <p className="text-lg text-gray-600">{excursion.subtitle}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={galleryImages[0]}
                    alt={excursion.title}
                    className="h-[320px] w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-lg">
                    <Camera className="h-4 w-4 text-green-600" />
                    {excursion.gallery.length} фото
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {galleryImages.slice(1, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Аватар Тур ${index + 2}`}
                    className="h-36 w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <Clock className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Продолжительность</p>
                    <p className="text-lg font-semibold text-gray-900">{excursion.duration}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <Users className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Размер группы</p>
                    <p className="text-lg font-semibold text-gray-900">{excursion.groupSize}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <Star className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Оценка гостей</p>
                    <p className="text-lg font-semibold text-gray-900">{excursion.rating} из 5</p>
                    <p className="text-sm text-gray-500">{excursion.reviewsCount} отзывов</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <MapPin className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Локации</p>
                    <p className="text-lg font-semibold text-gray-900">Ma Doo Bua, Хангдонг, Натай</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <aside className="space-y-6">
            <Card className="sticky top-24 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Стоимость</p>
                  <div className="mt-1 text-3xl font-bold text-green-600">
                    {excursion.priceAdult.toLocaleString()} {excursion.currency}
                  </div>
                  <p className="text-sm text-gray-500">за взрослого • дети {excursion.priceChild.toLocaleString()} {excursion.currency}</p>
                </div>
                <Button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-700"
                >
                  Забронировать тур
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Связаться в Telegram
                </Button>
                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                  <p className="font-semibold">Почему гости выбирают этот тур</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-start gap-2">
                      <Sun className="mt-0.5 h-4 w-4" />
                      Фантастические виды Самет Нангши
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="mt-0.5 h-4 w-4" />
                      Премиальный комплекс термальных источников
                    </li>
                    <li className="flex items-start gap-2">
                      <Camera className="mt-0.5 h-4 w-4" />
                      Фото на гигантских кувшинках Ma Doo Bua
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Описание тура</h2>
          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">{excursion.description}</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Что вас ждёт</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {excursion.highlights.map((highlight, index) => (
              <Card key={index} className="border border-green-100">
                <CardContent className="flex gap-3 p-5">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-gray-700">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Программа по времени</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {excursion.itinerary.map((item, index) => (
              <Card key={`${item.time}-${index}`}>
                <CardContent className="space-y-2 p-5">
                  <div className="text-sm font-semibold text-green-600">{item.day}</div>
                  <div className="text-lg font-semibold text-gray-900">{item.time}</div>
                  <p className="text-gray-700 leading-relaxed">{item.activity}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-xl font-semibold text-gray-900">Включено в стоимость</h3>
              <ul className="space-y-3 text-gray-700">
                {excursion.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-xl font-semibold text-gray-900">Не входит</h3>
              <ul className="space-y-3 text-gray-700">
                {excursion.excluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gray-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-xl font-semibold text-gray-900">Что взять с собой</h3>
              <ul className="space-y-3 text-gray-700">
                {excursion.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-amber-50">
            <CardContent className="space-y-4 p-6">
              <h3 className="text-xl font-semibold text-amber-900">Важно знать</h3>
              <ul className="space-y-3 text-amber-900">
                {excursion.importantInfo.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white shadow-xl">
            <h2 className="text-2xl font-semibold">Готовы отправиться в Пандору наяву?</h2>
            <p className="mt-2 text-lg text-green-100">Забронируйте тур и насладитесь эксклюзивным маршрутом в сопровождении русскоговорящего гида.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={() => setShowBookingModal(true)}
                className="bg-white px-8 py-3 text-lg font-semibold text-green-700 hover:bg-green-50"
              >
                Забронировать тур
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Задать вопрос в Telegram
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ModalPortal>
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={excursion}
        />
      </ModalPortal>

      <Footer />
    </div>
  );
};

export default AvatarPlusHangdongTour;