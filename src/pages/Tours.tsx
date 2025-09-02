import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookingModal } from "@/components/BookingModal";

const toursData = [
  {
    id: 1,
    title: "Симиланские острова",
    location: "Пхукет, Таиланд",
    duration: "10 часов",
    group: "До 40 человек",
    dates: "Ноябрь - Апрель",
    price: "5,750 ₽",
    originalPrice: "6,250 ₽",
    rating: 5.0,
    reviews: 147,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["9 островов", "Кристально чистая вода", "Белоснежные пляжи", "Снорклинг"],
    description: "Самая яркая и незабываемая экскурсия на Пхукете. Эти 9 островов собрали в себе всю первозданную красоту тропической природы.",
    featured: true,
    category: "beach"
  },
  {
    id: 2,
    title: "Острова Пхи-Пхи",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,750 ₽",
    originalPrice: "3,250 ₽",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Пляж Майя", "Бухты Samah и Pileh", "Остров обезьян", "Снорклинг"],
    description: "Экскурсия на знаменитые острова Пхи-Пхи с посещением пляжа Майя и красивых бухт.",
    featured: true,
    category: "beach"
  },
  {
    id: 3,
    title: "Остров Джеймса Бонда",
    location: "Пханг Нга, Таиланд",
    duration: "8 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "3,250 ₽",
    originalPrice: "3,750 ₽",
    rating: 4.9,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["7 островов", "Каноэ в пещерах", "Деревня на воде", "Знаменитые скалы"],
    description: "Экскурсия в залив Пханг Нга с посещением 7 островов и прогулкой по лагунам на каноэ.",
    featured: false,
    category: "beach"
  },
  {
    id: 4,
    title: "Остров Корал",
    location: "Пхукет, Таиланд",
    duration: "6 часов",
    group: "До 25 человек",
    dates: "Круглый год",
    price: "2,375 ₽",
    originalPrice: "2,875 ₽",
    rating: 4.9,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Коралловые рифы", "Снорклинг", "Белый песок", "Близко к Пхукету"],
    description: "Коралловый остров находится всего в 9 километрах от Пхукета. Здесь можно насладиться тишиной и уединением.",
    featured: false,
    category: "beach"
  },
  {
    id: 5,
    title: "Краби с Пхукета",
    location: "Краби, Таиланд",
    duration: "10 часов",
    group: "До 40 человек",
    dates: "Круглый год",
    price: "6,000 ₽",
    originalPrice: "6,500 ₽",
    rating: 4.7,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Храмы Краби", "Горячие источники", "Изумрудный бассейн", "Автобус с комфортом"],
    description: "Поездка на автобусе с Пхукета в город Краби и его окрестности. Посещение храмов и природных достопримечательностей.",
    featured: false,
    category: "city"
  },
  {
    id: 6,
    title: "Удивительная Пханг Нга",
    location: "Пханг Нга, Таиланд",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "3,750 ₽",
    originalPrice: "4,250 ₽",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Экзотические пещеры", "Мангровые леса", "Сталактиты", "Национальный парк"],
    description: "Удивительная и неизведанная Пханг Нга продемонстрирует вам все очарование экзотической природы.",
    featured: false,
    category: "adventure"
  },
  {
    id: 7,
    title: "Рафтинг на реке",
    location: "Пхукет, Таиланд",
    duration: "7 часов",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "2,500 ₽",
    originalPrice: "3,000 ₽",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Безопасный сплав", "Джунгли", "Водопады", "Адреналин"],
    description: "Увлекательный и абсолютно безопасный сплав по реке. Рафтинг проводится в соседней провинции среди тропических джунглей.",
    featured: false,
    category: "adventure"
  },
  {
    id: 8,
    title: "Дайвинг для начинающих",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 12 человек",
    dates: "Круглый год",
    price: "9,625 ₽",
    originalPrice: "10,125 ₽",
    rating: 4.6,
    reviews: 75,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Обучение дайвингу", "Подводный мир", "Инструктор", "Сертификат"],
    description: "Вы никогда не ныряли с аквалангом? Или даже не умеете плавать? У вас есть отличный шанс попробовать.",
    featured: false,
    category: "adventure"
  },
  {
    id: 9,
    title: "Морская рыбалка",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "3,500 ₽",
    originalPrice: "4,000 ₽",
    rating: 4.6,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Глубоководная рыбалка", "Свежий улов", "Приготовление рыбы", "Снасти включены"],
    description: "Очень популярная экскурсия на Пхукете среди российских туристов. Настоящая морская рыбалка в Андаманском море.",
    featured: false,
    category: "adventure"
  },
  {
    id: 10,
    title: "VIP тур на яхте",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "11,000 ₽",
    originalPrice: "12,000 ₽",
    rating: 4.8,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1540946485063-548550789012?auto=format&fit=crop&w=800&q=80",
    highlights: ["Катамаран", "Под парусами", "Премиум сервис", "Закаты на море"],
    description: "Морская прогулка на огромном катамаране. Вы проведете под парусами целый день наслаждаясь морем и пейзажами.",
    featured: false,
    category: "beach"
  },
  {
    id: 11,
    title: "Обзорная экскурсия по Пхукету",
    location: "Пхукет, Таиланд",
    duration: "5 часов",
    group: "До 25 человек",
    dates: "Круглый год",
    price: "1,750 ₽",
    originalPrice: "2,250 ₽",
    rating: 4.8,
    reviews: 115,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Большой Будда", "Храмы Пхукета", "Смотровые площадки", "Мыс Промтеп"],
    description: "Среди главных достопримечательностей Пхукета статуя Большого Будды, храмы и обзорные площадки с потрясающими видами.",
    featured: false,
    category: "city"
  },
  {
    id: 12,
    title: "Шоу Фэнтэзи",
    location: "Пхукет, Таиланд",
    duration: "4 часа",
    group: "До 50 человек",
    dates: "Круглый год",
    price: "3,875 ₽",
    originalPrice: "4,375 ₽",
    rating: 4.7,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Слоны в шоу", "Тайская культура", "Ужин-буфет", "Грандиозное представление"],
    description: "Самое популярное вечернее шоу на Пхукете. Грандиозный по своим масштабам проект с участием слонов и погружением в тайскую культуру.",
    featured: false,
    category: "show"
  },
  {
    id: 13,
    title: "Carnival Magic",
    location: "Пхукет, Таиланд",
    duration: "4 часа",
    group: "До 50 человек",
    dates: "Круглый год",
    price: "4,625 ₽",
    originalPrice: "5,125 ₽",
    rating: 5.0,
    reviews: 132,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["40 акров парка", "Карнавальное шоу", "Ослепительные краски", "Современные технологии"],
    description: "Жемчужина ночных развлечений, занимающая более 40 акров и наполненная ослепительными цветами и сверкающими огнями.",
    featured: true,
    category: "show"
  },
  {
    id: 14,
    title: "Сиам Нирамит",
    location: "Пхукет, Таиланд",
    duration: "4 часа",
    group: "До 45 человек",
    dates: "Круглый год",
    price: "3,825 ₽",
    originalPrice: "4,325 ₽",
    rating: 4.7,
    reviews: 103,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Культурное шоу", "История Таиланда", "Традиционные танцы", "Костюмы и декорации"],
    description: "После 7 успешных сезонов в Бангкоке, захватывающее шоу мирового уровня, удостоенное нескольких государственных наград.",
    featured: false,
    category: "show"
  },
  {
    id: 15,
    title: "Аквапарк Splash Jungle",
    location: "Пхукет, Таиланд",
    duration: "6 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "2,375 ₽",
    originalPrice: "2,875 ₽",
    rating: 4.9,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Водные горки", "Детская зона", "Ленивая река", "Семейный отдых"],
    description: "Первый аквапарк на Пхукете приглашает взрослых и детей провести свой отдых брызгаясь и плескаясь в бассейнах.",
    featured: false,
    category: "family"
  },
  {
    id: 16,
    title: "Аквапарк Andamanda",
    location: "Пхукет, Таиланд",
    duration: "6 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "4,000 ₽",
    originalPrice: "4,500 ₽",
    rating: 4.9,
    reviews: 130,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Тематические зоны", "Экстремальные горки", "Волновой бассейн", "Современный дизайн"],
    description: "Территория аквапарка поделена на несколько тематических зон, выполненных в разных стилях современного дизайна.",
    featured: false,
    category: "family"
  },
  {
    id: 17,
    title: "Полет гиббона",
    location: "Пхукет, Таиланд",
    duration: "5 часов",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "2,750 ₽",
    originalPrice: "3,250 ₽",
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Зип-лайн в джунглях", "Канатная дорога", "Адреналин", "Безопасность"],
    description: "Добавьте немного экстрима в размеренный пляжный отдых. Тем кому необходим адреналин в крови предлагается полет над джунглями.",
    featured: false,
    category: "adventure"
  },
  {
    id: 18,
    title: "Вейкбординг",
    location: "Пхукет, Таиланд",
    duration: "4 часа",
    group: "До 10 человек",
    dates: "Круглый год",
    price: "3,125 ₽",
    originalPrice: "3,625 ₽",
    rating: 4.9,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1540946485063-548550789012?auto=format&fit=crop&w=800&q=80",
    highlights: ["Cable Ski парк", "Обучение", "Активный отдых", "Для всех уровней"],
    description: "Соскучились по активному отдыху? Вейкпарк Phuket Cable Ski приглашает всех желающих от новичков до профи.",
    featured: false,
    category: "adventure"
  },
  {
    id: 19,
    title: "Флайборд",
    location: "Пхукет, Таиланд",
    duration: "2 часа",
    group: "До 8 человек",
    dates: "Круглый год",
    price: "5,000 ₽",
    originalPrice: "5,500 ₽",
    rating: 4.8,
    reviews: 17,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Полет над водой", "Новые ощущения", "Инструктор", "Фото и видео"],
    description: "На доске Flyboard вы можете осуществить свою мечту о полете над водой.",
    featured: false,
    category: "adventure"
  },
  {
    id: 20,
    title: "Suuko SPA",
    location: "Пхукет, Таиланд",
    duration: "3 часа",
    group: "До 12 человек",
    dates: "Круглый год",
    price: "3,250 ₽",
    originalPrice: "3,750 ₽",
    rating: 4.6,
    reviews: 26,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Тайский массаж", "Спа-ритуалы", "Релаксация", "Натуральные масла"],
    description: "Спа-процедуры совсем не похожи на привычные салоны красоты. Скорее, это красивые ритуалы целительства.",
    featured: false,
    category: "spa"
  },
  {
    id: 21,
    title: "Mookda SPA",
    location: "Пхукет, Таиланд",
    duration: "3 часа",
    group: "До 10 человек",
    dates: "Круглый год",
    price: "5,000 ₽",
    originalPrice: "5,500 ₽",
    rating: 4.7,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Премиум спа", "Авторские процедуры", "Ароматерапия", "VIP обслуживание"],
    description: "Спа-процедуры совсем не похожи на привычные салоны красоты. Скорее, это красивые ритуалы целительства высочайшего уровня.",
    featured: false,
    category: "spa"
  },
  {
    id: 22,
    title: "Oasis SPA",
    location: "Пхукет, Таиланд",
    duration: "3 часа",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "3,500 ₽",
    originalPrice: "4,000 ₽",
    rating: 4.6,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Традиционный массаж", "Горячие камни", "Травяные компрессы", "Медитация"],
    description: "Спа-процедуры совсем не похожи на привычные салоны красоты. Скорее, это красивые ритуалы целительства и восстановления энергии.",
    featured: false,
    category: "spa"
  }
];

