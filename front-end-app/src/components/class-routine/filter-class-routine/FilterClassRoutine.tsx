/* eslint-disable eqeqeq */
import { Button } from '@material-tailwind/react';
import { getTeachers } from 'actions/TeacherAction';
import CommonSelect from 'components/common/select/CommonSelect';
import { SemesterConstant } from 'constants/SemesterConstant';
import { useAppContext } from 'context/appContext';
import DayType from 'enums/DayType';
import IBooking from 'interfaces/Booking';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useQuery } from 'react-query';
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
