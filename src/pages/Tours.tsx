import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, MapPin, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookingModal } from "@/components/BookingModal";
import { tours as newTours } from "@/data/tours";
import type { Tour, TourCategory } from "@/types/tour";

const Tours = () => {
  const [filteredTours, setFilteredTours] = useState<Tour[]>(newTours);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  // Строим список категорий на основе реально присутствующих в данных
  const availableCategories = useMemo(() => {
    const set = new Set<TourCategory>();
    newTours.forEach(t => t.categories.forEach(c => set.add(c)));
    return Array.from(set);
  }, []);

  const categoryLabelMap: Record<string, string> = {
    "island-hopping": "Островные туры",
    "beach-tours": "Пляжи и острова",
    "adventure": "Приключения",
    "overnight": "С ночёвкой",
    "day-trip": "Однодневные",
    "city-tours": "Городские",
    "cultural": "Культура",
    "romantic": "Романтика",
    "family": "Семейные",
    "group": "Групповые",
  };

  const categories = [
    { value: "all", label: "Все туры" },
    ...availableCategories.map(c => ({ value: c, label: categoryLabelMap[c] || c }))
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

  const getBaseAdultPrice = (tour: Tour) => tour.pricing?.base?.adult ?? 0;
  const getRating = (tour: Tour) => tour.reviews?.averageRating ?? 4.8;

  const filterAndSortTours = (category: string, sort: string) => {
    let filtered = category === "all"
      ? [...newTours]
      : newTours.filter(tour => tour.categories.includes(category as TourCategory));

    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => getBaseAdultPrice(a) - getBaseAdultPrice(b));
        break;
      case "price-high":
        filtered.sort((a, b) => getBaseAdultPrice(b) - getBaseAdultPrice(a));
        break;
      case "rating":
        filtered.sort((a, b) => getRating(b) - getRating(a));
        break;
      default:
        // popularity - featured first
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    setFilteredTours(filtered);
  };

  // Инициализируем первоначальную сортировку и фильтр
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => filterAndSortTours(selectedCategory, sortBy), []);

  const formatPrice = (tour: Tour) => `${getBaseAdultPrice(tour).toLocaleString()} ฿`;
  const getMainImage = (tour: Tour) => tour.images?.find(i => i.category === 'hero')?.url || tour.images?.[0]?.url || "";
  const getDurationText = (tour: Tour) => {
    const d = tour.duration;
    if (!d || typeof d !== 'object') return "1 день";
    const days = d.days || 1;
    const nights = d.nights || 0;
    const dayWord = days === 1 ? "день" : days >= 2 && days <= 4 ? "дня" : "дней";
    const nightWord = nights === 1 ? "ночь" : nights >= 2 && nights <= 4 ? "ночи" : "ночей";
    return nights > 0 ? `${days} ${dayWord} / ${nights} ${nightWord}` : `${days} ${dayWord}`;
  };
  const getGroupSizeText = (tour: Tour) => tour.groupSize?.max ? `До ${tour.groupSize.max} чел.` : "Группа";
  const getLocationText = (tour: Tour) => tour.location?.region || tour.location?.island || "Пхукет";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Все туры на Пхукете
            </h1>
            <p className="text-xl text-gray-600">
              Выберите идеальный тур для незабываемого отдыха
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <select 
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={getMainImage(tour)}
                    alt={tour.title}
                    className="w-full h-48 object-cover object-center"
                  />
                  {tour.featured && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      Рекомендуем
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{getRating(tour).toFixed(1)}</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{tour.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{getLocationText(tour)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{getDurationText(tour)}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{getGroupSizeText(tour)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{tour.availability?.daysOfWeek?.length === 7 ? "Ежедневно" : "По расписанию"}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{formatPrice(tour)}</div>
                      <div className="text-sm text-gray-500">{tour.reviews?.totalReviews ?? 0} отзывов</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm">Что входит:</h4>
                    <ul className="text-sm text-gray-600">
                      {(tour.included || []).slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/tours/${tour.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Подробнее
                      </Button>
                    </Link>
                    <BookingModal tourTitle={tour.title} tourPrice={formatPrice(tour)}>
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                        Забронировать
                      </Button>
                    </BookingModal>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tours;