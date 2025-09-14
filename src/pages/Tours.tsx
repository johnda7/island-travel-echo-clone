import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookingModal } from "@/components/BookingModal";
import { toursData } from "@/data/tours";

const Tours = () => {
  const [filteredTours, setFilteredTours] = useState(toursData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const categories = [
    { value: "all", label: "Все туры" },
    { value: "marine", label: "Морские экскурсии" },
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
      default:
        // popularity - featured tours first
        filtered = filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    setFilteredTours(filtered);
  };

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
                    src={tour.image} 
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
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{tour.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{tour.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>До {tour.group} чел.</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{tour.dates}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{tour.price}</div>
                      <div className="text-sm text-gray-500">{tour.reviews} отзывов</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm">Что входит:</h4>
                    <ul className="text-sm text-gray-600">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Link 
                      to={`/tours/${tour.slug}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        Подробнее
                      </Button>
                    </Link>
                    <BookingModal 
                      tourTitle={tour.title}
                      tourPrice={tour.price}
                      triggerButton={
                        <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                          Забронировать
                        </Button>
                      }
                    />
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