import { HttpResponse, http } from 'msw';
import { bookingApiOrigin } from '../features/booking/apiContract';
import { bookingScenarios } from '../features/booking/scenarios';

export const bookingApiHandlers = [
  http.get(`${bookingApiOrigin}/api/sessions/:sessionId`, ({ params, request }) => {
    const sessionId = String(params.sessionId);
    const requestedScenario = new URL(request.url).searchParams.get('scenario');
    const scenarioId =
      requestedScenario && bookingScenarios[requestedScenario] ? requestedScenario : sessionId;
    const scenario = bookingScenarios[scenarioId];

    if (scenario === undefined) {
      return HttpResponse.json({ message: `Unknown booking session: ${sessionId}` }, { status: 404 });
    }

    return HttpResponse.json(scenario);
  })
];
