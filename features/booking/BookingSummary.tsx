import { calculateTotal, formatPrice } from './calculateTotal';
import type { Seat } from './types';

type BookingSummaryProps = {
  confirmedSeatIds: string[];
  selectedSeatIds: string[];
  selectedSeats: Seat[];
  onBook: () => void;
};

export function BookingSummary({
  confirmedSeatIds,
  selectedSeatIds,
  selectedSeats,
  onBook
}: BookingSummaryProps) {
  const selectedSeatLabel = selectedSeatIds.length > 0 ? selectedSeatIds.join(', ') : 'Места не выбраны';
  const totalPrice = calculateTotal(selectedSeats);

  return (
    <aside className="booking-summary" aria-labelledby="booking-summary-title">
      <h2 id="booking-summary-title">Бронирование</h2>
      <div>
        <h3>Выбранные места</h3>
        <p
          aria-label="Выбранные места"
          className={selectedSeatIds.length > 0 ? undefined : 'empty-selection'}
          role="status"
        >
          {selectedSeatLabel}
        </p>
      </div>
      <div className="summary-line">
        <span>Итого</span>
        <strong data-testid="booking-total">{formatPrice(totalPrice)}</strong>
      </div>
      <button
        className="book-button"
        disabled={selectedSeatIds.length === 0}
        onClick={onBook}
        type="button"
      >
        Забронировать билеты
      </button>
      {confirmedSeatIds.length > 0 ? (
        <p aria-label="Подтверждение брони" className="confirmation" role="status">
          Бронь создана: {confirmedSeatIds.join(', ')}
        </p>
      ) : null}
    </aside>
  );
}
