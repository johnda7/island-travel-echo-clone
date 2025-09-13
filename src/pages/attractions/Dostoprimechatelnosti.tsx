import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Clock, Camera, Search, Eye, Mountain, Building2 } from "lucide-react";

interface Attraction {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  category: string;
  tags: string[];
  price: string;
  duration: string;
  highlights: string[];
  tips: string[];
  bestTime: string;
  transport: string;
}

const attractions: Attraction[] = [
  {
    id: "big-buddha",
    title: "Большой Будда (Big Buddha)",
    description: "45-метровая статуя белого Будды на вершине горы Наккерд — самая известная достопримечательность Пхукета с потрясающими видами на остров.",
    image: "https://images.unsplash.com/photo-1563492065-1a0eca7cdb7a?auto=format&fit=crop&w=800&q=80",
    location: "Гора Наккерд, южный Пхукет",
    rating: 4.7,
    category: "Храмы",
    tags: ["Храм", "Панорамные виды", "Фото", "Духовность"],
    price: "Бесплатно",
    duration: "1-2 часа",
    highlights: ["360° виды на Пхукет", "Белая мраморная статуя", "Храм и колокола"],
    tips: ["Приезжайте до заката", "Берите солнцезащитный крем", "Одевайтесь скромно"],
    bestTime: "16:00-18:00 (закат)",
    transport: "Такси, скутер, тук-тук"
  },
  {
    id: "wat-chalong",
    title: "Храм Ват Чалонг (Wat Chalong)",
    description: "Самый важный буддийский храм Пхукета, посвящённый почитаемым монахам Луанг По Чам и Луанг По Чуанг. Красивая архитектура и духовная атмосфера.",
    image: "https://images.unsplash.com/photo-1551715133-8b2fc6ecbd75?auto=format&fit=crop&w=800&q=80",
    location: "Район Чалонг, центральный Пхукет",
    rating: 4.6,
    category: "Храмы",
    tags: ["Храм", "Культура", "История", "Буддизм"],
    price: "Бесплатно",
    duration: "1-1.5 часа",
    highlights: ["Главный храм острова", "Золотые статуи", "Красивые фрески"],
    tips: ["Снимайте обувь при входе", "Одевайтесь закрыто", "Не поворачивайтесь спиной к Будде"],
    bestTime: "8:00-17:00",
    transport: "Любой транспорт, центральная локация"
  },
  {
    id: "karon-viewpoint",
    title: "Смотровая Карон (Karon Viewpoint)",
    description: "Одна из лучших смотровых площадок острова с видом на пляжи Карон, Ката и Ката Ной. Особенно красиво на закате.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    location: "Между пляжами Карон и Ната",
    rating: 4.8,
    category: "Смотровые площадки",
    tags: ["Виды", "Фото", "Закат", "Пляжи"],
    price: "Бесплатно",
    duration: "30-45 минут",
    highlights: ["Вид на три пляжа", "Лучшие закаты", "Кафе с видом"],
    tips: ["Лучшее время — закат", "Берите камеру", "Есть платная парковка"],
    bestTime: "17:30-19:00 (закат)",
    transport: "Скутер, такси, тук-тук"
  },
  {
    id: "old-town",
    title: "Старый город Пхукета (Old Phuket Town)",
    description: "Исторический центр с колониальной архитектурой, красочными домами, уличным искусством, кафе и музеями. Отражает богатое прошлое острова.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    location: "Пхукет-таун, центр острова",
    rating: 4.5,
    category: "История и культура",
    tags: ["История", "Архитектура", "Музеи", "Кафе", "Шоппинг"],
    price: "Бесплатно (музеи 100-200฿)",
    duration: "2-4 часа",
    highlights: ["Колониальная архитектура", "Уличное искусство", "Музеи и галереи"],
    tips: ["Удобная обувь для прогулок", "Воскресенье — пешеходная зона", "Много кафе для отдыха"],
    bestTime: "Утром или вечером (прохладнее)",
    transport: "Пешком по центру, автобус/такси из отелей"
  },
  {
    id: "promthep-cape",
    title: "Мыс Промтеп (Promthep Cape)",
    description: "Самая южная точка Пхукета с маяком и потрясающими закатами над Андаманским морем. Одно из самых романтичных мест острова.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    location: "Южная оконечность Пхукета",
    rating: 4.6,
    category: "Природные достопримечательности",
    tags: ["Закат", "Маяк", "Виды", "Романтика"],
    price: "Бесплатно",
    duration: "1-2 часа",
    highlights: ["Лучшие закаты Пхукета", "Исторический маяк", "Сувенирный рынок"],
    tips: ["Приезжайте за час до заката", "Парковка платная", "Много людей в сезон"],
    bestTime: "17:00-19:00 (закат)",
    transport: "Такси, скутер (30 мин от Равая)"
  },
  {
    id: "windmill-viewpoint",
    title: "Смотровая Ветряная мельница",
    description: "Живописная смотровая площадка возле пляжа Най Харн с ветряными турбинами и панорамными видами на южное побережье.",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
    location: "Возле пляжа Най Харн",
    rating: 4.4,
    category: "Смотровые площадки",
    tags: ["Виды", "Фото", "Ветряки", "Природа"],
    price: "Бесплатно",
    duration: "30-60 минут",
    highlights: ["Ветряные турбины", "Вид на Най Харн", "Менее людное место"],
    tips: ["Хорошо для утренних фото", "Ветрено на вершине", "Короткая прогулка от дороги"],
    bestTime: "8:00-10:00 или 16:00-18:00",
    transport: "Скутер, такси до Най Харна"
  },
  {
    id: "sino-portuguese",
    title: "Китайско-португальские особняки",
    description: "Исторические дома в центре Пхукет-тауна, отражающие уникальное культурное наследие острова. Красивая архитектура и музеи.",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
    location: "Улицы Краби, Талан, Дибук — Пхукет-таун",
    rating: 4.3,
    category: "История и культура",
    tags: ["Архитектура", "История", "Музеи", "Культура"],
    price: "Бесплатно (музеи 50-150฿)",
    duration: "1-2 часа",
    highlights: ["Уникальная архитектура", "Исторические музеи", "Кафе в старых домах"],
    tips: ["Совместите с прогулкой по Старому городу", "Некоторые дома-музеи", "Хорошо для фотографий"],
    bestTime: "9:00-17:00 (музеи открыты)",
    transport: "Пешком по Пхукет-тауну"
  },
  {
    id: "bang-rong-mangroves",
    title: "Мангровые леса Банг Ронг",
    description: "Уникальная экосистема мангровых лесов с экотропами, каякингом и наблюдением за птицами на северо-востоке острова.",
    image: "https://images.unsplash.com/photo-1534284780352-81c9cce6e7b1?auto=format&fit=crop&w=800&q=80",
    location: "Банг Ронг, северо-восток Пхукета",
    rating: 4.2,
    category: "Природные достопримечательности",
    tags: ["Природа", "Каякинг", "Экотуризм", "Птицы"],
    price: "200-500฿ (туры)",
    duration: "2-4 часа",
    highlights: ["Мангровые каналы", "Разнообразие птиц", "Экологические тропы"],
    tips: ["Берите репеллент от комаров", "Лучше с гидом", "Утром птиц больше"],
    bestTime: "Раннее утро (7:00-10:00)",
    transport: "Такси или тур из отеля"
  },
  {
    id: "sirinat-national-park",
    title: "Национальный парк Сиринат",
    description: "Природный парк на севере острова, включающий пляжи Най Янг и Май Кхао, мангровые леса и центр для посетителей.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    location: "Северное побережье Пхукета",
    rating: 4.5,
    category: "Природные достопримечательности",
    tags: ["Парк", "Пляжи", "Черепахи", "Природа"],
    price: "100฿ вход",
    duration: "3-6 часов",
    highlights: ["Нетронутые пляжи", "Гнездовья черепах", "Мангровые экотропы"],
    tips: ["Сезон черепах: ноябрь-февраль", "Берите воду и еду", "Есть центр для посетителей"],
    bestTime: "Ноябрь-апрель",
    transport: "Такси, аренда авто (близко к аэропорту)"
  },
  {
    id: "phuket-fantasea",
    title: "Phuket Fantasea",
    description: "Культурный тематический парк с театральными шоу, слонами, ужином и развлечениями, представляющий тайскую культуру и мифологию.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    location: "Пляж Камала",
    rating: 4.3,
    category: "Развлечения",
    tags: ["Шоу", "Культура", "Семейное", "Слоны"],
    price: "1800-2800฿",
    duration: "4-5 часов",
    highlights: ["Театральное шоу с животными", "Тайская культура", "Ужин-буфет"],
    tips: ["Бронируйте заранее", "Включает трансфер", "Не все дни недели"],
    bestTime: "Вечером (шоу начинается в 21:00)",
    transport: "Трансфер включен в билет"
  },
  {
    id: "weekend-market",
    title: "Уикенд маркет (Walking Street)",
    description: "Еженедельный пешеходный рынок в Старом городе с уличной едой, сувенирами, живой музыкой и атмосферой местного праздника.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    location: "Улица Талан, Пхукет-таун",
    rating: 4.6,
    category: "Рынки и шоппинг",
    tags: ["Рынок", "Еда", "Культура", "Сувениры"],
    price: "Бесплатный вход",
    duration: "2-3 часа",
    highlights: ["Местная уличная еда", "Ремесленные изделия", "Живая музыка"],
    tips: ["Только по воскресеньям", "Берите наличные", "Приходите голодными"],
    bestTime: "Воскресенье 16:00-21:00",
    transport: "Тук-тук, такси до Пхукет-тауна"
  },
  {
    id: "phuket-mining-museum",
    title: "Музей горнодобычи Пхукета",
    description: "Интерактивный музей, рассказывающий об истории добычи олова на Пхукете — основе богатства острова в прошлом.",
    image: "https://images.unsplash.com/photo-1572863759582-998ce7e04d90?auto=format&fit=crop&w=800&q=80",
    location: "Район Катху, центральный Пхукет",
    rating: 4.1,
    category: "Музеи",
    tags: ["Музей", "История", "Образование", "Интерактив"],
    price: "90฿ взрослые, 50฿ дети",
    duration: "1.5-2 часа",
    highlights: ["История добычи олова", "Интерактивные экспозиции", "Старые карты и фото"],
    tips: ["Есть кондиционер", "Подходит для детей", "Аудиогид доступен"],
    bestTime: "10:00-17:00 (часы работы)",
    transport: "Такси, тук-тук из любой точки"
  }
];

