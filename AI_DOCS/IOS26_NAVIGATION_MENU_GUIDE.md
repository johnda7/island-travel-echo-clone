# 🧭 iOS 26 Navigation Menu - Liquid Glass Design System

## 📅 Создано: 12 октября 2025
## 🎯 Философия: Apple Human Interface Guidelines iOS 26

---

## 🌊 ЧТО ТАКОЕ LIQUID GLASS?

**Liquid Glass** — это революционная система материалов от Apple (iOS 26), которая создает **отдельный функциональный слой** для навигации и контролов, который **плавает над контентом**.

### Ключевые принципы Liquid Glass:

1. **Разделение слоев**
   - 🔝 **Functional Layer** (Liquid Glass) — навигация, кнопки, контролы
   - 📄 **Content Layer** (Standard Materials) — контент, фон приложения

2. **Динамическая прозрачность**
   - Контент **проглядывает снизу** при прокрутке
   - Создает ощущение **глубины и динамики**
   - Поддерживает **читаемость** контролов

3. **Визуальная иерархия**
   - Четкое различие между **интерактивными элементами** и **контентом**
   - Liquid Glass **привлекает внимание** к функциональным элементам

---

## 🎨 LIQUID GLASS ФОРМУЛА

### Regular Variant (для текста и навигации)

```css
/* iOS 26 Liquid Glass - Regular */
.liquid-glass-regular {
  /* Основа */
  background: rgba(255, 255, 255, 0.70);
  
  /* Эффект blur + saturation */
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  
  /* Внутренний свет (глянец) */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.08);
  
  /* Граница для четкости */
  border: 1px solid rgba(255, 255, 255, 0.18);
  
  /* Плавность */
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Clear Variant (для медиа-контента)

```css
/* iOS 26 Liquid Glass - Clear (для фото/видео фонов) */
.liquid-glass-clear {
  /* Высокая прозрачность */
  background: rgba(255, 255, 255, 0.15);
  
  /* Blur меньше, чтобы контент был виден */
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  
  /* Тонкий глянец */
  box-shadow: 
    inset 0 0.5px 0 rgba(255, 255, 255, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.06);
  
  /* Димминг для ярких фонов (35% opacity) */
  /* Добавить если фон яркий */
}

/* Dimming layer для ярких фонов */
.liquid-glass-dimming {
  background: rgba(0, 0, 0, 0.35);
}
```

### Dark Mode (адаптация)

```css
/* iOS 26 Liquid Glass - Dark Mode */
.liquid-glass-dark {
  background: rgba(28, 28, 30, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.10);
}
```

---

## 🧭 НАВИГАЦИОННОЕ МЕНЮ - АРХИТЕКТУРА

### 1. Header с Liquid Glass

```tsx
/* DESKTOP HEADER - Sticky Top Navigation */
<header className="fixed top-0 left-0 right-0 z-50">
  <div 
    className="liquid-glass-header"
    style={{
      background: 'rgba(255, 255, 255, 0.70)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 0 rgba(0, 0, 0, 0.08)',
      border: '0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
    }}
  >
    {/* Logo */}
    <div className="logo-container">
      <img src="/logo.svg" className="h-10 w-10" />
      <span className="text-[17px] font-semibold">Island Travel</span>
    </div>
    
    {/* Desktop Navigation Links */}
    <nav className="hidden lg:flex items-center gap-6">
      <a href="#/tours" className="nav-link">Туры</a>
      <a href="#/about" className="nav-link">О нас</a>
      <a href="#/reviews" className="nav-link">Отзывы</a>
      <a href="#/contacts" className="nav-link">Контакты</a>
    </nav>
    
    {/* CTA Button */}
    <Button className="btn-telegram">
      Написать в Telegram
    </Button>
    
    {/* Mobile Menu Button */}
    <button className="lg:hidden">
      <Menu className="w-6 h-6" />
    </button>
  </div>
