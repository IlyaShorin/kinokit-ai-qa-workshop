import Link from 'next/link';
import { bookingScenarios } from '@/features/booking/scenarios';

export default function MoviesPage() {
  const evening = bookingScenarios.evening;

  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">Афиша</p>
        <h1>Фильмы KinoKit</h1>
        <h2>{evening.movie.title}</h2>
        <p>{evening.movie.description}</p>
        <Link className="primary-link" href="/sessions/evening">
          Перейти к сеансу
        </Link>
      </section>
    </main>
  );
}
