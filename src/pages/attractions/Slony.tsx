import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Clock, Users, Heart, Search, Camera, Shield } from "lucide-react";

interface ElephantPlace {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
  price: string;
  duration: string;
  activities: string[];
  highlights: string[];
  ethical: boolean;
  groupSize: string;
  features: string[];
  tips: string[];
}

const elephantPlaces: ElephantPlace[] = [
  {
    id: "elephant-jungle-sanctuary",
    title: "Elephant Jungle Sanctuary Phuket",
    description: "Этичный слоновий заповедник, где можно покормить, помыть и пообщаться со слонами в их естественной среде обитания. Без катания на слонах.",
    image: "https://images.unsplash.com/photo-1551715133-8b2fc6ecbd75?auto=format&fit=crop&w=800&q=80",
    location: "Район Катху, 30 мин от Патонга",
    rating: 4.9,
    reviews: 1247,
    type: "Этичный заповедник",
    price: "2,800-3,500฿",
    duration: "Полдня (4-5 часов)",
    activities: ["Кормление слонов", "Мытье слонов", "Прогулка со слонами", "Фото с животными"],
    highlights: [
      "100% этичный подход к животным",
      "Спасенные слоны в безопасной среде", 
      "Обучение об уходе за слонами",
      "Традиционная тайская одежда включена"
    ],
    ethical: true,
    groupSize: "Малые группы до 15 человек",
    features: ["Трансфер", "Обед", "Гид", "Страховка", "Традиционная одежда"],
    tips: [
      "Берите сменную одежду - можно промокнуть",
      "Используйте солнцезащитный крем",
      "Слушайте инструкции смотрителей"
    ]
  },
  {
    id: "phuket-elephant-sanctuary",
    title: "Phuket Elephant Sanctuary",
    description: "Первый этичный дом престарелых для слонов на Пхукете. Здесь живут слоны, спасенные от туристической и лесозаготовительной индустрии.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=800&q=80",
    location: "Район Талан, 45 мин от города",
    rating: 4.8,
    reviews: 892,
    type: "Дом престарелых для слонов",
    price: "3,200-3,800฿",
    duration: "Полдня (3-4 часа)",
    activities: ["Наблюдение за слонами", "Кормление фруктами", "Изучение поведения", "Фотосессия"],
    highlights: [
      "Реабилитационный центр для старых слонов",
      "Образовательная программа", 
      "Наблюдение в естественной среде",
      "Поддержка благотворительности"
    ],
    ethical: true,
    groupSize: "Группы до 10 человек",
    features: ["Трансфер", "Гид-натуралист", "Обед", "Пожертвование в центр"],
    tips: [
      "Тихое поведение - не пугайте животных",
      "Приезжайте с позитивным настроем",
      "Поддержите центр покупкой сувениров"
    ]
  },
  {
    id: "chalong-elephant-trekking",
    title: "Chalong Elephant Trekking",
    description: "Семейный слоновий парк с разнообразными активностями: катание, кормление, шоу слонов и изучение их повадок в дружелюбной атмосфере.",
    image: "https://images.unsplash.com/photo-1553892756-2ac264b7e39f?auto=format&fit=crop&w=800&q=80",
    location: "Чалонг, 20 мин от центра",
    rating: 4.5,
    reviews: 567,
    type: "Семейный парк",
    price: "2,200-2,800฿",
    duration: "3-4 часа",
    activities: ["Короткое катание", "Кормление бананами", "Шоу слонов", "Рисование со слонами"],
    highlights: [
      "Подходит для семей с детьми",
      "Разнообразие активностей",
      "Интерактивное шоу талантов слонов",
      "Возможность рисовать со слонами"
    ],
    ethical: false,
    groupSize: "Группы до 20 человек",
    features: ["Трансфер", "Шоу", "Кормление", "Фото", "Напитки"],
    tips: [
      "Отлично для первого знакомства со слонами",
      "Дети в восторге от шоу",
      "Есть сувенирный магазин"
    ]
  },
  {
    id: "green-elephant-sanctuary",
    title: "Green Elephant Sanctuary Park",
    description: "Экологически чистый парк, сочетающий этичный подход к слонам с образовательной программой о защите природы Таиланда.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    location: "Север Пхукета, район Талан",
    rating: 4.7,
    reviews: 423,
    type: "Эко-парк",
    price: "2,900-3,400฿",
    duration: "Полдня (4 часа)",
    activities: ["Кормление в естественной среде", "Прогулка по джунглям", "Мытье слонов", "Медитация со слонами"],
    highlights: [
      "Экологический подход к туризму",
      "Слоны живут в полудикой природе",
      "Медитативный опыт с животными",
      "Изучение тайских традиций ухода"
    ],
    ethical: true,
    groupSize: "Небольшие группы до 12 человек",
    features: ["Органический обед", "Эко-трансфер", "Натуральные продукты", "Йога со слонами"],
    tips: [
      "Парк фокусируется на релаксации",
      "Берите камеру для природных кадров",
      "Участвуйте в медитации - уникальный опыт"
    ]
  },
  {
    id: "rawai-elephant-camp",
    title: "Rawai Elephant Camp",
    description: "Традиционный слоновий лагерь с возможностью покататься на слонах, увидеть их таланты и узнать о тайской культуре взаимодействия со слонами.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    location: "Равай, юг Пхукета",
    rating: 4.3,
    reviews: 334,
    type: "Традиционный лагерь",
    price: "1,800-2,400฿",
    duration: "2-3 часа",
    activities: ["Катание на слонах", "Кормление", "Простое шоу", "Фото на память"],
    highlights: [
      "Традиционный тайский подход",
      "Недорогие цены",
      "Быстрая программа для туристов",
      "Удобное расположение на юге"
    ],
    ethical: false,
    groupSize: "Группы до 25 человек",
    features: ["Базовый трансфер", "Катание", "Кормление", "Фото"],
    tips: [
      "Подходит для быстрого знакомства",
      "Торгуйтесь за цену",
      "Совместите с посещением Равая"
    ]
  },
  {
    id: "patong-elephant-village",
    title: "Patong Elephant Village",
    description: "Удобно расположенная слоновья деревня рядом с Патонгом, предлагающая разнообразные программы от быстрого знакомства до полудневных туров.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=800&q=80",
    location: "15 мин от пляжа Патонг",
    rating: 4.2,
    reviews: 789,
    type: "Туристическая деревня",
    price: "2,000-2,800฿",
    duration: "1-4 часа (разные программы)",
    activities: ["Катание разной длительности", "Кормление и мытье", "Мини-шоу", "Сувенирный магазин"],
    highlights: [
      "Близко к главным отелям Патонга",
      "Гибкие программы по времени",
      "Хорошо для туристов в отпуске",
      "Совмещение с другими активностями"
    ],
    ethical: false,
    groupSize: "Различные размеры групп",
    features: ["Короткий трансфер", "Выбор программ", "Шоу", "Магазин"],
    tips: [
      "Удобно совместить с пляжным отдыхом",
      "Выбирайте утреннее время - прохладнее",
      "Есть программы для детей"
    ]
  }
];