const Tours = () => {
  const [filteredTours, setFilteredTours] = useState(toursData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const categories = [
    { value: "all", label: "Все туры" },
    { value: "beach", label: "Пляжи и острова" },
    { value: "adventure", label: "Приключения" },
    { value: "city", label: "Городские" },
    { value: "show", label: "Шоу" },
    { value: "family", label: "Семейные" },
    { value: "spa", label: "СПА и релакс" }
  ];

  const sortOptions = [
    { value: "popularity", label: "По популярности" },
    { value: "price-low", label: "Сначала дешевые" },
    { value: "price-high", label: "Сначала дорогие" },
    { value: "rating", label: "По рейтингу" }
  ];

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterAndSortTours(category, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    filterAndSortTours(selectedCategory, sort);
  };

  const filterAndSortTours = (category: string, sort: string) => {
    let filtered = category === "all" 
      ? toursData 
      : toursData.filter(tour => tour.category === category);

    // Sort tours
    switch (sort) {
      case "price-low":
        filtered = filtered.sort((a, b) => 
          parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''))
        );
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => 
          parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''))
        );
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // popularity
        filtered = filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredTours(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Все экскурсии на Пхукете
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите из 22 лучших экскурсий на Пхукете с реальными отзывами и проверенными ценами
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white rounded-2xl shadow-lg">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Категория</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryFilter(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="md:w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Сортировка</label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Найдено <span className="font-semibold text-blue-600">{filteredTours.length}</span> экскурсий
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Featured badge */}
                {tour.featured && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ХИТ ПРОДАЖ
                  </div>
                )}
                
                {/* Price */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-blue-600">{tour.price}</span>
                    {tour.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">{tour.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-800">{tour.rating}</span>
                    <span className="text-sm text-gray-600">({tour.reviews})</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {tour.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 mb-4 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{tour.location}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{tour.group}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{tour.dates}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-800">В тур входит:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <BookingModal tourTitle={tour.title} tourPrice={tour.price}>
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                      Забронировать
                    </Button>
                  </BookingModal>
                  
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => {
                      // Implement tour details modal or page navigation
                      console.log('View details for:', tour.title);
                    }}
                  >
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured tours section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Самые популярные экскурсии
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {toursData.filter(tour => tour.featured).map((tour) => (
              <div key={tour.id} className="text-center p-6 rounded-xl border border-blue-100 bg-blue-50">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{tour.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{tour.description}</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-sm text-gray-500">({tour.reviews} отзывов)</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{tour.price}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tours;