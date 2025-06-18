
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Filter, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const BeachTours = () => {
  const beachTours = [
    {
      id: 1,
      slug: "phi-phi-islands-speedboat",
      title: "Phi Phi Islands by Speedboat",
      subtitle: "Острова Пхи-Пхи на скоростной лодке",
      price: "2,890",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 20 чел",
      rating: 4.8,
      reviewsCount: 245,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Бухта Майя", "Snorkeling", "Пляж Monkey Beach", "Обед на пляже"],
      popular: true
    },
    {
      id: 2,
      slug: "james-bond-island",
      title: "James Bond Island & Phang Nga Bay",
      subtitle: "Остров Джеймса Бонда",
      price: "2,190",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 18 чел",
      rating: 4.7,
      reviewsCount: 189,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Остров Ко Тапу", "Пещеры", "Каноэ", "Плавучая деревня"]
    },
    {
      id: 3,
      slug: "coral-island-parasailing",
      title: "Coral Island + Parasailing",
      subtitle: "Коралловый остров с парасейлингом",
      price: "1,990",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 15 чел",
      rating: 4.6,
      reviewsCount: 167,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Парасейлинг", "Водные виды спорта", "Белый песок", "Снорклинг"]
    },
    {
      id: 4,
      slug: "racha-yai-island",
      title: "Racha Yai Island",
      subtitle: "Остров Рача Яй",
      price: "2,290",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 25 чел",
      rating: 4.7,
      reviewsCount: 198,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Белоснежные пляжи", "Кристальная вода", "Снорклинг", "Релакс"]
    },
    {
      id: 5,
      slug: "similan-islands-diving",
      title: "Similan Islands Diving",
      subtitle: "Дайвинг на Симиланских островах",
      price: "3,590",
      currency: "₽",
      duration: "12 часов",
      groupSize: "до 12 чел",
      rating: 4.9,
      reviewsCount: 98,
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80",
      highlights: ["Дайвинг", "Нетронутая природа", "Черепахи", "Коралловые рифы"]
    },
    {
      id: 6,
      slug: "krabi-four-islands",
      title: "Krabi Four Islands Tour",
      subtitle: "4 острова Краби",
      price: "2,390",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 16 чел",
      rating: 4.5,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Пляж Рейли", "Остров Poda", "Куриный остров", "Snorkeling"]
    },
    {
      id: 7,
      slug: "koh-samui-angthong",
      title: "Koh Samui to Ang Thong Marine Park",
      subtitle: "Морской парк Ангтхонг",
      price: "2,690",
      currency: "₽",
      duration: "10 часов",
      groupSize: "до 25 чел",
      rating: 4.7,
      reviewsCount: 134,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Морской парк", "Каякинг", "Изумрудное озеро", "Смотровая площадка"]
    },
    {
      id: 8,
      slug: "maya-bay-sunrise",
      title: "Maya Bay Sunrise Tour",
      subtitle: "Бухта Майя на рассвете",
      price: "3,200",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 15 чел",
      rating: 4.9,
      reviewsCount: 87,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Рассвет в бухте Майя", "Без толп туристов", "Фотосессия", "Завтрак на пляже"]
    },
    {
      id: 9,
      slug: "koh-phi-phi-leh-lagoon",
      title: "Koh Phi Phi Leh Lagoon",
      subtitle: "Лагуна острова Пхи-Пхи Ле",
      price: "2,490",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 20 чел",
      rating: 4.6,
      reviewsCount: 165,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Закрытая лагуна", "Изумрудная вода", "Каякинг", "Пещеры"]
    },
    {
      id: 10,
      slug: "bamboo-island-snorkeling",
      title: "Bamboo Island Snorkeling",
      subtitle: "Снорклинг у острова Бамбу",
      price: "2,190",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 18 чел",
      rating: 4.7,
      reviewsCount: 143,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Остров Бамбу", "Лучший снорклинг", "Белый песок", "Тропические рыбы"]
    },
    {
      id: 11,
      slug: "hong-island-krabi",
      title: "Hong Island Krabi",
      subtitle: "Остров Хонг, Краби",
      price: "2,590",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 22 чел",
      rating: 4.8,
      reviewsCount: 178,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Закрытая лагуна", "Каякинг", "Пляж с белым песком", "Обед на острове"]
    },
    {
      id: 12,
      slug: "koh-yao-noi-exploration",
      title: "Koh Yao Noi Exploration",
      subtitle: "Исследование острова Ко Яо Ной",
      price: "2,390",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 16 чел",
      rating: 4.5,
      reviewsCount: 134,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Аутентичная деревня", "Велосипедная прогулка", "Местная культура", "Рыбацкие лодки"]
    },
    {
      id: 13,
      slug: "sunset-dinner-cruise",
      title: "Sunset Dinner Cruise",
      subtitle: "Круиз с ужином на закате",
      price: "3,490",
      currency: "₽",
      duration: "4 часа",
      groupSize: "до 30 чел",
      rating: 4.9,
      reviewsCount: 234,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Романтический ужин", "Закат над морем", "Живая музыка", "Безлимитные напитки"]
    },
    {
      id: 14,
      slug: "speedboat-island-hopping",
      title: "Speedboat Island Hopping",
      subtitle: "Прыжки по островам на скоростной лодке",
      price: "2,890",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 25 чел",
      rating: 4.7,
      reviewsCount: 189,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["5 островов за день", "Высокая скорость", "Адреналин", "Снорклинг"]
    },
    {
      id: 15,
      slug: "sea-canoe-phang-nga",
      title: "Sea Canoe Phang Nga Bay",
      subtitle: "Морское каноэ в заливе Пханг Нга",
      price: "2,190",
      currency: "₽",
      duration: "10 часов",
      groupSize: "до 20 чел",
      rating: 4.6,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Каноэ в пещерах", "Мангровые леса", "Сталактиты", "Эко-тур"]
    },
    {
      id: 16,
      slug: "big-boat-phi-phi",
      title: "Big Boat to Phi Phi Islands",
      subtitle: "Большая лодка на острова Пхи-Пхи",
      price: "1,890",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 45 чел",
      rating: 4.4,
      reviewsCount: 298,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Большая устойчивая лодка", "Бюджетный вариант", "Комфорт", "Все включено"]
    },
    {
      id: 17,
      slug: "private-longtail-tour",
      title: "Private Longtail Boat Tour",
      subtitle: "Приватный тур на длиннохвостой лодке",
      price: "4,590",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 8 чел",
      rating: 4.9,
      reviewsCount: 67,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Приватный тур", "Гибкий маршрут", "Аутентичная лодка", "Персональный гид"]
    },
    {
      id: 18,
      slug: "fishing-tour-andaman",
      title: "Deep Sea Fishing Tour",
      subtitle: "Глубоководная рыбалка",
      price: "3,190",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 12 чел",
      rating: 4.5,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Рыбалка в открытом море", "Профессиональное снаряжение", "Приготовление улова", "Опытный капитан"]
    },
    {
      id: 19,
      slug: "kayak-ao-thalane",
      title: "Kayak Tour Ao Thalane",
      subtitle: "Каякинг в Ао Тхалане",
      price: "1,790",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 16 чел",
      rating: 4.6,
      reviewsCount: 124,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Мангровые леса", "Дикая природа", "Пещеры", "Эко-приключение"]
    },
    {
      id: 20,
      slug: "koh-lanta-snorkeling",
      title: "Koh Lanta Snorkeling Tour",
      subtitle: "Снорклинг у острова Ко Ланта",
      price: "2,390",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 20 чел",
      rating: 4.7,
      reviewsCount: 167,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Остров Ко Ланта", "Коралловые сады", "Тропические рыбы", "Обед на пляже"]
    },
    {
      id: 21,
      slug: "emerald-cave-tour",
      title: "Emerald Cave & Islands",
      subtitle: "Изумрудная пещера и острова",
      price: "2,590",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 18 чел",
      rating: 4.8,
      reviewsCount: 145,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Изумрудная пещера", "Плавание в темноте", "Секретная лагуна", "Незабываемый опыт"]
    },
    {
      id: 22,
      slug: "railay-beach-climbing",
      title: "Railay Beach & Rock Climbing",
      subtitle: "Пляж Рейли и скалолазание",
      price: "2,190",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 15 чел",
      rating: 4.6,
      reviewsCount: 98,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Пляж Рейли", "Скалолазание", "Пещера принцессы", "Красивые виды"]
    },
    {
      id: 23,
      slug: "john-gray-sea-canoe",
      title: "John Gray's Sea Canoe",
      subtitle: "Морское каноэ Джона Грея",
      price: "3,490",
      currency: "₽",
      duration: "11 часов",
      groupSize: "до 24 чел",
      rating: 4.9,
      reviewsCount: 267,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Премиум тур", "Экологический подход", "Опытные гиды", "Уникальные маршруты"]
    },
    {
      id: 24,
      slug: "koh-rok-snorkeling",
      title: "Koh Rok Islands Snorkeling",
      subtitle: "Снорклинг на островах Ко Рок",
      price: "2,890",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 20 чел",
      rating: 4.7,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Острова Ко Рок", "Лучший снорклинг", "Черепахи", "Белоснежные пляжи"]
    },
    {
      id: 25,
      slug: "whale-watching-tour",
      title: "Whale Watching Tour",
      subtitle: "Наблюдение за китами",
      price: "4,290",
      currency: "₽",
      duration: "10 часов",
      groupSize: "до 16 чел",
      rating: 4.8,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Киты и дельфины", "Открытое море", "Биолог на борту", "Уникальный опыт"]
    },
    {
      id: 26,
      slug: "night-fishing-tour",
      title: "Night Fishing Adventure",
      subtitle: "Ночная рыбалка",
      price: "2,790",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 14 чел",
      rating: 4.5,
      reviewsCount: 78,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Рыбалка ночью", "Романтика моря", "Барбекю на лодке", "Звездное небо"]
    },
    {
      id: 27,
      slug: "luxury-yacht-charter",
      title: "Luxury Yacht Charter",
      subtitle: "Аренда роскошной яхты",
      price: "12,900",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 12 чел",
      rating: 4.9,
      reviewsCount: 45,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Роскошная яхта", "Персональный экипаж", "Премиум сервис", "Гибкий маршрут"]
    },
    {
      id: 28,
      slug: "snorkeling-safari",
      title: "Snorkeling Safari",
      subtitle: "Снорклинг сафари",
      price: "2,690",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 22 чел",
      rating: 4.6,
      reviewsCount: 198,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Множество локаций", "Разнообразие рыб", "Коралловые рифы", "Обед на острове"]
    },
    {
      id: 29,
      slug: "sea-eagle-watching",
      title: "Sea Eagle Watching Tour",
      subtitle: "Наблюдение за морскими орлами",
      price: "1,990",
      currency: "₽",
      duration: "5 часов",
      groupSize: "до 18 чел",
      rating: 4.7,
      reviewsCount: 134,
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=800&q=80",
      highlights: ["Морские орлы", "Мангровые заросли", "Дикая природа", "Фотосафари"]
    },
    {
      id: 30,
      slug: "cave-exploration-tour",
      title: "Sea Cave Exploration",
      subtitle: "Исследование морских пещер",
      price: "2,390",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 16 чел",
      rating: 4.5,
      reviewsCount: 112,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      highlights: ["Морские пещеры", "Сталактиты", "Подземные озера", "Приключение"]
    },
    {
      id: 31,
      slug: "turtle-sanctuary-visit",
      title: "Sea Turtle Sanctuary Visit",
      subtitle: "Посещение заповедника черепах",
      price: "2,190",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 20 чел",
      rating: 4.8,
      reviewsCount: 167,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Морские черепахи", "Экология", "Образование", "Снорклинг с черепахами"]
    },
    {
      id: 32,
      slug: "mangrove-ecosystem-tour",
      title: "Mangrove Ecosystem Tour",
      subtitle: "Тур по мангровой экосистеме",
      price: "1,890",
      currency: "₽",
      duration: "5 часов",
      groupSize: "до 18 чел",
      rating: 4.6,
      reviewsCount: 145,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
      highlights: ["Мангровые леса", "Экосистема", "Дикие животные", "Образовательный тур"]
    },
    {
      id: 33,
      slug: "sunset-kayaking",
      title: "Sunset Kayaking Tour",
      subtitle: "Каякинг на закате",
      price: "1,690",
      currency: "₽",
      duration: "4 часа",
      groupSize: "до 12 чел",
      rating: 4.7,
      reviewsCount: 98,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Каякинг на закате", "Романтическая атмосфера", "Фотосессия", "Легкий перекус"]
    },
    {
      id: 34,
      slug: "coral-restoration-tour",
      title: "Coral Restoration Experience",
      subtitle: "Восстановление коралловых рифов",
      price: "2,490",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 14 чел",
      rating: 4.8,
      reviewsCount: 76,
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80",
      highlights: ["Восстановление кораллов", "Экология", "Практический опыт", "Сертификат участия"]
    },
    {
      id: 35,
      slug: "floating-market-sea-tour",
      title: "Floating Market & Sea Tour",
      subtitle: "Плавучий рынок и морской тур",
      price: "2,890",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 20 чел",
      rating: 4.5,
      reviewsCount: 123,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Плавучий рынок", "Местная культура", "Традиционная еда", "Морская прогулка"]
    },
    {
      id: 36,
      slug: "dolphin-watching-cruise",
      title: "Dolphin Watching Cruise",
      subtitle: "Круиз с наблюдением за дельфинами",
      price: "3,190",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 25 чел",
      rating: 4.7,
      reviewsCount: 189,
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Дельфины в природе", "Морской круиз", "Фотосессия", "Обед на борту"]
    },
    {
      id: 37,
      slug: "sea-plane-island-tour",
      title: "Seaplane Island Tour",
      subtitle: "Тур на острова на гидросамолете",
      price: "8,900",
      currency: "₽",
      duration: "4 часа",
      groupSize: "до 8 чел",
      rating: 4.9,
      reviewsCount: 34,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Полет на гидросамолете", "Панорамные виды", "Эксклюзивный опыт", "Аэрофотосъемка"]
    },
    {
      id: 38,
      slug: "underwater-scooter-tour",
      title: "Underwater Scooter Adventure",
      subtitle: "Подводные мотороллеры",
      price: "3,490",
      currency: "₽",
      duration: "5 часов",
      groupSize: "до 10 чел",
      rating: 4.6,
      reviewsCount: 67,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Подводные мотороллеры", "Дыхание под водой", "Коралловые рифы", "Инновационные технологии"]
    },
    {
      id: 39,
      slug: "stand-up-paddle-tour",
      title: "Stand Up Paddle Tour",
      subtitle: "SUP тур",
      price: "1,490",
      currency: "₽",
      duration: "3 часа",
      groupSize: "до 12 чел",
      rating: 4.4,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["SUP доски", "Спокойные воды", "Фитнес на воде",  "Инструктор"]
    },
    {
      id: 40,
      slug: "glass-bottom-boat-tour",
      title: "Glass Bottom Boat Tour",
      subtitle: "Лодка с прозрачным дном",
      price: "1,790",
      currency: "₽",
      duration: "4 часа",
      groupSize: "до 30 чел",
      rating: 4.3,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Прозрачное дно", "Подводный мир", "Семейный тур", "Без намокания"]
    },
    {
      id: 41,
      slug: "multi-day-sailing-adventure",
      title: "Multi-Day Sailing Adventure",
      subtitle: "Многодневное парусное приключение",
      price: "15,900",
      currency: "₽",
      duration: "3 дня",
      groupSize: "до 8 чел",
      rating: 4.9,
      reviewsCount: 23,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Парусная яхта", "3 дня на море", "Ночевка на яхте", "Полная свобода"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Waves className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Морские экскурсии
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto mb-8">
            Исследуйте кристально чистые воды и белоснежные пляжи Тайланда. 
            Острова, снорклинг, дайвинг и незабываемые морские приключения.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="font-semibold">{beachTours.length} морских экскурсий</span> • От 1,490 ₽
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Фильтры
            </Button>
            <Button variant="outline">Все острова</Button>
            <Button variant="outline">Пхукет</Button>
            <Button variant="outline">Краби</Button>
            <Button variant="outline">Самуи</Button>
            <Button variant="outline">С дайвингом</Button>
            <div className="ml-auto text-gray-600">
              Сортировка: <Button variant="ghost" className="p-0 h-auto text-cyan-600">Популярные</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beachTours.map((tour) => (
              <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {tour.popular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Популярное
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-sm">{tour.rating}</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{tour.title}</h3>
                    <p className="text-sm text-gray-200">{tour.subtitle}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 2).map((highlight, index) => (
                        <span key={index} className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full text-xs">
                          {highlight}
                        </span>
                      ))}
                      {tour.highlights.length > 2 && (
                        <span className="text-gray-500 text-xs">+{tour.highlights.length - 2} еще</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-cyan-600">
                          {tour.price} {tour.currency}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm">{tour.reviewsCount} отзывов</div>
                    </div>
                    <Link to={`/excursion/${tour.slug}`}>
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        Подробнее
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Хотите приватный тур?
          </h2>
          <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
            Организуем индивидуальные морские экскурсии с персональным гидом 
            и гибким маршрутом под ваши пожелания.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-cyan-600 hover:bg-gray-100">
              Получить консультацию
            </Button>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Приватный тур
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeachTours;
