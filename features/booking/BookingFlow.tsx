'use client';

import { useState } from 'react';
import { BookingSummary } from './BookingSummary';
import { SeatMap } from './SeatMap';
import type { Seat } from './types';

type BookingFlowProps = {
  seats: Seat[];
  visualOverlapDemo?: boolean;
};

export function BookingFlow({ seats, visualOverlapDemo = false }: BookingFlowProps) {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [confirmedSeatIds, setConfirmedSeatIds] = useState<string[]>([]);
  const selectedSeats = seats.filter((seat) => selectedSeatIds.includes(seat.id));

  function toggleSeat(seat: Seat) {
    if (seat.status === 'occupied') {
      return;
    }

    setConfirmedSeatIds([]);
    setSelectedSeatIds((currentSeatIds) =>
      currentSeatIds.includes(seat.id)
        ? currentSeatIds.filter((seatId) => seatId !== seat.id)
        : [...currentSeatIds, seat.id]
    );
  }

  function bookTickets() {
    setConfirmedSeatIds(selectedSeatIds);
  }

  return (
    <section
      className={visualOverlapDemo ? 'booking-flow mobile-overlap-demo' : 'booking-flow'}
      data-testid="booking-flow"
    >
      <SeatMap seats={seats} selectedSeatIds={selectedSeatIds} onSeatToggle={toggleSeat} />
      <BookingSummary
        confirmedSeatIds={confirmedSeatIds}
        selectedSeatIds={selectedSeatIds}
        selectedSeats={selectedSeats}
        onBook={bookTickets}
      />
    </section>
  );
}
