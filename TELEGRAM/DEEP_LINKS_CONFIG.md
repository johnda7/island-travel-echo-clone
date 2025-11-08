# 🔗 Deep Links Configuration

Конфигурация всех Deep Links для Telegram бота.

## Формат Deep Link:
```
https://t.me/phuketgos_bot?start=<tour_id>
```

## Список всех 22 туров:

| # | Tour ID | Название | Deep Link |
|---|---------|----------|-----------|
| 1 | `phiphi2days` | Пхи-Пхи 2 дня/1 ночь | `t.me/phuketgos_bot?start=phiphi2days` |
| 2 | `pearls` | 4 жемчужины Андаманского моря | `t.me/phuketgos_bot?start=pearls` |
| 3 | `sightseeing` | Достопримечательности Пхукета | `t.me/phuketgos_bot?start=sightseeing` |
| 4 | `rafting` | Рафтинг + SPA + ATV | `t.me/phuketgos_bot?start=rafting` |
| 5 | `raftingspa` | Рафтинг + SPA (1 день) | `t.me/phuketgos_bot?start=raftingspa` |
| 6 | `kaolak` | Као Лак Сафари | `t.me/phuketgos_bot?start=kaolak` |
| 7 | `11islands` | 11 островов мега-тур | `t.me/phuketgos_bot?start=11islands` |
| 8 | `jamesbond` | Джеймс Бонд + Пханг Нга | `t.me/phuketgos_bot?start=jamesbond` |
| 9 | `avatar` | Озеро Чео Лан (Аватар) | `t.me/phuketgos_bot?start=avatar` |
| 10 | `racha` | Рача + Корал острова | `t.me/phuketgos_bot?start=racha` |
| 11 | `skywalk` | Пханг Нга Скайвок | `t.me/phuketgos_bot?start=skywalk` |
| 12 | `cheolan` | Озеро Чео Лан | `t.me/phuketgos_bot?start=cheolan` |
| 13 | `similan` | Острова Симилан | `t.me/phuketgos_bot?start=similan` |
| 14 | `similanearly` | Симилан ранний выезд | `t.me/phuketgos_bot?start=similanearly` |
| 15 | `similanspeed` | Симилан спидбот | `t.me/phuketgos_bot?start=similanspeed` |
| 16 | `fishing` | Рыбалка на рассвете | `t.me/phuketgos_bot?start=fishing` |
| 17 | `rachasunrise` | Рача + Корал рассвет | `t.me/phuketgos_bot?start=rachasunrise` |
| 18 | `racharawai` | Рача + Корал Раваи | `t.me/phuketgos_bot?start=racharawai` |
| 19 | `phiphisunrise` | Пхи-Пхи рассвет | `t.me/phuketgos_bot?start=phiphisunrise` |
| 20 | `5pearls` | 5 жемчужин 2 дня | `t.me/phuketgos_bot?start=5pearls` |
| 21 | `phangngasamet` | Пханг Нга + Самет | `t.me/phuketgos_bot?start=phangngasamet` |
| 22 | `krabi` | Секреты Краби | `t.me/phuketgos_bot?start=krabi` |

## Использование на сайте:

На каждой странице тура добавить кнопку:
```jsx
<Button onClick={() => window.open('https://t.me/phuketgos_bot?start=phiphi2days')}>
  📱 Открыть в Telegram
</Button>
```

## QR-коды:

Для печатных материалов можно создать QR-коды с этими ссылками через:
- https://qr.io/
- https://www.qr-code-generator.com/

---

**Создано:** 9 ноября 2025  
**Статус:** В разработке (1/22 реализовано)
