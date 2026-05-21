import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">AI QA Workshop</p>
        <h1>KinoKit</h1>
        <p>
          Мини-репозиторий для демонстрации контролируемого frontend QA harness.
        </p>
        <Link className="primary-link" href="/sessions/evening">
          Открыть вечерний сеанс
        </Link>
      </section>
    </main>
  );
}
