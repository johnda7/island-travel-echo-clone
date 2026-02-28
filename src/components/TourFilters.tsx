import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TourFilterOptions {
  priceRange: [number, number];
  duration: string[];
  categories: string[];
}

interface TourFiltersProps {
  onFilterChange: (filters: TourFilterOptions) => void;
  tourCount: number;
}

export const TourFilters = ({ onFilterChange, tourCount }: TourFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const durations = ['1 день', '2 дня'];
  const categories = [
    { id: 'islands', label: '🏝️ Острова' },
    { id: 'adventure', label: '🌿 Природа' },
    { id: 'cultural', label: '🏛️ Обзорные' },
    { id: 'diving', label: '🤿 Дайвинг' },
    { id: 'fishing', label: '🎣 Рыбалка' }
  ];

  const handleDurationToggle = (duration: string) => {
    const updated = selectedDurations.includes(duration)
      ? selectedDurations.filter(d => d !== duration)
      : [...selectedDurations, duration];
    setSelectedDurations(updated);
    applyFilters(priceRange, updated, selectedCategories);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updated);
    applyFilters(priceRange, selectedDurations, updated);
  };

  const handlePriceChange = (index: number, value: number) => {
    const updated: [number, number] = index === 0 
      ? [value, priceRange[1]] 
      : [priceRange[0], value];
    setPriceRange(updated);
    applyFilters(updated, selectedDurations, selectedCategories);
  };

  const applyFilters = (price: [number, number], durations: string[], categories: string[]) => {
    onFilterChange({
      priceRange: price,
      duration: durations,
      categories: categories
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedDurations([]);
    setSelectedCategories([]);
    onFilterChange({
      priceRange: [0, 10000],
      duration: [],
      categories: []
    });
  };

  const hasActiveFilters = selectedDurations.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000;

  return (
    <div className="relative mb-6">
      {/* Filter Button - iOS 26 Style */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif"
        }}
      >
        <Filter className="w-4 h-4 mr-2" />
        Фильтры
        {hasActiveFilters && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
            {selectedDurations.length + selectedCategories.length}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 md:p-6 z-50 animate-fade-in"
          style={{
            backdropFilter: 'blur(40px) saturate(180%)',
            background: 'rgba(255, 255, 255, 0.95)',
            fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Фильтры туров</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              💰 Цена: {priceRange[0]}฿ - {priceRange[1]}฿
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0฿</span>
              <span>10,000฿</span>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ⏱️ Длительность
            </label>
            <div className="flex flex-wrap gap-2">
              {durations.map(duration => (
                <button
                  key={duration}
                  onClick={() => handleDurationToggle(duration)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedDurations.includes(duration)
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              🎯 Категории
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                    selectedCategories.includes(category.id)
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Найдено: <span className="font-bold text-blue-600">{tourCount}</span> туров
            </span>
            <div className="flex space-x-2">
              {hasActiveFilters && (
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  size="sm"
                  className="text-gray-700"
                >
                  Сбросить
                </Button>
              )}
              <Button
                onClick={() => setIsOpen(false)}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Применить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
