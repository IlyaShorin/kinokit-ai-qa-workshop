import { formatPrice } from './calculateTotal';
import type { Seat } from './types';

type SeatMapProps = {
  seats: Seat[];
  selectedSeatIds: string[];
  onSeatToggle: (seat: Seat) => void;
};

export function SeatMap({ seats, selectedSeatIds, onSeatToggle }: SeatMapProps) {
  const rows = Array.from(new Set(seats.map((seat) => seat.row))).map((row) => ({
    row,
    seats: seats.filter((seat) => seat.row === row)
  }));

  return (
    <section className="seat-map" aria-label="Карта мест" data-testid="seat-map">
      <h2>Карта мест</h2>
      <div className="legend" aria-label="Обозначения мест">
        <span className="legend-item">
          <span className="legend-swatch standard" />
          стандартные места
        </span>
        <span className="legend-item">
          <span className="legend-swatch vip" />
          VIP места
        </span>
        <span className="legend-item">
          <span className="legend-swatch occupied" />
          занятые места
        </span>
      </div>
      <div className="screen">Экран</div>
      <div className="seat-grid" aria-label="Доступные и занятые места">
        {rows.map(({ row, seats: rowSeats }) => (
          <div className="seat-row" key={row}>
            <span className="row-label" aria-hidden="true">
              {row}
            </span>
            {rowSeats.map((seat) => {
              const isSelected = selectedSeatIds.includes(seat.id);
              const typeLabel = seat.type === 'vip' ? 'VIP' : 'стандарт';
              const statusLabel = seat.status === 'occupied' ? 'занято' : 'доступно';

              return (
                <button
                  aria-label={`Место ${seat.id}, ${typeLabel}, ${formatPrice(seat.price)}, ${statusLabel}`}
                  aria-pressed={isSelected}
                  className={[
                    'seat-button',
                    seat.type,
                    seat.status,
                    isSelected ? 'selected' : ''
                  ].join(' ')}
                  disabled={seat.status === 'occupied'}
                  key={seat.id}
                  onClick={() => onSeatToggle(seat)}
                  type="button"
                >
                  <span className="seat-id">{seat.id}</span>
                  <span className="seat-price">{formatPrice(seat.price)}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
