# Guided Agent Prompt

Проверь `/sessions/evening` как frontend QA agent.

Используй:

- `docs/booking-invariants.md`;
- `.ai/skills/playwright-e2e/SKILL.md`;
- сценарий `evening` из `features/booking/scenarios.ts`.

Сначала создай короткий test plan.
Затем провзаимодействуй со страницей.
Затем классифицируй каждую находку.

Особенно проверь VIP pricing:

- стандартное место стоит `120 ₽`;
- VIP место стоит `240 ₽`;
- итог должен быть суммой выбранных мест;
- A2 + B1 должны давать `360 ₽`.

Верни короткий bug report с точными шагами воспроизведения.
