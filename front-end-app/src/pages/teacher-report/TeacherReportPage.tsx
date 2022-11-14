import { useAppContext } from 'context/appContext';
import IBooking from 'interfaces/Booking';
import { useEffect, useState } from 'react';

const TeacherReportPage = () => {
  const appContext = useAppContext() as any;
  const [teacherReport, setTeacherReport] = useState<any>([]);

  useEffect(() => {
    const bookings: IBooking[] = appContext?.bookings as IBooking[];
    setTeacherReport([]);
    // if (bookings) {
    //   setRoutinesFriday(
    //     convertBookingToRoutines(getFridayBooking(bookings), DayType.FRIDAY),
    //   );
    //   setRoutinesSaturday(
    //     convertBookingToRoutines(
    //       getSaturDayBooking(bookings),
    //       DayType.SATURDAY,
    //     ),
    //   );
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext?.bookings?.length]);
  return <div className="max-w-screen-2xl mx-auto">text</div>;
};

export default TeacherReportPage;
