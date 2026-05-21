import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { BookingFlow } from '@/features/booking/BookingFlow';
import { bookingScenarios } from '@/features/booking/scenarios';

type SessionPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = await params;
  const cookieStore = await cookies();
  const qaScenario = cookieStore.get('qa-scenario')?.value;
  const scenarioId = qaScenario && bookingScenarios[qaScenario] ? qaScenario : sessionId;
  const scenario = bookingScenarios[scenarioId];

  if (!scenario) {
    notFound();
  }

  return (
    <main className="page-shell">
      <header className="session-header">
        <p className="eyebrow">Воркшопный сценарий</p>
        <h1>{scenario.movie.title}</h1>
        <p className="session-meta">
          {scenario.session.hall} · {scenario.session.startsAt}
        </p>
      </header>

      <section className="movie-copy" aria-labelledby="movie-details-title">
        <h2 id="movie-details-title">О фильме</h2>
        <p>{scenario.movie.description}</p>
        <p>Возрастной рейтинг: {scenario.movie.ageRating}</p>
      </section>

      <BookingFlow
        hydrationMismatchDemo={scenarioId === 'hydration-mismatch'}
        seats={scenario.seats}
        visualOverlapDemo={scenarioId === 'mobile-overlap'}
      />
    </main>
  );
}
