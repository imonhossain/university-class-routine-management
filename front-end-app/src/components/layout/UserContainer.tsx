import { getBookings } from 'actions/BookingAction';
import Header from 'components/layout/Header';
import PublicHeader from 'components/layout/PublicHeader';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import IBooking from 'interfaces/Booking';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useGetToken } from 'services/AuthenticationService';

const UserContainer: FC<{ children: any }> = ({ children }) => {
  const isLogin = useGetToken();
  const appContext = useAppContext() as any;
  useQuery('get-bookings', getBookings, {
    refetchOnWindowFocus: false,
    onSuccess(response) {
      const bookings: IBooking[] = response.data;
      appContext.dispatch({
        type: actionTypes.CACHE_BOOKINGS,
        payload: bookings,
      });
    },
  });
  return (
    <div className="">
      {isLogin ? <Header /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default UserContainer;
