/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, Card, CardBody, Input } from '@material-tailwind/react';
import { getCourses } from 'actions/CourseAction';
import { getRooms } from 'actions/RoomAction';
import { getTeachers } from 'actions/TeacherAction';
import CommonSelect from 'components/common/select/CommonSelect';
import { SemesterConstant } from 'constants/SemesterConstant';
import { useAppContext } from 'context/appContext';
import IBooking from 'interfaces/Booking';
import ICourse from 'interfaces/Course';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useQuery } from 'react-query';
import { toastError, toastInfo, toastWarning } from 'services/ToasterServices';

interface Props {
  booking: IBooking;
  onSubmitForm: () => void;
  setBooking: Dispatch<SetStateAction<IBooking>>;
  isLoading: boolean;
}

const BookingForm: FC<Props> = ({
  booking,
  setBooking,
  onSubmitForm,
  isLoading,
}) => {
  const appContext = useAppContext() as any;
  const { data: courseList } = useQuery('get-courses', getCourses, {
    refetchOnWindowFocus: false,
  });
  const { data: teacherList } = useQuery('get-teachers', getTeachers, {
    refetchOnWindowFocus: false,
  });
  const { data: roomList } = useQuery('get-rooms', getRooms, {
    refetchOnWindowFocus: false,
  });
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e as unknown as any;
    setBooking({ ...booking, [event.target.name]: event.target.value });
  };
  const handelChangeSelect = (name: string, value: string) => {
    setBooking({ ...booking, [name]: value });
  };
  const isValidForm =
    booking.courseId &&
    booking.teacherId &&
    Number(booking.registerStudent) &&
    booking.semester;

  useEffect(() => {
    if (!booking.courseId) {
      return;
    }
    const found = courseList?.data?.find(
      (item: ICourse) => item.id === booking.courseId,
    );
    if (found && !found.isAutoAssign) {
      toastInfo(`${found.name} is special type course. Please select a room`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.courseId]);

  useEffect(() => {
    if (!booking.courseId || !booking.teacherId) {
      return;
    }
    const found = courseList?.data?.find(
      (item: ICourse) => item.id === booking.courseId,
    );
    let totalCredit = 0;
    const totalBookings: IBooking[] = appContext?.bookings || [];
    for (const item of totalBookings) {
      if (item.teacherId === booking.teacherId) {
        totalCredit += Number(item.courseCredit) || 0;
      }
    }

    if (totalCredit + Number(found?.credit) > 18) {
      toastWarning(
        `This teacher already taken ${totalCredit} credit. Do you assign more ${found?.credit} credit?`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.courseId, booking.teacherId]);

  const onClickSubmit = () => {
    const room = roomList?.data.find((item) => item.id === booking.roomId);
    if (room && room.capacity < Number(booking.registerStudent)) {
      toastError('Register student is greater than room capacity');
      return;
    }
    const found = appContext?.bookings?.find(
      (item: IBooking) =>
        item.courseId === booking.courseId &&
        item.semester === Number(booking.semester),
    );
    if (found) {
      toastError(
        `You have already assign ${found.courseName} to ${found.semester} semester`,
      );
      return;
    }
    onSubmitForm();
  };

  return (
    <Card className="">
      <h1 className="text-center">Booking Form</h1>
      <CardBody className="flex w-full flex-col gap-3">
        <CommonSelect
          label="Select a course"
          onChange={(e: any) => handelChangeSelect('courseId', e?.id)}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          value={
            courseList?.data.find(
              (item) => item.id === booking.courseId,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={courseList?.data || []}
        />
        <CommonSelect
          label="Select a teacher"
          onChange={(e: any) => handelChangeSelect('teacherId', e?.id)}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          value={
            teacherList?.data.find(
              (item) => item.id === booking.teacherId,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={teacherList?.data || []}
        />
        <Input
          label="Register Student"
          type="number"
          value={booking.registerStudent}
          name="registerStudent"
          onChange={onChange}
          required
        />
        <CommonSelect
          label="Select a semester"
          onChange={(e: any) => handelChangeSelect('semester', e?.id)}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          value={
            SemesterConstant.find(
              (item) => item.id === booking.semester,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={SemesterConstant}
        />
        <CommonSelect
          label="Select a room (optional)"
          onChange={(e: any) => handelChangeSelect('roomId', e?.id)}
          getOptionLabel={(option: any) => option.number}
          getOptionValue={(option: any) => option.id}
          isClearable={true as boolean}
          value={
            roomList?.data.find(
              (item) => item.id === booking?.roomId,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={roomList?.data || []}
        />
        <div className="text-center">
          <Button
            size="sm"
            type="button"
            onClick={onClickSubmit}
            disabled={!isValidForm || isLoading}
          >
            Submit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default BookingForm;