const categories = ["Все типы", "Этичный заповедник", "Дом престарелых для слонов", "Семейный парк", "Эко-парк", "Традиционный лагерь", "Туристическая деревня"];

const Slony: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все типы");
  const [showEthicalOnly, setShowEthicalOnly] = useState(false);

  // Filter elephant places
  const filteredPlaces = useMemo(() => {
    let filtered = elephantPlaces;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(place =>
        place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.activities.some(activity => activity.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "Все типы") {
      filtered = filtered.filter(place => place.type === selectedCategory);
    }

    // Filter by ethical practices
    if (showEthicalOnly) {
      filtered = filtered.filter(place => place.ethical);
    }

    return filtered.sort((a, b) => b.rating - a.rating);
  }, [searchTerm, selectedCategory, showEthicalOnly]);

  const ethicalPlaces = elephantPlaces.filter(place => place.ethical);
  const topRatedPlaces = elephantPlaces.filter(place => place.rating >= 4.7).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Слоны на Пхукете — экскурсии, парки, уход</title>
        <meta name="description" content="Экскурсии к слонам, парки, уход, этичный туризм, фото, советы. Где увидеть и пообщаться со слонами на Пхукете." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Слоны на Пхукете
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Слоны — символ Таиланда. На Пхукете есть этичные парки, где можно пообщаться с животными, 
              узнать об уходе и поддержать сохранение популяции.
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{elephantPlaces.length} мест</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>{ethicalPlaces.length} этичных парков</span>
              </div>
              <div className="flex items-center gap-1">
                <Camera className="w-4 h-4" />
                <span>Незабываемые встречи</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Spotlight */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Рекомендуем этичные парки</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Этичное обращение со слонами</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы поддерживаем только парки, где слоны живут в комфортных условиях без принуждения. 
              Никакого катания на слонах, только кормление, мытье и наблюдение.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ethicalPlaces.slice(0, 2).map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={place.image} 
                    alt={place.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{place.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-600 text-white">Этично</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{place.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{place.description}</p>
                  <div className="space-y-1 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{place.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{place.duration}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-700 mb-2">{place.price}</div>
                  <div className="flex flex-wrap gap-1">
                    {place.activities.slice(0, 2).map((activity) => (
                      <Badge key={activity} variant="secondary" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск мест со слонами..."
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEthicalOnly}
                  onChange={(e) => setShowEthicalOnly(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Только этичные</span>
              </label>
            </div>
          </div>

          {/* Places Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                <div className="relative h-48">
                  <img 
                    src={place.image} 
                    alt={place.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{place.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    {place.ethical ? (
                      <Badge className="bg-green-600 text-white text-xs">Этично</Badge>
                    ) : (
                      <Badge className="bg-blue-600 text-white text-xs">{place.type}</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{place.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{place.description}</p>
                  
                  <div className="space-y-1 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{place.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{place.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{place.groupSize}</span>
                    </div>
                  </div>

                  <div className="text-sm font-medium text-blue-700 mb-3">{place.price}</div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {place.activities.slice(0, 3).map((activity) => (
                      <Badge key={activity} variant="secondary" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>

                  {place.highlights.length > 0 && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm mb-2">Особенности:</h4>
                      <div className="text-xs text-gray-600">
                        {place.highlights.slice(0, 2).map((highlight, index) => (
                          <div key={index}>• {highlight}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Места не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Полезная информация</h2>
            
            <Tabs defaultValue="ethics" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="ethics">Этика</TabsTrigger>
                <TabsTrigger value="what-to-expect">Чего ждать</TabsTrigger>
                <TabsTrigger value="preparation">Подготовка</TabsTrigger>
                <TabsTrigger value="safety">Безопасность</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ethics" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Этичное обращение со слонами</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-green-700">✅ Рекомендуем</h4>
                        <p>Парки, где слоны живут в полусвободных условиях, кормятся естественной пищей, не выступают в шоу и не катают туристов. Общение происходит на равных.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-700">❌ Избегаем</h4>
                        <p>Места с цирковыми номерами, принудительным катанием, содержанием слонов на цепи, рисованием хоботом или другими неестественными трюками.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">🤝 Наш выбор</h4>
                        <p>Мы сотрудничаем только с центрами, которые спасают слонов и обеспечивают им достойную жизнь на пенсии.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="what-to-expect" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Чего ожидать от встречи</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🍌 Кормление</h4>
                        <p>Слоны очень любят бананы, сахарный тростник и арбузы. Кормить нужно осторожно - они сильные и могут случайно толкнуть.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🚿 Купание</h4>
                        <p>В некоторых парках можно помочь помыть слонов в реке или пруду. Готовьтесь промокнуть полностью!</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">📸 Фотографии</h4>
                        <p>Слоны спокойно относятся к камерам, но лучше фотографировать издалека или с разрешения смотрителей.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🧘 Наблюдение</h4>
                        <p>Просто наблюдать за слонами очень медитативно. Они мудрые и спокойные животные.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preparation" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Как подготовиться</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800">👕 Одежда</h4>
                        <p>Берите сменную одежду и обувь. Предпочтительна закрытая одежда для защиты от солнца и грязи. В некоторых парках выдают традиционную тайскую одежду.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">🎒 С собой</h4>
                        <p>Водонепроницаемый чехол для телефона, полотенце, солнцезащитный крем, репеллент от комаров, влажные салфетки.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">💰 Деньги</h4>
                        <p>Наличные для чаевых смотрителям (100-200฿), покупки дополнительных фруктов для слонов, сувениров.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Безопасность</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800">🐘 При общении со слонами</h4>
                        <p>Всегда слушайте инструкции смотрителей. Не подходите сзади или неожиданно. Не кормите без разрешения. Слоны большие и сильные, но не агрессивные.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">👶 С детьми</h4>
                        <p>Дети должны быть всегда рядом с взрослыми. Объясните ребенку, что слонов нельзя дразнить или кричать на них.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">🏥 Здоровье</h4>
                        <p>Мойте руки после контакта с животными. Если у вас аллергия на животных, предупредите об этом заранее.</p>
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

export default Slony;
