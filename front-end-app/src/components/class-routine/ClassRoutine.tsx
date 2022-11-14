import { useAppContext } from 'context/appContext';
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
  const appContext = useAppContext() as any;
  const [routinesFriday, setRoutinesFriday] = useState<any>([]);
  const [routinesSaturday, setRoutinesSaturday] = useState<any>([]);

  useEffect(() => {
    const bookings: IBooking[] = JSON.parse(
      JSON.stringify(appContext?.bookings),
    );
    if (bookings) {
      setRoutinesFriday(
        convertBookingToRoutines(getFridayBooking(bookings), DayType.FRIDAY),
      );
      setRoutinesSaturday(
        convertBookingToRoutines(
          getSaturDayBooking(bookings),
          DayType.SATURDAY,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext?.bookings?.length]);
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
