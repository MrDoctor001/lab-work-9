# Шпаргалка для защиты Лабораторной работы №9 (ICT6001 — IITU)

Эта шпаргалка поможет вам за 3 минуты уверенно показать проект преподавателю и ответить на любой вопрос по коду.

---

## 1. Как за 10 секунд перенести 4 макета в Figma (без ручного рисования!)

В папке [`figma-frames/`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/figma-frames) я уже сгенерировал для вас **4 готовых векторных макета** со всеми слоями, группами, текстами и размерами:
1. [`Desktop-Light-1440.svg`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/figma-frames/Desktop-Light-1440.svg) (`1440px` — Светлая тема)
2. [`Desktop-Dark-1440.svg`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/figma-frames/Desktop-Dark-1440.svg) (`1440px` — Тёмная тема)
3. [`Mobile-Light-390.svg`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/figma-frames/Mobile-Light-390.svg) (`390px` — Светлая тема)
4. [`Mobile-Dark-390.svg`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/figma-frames/Mobile-Dark-390.svg) (`390px` — Тёмная тема)

**Что сделать:**
1. Откройте пустой проект в **Figma**.
2. Просто перетащите мышкой эти 4 файла `.svg` из папки `figma-frames/` прямо на холст Figma!
3. Figma автоматически превратит их в **4 полноценных редактируемых фрейма (`1440px` и `390px`)** с именованными группами (`01-Header`, `02-Hero-Section`, `03-Tariffs-Section` и т.д.), кнопками, карточками и редактируемым текстом.
4. *(По желанию)* В местах для фото (`[Hero Photo...]`) можете перетащить картинки из папки `images/` (`hero-workspace.webp`, `event-networking.webp` и др.) и включить в правой панели Figma **Layout Grid** (`12 columns, Margin 120, Gutter 24` для Desktop и `4 columns, Margin 20, Gutter 16` для Mobile).

---

## 2. План демонстрации сайта преподавателю (2 минуты)

1. **Откройте [`index.html`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/index.html) в браузере:**
   - Покажите **переключатель темы (Light / Dark Mode)** в шапке и в подвале (Footer). Обновите страницу (`F5`) и скажите: *«Выбранная тема сохраняется в `localStorage`, а при первом входе определяется через `prefers-color-scheme`»*.
2. **Покажите интерактивность тарифов:**
   - Нажмите кнопку **Choose Plan** на карточке `Fixed Desk` (с бейджем `MOST POPULAR`).
   - Покажите, что страница плавно прокрутилась к форме бронирования, а в поле **Workspace Plan** автоматически выбрался `Fixed Desk`.
3. **Покажите валидацию формы бронирования:**
   - Попробуйте поставить `Start Time: 18:00` и `End Time: 09:00` и нажать **Submit Reservation** — форма выдаст ошибку: *«End time must be later than start time»*.
   - Заполните форму корректно и нажмите **Submit Reservation** — появится зелёное уведомление `"Demo request submitted successfully. No real reservation has been created."` без перезагрузки страницы.
4. **Покажите модальные окна и доступность:**
   - Нажмите кнопку **Test Day** в шапке — откроется модальное окно. Нажмите клавишу `Escape` — окно закроется.
   - Нажмите **Learn More** на любом мероприятии в секции `Events` и **Resident Rules** в `Footer` — откроются информационные окна.
5. **Покажите мобильную версию (`F12` -> иконка телефона):**
   - Выставьте ширину **`390px`** (и **`320px`**). Покажите, что горизонтального скролла нет, карточки выстроились в одну колонку, а в шапке появилось работающее **бургер-меню**.

---

## 3. Ответы на вопросы преподавателя по коду (где что находится)

### Вопрос 1: «Где у тебя семантическая вёрстка HTML5?»
- В файле [`index.html`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/index.html):
  - `<header class="site-header">` (строка 31) и `<nav class="main-nav">` (строка 38)
  - `<main id="main-content">` (строка 112)
  - `<section>` для каждого смыслового блока (`Hero`, `Tariffs`, `Amenities`, `Location`, `Events`, `Booking`)
  - `<article>` для каждой карточки тарифа, удобства и мероприятия
  - `<footer class="site-footer">` (строка 514)

### Вопрос 2: «Как реализованы светлая и тёмная темы в CSS и JS?»
- В [`style.css`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/style.css) (строки 6–76): используются CSS Custom Properties (`--background`, `--surface`, `--text`, `--accent`, `--border`) для `:root, [data-theme="light"]` и переопределяются для селектора `[data-theme="dark"]`.
- В [`script.js`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/script.js) (строки 15–99): функция `applyTheme(theme)` меняет атрибут `data-theme` на теге `<html>`, обновляет `aria-pressed` у кнопок и сохраняет значение в `localStorage.setItem('nexus-theme', normalized)`.

### Вопрос 3: «Где используются CSS Grid, Flexbox и подход Mobile-First?»
- **Mobile-First:** в [`style.css`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/style.css) базовые стили написаны сразу для мобильных экранов (`grid-template-columns: 1fr`), а расширение сетки происходит через медиазапросы `@media (min-width: 768px)` (строка 849) и обязательный `@media (min-width: 1024px)` (строка 892).
- **Flexbox:** используется в шапке (`.header-inner`), навигации (`.nav-list`), кнопках (`.btn`) и внутри карточек тарифов (`.tariff-card`).
- **CSS Grid:** используется для сеток `.hero-container`, `.tariffs-grid` (3 колонки на ПК), `.amenities-grid` (4 колонки на ПК), `.location-grid`, `.events-grid`, `.form-grid` и `.footer-grid`.

### Вопрос 4: «Как работает валидация формы без показа красных полей при загрузке?»
- В HTML используются нативные атрибуты `required`, `type="email"`, `type="tel"`, `pattern="^\+?[0-9\s\-\(\)]{10,18}$"`.
- В [`style.css`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/style.css) (строки 678–698) псевдоклассы `:valid` и `:invalid` применяются только вместе с классом `.is-touched` или `.was-validated`, который добавляется через JavaScript при потере фокуса (`blur`) или отправке формы (`submit`).
- В [`script.js`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/script.js) (строки 231–249) функция `validateTimeInterval()` сравнивает значения `startInput.value` и `endInput.value` и вызывает `setCustomValidity()`, если время окончания меньше или равно времени начала.
