# Good Output

Найдена SSR/client hydration проблема.

Классификация: `product bug`.

Шаги:

1. Открыть `/sessions/evening` со сценарием `hydration-mismatch`.
2. Проверить `data-testid="hydration-probe"`.
3. Посмотреть browser console и hydrated UI.

Фактический результат: серверное состояние ожидает `A2`, а клиент после hydration показывает `B1`.

Ожидаемый результат: первый клиентский render должен совпадать с HTML, который пришёл с сервера.

Рекомендуемый regression check: Playwright test, который слушает console/pageerror и проверяет стабильный текст probe.
