import { useBookingStore } from 'stores';
import DayType from 'enums/DayType';
import IBooking from 'interfaces/Booking';
import { FC, useEffect, useState } from 'react';
import {
  convertBookingToRoutines,
  getFridayBooking,
  getSaturDayBooking,
} from 'services/UtilsService';
import FilterClassRoutine from './filter-class-routine/FilterClassRoutine';
import FridayRoutine from './FridayRoutine';
import SaturdayRoutine from './SaturdayRoutine';

const ClassRoutine: FC = () => {
  const bookings = useBookingStore((state) => state.bookings);
  const [routinesFriday, setRoutinesFriday] = useState<any>([]);
  const [routinesSaturday, setRoutinesSaturday] = useState<any>([]);

  useEffect(() => {
    const bookingData: IBooking[] = JSON.parse(JSON.stringify(bookings));
    if (bookingData) {
      setRoutinesFriday(
        convertBookingToRoutines(getFridayBooking(bookingData), DayType.FRIDAY),
      );
      setRoutinesSaturday(
        convertBookingToRoutines(
          getSaturDayBooking(bookingData),
          DayType.SATURDAY,
        ),
      );
    }
  }, [bookings]);

  return (
    <div className="mt-8 pl-2 pr-2">
      <FilterClassRoutine
        setRoutinesFriday={setRoutinesFriday}
        setRoutinesSaturday={setRoutinesSaturday}
      />
      <FridayRoutine routines={routinesFriday} />
      <SaturdayRoutine routines={routinesSaturday} />
    </div>
  );
};

export default ClassRoutine;
