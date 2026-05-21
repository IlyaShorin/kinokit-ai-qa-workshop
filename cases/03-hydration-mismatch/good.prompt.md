# Good Prompt

Проверь `/sessions/evening` как SSR/client QA scenario.

Используй сценарий `hydration-mismatch`.

Шаги:

1. Подпишись на browser console и page errors.
2. Открой страницу через `useScenario(page, 'hydration-mismatch')`.
3. Проверь `aria-label="Выбранные места"` и `aria-pressed` на кнопках мест `A2` и `B1`.
4. Сравни серверное ожидаемое состояние `A2` и клиентское состояние после hydration.
5. Классифицируй проблему как `product bug`, `test bug`, `testability issue`, `unclear requirement` или `mock or environment issue`.
6. Верни короткий bug report.
