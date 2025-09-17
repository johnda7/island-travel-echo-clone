import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, Phone, Mail, Calculator, Minus, Plus, Send } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
  tourTitle: string;
  adultPrice: number;
  childPrice: number;
  children: React.ReactNode;
}

export const BookingModal = ({ tourTitle, adultPrice, childPrice, children }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    adults: 2,
    children: 0
  });

  // Калькулятор цен на основе переданных цен тура
  const totalPrice = (formData.adults * adultPrice) + (formData.children * childPrice);

  const adjustGuests = (type: 'adults' | 'children', direction: 'plus' | 'minus') => {
    setFormData(prev => {
      const current = prev[type];
      const newValue = direction === 'plus' ? current + 1 : Math.max(type === 'adults' ? 1 : 0, current - 1);
      return { ...prev, [type]: newValue };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Формируем сообщение для Telegram бота
    const message = `🏝️ Новая бронь тура!

📋 Тур: ${tourTitle}
💰 Цена: ${totalPrice.toLocaleString()} ฿
👥 Гости: ${formData.adults} взрослых, ${formData.children} детей
📅 Дата: ${formData.date}

👤 Контактная информация:
• Имя: ${formData.name}
• Телефон: ${formData.phone}
• Email: ${formData.email || 'не указан'}

⏰ Заявка подана: ${new Date().toLocaleString('ru-RU')}`;

    // Отправляем в Telegram бот
    const telegramUrl = `https://t.me/PhuketBookBot?start=booking&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Бронирование тура
          </DialogTitle>
          <p className="text-gray-600">{tourTitle}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Калькулятор гостей и цены */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Количество гостей
            </h3>
            
            <div className="space-y-3">
              {/* Взрослые */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Взрослые</span>
                  <span className="text-sm text-gray-500 block">{adultPrice.toLocaleString()} ฿ за человека</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => adjustGuests('adults', 'minus')}
                    disabled={formData.adults <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold w-8 text-center">{formData.adults}</span>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => adjustGuests('adults', 'plus')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Дети */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Дети (4-11 лет)</span>
                  <span className="text-sm text-gray-500 block">{childPrice.toLocaleString()} ฿ за ребенка</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => adjustGuests('children', 'minus')}
                    disabled={formData.children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold w-8 text-center">{formData.children}</span>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => adjustGuests('children', 'plus')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Итоговая цена */}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Итого:</span>
                  <span className="text-xl font-bold text-blue-600">{totalPrice.toLocaleString()} ฿</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="name">Ваше имя *</Label>
            <Input 
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                id="phone"
                className="pl-10"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                id="email"
                type="email"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="date">Дата поездки *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                id="date"
                type="date"
                className="pl-10"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            <Send className="h-4 w-4 mr-2" />
            Забронировать через Telegram
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Нажимая кнопку, вы будете перенаправлены в Telegram бот @PhuketBookBot для завершения бронирования
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
