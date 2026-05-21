export type SeatType = 'standard' | 'vip';

export type SeatStatus = 'available' | 'occupied';

export type Seat = {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
  price: number;
};

export type Movie = {
  id: string;
  title: string;
  description: string;
  ageRating: string;
};

export type Session = {
  id: string;
  movieId: string;
  startsAt: string;
  hall: string;
};

export type BookingScenario = {
  movie: Movie;
  session: Session;
  seats: Seat[];
};