const categories = [
  "Все категории",
  "Храмы", 
  "Смотровые площадки",
  "История и культура",
  "Природные достопримечательности", 
  "Развлечения",
  "Рынки и шоппинг",
  "Музеи"
];

const Dostoprimechatelnosti: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "category">("rating");

  // Filter and sort attractions
  const filteredAttractions = useMemo(() => {
    let filtered = attractions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(attraction =>
        attraction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "Все категории") {
      filtered = filtered.filter(attraction => attraction.category === selectedCategory);
    }

    // Sort attractions
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const topAttractions = attractions.filter(attraction => attraction.rating >= 4.5).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Достопримечательности Пхукета — что посмотреть, лучшие места</title>
        <meta name="description" content="Храмы, смотровые площадки, исторические здания, природные чудеса, музеи, рынки, парки и другие достопримечательности Пхукета." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Достопримечательности Пхукета
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Пхукет богат на интересные места: храмы, смотровые площадки, исторические здания, 
              природные чудеса, музеи, рынки, парки и многое другое. Откройте для себя лучшие 
              достопримечательности острова!
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{attractions.length} мест</span>
              </div>
              <div className="flex items-center gap-1">
                <Camera className="w-4 h-4" />
                <span>Фото и советы</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>Проверенные места</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Attractions Preview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Топ достопримечательности</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {topAttractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={attraction.image} 
                    alt={attraction.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{attraction.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-600 text-white">{attraction.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{attraction.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{attraction.description}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{attraction.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{attraction.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {attraction.tags.slice(0, 2).map((tag) => (
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
                  placeholder="Поиск достопримечательностей..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "name" | "category")}
                className="px-3 py-2 border rounded-md"
              >
                <option value="rating">По рейтингу</option>
                <option value="name">По алфавиту</option>
                <option value="category">По категориям</option>
              </select>
            </div>
          </div>

          {/* Attractions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                <div className="relative h-48">
                  <img 
                    src={attraction.image} 
                    alt={attraction.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{attraction.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-600 text-white text-xs">{attraction.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{attraction.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{attraction.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{attraction.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Цена:</span>
                      <span>{attraction.price}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {attraction.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {attraction.highlights.length > 0 && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm mb-2">Особенности:</h4>
                      <div className="text-xs text-gray-600">
                        {attraction.highlights.slice(0, 2).map((highlight, index) => (
                          <div key={index}>• {highlight}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAttractions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Достопримечательности не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Полезная информация</h2>
            
            <Tabs defaultValue="tips" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tips">Советы</TabsTrigger>
                <TabsTrigger value="timing">Время</TabsTrigger>
                <TabsTrigger value="transport">Транспорт</TabsTrigger>
                <TabsTrigger value="costs">Цены</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tips" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Общие советы по посещению</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800">👔 Дресс-код</h4>
                        <p>В храмах: закрытые плечи и колени, снимайте обувь при входе. Избегайте шорт и топов.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">📱 Фотографии</h4>
                        <p>В храмах спрашивайте разрешение. Не фотографируйте статуи Будды со спины. На смотровых — лучший свет утром и вечером.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">🎒 Что взять с собой</h4>
                        <p>Воду, солнцезащитный крем, удобную обувь, кофту (в храмах и музеях кондиционеры).</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timing" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Лучшее время для посещения</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🌅 Утро (7:00-10:00)</h4>
                        <ul className="space-y-1">
                          <li>• Храмы (меньше людей, прохладнее)</li>
                          <li>• Природные парки</li>
                          <li>• Музеи (только что открыты)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🌅 Вечер (16:00-19:00)</h4>
                        <ul className="space-y-1">
                          <li>• Смотровые площадки (закат)</li>
                          <li>• Старый город (Walking Street)</li>
                          <li>• Рынки и уличная еда</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transport" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Транспорт</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🚗 Варианты транспорта</h4>
                        <ul className="space-y-1">
                          <li>• Скутер: 200-300฿/день (удобно)</li>
                          <li>• Такси/Grab: 150-500฿ за поездку</li>
                          <li>• Тук-тук: 100-400฿ (торгуйтесь)</li>
                          <li>• Тур с гидом: 1500-3000฿/день</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🅿️ Парковка</h4>
                        <ul className="space-y-1">
                          <li>• Храмы: обычно бесплатно</li>
                          <li>• Смотровые: 20-50฿</li>
                          <li>• Пхукет-таун: 20-40฿/час</li>
                          <li>• Музеи: часто есть парковка</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="costs" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Ориентировочные цены</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🎫 Входные билеты</h4>
                        <ul className="space-y-1">
                          <li>• Храмы: бесплатно (пожертвования)</li>
                          <li>• Смотровые: бесплатно</li>
                          <li>• Музеи: 50-200฿</li>
                          <li>• Нац. парки: 100-200฿</li>
                          <li>• Шоу-парки: 1500-3000฿</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🍽️ Дополнительные расходы</h4>
                        <ul className="space-y-1">
                          <li>• Обед в кафе: 150-400฿</li>
                          <li>• Сувениры: 50-500฿</li>
                          <li>• Фото на память: 100-300฿</li>
                          <li>• Гид (если нужен): 1000-2000฿</li>
                        </ul>
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

export default Dostoprimechatelnosti;