</header>
```

### 2. Mobile Navigation Drawer (Liquid Glass)

```tsx
/* MOBILE DRAWER - Full Screen Overlay */
<div 
  className="mobile-nav-drawer"
  style={{
    /* Overlay backdrop */
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    
    /* Full screen */
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    
    /* Animation */
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  }}
>
  {/* Drawer Panel */}
  <div 
    className="drawer-panel"
    style={{
      /* Liquid Glass Panel */
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.12), inset 1px 0 0 rgba(255, 255, 255, 0.2)',
      
      /* Position */
      position: 'absolute',
      top: 0,
      right: 0,
      width: '85%',
      maxWidth: '400px',
      height: '100%',
      
      /* Slide animation */
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      
      /* Safe area */
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}
  >
    {/* Close Button */}
    <button 
      className="close-button"
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(142, 142, 147, 0.12)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        cursor: 'pointer'
      }}
    >
      <X className="w-5 h-5" style={{ color: '#007AFF' }} />
    </button>
    
    {/* Navigation Links */}
    <nav className="nav-content" style={{ padding: '80px 24px 24px' }}>
      {/* Categorized Menu */}
      <div className="space-y-6">
        {/* Морские туры */}
        <div>
          <h3 className="nav-category-title">
            🏝️ Морские туры
          </h3>
          <div className="nav-links">
            <a href="#/tours?category=islands" className="nav-link-mobile">
              Все морские туры
            </a>
            <a href="#/tours?tag=пхи-пхи" className="nav-link-mobile">
              Пхи-Пхи острова
            </a>
            <a href="#/tours?tag=джеймс бонд" className="nav-link-mobile">
              Джеймс Бонд
            </a>
            <a href="#/tours?tag=11 островов" className="nav-link-mobile">
              11 островов
            </a>
          </div>
        </div>
        
        {/* Активные туры */}
        <div>
          <h3 className="nav-category-title">
            🎯 Активные туры
          </h3>
          <div className="nav-links">
            <a href="#/tours?category=adventure" className="nav-link-mobile">
              Все активные туры
            </a>
            <a href="#/tours?tag=рафтинг" className="nav-link-mobile">
              Рафтинг + ATV
            </a>
            <a href="#/tours?tag=слоны" className="nav-link-mobile">
              Слоны и природа
            </a>
          </div>
        </div>
        
        {/* Культурные туры */}
        <div>
          <h3 className="nav-category-title">
            🏛️ Культурные туры
          </h3>
          <div className="nav-links">
            <a href="#/tours/dostoprimechatelnosti-phuketa" className="nav-link-mobile">
              Достопримечательности Пхукета
            </a>
            <a href="#/tours?tag=храмы" className="nav-link-mobile">
              Храмы и обзорные
            </a>
          </div>
        </div>
        
        {/* Информация */}
        <div>
          <h3 className="nav-category-title">
            ℹ️ Информация
          </h3>
          <div className="nav-links">
            <a href="#/help/faq" className="nav-link-mobile">
              Частые вопросы
            </a>
            <a href="#/reviews" className="nav-link-mobile">
              Отзывы
            </a>
            <a href="#/about" className="nav-link-mobile">
              О компании
            </a>
          </div>
        </div>
      </div>
      
      {/* CTA Button */}
      <Button 
        className="btn-telegram w-full mt-8"
        style={{
          background: '#0088cc',
          backdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 4px 16px rgba(0, 136, 204, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      >
        📱 Написать в Telegram
      </Button>
    </nav>
  </div>
</div>
```

---

## 📱 CSS КЛАССЫ - ЦЕНТРАЛИЗОВАННЫЕ СТИЛИ

```css
/* ============================================
   iOS 26 LIQUID GLASS NAVIGATION SYSTEM
   ============================================ */

/* --- HEADER LIQUID GLASS --- */
.liquid-glass-header {
  background: rgba(255, 255, 255, 0.70);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 
              0 1px 0 rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  height: 64px;
  
  /* Sticky */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  
  /* Safe area for iOS */
  padding-top: max(12px, env(safe-area-inset-top));
  
  /* Animation */
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scroll effect - увеличить blur и opacity */
.liquid-glass-header.scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px) saturate(190%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 
              0 2px 16px rgba(0, 0, 0, 0.12);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .liquid-glass-header {
    background: rgba(28, 28, 30, 0.85);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 
                0 1px 0 rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  }
  
  .liquid-glass-header.scrolled {
    background: rgba(28, 28, 30, 0.92);
  }
}

/* --- NAVIGATION LINKS --- */
.nav-link {
  /* Typography */
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  
  /* Color */
  color: #1C1C1E;
  
  /* Interactive */
  text-decoration: none;
  cursor: pointer;
  position: relative;
  
  /* Transition */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: #007AFF;
}

.nav-link:active {
  color: #0051D5;
  transform: scale(0.98);
}

/* Underline effect */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: #007AFF;
  border-radius: 1px;
  opacity: 0;
  transform: scaleX(0);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

/* --- MOBILE DRAWER --- */
.mobile-nav-drawer {
  /* Backdrop */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  
  /* Blur overlay */
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  /* Animation */
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-panel {
  /* Liquid Glass */
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12), 
              inset 1px 0 0 rgba(255, 255, 255, 0.2);
  
  /* Position */
  position: absolute;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 400px;
  height: 100%;
  
  /* Safe area */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  
  /* Animation */
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark mode drawer */
@media (prefers-color-scheme: dark) {
  .drawer-panel {
    background: rgba(28, 28, 30, 0.95);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.4), 
                inset 1px 0 0 rgba(255, 255, 255, 0.08);
  }
}

/* --- MOBILE NAV LINKS --- */
.nav-category-title {
  /* Typography */
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  
  /* Color */
  color: #1C1C1E;
  
  /* Spacing */
  margin-bottom: 12px;
  padding-bottom: 8px;
  
  /* Border */
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

@media (prefers-color-scheme: dark) {
  .nav-category-title {
    color: #FFFFFF;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  }
}

.nav-link-mobile {
  /* Display */
  display: block;
  
  /* Typography */
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.01em;
  
  /* Color */
  color: #3C3C43;
  text-decoration: none;
  
  /* Spacing */
  padding: 12px 16px;
  margin: 2px 0;
  
  /* Background on hover */
  border-radius: 10px;
  
  /* Transition */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link-mobile:hover {
  background: rgba(0, 122, 255, 0.08);
  color: #007AFF;
}

.nav-link-mobile:active {
  background: rgba(0, 122, 255, 0.15);
  transform: scale(0.98);
}

@media (prefers-color-scheme: dark) {
  .nav-link-mobile {
    color: #EBEBF5;
  }
  
  .nav-link-mobile:hover {
    background: rgba(0, 122, 255, 0.12);
    color: #0A84FF;
  }
}

/* --- CLOSE BUTTON --- */
.close-button {
  /* Size */
  width: 36px;
  height: 36px;
  
  /* Shape */
  border-radius: 50%;
  
  /* Liquid Glass */
  background: rgba(142, 142, 147, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  
  /* Center icon */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Interactive */
  cursor: pointer;
  
  /* Transition */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.close-button:hover {
  background: rgba(142, 142, 147, 0.18);
  transform: scale(1.05);
}

.close-button:active {
  background: rgba(142, 142, 147, 0.25);
  transform: scale(0.95);
}

@media (prefers-color-scheme: dark) {
  .close-button {
    background: rgba(142, 142, 147, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.10);
  }
}

/* --- TELEGRAM BUTTON IN NAV --- */
.btn-telegram-nav {
  /* Telegram Blue */
  background: #0088cc;
  
  /* Liquid Glass effect */
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 4px 16px rgba(0, 136, 204, 0.3), 
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  /* Typography */
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: white;
  
  /* Spacing */
  padding: 10px 20px;
  
  /* Shape */
  border-radius: 12px;
  border: none;
  
  /* Interactive */
  cursor: pointer;
  
  /* Transition */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-telegram-nav:hover {
  background: #0095db;
  box-shadow: 0 6px 20px rgba(0, 136, 204, 0.4), 
              inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.btn-telegram-nav:active {
  background: #0077b3;
  box-shadow: 0 2px 8px rgba(0, 136, 204, 0.3), 
              inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: scale(0.98);
}
```

---

## 🎯 ПРАВИЛА ИСПОЛЬЗОВАНИЯ LIQUID GLASS

### ✅ DO (Делать):

1. **Используй для навигации и контролов**
   - Header navigation
   - Tab bars
   - Sidebars
   - Floating buttons
   - Modal headers

2. **Regular variant для текста**
   - Навигационные меню
   - Списки с текстом
   - Поповеры с информацией

3. **Clear variant для медиа**
   - Контролы видео плеера
   - Оверлеи на фотографиях
   - Gallery навигация

4. **Scroll effects**
   - Увеличивай blur при скролле
   - Добавляй opacity при скролле
   - Используй shadow для глубины

5. **Спаринговое использование**
   - Только для ВАЖНЫХ элементов
   - Не перегружай страницу эффектами

### ❌ DON'T (Не делать):

1. **НЕ используй в content layer**
   - Карточки туров — стандартный white
   - Описания — стандартный background
   - Формы — стандартные материалы

2. **НЕ перегружай эффектами**
   - Максимум 2-3 Liquid Glass элемента на экране
   - Остальное — стандартные материалы

3. **НЕ используй для статичного контента**
   - Liquid Glass = ИНТЕРАКТИВНЫЕ элементы
   - Статичный контент = стандартные материалы

4. **НЕ делай слишком прозрачным**
   - Regular: 0.70 opacity минимум
   - Clear: 0.15 opacity минимум
   - Контролы должны быть читаемы!

---

## 📐 РАЗМЕРЫ И SPACING (iOS 26)

### Header
```css
height: 64px (desktop), 56px (mobile)
padding: 12px 24px (desktop), 8px 16px (mobile)
safe-area-inset-top: env(safe-area-inset-top)
```

### Navigation Links
```css
font-size: 15px (SF Pro Text)
letter-spacing: -0.01em
padding: 12px 16px (mobile)
gap: 24px (desktop)
```

### Mobile Drawer
```css
width: 85% (max 400px)
padding: 80px 24px 24px (top для close button)
safe-area-inset: top + bottom
```

### Touch Targets
```css
min-height: 44px (Apple HIG)
min-width: 44px
border-radius: 10px-12px (interactive)
```

---

## 🎨 ЦВЕТА (iOS 26 Semantic)

```css
/* Primary */
--ios-blue: #007AFF;         /* Hover, active links */
--ios-blue-dark: #0051D5;    /* Active state */

/* Telegram */
--telegram-blue: #0088cc;    /* CTA button */

/* Backgrounds */
--glass-light: rgba(255, 255, 255, 0.70);
--glass-dark: rgba(28, 28, 30, 0.85);

/* Text */
--text-primary: #1C1C1E;     /* Headers, links */
--text-secondary: #3C3C43;   /* Body text */
--text-tertiary: #8E8E93;    /* Captions */

/* Borders */
--border-light: rgba(0, 0, 0, 0.08);
--border-dark: rgba(255, 255, 255, 0.10);
```

---

## 🚀 РЕАЛИЗАЦИЯ - ПОШАГОВЫЙ ПЛАН

### Этап 1: Обновить Header Component
1. Добавить Liquid Glass styles
2. Реализовать scroll effect
3. Добавить mobile menu button
4. Тестировать на всех разрешениях

### Этап 2: Создать Mobile Drawer
1. Новый компонент `MobileNavigationDrawer.tsx`
2. Liquid Glass panel с категориями
3. Анимации open/close
4. Gesture handlers (swipe to close)

### Этап 3: Централизовать стили
1. Добавить все классы в `src/index.css`
2. Использовать в Header и Drawer
3. Применить к будущим компонентам

### Этап 4: Тестирование
1. Safari iOS (primary target)
2. Chrome Android
3. Desktop browsers
4. Dark mode
5. Accessibility (VoiceOver)

---

## 📊 ПРИМЕРЫ ИЗ APPLE

### App Store (iOS 26)
- Header: Liquid Glass с search bar
- Tab bar: Liquid Glass внизу
- Scroll effect: Blur увеличивается

### Safari (iOS 26)
- Address bar: Liquid Glass
- Tab switcher: Liquid Glass cards
- Background dimming: 35% opacity

### Music (iOS 26)
- Now Playing: Clear variant (над album art)
- Navigation: Regular variant
- Player controls: Thin Liquid Glass

---

## 🎯 ФИЛОСОФИЯ "EVERY PIXEL MATTERS"

> **"Liquid Glass — это не просто красивый эффект. Это функциональный инструмент для создания визуальной иерархии между контролами и контентом."**

**Принципы:**

1. **Clarity** — пользователь должен сразу понимать, что кликабельно
2. **Depth** — слои создают ощущение пространства
3. **Deference** — дизайн не мешает контенту
4. **Legibility** — контролы всегда читаемы

---

## 📚 РЕСУРСЫ

### Apple Documentation
- [Materials - Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Adopting Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass)
- [Meet Liquid Glass - WWDC 2025](https://developer.apple.com/videos/play/wwdc2025/219)

### Наши документы
- `IOS26_DESIGN_PROMPT.md` - Полное руководство iOS 26
- `CENTRALIZED_TOUR_SYSTEM.md` - Система шаблонов
- `TEMPLATE_STANDARDS_GUIDE.md` - Стандарты компонентов

---

## ✅ ЧЕКЛИСТ ПЕРЕД КОММИТОМ

### Визуал
- [ ] Liquid Glass blur работает на всех браузерах
- [ ] Safe area insets учтены (iOS notch)
- [ ] Scroll effect плавный
- [ ] Dark mode адаптация работает
- [ ] Анимации 60fps

### Функциональность
- [ ] Все ссылки работают
- [ ] Mobile drawer открывается/закрывается
- [ ] Swipe to close работает
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Touch targets минимум 44px

### Accessibility
- [ ] VoiceOver читает элементы
- [ ] aria-labels добавлены
- [ ] Контраст текста ≥ 4.5:1
- [ ] Focus indicators видны

### Performance
- [ ] Blur не лагает на скролле
- [ ] Анимации используют GPU (transform, opacity)
- [ ] Нет layout shifts
- [ ] Lighthouse Score ≥ 90

---

**🎨 Готово! Теперь у нас есть полное руководство по iOS 26 Liquid Glass Navigation!**

Все готово к реализации современного навигационного меню с эффектом жидкого стекла! 🚀
