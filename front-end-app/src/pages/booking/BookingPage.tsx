import { createBooking } from 'actions/BookingAction';
import BookingForm from 'components/booking/BookingForm';
import BookingList from 'components/booking/BookingList';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import Section from 'enums/Section';
import IBooking from 'interfaces/Booking';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useGetToken } from 'services/AuthenticationService';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';
import { defaultBooking } from '../../components/booking/BookingDefaultValue';

const BookingPage = () => {
  const appContext = useAppContext() as any;
  const isLogin = useGetToken();

  const [booking, setBooking] = useState<IBooking>(defaultBooking);

  const { isPending: isSaving, mutate: addBooking } = useMutation({
    mutationFn: async () => {
      booking.semester = Number(booking.semester);
      booking.registerStudent = Number(booking.registerStudent);
      booking.section = Section.A;
      return createBooking(booking);
    },
    onSuccess: (response) => {
      toastSuccess('Save Successfully');
      appContext.dispatch({
        type: actionTypes.ADD_BOOKING,
        payload: response.data,
      });
    },
    onError: (err: unknown) => {
      httpErrorDisplay(err, EntityName.Booking);
    },
  });
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-4 gap-4 mt-12">
        <div className={isLogin ? 'col-span-3' : 'col-span-4 '}>
          {appContext?.bookings && <BookingList data={appContext?.bookings} />}
        </div>
        {Boolean(isLogin) && (
          <div className="col-span-1">
            <BookingForm
              booking={booking}
              setBooking={setBooking}
              onSubmitForm={addBooking}
              isLoading={isSaving}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
