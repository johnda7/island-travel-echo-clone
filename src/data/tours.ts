import { Tour } from "../types/tour";
import { phiPhi2Days1Night } from "./tours/phi-phi-2-days-1-night";
import phiPhiMayaBay from "../assets/phi-phi-maya-bay.jpg";

export const tours: Tour[] = [
  phiPhi2Days1Night,
];

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug);
};

export const getFeaturedTours = (): Tour[] => {
  return tours.filter(tour => tour.featured && tour.status === "active");
};

export interface LegacyTour {
  id: number;
  title: string;
  location: string;
  duration: string;
  group: string;
  dates: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  description: string;
  featured: boolean;
  category: string;
  slug: string;
  bookingsToday: number;
  popular?: boolean;
}

export const toursData: LegacyTour[] = [
  {
    id: 1,
    title: "Пхи-Пхи 2 дня / 1 ночь",
    location: "Острова Пхи-Пхи",
    duration: "2 дня",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "4,000 ฿ взр. / 3,500 ฿ дети",
    originalPrice: "4,500 ฿",
    rating: 4.8,
    reviews: 53,
    image: phiPhiMayaBay,
    highlights: ["Майя Бэй", "Ночь на острове", "Огненное шоу"],
    description: "Путешествие на острова Пхи-Пхи с ночёвкой — это уникальная возможность увидеть самые красивые места Андаманского моря.",
    featured: true,
    category: "marine",
    slug: "phi-phi-2-days-1-night",
    bookingsToday: 6,
    popular: true
  }
];

export const getPopularTours = (): LegacyTour[] => {
  return toursData.filter(tour => tour.popular);  
};

export const getLegacyTourBySlug = (slug: string): LegacyTour | undefined => {
  return toursData.find(tour => tour.slug === slug);
};
