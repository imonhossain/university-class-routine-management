import { getBookings } from 'actions/BookingAction';
import Header from 'components/layout/Header';
import PublicHeader from 'components/layout/PublicHeader';
import { useBookingStore } from 'stores';
import IBooking from 'interfaces/Booking';
import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetToken } from 'services/AuthenticationService';

const UserContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLogin = useGetToken();
  const setBookings = useBookingStore((state) => state.setBookings);
  const { data: response } = useQuery({
    queryKey: ['get-bookings'],
    queryFn: getBookings,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (response?.data) {
      const bookings: IBooking[] = response.data;
      setBookings(bookings);
    }
  }, [response?.data, setBookings]);

  return (
    <div className="">
      {isLogin ? <Header /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default UserContainer;
