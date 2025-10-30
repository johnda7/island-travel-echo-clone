
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
            Свяжитесь с нами
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
            Готовы начать свое приключение? Мы поможем спланировать идеальное путешествие
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
            </div>
            
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
            
            <Textarea
              name="message"
              placeholder="Расскажите о своих планах путешествия..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
            />
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-[#007AFF] hover:bg-[#0051D5] text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_4px_16px_rgba(0,122,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_20px_rgba(0,122,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]"
              style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
            >
              <Send className="w-5 h-5 mr-2" />
              Отправить сообщение
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
