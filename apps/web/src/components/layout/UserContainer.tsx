import { getBookings } from 'actions/BookingAction';
import Header from 'components/layout/Header';
import PublicHeader from 'components/layout/PublicHeader';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import IBooking from 'interfaces/Booking';
import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetToken } from 'services/AuthenticationService';

const UserContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLogin = useGetToken();
  const appContext = useAppContext() as any;
  const { data: response } = useQuery({
    queryKey: ['get-bookings'],
    queryFn: getBookings,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (response?.data) {
      const bookings: IBooking[] = response.data;
      appContext.dispatch({
        type: actionTypes.CACHE_BOOKINGS,
        payload: bookings,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data]);

  return (
    <div className="">
      {isLogin ? <Header /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default UserContainer;
