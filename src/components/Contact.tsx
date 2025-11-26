
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle } from "lucide-react";
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

  // Telegram бот - @phuketgos_bot
  const openTelegramBot = () => {
    window.open('https://t.me/phuketgos_bot', '_blank');
  };

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
        
        {/* Telegram Button - единственный способ связи */}
        <div 
          ref={cardsRef}
          className={`mb-6 scroll-reveal ${cardsVisible ? 'is-visible' : ''}`}
        >
          <button
            onClick={openTelegramBot}
            className="w-full p-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98]"
            style={{
              background: 'rgba(0, 122, 255, 0.15)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(0, 122, 255, 0.3)'
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0, 122, 255, 0.2)' }}
            >
              <MessageCircle className="w-6 h-6" style={{ color: '#007AFF' }} />
            </div>
            <div className="text-left">
              <div 
                className="text-[15px] font-semibold text-white"
                style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
              >
                Написать в Telegram
              </div>
              <div 
                className="text-[13px]"
                style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif", color: '#8E8E93' }}
              >
                @phuketgos_bot — ответим быстро!
              </div>
            </div>
          </button>
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
