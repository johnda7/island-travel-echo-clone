# Шаблон данных тура (TourData)

Используйте этот шаблон для создания файла `src/data/<slug>Tour.ts`.

```ts
// src/data/<slug>Tour.ts
import type { TourData } from "@/types/Tour";
// Импортируйте изображения как модули (не строки путей)
import mainImage from "@/assets/<your-main-image>.jpg";
import img1 from "@/assets/<your-image-1>.jpg";
import img2 from "@/assets/<your-image-2>.jpg";

export const <camelCaseSlug>TourData: TourData = {
  id: "<slug>",                // совмещать с маршрутами и реестром
  title: "Название тура",
  subtitle: "Короткий подзаголовок тура",
  currency: "฿",
  priceAdult: 4000,
  priceChild: 3500,
  duration: "1 день",
  groupSize: "до 30 человек",
  rating: 4.9,
  reviewsCount: 52,
  mainImage,
  gallery: [mainImage, img1, img2],
  description: "Длинное описание тура...",
  highlights: [
    "Главная фишка 1",
    "Главная фишка 2",
    "Главная фишка 3"
  ],
  itinerary: [
    { day: "День 1", time: "08:00", activity: "Сбор гостей" },
    { day: "День 1", time: "10:00", activity: "Переезд/морская прогулка" },
  ],
  included: [
    "Трансфер",
    "Страховка",
    "Обед"
  ],
  excluded: [
    "Личные расходы",
    "Напитки"
  ],
  requirements: [
    "Купальник, полотенце",
    "Солнцезащитный крем"
  ],
  importantInfo: [
    "Возможны изменения по погоде"
  ],
  tags: ["морские", "популярные"],
  category: "islands",        // islands | mainland
  isPopular: true,
  isFeatured: false,
  isActive: true
};
```

Советы:
- Всегда используйте импорты изображений.
- Убедитесь, что `id` совпадает с путями маршрутов и `toursRegistry`.
- Цена для детей — 0, если нет детского тарифа.
