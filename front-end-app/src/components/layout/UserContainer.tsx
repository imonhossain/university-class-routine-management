import { FC } from 'react';
import { useGetToken } from 'services/AuthenticationService';
import Header from 'components/layout/Header';
import PublicHeader from 'components/layout/PublicHeader';
import { useAppContext } from 'context/appContext';
import { getBookings } from 'actions/BookingAction';
import actionTypes from 'context/actionTypes';
import { useQuery } from 'react-query';
import { convertBookingToRoutines } from 'services/UtilsService';
import IBooking from 'interfaces/Booking';

const UserContainer: FC<{ children: any }> = ({ children }) => {
  const isLogin = useGetToken();
  const appContext = useAppContext() as any;
  const { isLoading, isError, isSuccess } = useQuery(
    'get-bookings',
    getBookings,
    {
      refetchOnWindowFocus: false,
      onSuccess(response) {
        const bookings: IBooking[] = response.data;
        const routine = convertBookingToRoutines(bookings);
        console.log('bookings', bookings);
        appContext.dispatch({
          type: actionTypes.CACHE_BOOKINGS,
          payload: bookings,
        });
        appContext.dispatch({
          type: actionTypes.CACHE_ROUTINE,
          payload: routine,
        });
      },
    },
  );
  return (
    <div className="">
      {isLogin ? <Header /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default UserContainer;
