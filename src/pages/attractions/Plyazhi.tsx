import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { beaches } from "@/data/beaches";
import { MapPin, Star, Users, Camera, Waves, Search } from "lucide-react";

const Plyazhi: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popularity" | "rating" | "name">("popularity");

  // Get all unique tags from beaches
  const allTags = useMemo(() => {
    const tags = beaches.flatMap(beach => beach.tags);
    return ["all", ...Array.from(new Set(tags))];
  }, []);

  // Filter and sort beaches
  const filteredBeaches = useMemo(() => {
    let filtered = beaches;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(beach =>
        beach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beach.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beach.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tag
    if (selectedTag !== "all") {
      filtered = filtered.filter(beach => beach.tags.includes(selectedTag));
    }

    // Sort beaches
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0);
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedTag, sortBy]);

  // Top beaches for hero section
  const topBeaches = beaches.filter(beach => beach.popularity && beach.popularity >= 4).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Пляжи Пхукета — лучшие пляжи для отдыха, купания и спорта</title>
        <meta name="description" content="Все пляжи Пхукета: описание, фото, инфраструктура, советы, карта. Лучшие места для купания, релакса, водных видов спорта и фотосессий." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Пляжи Пхукета
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              На Пхукете более 20 пляжей: от шумных и тусовочных до уединённых и семейных. 
              Здесь вы найдёте пляжи для сёрфинга, романтики, активного отдыха и релакса. 
              Выберите свой идеальный пляж из нашего каталога.
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Waves className="w-4 h-4" />
                <span>{beaches.length} пляжей</span>
              </div>
              <div className="flex items-center gap-1">
                <Camera className="w-4 h-4" />
                <span>Фото и советы</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Карты и навигация</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Beaches Preview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Самые популярные пляжи</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {topBeaches.map((beach) => (
              <Card key={beach.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={beach.image} 
                    alt={beach.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{beach.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{beach.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{beach.description}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{beach.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {beach.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск пляжей по названию, описанию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "popularity" | "rating" | "name")}
                className="px-3 py-2 border rounded-md"
              >
                <option value="popularity">По популярности</option>
                <option value="rating">По рейтингу</option>
                <option value="name">По алфавиту</option>
              </select>
            </div>
            
            {/* Tag filters */}
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 12).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="text-xs"
                >
                  {tag === "all" ? "Все пляжи" : tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Beach Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeaches.map((beach) => (
              <Card key={beach.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                <div className="relative h-48">
                  <img 
                    src={beach.image} 
                    alt={beach.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{beach.rating}</span>
                  </div>
                  {beach.popularity && beach.popularity >= 4 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white">Популярный</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{beach.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{beach.description}</p>
                  
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{beach.location}</span>
                  </div>

                  {beach.info && (
                    <div className="text-xs text-gray-500 mb-3">
                      <div>Длина: {beach.info.length}</div>
                      <div>Песок: {beach.info.sand}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {beach.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {beach.services && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm mb-2">Услуги:</h4>
                      <div className="text-xs text-gray-600">
                        {beach.services.slice(0, 3).join(" • ")}
                        {beach.services.length > 3 && "..."}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBeaches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Пляжи не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Полезная информация</h2>
            
            <Tabs defaultValue="seasons" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="seasons">Сезоны</TabsTrigger>
                <TabsTrigger value="safety">Безопасность</TabsTrigger>
                <TabsTrigger value="transport">Транспорт</TabsTrigger>
                <TabsTrigger value="tips">Советы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="seasons" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Сезоны на пляжах Пхукета</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">🌞 Высокий сезон (ноябрь — апрель)</h4>
                        <p className="text-sm text-gray-600">Идеальная погода, спокойное море, лучшее время для купания и снорклинга.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">🌊 Низкий сезон (май — октябрь)</h4>
                        <p className="text-sm text-gray-600">Волны и дожди, но отличное время для сёрфинга. Меньше туристов, ниже цены.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Безопасность на пляжах</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Следите за цветом флагов: красный = купание запрещено</li>
                      <li>• Не заплывайте за буйки и избегайте зон гидроциклов</li>
                      <li>• Используйте солнцезащитный крем SPF 30+</li>
                      <li>• При сильных волнах купайтесь только на мелководье</li>
                      <li>• Остерегайтесь медуз в низкий сезон</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transport" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Как добраться</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium mb-2">🚗 Транспорт</h4>
                        <ul className="space-y-1">
                          <li>• Тук-тук: 100-300฿</li>
                          <li>• Такси/Grab: 150-500฿</li>
                          <li>• Аренда скутера: 200-300฿/день</li>
                          <li>• Местные автобусы: 20-50฿</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">🅿️ Парковка</h4>
                        <ul className="space-y-1">
                          <li>• Популярные пляжи: 20-100฿</li>
                          <li>• Уединённые пляжи: обычно бесплатно</li>
                          <li>• У отелей: для гостей бесплатно</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Полезные советы</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium">🕐 Время посещения</h4>
                        <p>Приходите утром (7-10) — меньше людей, чище вода, мягкий свет для фото.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">💰 Цены на услуги</h4>
                        <p>Лежаки: 100-200฿/день, SUP: 200-300฿/час, Каяки: 200-300฿/час.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">🎒 Что взять с собой</h4>
                        <p>Солнцезащитный крем, вода, полотенце, маска для снорклинга, водонепроницаемый чехол для телефона.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Plyazhi;
