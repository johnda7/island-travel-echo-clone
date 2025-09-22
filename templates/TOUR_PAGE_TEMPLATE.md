# Шаблон страницы тура (с универсальной модалкой)

Скопируйте этот шаблон в `src/pages/<PascalCase>.tsx`.

```tsx
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { <camelCaseSlug>TourData as excursion } from "@/data/<slug>Tour";

const <PascalCase> = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ...ваш контент, галерея, описание и т.д. */}

      {/* CTA / кнопки бронирования */}
      <div className="container mx-auto px-4">
        <Button
          onClick={() => setShowBookingModal(true)}
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
        >
          Забронировать
        </Button>
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

export default <PascalCase>;
```

Важно:
- Не используйте локальные калькуляторы. Только `UniversalBookingModal`.
- Модалку всегда оборачивайте в `ModalPortal`.
- Объект `excursion` должен соответствовать контракту `TourData` (см. шаблон данных).
