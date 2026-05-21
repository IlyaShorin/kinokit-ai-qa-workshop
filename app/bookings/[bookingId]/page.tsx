type BookingPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
};

export default async function BookingPage({ params }: BookingPageProps) {
  const { bookingId } = await params;

  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">Демо-бронь</p>
        <h1>Бронирование {bookingId}</h1>
        <p>В первой версии воркшопа подтверждение показывается на странице сеанса.</p>
      </section>
    </main>
  );
}
