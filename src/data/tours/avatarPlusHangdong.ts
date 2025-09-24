import type { TourData } from "@/types/Tour";

// Локальные изображения тура Avatar+ (Vite перепишет пути корректно для GitHub Pages)
import img1 from "@/assets/avatar-plus-hangdong/avatar-01.jpg";
import img2 from "@/assets/avatar-plus-hangdong/avatar-02.jpg";
import img3 from "@/assets/avatar-plus-hangdong/avatar-03.jpg";
import img4 from "@/assets/avatar-plus-hangdong/avatar-04.jpg";
import img5 from "@/assets/avatar-plus-hangdong/avatar-05.jpg";
import img6 from "@/assets/avatar-plus-hangdong/avatar-06.jpg";

export const avatarPlusHangdong: TourData = {
  id: "avatar-plus-hangdong-adventure",
  title: "Avatar+ Hangdong Adventure",
  subtitle: "Приключение в пещерах и джунглях",
  description:
    "Фото и описание будут уточнены по исходной странице. Цены поставлены временно для корректной работы бронирования.",
  route: "Пхукет — Хангдонг — пещеры — джунгли — Пхукет",

  // Базовые параметры цен (временно 0, потом обновим реальными)
  priceAdult: 0,
  priceChild: 0,
  currency: "฿",

  duration: "1 день",
  groupSize: "групповой тур",
  rating: 4.8,
  reviewsCount: 0,

  mainImage: img1,
  gallery: [img1, img2, img3, img4, img5, img6],

  highlights: [
    "Водяные пещеры и джунгли",
    "Прыжки в природные бассейны",
    "Атмосфера из мира ‘Аватар’",
  ],
  included: [],
  excluded: [],
  requirements: [],
  importantInfo: [],

  category: "adventure",
  tags: ["приключения", "пещеры", "джунгли"],
  isPopular: true,
};
