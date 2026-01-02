import { Button } from 'components/ui/button';
import { getTeachers } from 'actions/TeacherAction';
import CommonSelect from 'components/common/select/CommonSelect';
import { SemesterConstant } from 'constants/SemesterConstant';
import { useAppContext } from 'context/appContext';
import DayType from 'enums/DayType';
import IBooking from 'interfaces/Booking';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useQuery } from '@tanstack/react-query';
import {
  convertBookingToRoutines,
  getFridayBooking,
  getSaturDayBooking,
  getSemesterWiseData,
  getTeacherWiseData,
} from 'services/UtilsService';
import { SemesterWiseHeaders } from './FilterRoutineHeader';

interface Props {
  setRoutinesFriday: Dispatch<SetStateAction<any[]>>;
  setRoutinesSaturday: Dispatch<SetStateAction<any[]>>;
}

const FilterClassRoutine: FC<Props> = ({
  setRoutinesFriday,
  setRoutinesSaturday,
}) => {
  const appContext = useAppContext() as any;
  const { data: teacherList } = useQuery({
    queryKey: ['get-teachers'],
    queryFn: getTeachers,
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
    applyFilter(filterBookings);
    setForm({ semester: 0, teacherId: value });
  };

  const dataWithSerial: any[] = appContext?.bookings as unknown as any[];
  dataWithSerial.forEach((item: any, index: number) => {
    item.number = index + 1;
  });

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div />
      <div className="flex w-full">
        <div className="w-full">
          <CommonSelect
            label="Select Semester"
            onChange={(e: { id: number }) => handelChangeSemester(String(e?.id))}
            getOptionLabel={(option: { name: string }) => option.name}
            getOptionValue={(option: { id: number }) => option.id}
            isClearable={true}
            value={
              SemesterConstant.find(
                (item) => item.id === form.semester,
              ) as object
            }
            options={SemesterConstant}
          />
        </div>

        <CSVLink
          data={getSemesterWiseData(
            Number(form.semester),
            appContext?.bookings as IBooking[],
          )}
          headers={SemesterWiseHeaders}
          className={!Number(form.semester) ? 'pointer-events-none' : ''}
          filename={`${form.semester}-semester-routine.csv`}
        >
          <Button size="sm" disabled={!Number(form.semester)}>
            Download
          </Button>
        </CSVLink>
      </div>
      <div className="flex w-full">
        <div className="w-full">
          <CommonSelect
            label="Select Teacher"
            onChange={(e: { id: string }) => handelChangeTeacher(e?.id)}
            getOptionLabel={(option: { name: string }) => option.name}
            getOptionValue={(option: { id: string }) => option.id}
            isClearable={true}
            value={
              teacherList?.data.find(
                (item: { id: string }) => item.id === form.teacherId,
              ) as object
            }
            options={teacherList?.data || []}
          />
        </div>
        <CSVLink
          data={getTeacherWiseData(
            form.teacherId,
            appContext?.bookings as IBooking[],
          )}
          headers={SemesterWiseHeaders}
          className={!form.teacherId ? 'pointer-events-none' : ''}
          filename="teacher-routine.csv"
        >
          <Button size="sm" disabled={!form.teacherId}>
            Download
          </Button>
        </CSVLink>
      </div>
    </div>
  );
};

export default FilterClassRoutine;
