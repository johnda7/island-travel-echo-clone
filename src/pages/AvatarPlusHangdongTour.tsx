import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { avatarPlusHangdongTourData as excursion } from "@/data/avatarPlusHangdongTour";

const AvatarPlusHangdongTour = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{excursion.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{excursion.subtitle}</p>
          
          {/* Main image */}
          <div className="mb-8">
            <img 
              src={excursion.mainImage} 
              alt={excursion.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Price and booking button */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="text-3xl font-bold text-green-600 mb-4">
              {excursion.priceAdult} {excursion.currency} / взрослый
            </div>
            <div className="text-xl text-gray-600 mb-4">
              {excursion.priceChild} {excursion.currency} / ребенок
            </div>
            <Button
              onClick={() => setShowBookingModal(true)}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3"
            >
              Забронировать тур
            </Button>
          </div>

          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{excursion.duration}</div>
              <div className="text-gray-600">Продолжительность</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{excursion.groupSize}</div>
              <div className="text-gray-600">Размер группы</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{excursion.rating} ⭐</div>
              <div className="text-gray-600">{excursion.reviewsCount} отзывов</div>
            </div>
          </div>

          {/* Description */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold mb-4">О туре</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {excursion.description}
            </div>
          </div>

          {/* Highlights */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold mb-4">Основные моменты</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {excursion.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA button */}
          <div className="text-center">
            <Button
              onClick={() => setShowBookingModal(true)}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3"
            >
              Забронировать сейчас
            </Button>
          </div>
        </div>
      </div>

      {/* Модальное окно бронирования — ОБЯЗАТЕЛЬНО через портал */}
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