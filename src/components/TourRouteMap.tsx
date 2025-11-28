import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';

interface RoutePoint {
  name: string;
  coordinates: [number, number];
  type: 'start' | 'stop' | 'destination';
  time?: string;
  description?: string;
}

interface TourRouteMapProps {
  routePoints: RoutePoint[];
  tourTitle: string;
}

export const TourRouteMap = ({ routePoints, tourTitle }: TourRouteMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Создаем карту с отключенным drag и scroll (iOS mobile fix)
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,           // ❌ Отключаем перетаскивание
      scrollWheelZoom: false,    // ❌ Отключаем zoom колесиком
      doubleClickZoom: false,    // ❌ Отключаем zoom двойным кликом
      touchZoom: false,          // ❌ Отключаем pinch-to-zoom на мобильных
      boxZoom: false,            // ❌ Отключаем zoom выделением
      keyboard: false,           // ❌ Отключаем управление клавиатурой
    }).setView([8.0, 98.5], 9);

    // Добавляем Google Maps (спутник + дороги, без надписей)
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: '© Google Maps',
    }).addTo(map);

    // Кастомные иконки для точек маршрута - Тропическая палитра
    const createCustomIcon = (type: string, number?: number) => {
      const colors = {
        start: '#10B981', // Изумрудный - старт
        stop: '#0EA5E9',  // Небесный - остановки
        destination: '#F97316' // Закатный - финиш
      };

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${colors[type as keyof typeof colors]};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            border: 3px solid white;
          ">
            ${number || (type === 'start' ? '🏁' : '🏁')}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Добавляем маркеры и строим линию маршрута
    const coordinates: L.LatLngExpression[] = [];
    
    routePoints.forEach((point, index) => {
      const marker = L.marker(point.coordinates, {
        icon: createCustomIcon(point.type, index + 1)
      }).addTo(map);

      // Popup в стиле iOS 26
      const popupContent = `
        <div style="
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          padding: 8px;
          min-width: 200px;
        ">
          <div style="
            font-size: 15px;
            font-weight: 600;
            color: #1c1c1e;
            margin-bottom: 4px;
          ">
            ${point.name}
          </div>
          ${point.time ? `
            <div style="
              font-size: 13px;
              color: #8e8e93;
              margin-bottom: 4px;
            ">
              ⏰ ${point.time}
            </div>
          ` : ''}
          ${point.description ? `
            <div style="
              font-size: 13px;
              color: #3c3c43;
              line-height: 1.4;
            ">
              ${point.description}
            </div>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'ios26-popup',
        closeButton: false,
      });

      coordinates.push(point.coordinates);
    });

    // Рисуем линию маршрута - Изумрудная
    const routeLine = L.polyline(coordinates, {
      color: '#10B981',
      weight: 4,
      opacity: 0.9,
      smoothFactor: 1,
      dashArray: '8, 4',
    }).addTo(map);

    // Добавляем анимацию к линии
    let offset = 0;
    const animate = () => {
      offset += 0.5;
      if (offset > 15) offset = 0;
      routeLine.setStyle({ dashOffset: offset.toString() });
      requestAnimationFrame(animate);
    };
    animate();

    // Подгоняем карту под маршрут
    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    // Добавляем кастомный zoom control в стиле iOS 26 Glassmorphism
    const zoomControl = L.control({ position: 'bottomright' });
    zoomControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'ios26-zoom-control');
      div.innerHTML = `
        <button id="zoom-in" style="
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 14px 14px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 400;
          color: #10B981;
          cursor: pointer;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
          transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        ">+</button>
        <button id="zoom-out" style="
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 0 0 14px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 400;
          color: #10B981;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        ">−</button>
      `;

      const zoomInBtn = div.querySelector('#zoom-in') as HTMLButtonElement;
      const zoomOutBtn = div.querySelector('#zoom-out') as HTMLButtonElement;

      // iOS style press effect
      const addPressEffect = (btn: HTMLButtonElement) => {
        btn.addEventListener('mousedown', () => {
          btn.style.transform = 'scale(0.95)';
          btn.style.background = 'rgba(255, 255, 255, 0.85)';
        });
        btn.addEventListener('mouseup', () => {
          btn.style.transform = 'scale(1)';
          btn.style.background = 'rgba(255, 255, 255, 0.92)';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'scale(1)';
          btn.style.background = 'rgba(255, 255, 255, 0.92)';
        });
        // Touch events for mobile
        btn.addEventListener('touchstart', () => {
          btn.style.transform = 'scale(0.95)';
          btn.style.background = 'rgba(255, 255, 255, 0.85)';
        });
        btn.addEventListener('touchend', () => {
          btn.style.transform = 'scale(1)';
          btn.style.background = 'rgba(255, 255, 255, 0.92)';
        });
      };

      addPressEffect(zoomInBtn);
      addPressEffect(zoomOutBtn);

      L.DomEvent.on(zoomInBtn, 'click', () => {
        map.zoomIn();
      });

      L.DomEvent.on(zoomOutBtn, 'click', () => {
        map.zoomOut();
      });

      return div;
    };
    zoomControl.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [routePoints]);

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Заголовок секции - iOS 26 style */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-5 h-5 text-emerald-500" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-gray-900" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.01em'
            }}>
              Маршрут тура
            </h2>
          </div>
          <p className="text-[15px] text-gray-600">
            Весь путь от Пхукета до {routePoints[routePoints.length - 1].name}
          </p>
        </div>

        {/* Карта */}
        <div className="relative rounded-3xl overflow-hidden" style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
          border: '0.5px solid rgba(0, 0, 0, 0.06)'
        }}>
          <div ref={mapRef} style={{ height: '450px', width: '100%' }} />
        </div>

        {/* Легенда маршрута - iOS 26 cards */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
          {routePoints.map((point, index) => (
            <div
              key={index}
              className="p-3 rounded-2xl transition-all duration-200 active:scale-[0.98]"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                border: '0.5px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{
                  background: point.type === 'start' ? '#10B981' : point.type === 'destination' ? '#F97316' : '#0EA5E9'
                }}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-gray-900 mb-0.5">
                    {point.name}
                  </div>
                  {point.time && (
                    <div className="text-[13px] text-gray-500 mb-1">
                      ⏰ {point.time}
                    </div>
                  )}
                  {point.description && (
                    <div className="text-[13px] text-gray-600 leading-snug">
                      {point.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .leaflet-container {
          background: #f2f2f7;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px) saturate(180%);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          border: 0.5px solid rgba(0, 0, 0, 0.08);
          padding: 0;
        }

        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
        }

        .ios26-zoom-control {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .ios26-zoom-control button:active {
          transform: scale(0.95);
          background: rgba(0, 122, 255, 0.1);
        }
      `}</style>
    </section>
  );
};
