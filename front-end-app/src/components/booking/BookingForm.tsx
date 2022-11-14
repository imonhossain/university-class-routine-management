/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
} from '@material-tailwind/react';
import { getCourses } from 'actions/CourseAction';
import { getRooms } from 'actions/RoomAction';
import { getTeachers } from 'actions/TeacherAction';
import CommonSelect from 'components/common/select/CommonSelect';
import { SemesterConstant } from 'constants/SemesterConstant';
import IBooking from 'interfaces/Booking';
import { Dispatch, FC, SetStateAction } from 'react';
import { useQuery } from 'react-query';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = e as unknown as any;
    setBooking({ ...booking, [event.target.name]: event.target.value });
  };
  const handelChangeSelect = (name: string, value: string) => {
    setBooking({ ...booking, [name]: value });
  };
  const onChangeSwitch = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e as unknown as any;
    setBooking({ ...booking, isAutoAssign: event?.target?.checked });
  };
  const isValidForm =
    booking.courseId &&
    booking.teacherId &&
    booking.registerStudent &&
    booking.semester;
  return (
    <Card className="">
      <h1 className="text-center">Booking Form</h1>
      <CardBody className="flex w-full flex-col gap-3">
        <CommonSelect
          label="Select a course"
          onChange={(e: any) => handelChangeSelect('courseId', e.id)}
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
          onChange={(e: any) => handelChangeSelect('teacherId', e.id)}
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
          type="text"
          value={booking.registerStudent}
          name="registerStudent"
          onChange={onChange}
          required
        />
        <CommonSelect
          label="Select a semester"
          onChange={(e: any) => handelChangeSelect('semester', e.id)}
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
          onChange={(e: any) => handelChangeSelect('roomId', e.id)}
          getOptionLabel={(option: any) => option.number}
          getOptionValue={(option: any) => option.id}
          value={
            roomList?.data.find(
              (item) => item.id === booking.roomId,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={roomList?.data || []}
        />
        <div className="text-center">
          <Button
            size="sm"
            type="button"
            onClick={onSubmitForm}
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
