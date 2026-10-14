# YachtJet-page

Адаптивний односторінковий сайт оренди яхт на семантичному HTML, CSS і
JavaScript. Збірка — Vite. Реалізація виконується поетапно за
[макетом Figma](https://www.figma.com/design/GJJbb74KfTkEzwB6Whjd22/YachtJet--Copy-?node-id=0-1).

## Локальний запуск

Потрібен Node.js 24, як у GitHub Actions.

```sh
npm ci
npm run dev
```

Адресу локального сервера Vite показує в терміналі.

```sh
npm run build
npm run preview
npm run format
npm run format:check
```

## Структура

- `src/index.html` — головна сторінка, яка підключає секції через `<load>`.
- `src/partials/` — header, hero, about, yachts, advantages, rent, reviews,
  footer.
- `src/css/index.css` — точка входу для стилів і нормалізатора.
- `src/css/tokens.css` — кольори та шрифт; `base.css`, `reset.css`,
  `container.css`, `utilities.css` — спільні стилі.
- `src/img/` — майбутні зображення та SVG-іконки з макета.
- `src/main.js` — точка входу для JavaScript.

Inter 400/500 підключено локально з `@fontsource/inter`. Нормалізація —
`modern-normalize`. Контейнер гумовий від 320 px, обмежений 375 px для mobile;
наступні переходи — 768, 1280 і 1440 px.

## Поточний етап

Етап 1 завершено: демонстраційний контент прибрано, створено каркас секцій,
підключено базові стилі, шрифти та Prettier. Сторінка поки показує заголовки
майбутніх секцій; їхнє оформлення, зображення та інтерактивність реалізуються на
наступних етапах. Фавікон із шаблона прибрано; іконку YachtJet додамо з
ресурсами бренду.

План і погоджені рішення:
[docs/implementation-plan.md](docs/implementation-plan.md).

## GitHub Pages

Production-збірка створює `dist` зі шляхом `--base=/YachtJet-page/`. Workflow
`.github/workflows/deploy.yml` збирає сайт після push у `main` та публікує його
в `gh-pages`. Підтримується також ручний запуск `Run workflow`.

У `Settings` → `Pages` потрібно вибрати `Deploy from a branch`, гілку
`gh-pages`, папку `/(root)`.

Адреса опублікованого сайту: https://vadym-gr.github.io/YachtJet-page/.

Проєкт походить із шаблона GoIT `vanilla-app-template`.
