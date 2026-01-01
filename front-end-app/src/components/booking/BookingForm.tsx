import { Button, Card, Input } from 'antd';
import { getCourses } from 'actions/CourseAction';
import { getRooms } from 'actions/RoomAction';
import { getTeachers } from 'actions/TeacherAction';
import CommonSelect from 'components/common/select/CommonSelect';
import { SemesterConstant } from 'constants/SemesterConstant';
import { useAppContext } from 'context/appContext';
import IBooking from 'interfaces/Booking';
import ICourse from 'interfaces/Course';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  const { data: courseList } = useQuery({
    queryKey: ['get-courses'],
    queryFn: getCourses,
    refetchOnWindowFocus: false,
  });
  const { data: teacherList } = useQuery({
    queryKey: ['get-teachers'],
    queryFn: getTeachers,
    refetchOnWindowFocus: false,
  });
  const { data: roomList } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: getRooms,
    refetchOnWindowFocus: false,
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
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
    setBooking({ ...booking, semester: found?.semester || 0 });
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
    const room = roomList?.data.find((item: { id: string; capacity: number }) => item.id === booking.roomId);
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
      <div className="flex w-full flex-col gap-3">
        <CommonSelect
          label="Select a course"
          onChange={(e: { id: string }) => handelChangeSelect('courseId', e?.id)}
          getOptionLabel={(option: { name: string }) => option.name}
          getOptionValue={(option: { id: string }) => option.id}
          value={
            courseList?.data.find(
              (item: { id: string }) => item.id === booking.courseId,
            ) as object
          }
          options={courseList?.data || []}
        />
        <CommonSelect
          label="Select a teacher"
          onChange={(e: { id: string }) => handelChangeSelect('teacherId', e?.id)}
          getOptionLabel={(option: { name: string }) => option.name}
          getOptionValue={(option: { id: string }) => option.id}
          value={
            teacherList?.data.find(
              (item: { id: string }) => item.id === booking.teacherId,
            ) as object
          }
          options={teacherList?.data || []}
        />
        <div>
          <label className="block mb-1">Register Student</label>
          <Input
            placeholder="Register Student"
            type="number"
            value={booking.registerStudent}
            name="registerStudent"
            onChange={onChange}
            required
          />
        </div>
        <CommonSelect
          label="Select a semester"
          onChange={(e: { id: number }) => handelChangeSelect('semester', String(e?.id))}
          getOptionLabel={(option: { name: string }) => option.name}
          getOptionValue={(option: { id: number }) => option.id}
          value={
            SemesterConstant.find(
              (item) => item.id === booking.semester,
            ) as object
          }
          options={SemesterConstant}
        />
        <CommonSelect
          label="Select a room (optional)"
          onChange={(e: { id: string }) => handelChangeSelect('roomId', e?.id)}
          getOptionLabel={(option: { number: string }) => option.number}
          getOptionValue={(option: { id: string }) => option.id}
          isClearable={true as boolean}
          value={
            roomList?.data.find(
              (item: { id: string }) => item.id === booking?.roomId,
            ) as object
          }
          options={roomList?.data || []}
        />
        <div className="text-center">
          <Button
            size="small"
            type="primary"
            onClick={onClickSubmit}
            disabled={!isValidForm || isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default BookingForm;
