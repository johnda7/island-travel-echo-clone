
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
    title: "Острова Пхи Пхи на скоростной лодке",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,490 ₽",
    originalPrice: "2,990 ₽",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Майя Бэй", "Снорклинг", "Обед на пляже", "Лагуна"],
    description: "Незабываемое путешествие к знаменитым островам Пхи Пхи с посещением Майя Бэй.",
    featured: true,
    category: "beach"
  },
  {
    id: 2,
    title: "Остров Джеймса Бонда",
    location: "Пханг Нга, Таиланд", 
    duration: "8 часов",
    group: "До 25 человек",
    dates: "Октябрь - Май",
    price: "2,590 ₽",
    originalPrice: "3,090 ₽",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Каноэ в пещерах", "Деревня на воде", "Морепродукты", "Известняковые скалы"],
    description: "Исследование залива Пханг Нга с посещением знаменитого острова из фильма о Джеймсе Бонде.",
    featured: false,
    category: "beach"
  },
  {
    id: 3,
    title: "11 островов Стандарт",
    location: "Краби, Таиланд",
    duration: "9 часов", 
    group: "До 40 человек",
    dates: "Ноябрь - Апрель",
    price: "2,690 ₽",
    originalPrice: "3,190 ₽",
    rating: 5.0,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["11 островов", "Снорклинг", "Обед-барбекю", "Кристальная вода"],
    description: "Большое путешествие по 11 живописным островам с множеством активностей.",
    featured: true,
    category: "beach"
  },
  {
    id: 4,
    title: "Большой дворец Бангкока",
    location: "Бангкок, Таиланд",
    duration: "6 часов",
    group: "До 20 человек", 
    dates: "Круглый год",
    price: "1,890 ₽",
    originalPrice: "2,390 ₽",
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Королевский дворец", "Храм Изумрудного Будды", "Речные каналы", "История"],
    description: "Погружение в королевскую историю Таиланда с посещением главных достопримечательностей Бангкока.",
    featured: false,
    category: "city"
  },
  {
    id: 5,
    title: "Треккинг к водопадам Чиангмая",
    location: "Чиангмай, Таиланд",
    duration: "7 часов",
    group: "До 12 человек",
    dates: "Октябрь - Март",
    price: "2,190 ₽",
    originalPrice: "2,690 ₽", 
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Водопады", "Джунгли", "Деревни племен", "Треккинг"],
    description: "Активное приключение в джунглях северного Таиланда с посещением традиционных деревень.",
    featured: false,
    category: "adventure"
  },
  {
    id: 6,
    title: "Групповой тур: Айюттхая и плавучие рынки",
    location: "Айюттхая, Таиланд",
    duration: "10 часов",
    group: "15-25 человек",
    dates: "Каждый день",
    price: "1,590 ₽",
    originalPrice: "1,990 ₽",
    rating: 4.5,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&q=80",
    highlights: ["Древние руины", "Плавучий рынок", "Обед", "Групповая скидка"],
    description: "Экономичный групповой тур к древней столице Сиама с посещением традиционных рынков.",
    featured: true,
    category: "group"
  },
  {
    id: 7,
    title: "Коралловый остров и парасейлинг",
    location: "Паттайя, Таиланд",
    duration: "7 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "2,290 ₽",
    originalPrice: "2,790 ₽",
    rating: 4.4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Парасейлинг", "Водные виды спорта", "Коралловый риф", "Пляжный отдых"],
    description: "Экстремальные водные развлечения с красивыми видами на побережье Паттайи.",
    featured: false,
    category: "adventure"
  },
  {
    id: 8,
    title: "Наблюдение за китами",
    location: "Мирисса, Шри-Ланка",
    duration: "5 часов",
    group: "До 25 человек",
    dates: "Декабрь - Апрель",
    price: "3,290 ₽",
    originalPrice: "3,790 ₽",
    rating: 4.8,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80",
    highlights: ["Голубые киты", "Дельфины", "Океанское сафари", "Завтрак на борту"],
    description: "Уникальная возможность увидеть величественных китов в их естественной среде обитания.",
    featured: true,
    category: "adventure"
  },
  {
    id: 9,
    title: "Храмы Ангкора на рассвете",
    location: "Сием Рип, Камбоджа",
    duration: "12 часов",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "4,190 ₽",
    originalPrice: "4,690 ₽",
    rating: 4.9,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ангкор Ват", "Рассвет", "Древние храмы", "История кхмеров"],
    description: "Волшебное путешествие к величественным храмам Ангкора на рассвете.",
    featured: true,
    category: "city"
  },
  {
    id: 10,
    title: "Рафтинг по реке Аюн",
    location: "Убуд, Бали",
    duration: "6 часов",
    group: "До 20 человек",
    dates: "Апрель - Октябрь",
    price: "2,890 ₽",
    originalPrice: "3,390 ₽",
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Рафтинг", "Тропические джунгли", "Водопады", "Традиционный обед"],
    description: "Адреналиновое приключение по порогам реки среди тропических джунглей Бали.",
    featured: false,
    category: "adventure"
  },
  {
    id: 11,
    title: "Ночной рынок и стрит-фуд",
    location: "Чиангмай, Таиланд",
    duration: "4 часа",
    group: "До 18 человек",
    dates: "Каждый вечер",
    price: "1,490 ₽",
    originalPrice: "1,890 ₽",
    rating: 4.6,
    reviews: 223,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ночной базар", "Стрит-фуд", "Местная культура", "Дегустация"],
    description: "Гастрономическое путешествие по ночным рынкам с дегустацией местных деликатесов.",
    featured: false,
    category: "city"
  },
  {
    id: 12,
    title: "Остров Рача Яй",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 30 человек",
    dates: "Ноябрь - Май",
    price: "2,390 ₽",
    originalPrice: "2,890 ₽",
    rating: 4.5,
    reviews: 176,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Белоснежные пляжи", "Снорклинг", "Кристальная вода", "Морепродукты"],
    description: "Райский остров с идеальными пляжами для спокойного отдыха и снорклинга.",
    featured: false,
    category: "beach"
  },
  {
    id: 13,
    title: "Вулкан Батур на рассвете",
    location: "Кинтамани, Бали",
    duration: "8 часов",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "3,490 ₽",
    originalPrice: "3,990 ₽",
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Восход солнца", "Действующий вулкан", "Горячие источники", "Завтрак на вершине"],
    description: "Восхождение на священный вулкан Батур для встречи рассвета над облаками.",
    featured: true,
    category: "adventure"
  },
  {
    id: 14,
    title: "Мост через реку Квай",
    location: "Канчанабури, Таиланд",
    duration: "10 часов",
    group: "До 25 человек",
    dates: "Круглый год",
    price: "2,790 ₽",
    originalPrice: "3,290 ₽",
    rating: 4.4,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?auto=format&fit=crop&w=800&q=80",
    highlights: ["Исторический мост", "Музей войны", "Поездка на поезде", "Водопады Эраван"],
    description: "Историческое путешествие к знаменитому мосту через реку Квай времен Второй мировой войны.",
    featured: false,
    category: "city"
  },
  {
    id: 15,
    title: "Слоновий заповедник",
    location: "Чиангмай, Таиланд",
    duration: "6 часов",
    group: "До 12 человек",
    dates: "Круглый год",
    price: "3,190 ₽",
    originalPrice: "3,690 ₽",
    rating: 4.9,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=800&q=80",
    highlights: ["Этичный туризм", "Кормление слонов", "Купание с слонами", "Традиционный обед"],
    description: "Незабываемый опыт взаимодействия со слонами в этичном заповеднике.",
    featured: true,
    category: "adventure"
  },
  {
    id: 16,
    title: "4 острова Краби",
    location: "Краби, Таиланд",
    duration: "7 часов",
    group: "До 35 человек",
    dates: "Октябрь - Май",
    price: "2,190 ₽",
    originalPrice: "2,690 ₽",
    rating: 4.6,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Пода", "Чикен Айленд", "Талай Вэк", "Снорклинг"],
    description: "Тур по четырем живописным островам провинции Краби с кристально чистой водой.",
    featured: false,
    category: "beach"
  },
  {
    id: 17,
    title: "Плавучие рынки Дамноен Садуак",
    location: "Ратчабури, Таиланд",
    duration: "5 часов",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "1,690 ₽",
    originalPrice: "2,190 ₽",
    rating: 4.3,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Плавучий рынок", "Лодочные каналы", "Местная еда", "Сувениры"],
    description: "Аутентичное путешествие по знаменитым плавучим рынкам Таиланда.",
    featured: false,
    category: "city"
  },
  {
    id: 18,
    title: "Заповедник тигров",
    location: "Канчанабури, Таиланд",
    duration: "8 часов",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "4,490 ₽",
    originalPrice: "4,990 ₽",
    rating: 4.7,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Тигры", "Фотосессия", "Безопасность", "Обед включен"],
    description: "Уникальная возможность увидеть тигров вблизи в специальном заповеднике.",
    featured: false,
    category: "adventure"
  },
  {
    id: 19,
    title: "Храм Дои Сутеп",
    location: "Чиангмай, Таиланд",
    duration: "4 часа",
    group: "До 25 человек",
    dates: "Круглый год",
    price: "1,390 ₽",
    originalPrice: "1,790 ₽",
    rating: 4.5,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Храм на горе", "300 ступеней", "Панорамный вид", "Золотая чеди"],
    description: "Священный храм на вершине горы с потрясающими видами на Чиангмай.",
    featured: false,
    category: "city"
  },
  {
    id: 20,
    title: "Острова Симилан",
    location: "Пхукет, Таиланд",
    duration: "10 часов",
    group: "До 30 человек",
    dates: "Ноябрь - Май",
    price: "3,890 ₽",
    originalPrice: "4,390 ₽",
    rating: 4.9,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Национальный парк", "Дайвинг", "Белые пляжи", "Скала Слон"],
    description: "Путешествие к одним из самых красивых островов Таиланда с первозданной природой.",
    featured: true,
    category: "beach"
  },
  {
    id: 21,
    title: "Сафари на джипах",
    location: "Самуи, Таиланд",
    duration: "6 часов",
    group: "До 16 человек",
    dates: "Круглый год",
    price: "2,590 ₽",
    originalPrice: "3,090 ₽",
    rating: 4.4,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Джип-сафари", "Водопады", "Джунгли", "Смотровые площадки"],
    description: "Захватывающее сафари по горным джунглям острова Самуи на открытых джипах.",
    featured: false,
    category: "adventure"
  },
  {
    id: 22,
    title: "Рыбалка в открытом море",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 12 человек",
    dates: "Круглый год",
    price: "3,290 ₽",
    originalPrice: "3,790 ₽",
    rating: 4.6,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Морская рыбалка", "Свежая рыба", "Завтрак и обед", "Снаряжение включено"],
    description: "Увлекательная морская рыбалка в богатых водах Андаманского моря.",
    featured: false,
    category: "adventure"
  },
  {
    id: 23,
    title: "Каякинг в мангровых лесах",
    location: "Пханг Нга, Таиланд",
    duration: "5 часов",
    group: "До 14 человек",
    dates: "Круглый год",
    price: "2,090 ₽",
    originalPrice: "2,590 ₽",
    rating: 4.7,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Каякинг", "Мангровые леса", "Пещеры", "Дикая природа"],
    description: "Спокойное путешествие на каяках через таинственные мангровые леса.",
    featured: false,
    category: "adventure"
  },
  {
    id: 24,
    title: "Шоу трансвеститов",
    location: "Паттайя, Таиланд",
    duration: "3 часа",
    group: "До 50 человек",
    dates: "Каждый вечер",
    price: "1,190 ₽",
    originalPrice: "1,590 ₽",
    rating: 4.2,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Кабаре-шоу", "Костюмы", "Развлечение", "Фотосессия"],
    description: "Знаменитое кабаре-шоу с яркими костюмами и профессиональными артистами.",
    featured: false,
    category: "city"
  },
  {
    id: 25,
    title: "Водопады Эраван",
    location: "Канчанабури, Таиланд",
    duration: "7 часов",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "2,290 ₽",
    originalPrice: "2,790 ₽",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["7 уровней водопадов", "Купание", "Треккинг", "Национальный парк"],
    description: "Прогулка к семиуровневым водопадам Эраван с возможностью купания в природных бассейнах.",
    featured: false,
    category: "adventure"
  },
  {
    id: 26,
    title: "Крокодиловая ферма",
    location: "Самутпракан, Таиланд",
    duration: "4 часа",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "1,590 ₽",
    originalPrice: "1,990 ₽",
    rating: 4.1,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80",
    highlights: ["Крокодилы", "Шоу со змеями", "Слоны", "Сувенирный магазин"],
    description: "Посещение одной из крупнейших крокодиловых ферм в мире с захватывающими шоу.",
    featured: false,
    category: "adventure"
  },
  {
    id: 27,
    title: "Тайский кулинарный класс",
    location: "Бангкок, Таиланд",
    duration: "5 часов",
    group: "До 12 человек",
    dates: "Круглый год",
    price: "2,890 ₽",
    originalPrice: "3,390 ₽",
    rating: 4.9,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Готовка", "Рецепты", "Рынок специй", "Дегустация"],
    description: "Изучение секретов тайской кухни с профессиональным шеф-поваром.",
    featured: true,
    category: "city"
  },
  {
    id: 28,
    title: "Остров Ко Лан",
    location: "Паттайя, Таиланд",
    duration: "6 часов",
    group: "До 40 человек",
    dates: "Круглый год",
    price: "1,890 ₽",
    originalPrice: "2,390 ₽",
    rating: 4.3,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Коралловый остров", "Пляжи", "Водные виды спорта", "Морепродукты"],
    description: "Однодневная поездка на красивый коралловый остров недалеко от Паттайи.",
    featured: false,
    category: "beach"
  },
  {
    id: 29,
    title: "Банкиттык и медитация",
    location: "Чиангмай, Таиланд",
    duration: "8 часов",
    group: "До 10 человек",
    dates: "Круглый год",
    price: "3,490 ₽",
    originalPrice: "3,990 ₽",
    rating: 4.8,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Медитация", "Монахи", "Духовность", "Вегетарианский обед"],
    description: "Духовное путешествие в буддийский храм с практикой медитации под руководством монахов.",
    featured: false,
    category: "city"
  },
  {
    id: 30,
    title: "Зиплайн в джунглях",
    location: "Чиангмай, Таиланд",
    duration: "6 часов",
    group: "До 15 человек",
    dates: "Октябрь - Май",
    price: "3,190 ₽",
    originalPrice: "3,690 ₽",
    rating: 4.7,
    reviews: 223,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Зиплайн", "Джунгли", "Адреналин", "Безопасность"],
    description: "Захватывающий полет над кронами деревьев в джунглях северного Таиланда.",
    featured: true,
    category: "adventure"
  },
  {
    id: 31,
    title: "Речная прогулка по Чао Прайя",
    location: "Бангкок, Таиланд",
    duration: "3 часа",
    group: "До 25 человек",
    dates: "Круглый год",
    price: "1,290 ₽",
    originalPrice: "1,690 ₽",
    rating: 4.4,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Река Чао Прайя", "Храмы", "Закат", "Ужин на борту"],
    description: "Романтическая речная прогулка по главной реке Бангкока с ужином на закате.",
    featured: false,
    category: "city"
  },
  {
    id: 32,
    title: "Пещеры Као Лак",
    location: "Пханг Нга, Таиланд",
    duration: "7 часов",
    group: "До 18 человек",
    dates: "Круглый год",
    price: "2,490 ₽",
    originalPrice: "2,990 ₽",
    rating: 4.5,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Пещеры", "Подземные реки", "Сталактиты", "Фонарики"],
    description: "Исследование загадочных пещер с подземными реками и удивительными сталактитами.",
    featured: false,
    category: "adventure"
  },
  {
    id: 33,
    title: "Морские цыгане",
    location: "Пхукет, Таиланд",
    duration: "6 часов",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "2,790 ₽",
    originalPrice: "3,290 ₽",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Деревня на воде", "Культура", "Рыбалка", "Традиции"],
    description: "Знакомство с уникальной культурой морских цыган, живущих на воде.",
    featured: false,
    category: "city"
  },
  {
    id: 34,
    title: "Национальный парк Дои Интанон",
    location: "Чиангмай, Таиланд",
    duration: "10 часов",
    group: "До 15 человек",
    dates: "Ноябрь - Февраль",
    price: "3,690 ₽",
    originalPrice: "4,190 ₽",
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Высшая точка", "Водопады", "Королевские пагоды", "Горные племена"],
    description: "Посещение высшей точки Таиланда с красивыми водопадами и древними пагодами.",
    featured: false,
    category: "adventure"
  },
  {
    id: 35,
    title: "Муай Тай тренировка",
    location: "Бангкок, Таиланд",
    duration: "3 часа",
    group: "До 12 человек",
    dates: "Круглый год",
    price: "1,890 ₽",
    originalPrice: "2,390 ₽",
    rating: 4.7,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Тайский бокс", "Тренировка", "Традиции", "Фитнес"],
    description: "Изучение основ традиционного тайского бокса с опытными тренерами.",
    featured: false,
    category: "city"
  },
  {
    id: 36,
    title: "Острова Три",
    location: "Транг, Таиланд",
    duration: "8 часов",
    group: "До 25 человек",
    dates: "Ноябрь - Май",
    price: "2,990 ₽",
    originalPrice: "3,490 ₽",
    rating: 4.4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Изумрудная пещера", "Снорклинг", "Белые пляжи", "Каякинг"],
    description: "Посещение трех красивых островов провинции Транг с изумрудной пещерой.",
    featured: false,
    category: "beach"
  },
  {
    id: 37,
    title: "Хуа Хин винные дегустации",
    location: "Хуа Хин, Таиланд",
    duration: "5 часов",
    group: "До 16 человек",
    dates: "Круглый год",
    price: "3,490 ₽",
    originalPrice: "3,990 ₽",
    rating: 4.6,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Винодельня", "Дегустация", "Виноградники", "Закуски"],
    description: "Элегантная дегустация вин на местной винодельне с видом на виноградники.",
    featured: false,
    category: "city"
  },
  {
    id: 38,
    title: "Подводное плавание",
    location: "Ко Тао, Таиланд",
    duration: "8 часов",
    group: "До 10 человек",
    dates: "Круглый год",
    price: "4,290 ₽",
    originalPrice: "4,790 ₽",
    rating: 4.9,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Дайвинг", "Коралловые рифы", "Тропические рыбы", "Инструкция"],
    description: "Погружение в подводный мир Сиамского залива с богатыми коралловыми рифами.",
    featured: true,
    category: "adventure"
  },
  {
    id: 39,
    title: "Традиционный массаж",
    location: "Чиангмай, Таиланд",
    duration: "4 часа",
    group: "До 8 человек",
    dates: "Круглый год",
    price: "2,190 ₽",
    originalPrice: "2,690 ₽",
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Тайский массаж", "Релаксация", "Традиции", "Спа"],
    description: "Аутентичный тайский массаж в традиционной обстановке для полного расслабления.",
    featured: false,
    category: "city"
  },
  {
    id: 40,
    title: "Ферма орхидей",
    location: "Пхукет, Таиланд",
    duration: "3 часа",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "1,490 ₽",
    originalPrice: "1,890 ₽",
    rating: 4.3,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Орхидеи", "Ботанический сад", "Фотосессия", "Покупки"],
    description: "Посещение красивой фермы орхидей с сотнями видов экзотических цветов.",
    featured: false,
    category: "city"
  },
  {
    id: 41,
    title: "Остров Панган Full Moon",
    location: "Ко Панган, Таиланд",
    duration: "12 часов",
    group: "До 30 человек",
    dates: "Полнолуние",
    price: "3,990 ₽",
    originalPrice: "4,490 ₽",
    rating: 4.5,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Full Moon Party", "Пляжная вечеринка", "Музыка", "Танцы"],
    description: "Легендарная вечеринка полнолуния на пляже Хаад Рин с музыкой до рассвета.",
    featured: true,
    category: "city"
  },
  {
    id: 42,
    title: "Велосипедный тур по рисовым полям",
    location: "Убуд, Бали",
    duration: "6 часов",
    group: "До 14 человек",
    dates: "Апрель - Октябрь",
    price: "2,690 ₽",
    originalPrice: "3,190 ₽",
    rating: 4.7,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Велосипеды", "Рисовые террасы", "Деревни", "Традиционный обед"],
    description: "Спокойная велопрогулка через живописные рисовые поля и балийские деревни.",
    featured: false,
    category: "adventure"
  },
  {
    id: 43,
    title: "Закат на яхте",
    location: "Пхукет, Таиланд",
    duration: "4 часа",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "4,490 ₽",
    originalPrice: "4,990 ₽",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Яхта", "Закат", "Шампанское", "Романтика"],
    description: "Романтический круиз на яхте с шампанским и потрясающими видами заката над морем.",
    featured: true,
    category: "beach"
  }
];

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "Все туры" },
    { id: "beach", name: "Морские" },
    { id: "city", name: "Городские" },
    { id: "adventure", name: "Приключения" },
    { id: "group", name: "Групповые" }
  ];

  const filteredTours = toursData.filter(tour => 
    selectedCategory === "all" || tour.category === selectedCategory
  );

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
      case "price-high":
        return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  console.log('Tours data:', toursData.length);
  console.log('Filtered tours:', filteredTours.length);
  console.log('Sorted tours:', sortedTours.length);
  console.log('Selected category:', selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Наши туры
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Тщательно спланированные путешествия для создания незабываемых воспоминаний. 
              Выберите идеальный тур из нашей коллекции тайских приключений.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button 
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-full px-4 py-2 text-blue-600"
              >
                <option value="popular">Популярные</option>
                <option value="price-low">Цена: низкая</option>
                <option value="price-high">Цена: высокая</option>
                <option value="rating">Рейтинг</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-600">
              Показано {sortedTours.length} из {toursData.length} туров
            </p>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
              <Card key={tour.id} className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${tour.featured ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="relative h-64 overflow-hidden">
                  {tour.featured && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Хит продаж
                    </div>
                  )}
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="font-bold text-blue-600">{tour.price}</span>
                    {tour.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{tour.originalPrice}</span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{tour.rating}</span>
                      </div>
                      <span className="text-sm">({tour.reviews} отзывов)</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{tour.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{tour.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.group}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{tour.dates}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-gray-800">В тур входит:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {tour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <BookingModal tourTitle={tour.title} tourPrice={tour.price}>
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                        Забронировать
                      </Button>
                    </BookingModal>
                    <Link to={`/category/${tour.category}-tours`}>
                      <Button variant="outline" className="rounded-full">
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

      <Footer />
    </div>
  );
};

export default Tours;
