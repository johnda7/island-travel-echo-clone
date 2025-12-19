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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-2 px-2 print:p-0 print:bg-white">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0.5cm;
          }
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
        @media screen {
          .voucher-container {
            max-width: 21cm;
            min-height: 29.7cm;
            margin: 0 auto;
          }
        }
        @media screen and (max-width: 768px) {
          .voucher-container {
            max-width: 100%;
            min-height: auto;
          }
        }
        .voucher-input {
          height: 32px !important;
          padding: 4px 8px !important;
          font-size: 13px !important;
        }
        .voucher-label {
          font-size: 12px !important;
          margin-bottom: 2px !important;
        }
      `}</style>
      <div className="voucher-container">
        {/* Основной контейнер ваучера - портретный формат A4 */}
        <div 
          className="bg-white rounded-lg shadow-xl overflow-hidden print:shadow-none print:rounded-none"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '29.7cm'
          }}
        >
          {/* Фирменный заголовок с логотипом - компактный */}
          <div 
            className="px-3 py-2 border-b border-gray-200 print:py-1.5"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.06) 0%, rgba(90, 200, 250, 0.06) 100%)'
            }}
          >
            {/* Логотип и название - компактный */}
            <div className="flex items-center justify-center gap-2 mb-1.5 print:mb-1">
              <div 
                className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center font-black text-sm print:w-7 print:h-7 print:text-xs"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }}
              >
                <span className="text-white">GO</span>
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-lg font-black tracking-tight print:text-base"
                  style={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  ПХУКЕТ
                </span>
                <span 
                  className="text-[10px] font-semibold -mt-0.5 print:text-[9px]"
                  style={{
                    background: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  GO
                </span>
              </div>
            </div>
            <h1 className="text-base font-bold text-gray-900 text-center tracking-tight print:text-sm">
              {tourTitle}
            </h1>
          </div>

          {/* Основной контент - компактный */}
          <div className="px-3 py-2 flex-1 print:px-2.5 print:py-1.5" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Первая строка: №, Date, Pick Up Time */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="voucher-label text-xs font-medium text-gray-700 block">№</label>
                <Input
                  value={formData.number}
                  onChange={(e) => updateField('number', e.target.value)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                  placeholder="Number"
                />
              </div>
              <div>
                <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#007AFF]" />
                  <span>Date</span>
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                />
              </div>
              <div>
                <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#007AFF]" />
                  <span>Pick Up Time</span>
                </label>
                <Input
                  type="time"
                  value={formData.pickUpTime}
                  onChange={(e) => updateField('pickUpTime', e.target.value)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                />
              </div>
            </div>

            {/* Boat - полная ширина */}
            <div>
              <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                <Ship className="w-3 h-3 text-[#007AFF]" />
                <span>Boat</span>
              </label>
              <Input
                value={formData.boat}
                onChange={(e) => updateField('boat', e.target.value)}
                className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                placeholder="Boat name"
              />
            </div>

            {/* Name - полная ширина */}
            <div>
              <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                <User className="w-3 h-3 text-[#007AFF]" />
                <span>Name</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                placeholder="Full name"
              />
            </div>

            {/* Hotel и Room - в одной строке */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#007AFF]" />
                  <span>Hotel</span>
                </label>
                <Input
                  value={formData.hotel}
                  onChange={(e) => updateField('hotel', e.target.value)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                  placeholder="Hotel name"
                />
              </div>
              <div>
                <label className="voucher-label text-xs font-medium text-gray-700">Room</label>
                <Input
                  value={formData.room}
                  onChange={(e) => updateField('room', e.target.value)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                  placeholder="Room"
                />
              </div>
            </div>

            {/* Adult, Child, Infant - в одной строке */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#007AFF]" />
                  <span>Adult</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.adults}
                  onChange={(e) => updateField('adults', parseInt(e.target.value) || 0)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                />
              </div>
              <div>
                <label className="voucher-label text-xs font-medium text-gray-700">Child</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.children}
                  onChange={(e) => updateField('children', parseInt(e.target.value) || 0)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                />
              </div>
              <div>
                <label className="voucher-label text-xs font-medium text-gray-700">Infant</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.infants}
                  onChange={(e) => updateField('infants', parseInt(e.target.value) || 0)}
                  className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                />
              </div>
            </div>

            {/* Price - полная ширина */}
            <div>
              <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#007AFF]" />
                <span>Price</span>
              </label>
              <Input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                placeholder="0"
              />
            </div>

            {/* Payment Details: Deposit, Cash On Tour, Total - в одной строке */}
            <div>
              <h3 className="voucher-label text-xs font-semibold text-gray-900 mb-1">Payment Details</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="voucher-label text-xs font-medium text-gray-700 flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-[#007AFF]" />
                    <span>Deposit</span>
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.deposit}
                    onChange={(e) => updateField('deposit', parseFloat(e.target.value) || 0)}
                    className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="voucher-label text-xs font-medium text-gray-700">Cash On Tour</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.cashOnTour}
                    onChange={(e) => updateField('cashOnTour', parseFloat(e.target.value) || 0)}
                    className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="voucher-label text-xs font-semibold text-gray-900">Total</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.total}
                    onChange={(e) => updateField('total', parseFloat(e.target.value) || 0)}
                    className="voucher-input bg-gray-50 border-gray-200 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] font-semibold"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Секция "Bring With You" - компактная */}
          <div 
            className="px-3 py-3 border-t border-gray-200 relative overflow-hidden print:py-2"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.02) 0%, rgba(90, 200, 250, 0.02) 100%)'
            }}
          >
            {/* Фирменный watermark снизу */}
            <div 
              className="absolute bottom-1 right-2 opacity-8 pointer-events-none print:opacity-5"
              style={{
                transform: 'rotate(-15deg)',
                scale: '0.7'
              }}
            >
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                    boxShadow: '0 2px 8px rgba(0, 122, 255, 0.2)'
                  }}
                >
                  <span className="text-white">GO</span>
                </div>
                <div className="flex flex-col">
                  <span 
                    className="text-xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    ПХУКЕТ
                  </span>
                  <span 
                    className="text-sm font-semibold -mt-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    GO
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10 print:gap-3">
              {/* Английская версия */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5 print:text-xs print:mb-1">Bring With You:</h3>
                <ul className="space-y-1 print:space-y-0.5">
                  {bringWithYou.en.map((item, index) => (
                    <li key={index} className="text-xs text-gray-700 flex items-start gap-1.5 print:text-[11px]">
                      <span className="text-[#007AFF] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Русская версия */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5 print:text-xs print:mb-1">Взять с собой:</h3>
                <ul className="space-y-1 print:space-y-0.5">
                  {bringWithYou.ru.map((item, index) => (
                    <li key={index} className="text-xs text-gray-700 flex items-start gap-1.5 print:text-[11px]">
                      <span className="text-[#007AFF] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Кнопки действий (скрыты при печати) */}
          <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 print:hidden">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleSave}
                className="flex-1 h-9 text-sm"
                style={{
                  background: 'rgba(0, 122, 255, 0.9)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                Save Voucher
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="flex-1 h-9 text-sm"
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