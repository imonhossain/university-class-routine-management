/* eslint-disable eqeqeq */
import { getTeachers } from 'actions/TeacherAction';
import CommonSelect from 'components/common/select/CommonSelect';
import { SemesterConstant } from 'constants/SemesterConstant';
import { useAppContext } from 'context/appContext';
import DayType from 'enums/DayType';
import IBooking from 'interfaces/Booking';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  convertBookingToRoutines,
  getFridayBooking,
  getSaturDayBooking,
} from 'services/UtilsService';

interface Props {
  setRoutinesFriday: Dispatch<SetStateAction<any[]>>;
  setRoutinesSaturday: Dispatch<SetStateAction<any[]>>;
}

const FilterClassRoutine: FC<Props> = ({
  setRoutinesFriday,
  setRoutinesSaturday,
}) => {
  const appContext = useAppContext() as any;
  // const [routinesFriday, setRoutinesFriday] = useState<any>([]);
  // const [routinesSaturday, setRoutinesSaturday] = useState<any>([]);
  const { data: teacherList } = useQuery('get-teachers', getTeachers, {
    refetchOnWindowFocus: false,
  });
  const [form, setForm] = useState({
    teacherId: '',
    semester: 0,
  });

  const applyFilter = (bookings: IBooking[]): void => {
    setRoutinesFriday(
      convertBookingToRoutines(getFridayBooking(bookings), DayType.FRIDAY),
    );
    setRoutinesSaturday(
      convertBookingToRoutines(getSaturDayBooking(bookings), DayType.SATURDAY),
    );
  };

  const handelChangeSemester = (value: string) => {
    const semester = Number(value);
    const bookings = JSON.parse(JSON.stringify(appContext?.bookings));
    const filterBookings: IBooking[] = semester
      ? bookings.filter((item: IBooking) => item.semester === semester)
      : bookings;
    applyFilter(filterBookings);
    setForm({ teacherId: '', semester });
  };

  const handelChangeTeacher = (value: string) => {
    const bookings = JSON.parse(JSON.stringify(appContext?.bookings));
    const filterBookings: IBooking[] = value
      ? bookings.filter((item: IBooking) => item.teacherId === value)
      : bookings;
    console.log('filterBookings', filterBookings);
    applyFilter(filterBookings);
    setForm({ semester: 0, teacherId: value });
  };

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      <div />
      <div />
      <div>
        <CommonSelect
          label="Select Semester"
          onChange={(e: any) => handelChangeSemester(e?.id as string)}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          // eslint-disable-next-line react/jsx-boolean-value
          isClearable={true}
          value={
            SemesterConstant.find(
              (item) => item.id === form.semester,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={SemesterConstant}
        />
      </div>
      <div>
        <CommonSelect
          label="Select Teacher"
          onChange={(e: any) => handelChangeTeacher(e?.id as string)}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          // eslint-disable-next-line react/jsx-boolean-value
          isClearable={true}
          value={
            teacherList?.data.find(
              (item) => item.id === form.teacherId,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={teacherList?.data || []}
        />
      </div>
    </div>
  );
};

export default FilterClassRoutine;
