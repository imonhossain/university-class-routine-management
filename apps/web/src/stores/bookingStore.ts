import { create } from 'zustand';
import IBooking from 'interfaces/Booking';
import IRoutine from 'interfaces/Routine';

interface BookingState {
  bookings: IBooking[];
  routines: IRoutine[];
  setBookings: (bookings: IBooking[]) => void;
  setRoutines: (routines: IRoutine[]) => void;
  addBooking: (booking: IBooking) => void;
  deleteBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  routines: [],
  setBookings: (bookings) => set({ bookings }),
  setRoutines: (routines) => set({ routines }),
  addBooking: (booking) =>
    set((state) => ({ bookings: [booking, ...state.bookings] })),
  deleteBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking.id !== id),
    })),
}));
