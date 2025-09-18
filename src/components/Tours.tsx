import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { phiPhiTourData } from "@/data/phiPhiTour";

export const Tours = () => {
  // Получаем популярные туры из ЕДИНОГО источника данных
  const popularTours = [phiPhiTourData].filter(tour => tour.isPopular);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Популярные туры</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите из нашей коллекции лучших экскурсий по островам Таиланда
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={tour.mainImage}
                  alt={tour.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {tour.groupSize}
                  </div>
                </div>

                {/* Ключевые особенности */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights?.map((highlight, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">
                    от {tour.priceAdult.toLocaleString()} {tour.currency}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={tour.route}>
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                    </Link>
                    
                    <Link to="/book/phi-phi-2days">
                      <Button size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Забронировать
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
