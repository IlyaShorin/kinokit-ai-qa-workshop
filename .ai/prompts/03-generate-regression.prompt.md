# Generate Regression Prompt

Сгенерируй Playwright regression test для найденного бага VIP pricing.

Требования:

- используй `.ai/skills/playwright-e2e/SKILL.md`;
- тест должен быть основан на `/sessions/evening`;
- используй `useScenario(page, 'vip-pricing')`, он уже открывает `/sessions/evening`;
- не добавляй отдельный `page.goto` после `useScenario`;
- выбирай `A2` и `B1` через semantic locators;
- `A2` — стандартное место `120 ₽`;
- `B1` — VIP место `240 ₽`;
- проверяй `data-testid="booking-total"`;
- ожидаемый итог: `360 ₽`;
- не используй screenshot assertions;
- сохрани тест как fallback artifact, не подключай его в активный `tests/e2e`.
