
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();
  const { ref: formRef, isVisible: formVisible } = useScrollReveal();

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

  const contactMethods = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Telegram",
      value: "@PhuketgaBot",
      color: "#007AFF"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Телефон",
      value: "+66 XX XXX XXXX",
      color: "#34C759"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "info@phukeo.com",
      color: "#FF9500"
    }
  ];

  return (
    <section className="py-10 relative overflow-hidden" style={{ background: '#1C1C1E' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`flex items-center gap-2 mb-6 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.35)'
            }}
          >
            <Send className="w-4 h-4 text-white" />
          </div>
          <h2 
            className="text-xl md:text-2xl font-bold text-white"
            style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}
          >
            Свяжитесь с нами
          </h2>
        </div>
        
        {/* Contact Methods - Liquid Glass Cards */}
        <div 
          ref={cardsRef}
          className={`grid grid-cols-3 gap-3 mb-6 scroll-reveal-stagger ${cardsVisible ? 'is-visible' : ''}`}
        >
          {contactMethods.map((method, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-2xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: `${method.color}20`, color: method.color }}
              >
                {method.icon}
              </div>
              <div 
                className="text-[11px] text-gray-400 mb-0.5"
                style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
              >
                {method.label}
              </div>
              <div 
                className="text-[12px] text-white font-medium truncate"
                style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
              >
                {method.value}
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Form - Liquid Glass */}
        <div 
          ref={formRef}
          className={`max-w-lg mx-auto p-5 rounded-3xl scroll-reveal-scale ${formVisible ? 'is-visible' : ''}`}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-[#007AFF] rounded-xl"
                style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                className="h-12 bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-[#007AFF] rounded-xl"
                style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
              />
            </div>
            
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-[#007AFF] rounded-xl"
              style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
            />
            
            <Textarea
              name="message"
              placeholder="Расскажите о своих планах..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-[#007AFF] resize-none rounded-xl"
              style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
            />
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-12 bg-[#007AFF] hover:bg-[#0051D5] text-white rounded-xl font-semibold transition-all duration-300 active:scale-[0.98]"
              style={{ 
                fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif",
                boxShadow: '0 4px 16px rgba(0, 122, 255, 0.35)'
              }}
            >
              <Send className="w-4 h-4 mr-2" />
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
