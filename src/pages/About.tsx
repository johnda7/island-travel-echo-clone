
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, MapPin, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Довольных клиентов", value: "15,000+" },
    { icon: MapPin, label: "Направлений", value: "50+" },
    { icon: Award, label: "Лет опыта", value: "12" },
    { icon: Clock, label: "Туров проведено", value: "3,500+" }
  ];

  const team = [
    {
      name: "Анна Волкова",
      position: "Основатель и CEO",
      image: "/src/assets/logo.jpg", 
      description: "15 лет в туризме, эксперт по островным направлениям"
    },
    {
      name: "Михаил Петров", 
      position: "Директор по развитию",
      image: "/src/assets/logo.jpg",
      description: "Специалист по эксклюзивным турам и VIP обслуживанию"
    },
    {
      name: "Елена Смирнова",
      position: "Менеджер по качеству", 
      image: "/src/assets/logo.jpg",
      description: "Отвечает за качество услуг и удовлетворенность клиентов"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              О нас
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Мы создаем незабываемые путешествия к самым красивым островам планеты. 
              Наша миссия - делать мечты о райском отдыхе реальностью.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Наша история
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  TIsland началась как мечта двух путешественников, влюбленных в острова. 
                  В 2012 году мы совершили свое первое путешествие на Санторини и поняли, 
                  что хотим делиться этой красотой с другими.
                </p>
                <p>
                  За 12 лет работы мы исследовали более 50 островных направлений, 
                  создали партнерские отношения с лучшими отелями и гидами, 
                  и помогли тысячам людей открыть для себя магию островной жизни.
                </p>
                <p>
                  Сегодня мы - команда профессионалов, которые знают каждый остров 
                  как свой дом и готовы создать для вас идеальное путешествие.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/phi-phi-2days/maya-bay-1.jpg"
                alt="Пхи-Пхи острова"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессионалы с многолетним опытом, которые создают ваши идеальные путешествия
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="relative inline-block mb-6">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Наши ценности
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Качество</h3>
              <p className="text-gray-600">
                Мы работаем только с проверенными партнерами и гарантируем 
                высочайший уровень сервиса в каждом путешествии.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Индивидуальность</h3>
              <p className="text-gray-600">
                Каждый тур создается с учетом ваших пожеланий и потребностей. 
                Нет двух одинаковых путешествий.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Экспертность</h3>
              <p className="text-gray-600">
                Мы лично посещаем все наши направления и знаем каждый остров 
                изнутри, чтобы дать вам лучшие рекомендации.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
