import { useState } from "react";
import { Calendar, Clock, Ship, User, Building, Users, CreditCard, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TourVoucherData {
  number: string;
  date: string;
  pickUpTime: string;
  boat: string;
  name: string;
  hotel: string;
  room: string;
  adults: number;
  children: number;
  infants: number;
  price: number;
  deposit: number;
  cashOnTour: number;
  total: number;
}

interface TourVoucherProps {
  tourTitle?: string;
  initialData?: Partial<TourVoucherData>;
  onSave?: (data: TourVoucherData) => void;
  onPrint?: () => void;
}

export const TourVoucher = ({ 
  tourTitle = "Tour Voucher",
  initialData = {},
  onSave,
  onPrint 
}: TourVoucherProps) => {
  const [formData, setFormData] = useState<TourVoucherData>({
    number: initialData.number || "",
    date: initialData.date || "",
    pickUpTime: initialData.pickUpTime || "",
    boat: initialData.boat || "",
    name: initialData.name || "",
    hotel: initialData.hotel || "",
    room: initialData.room || "",
    adults: initialData.adults || 0,
    children: initialData.children || 0,
    infants: initialData.infants || 0,
    price: initialData.price || 0,
    deposit: initialData.deposit || 0,
    cashOnTour: initialData.cashOnTour || 0,
    total: initialData.total || 0,
  });

  const updateField = (field: keyof TourVoucherData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  // Список "Взять с собой" на двух языках
  const bringWithYou = {
    en: [
      "Copy of the passport",
      "Towel",
      "Sunscreen",
      "Headdress",
      "Replaceable things",
      "Pocket money"
    ],
    ru: [
      "Копия паспорта",
      "Полотенце",
      "Крем от солнца",
      "Головной убор",
      "Сменные вещи",
      "Деньги на карманные расходы"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4 print:p-0 print:bg-white">
      <style>{`
        @media print {
          @page {
            margin: 0.5cm;
          }
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        {/* Основной контейнер ваучера */}
        <div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none"
          style={{
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Заголовок */}
          <div 
            className="px-6 py-4 border-b border-gray-100"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(90, 200, 250, 0.05) 100%)'
            }}
          >
            <h1 className="text-2xl font-bold text-gray-900 text-center tracking-tight">
              {tourTitle}
            </h1>
          </div>

          {/* Основной контент */}
          <div className="p-6 space-y-6">
            {/* Первая строка: №, Date, Pick Up Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span>№</span>
                </label>
                <Input
                  value={formData.number}
                  onChange={(e) => updateField('number', e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                  placeholder="Voucher number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#007AFF]" />
                  <span>Date</span>
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#007AFF]" />
                  <span>Pick Up Time</span>
                </label>
                <Input
                  type="time"
                  value={formData.pickUpTime}
                  onChange={(e) => updateField('pickUpTime', e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                />
              </div>
            </div>

            {/* Boat */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#007AFF]" />
                <span>Boat</span>
              </label>
              <Input
                value={formData.boat}
                onChange={(e) => updateField('boat', e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                placeholder="Boat name"
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-[#007AFF]" />
                <span>Name</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                placeholder="Full name"
              />
            </div>

            {/* Hotel и Room */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#007AFF]" />
                  <span>Hotel</span>
                </label>
                <Input
                  value={formData.hotel}
                  onChange={(e) => updateField('hotel', e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                  placeholder="Hotel name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Room</label>
                <Input
                  value={formData.room}
                  onChange={(e) => updateField('room', e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                  placeholder="Room number"
                />
              </div>
            </div>

            {/* Adult, Child, Infant */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#007AFF]" />
                  <span>Adult</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.adults}
                  onChange={(e) => updateField('adults', parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Child</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.children}
                  onChange={(e) => updateField('children', parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Infant</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.infants}
                  onChange={(e) => updateField('infants', parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#007AFF]" />
                <span>Price</span>
              </label>
              <Input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                placeholder="0"
              />
            </div>

            {/* Payment Details: Deposit, Cash On Tour, Total */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#007AFF]" />
                    <span>Deposit</span>
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.deposit}
                    onChange={(e) => updateField('deposit', parseFloat(e.target.value) || 0)}
                    className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cash On Tour</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.cashOnTour}
                    onChange={(e) => updateField('cashOnTour', parseFloat(e.target.value) || 0)}
                    className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900">Total</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.total}
                    onChange={(e) => updateField('total', parseFloat(e.target.value) || 0)}
                    className="bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF] font-semibold"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Секция "Bring With You" */}
          <div 
            className="px-6 py-6 border-t border-gray-100"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.02) 0%, rgba(90, 200, 250, 0.02) 100%)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Английская версия */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Bring With You:</h3>
                <ul className="space-y-2">
                  {bringWithYou.en.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-[#007AFF] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Русская версия */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Взять с собой:</h3>
                <ul className="space-y-2">
                  {bringWithYou.ru.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-[#007AFF] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Кнопки действий (скрыты при печати) */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 print:hidden">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSave}
                className="flex-1"
                style={{
                  background: 'rgba(0, 122, 255, 0.9)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                Save Voucher
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="flex-1"
                style={{
                  borderColor: '#007AFF',
                  color: '#007AFF'
                }}
              >
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};