import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { deleteBooking } from 'actions/BookingAction';
import NubTable from 'components/common/table/NubTable';
import tableColumnTextFilterConfig from 'components/common/table/tableUtils';
import { useBookingStore } from 'stores';
import EntityName from 'enums/EntityName';
import IBooking from 'interfaces/Booking';
import IBookingResponse from 'interfaces/BookingResponse';
import { ITimeSlot } from 'interfaces/TimeSlot';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toastSuccess } from 'services/ToasterServices';
import { getTimePeriodById, httpErrorDisplay } from 'services/UtilsService';

interface Props {
  data: IBooking[];
}

const BookingList: FC<Props> = ({ data }) => {
  data.forEach((item: IBooking) => {
    const timeSlotList = item.timeSlotId.split(',');
    const timeSlot: ITimeSlot = getTimePeriodById(timeSlotList[0]);
    item.startTime = timeSlot.startTime;
    item.endTime = getTimePeriodById(
      timeSlotList[timeSlotList.length - 1],
    ).endTime;
  });
  const deleteBookingFromStore = useBookingStore((state) => state.deleteBooking);
  const [bookingId, setBookingId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation({
    mutationFn: async () => {
      return deleteBooking(bookingId);
    },
    onSuccess: () => {
      toastSuccess('Delete Successfully');
      deleteBookingFromStore(bookingId);
      setBookingId('');
    },
    onError: (err: unknown) => {
      httpErrorDisplay(err, EntityName.Booking);
      setBookingId('');
    },
  });
  useEffect(() => {
    if (bookingId) {
      deleteMutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);
  const columns = useMemo(
    () => [
      {
        title: 'Teacher Name',
        dataIndex: 'teacherName',
        ...tableColumnTextFilterConfig<IBookingResponse>(),
        onFilter: (value: string, record: IBookingResponse) => {
          return record.teacherName
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Room Number',
        dataIndex: 'roomNumber',
        ...tableColumnTextFilterConfig<IBookingResponse>(),
        onFilter: (value: string, record: IBookingResponse) => {
          return record.roomNumber
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Course name',
        dataIndex: 'courseName',
        ...tableColumnTextFilterConfig<IBookingResponse>(),
        onFilter: (value: string, record: IBookingResponse) => {
          return record.courseName
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Corse Code',
        dataIndex: 'courseCode',
        ...tableColumnTextFilterConfig<IBookingResponse>(),
        onFilter: (value: string, record: IBookingResponse) => {
          return record.courseCode
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Start Time',
        dataIndex: 'startTime',
      },
      {
        title: 'End Time',
        dataIndex: 'endTime',
      },
      {
        title: 'Credit',
        dataIndex: 'courseCredit',
      },
      {
        title: 'Student',
        dataIndex: 'registerStudent',
      },
      {
        title: 'Semester',
        dataIndex: 'semester',
        ...tableColumnTextFilterConfig<IBookingResponse>(),
        onFilter: (value: string, record: IBookingResponse) => {
          return record.semester
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Delete',
        dataIndex: 'id',
        render: (id: string) => (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setBookingId(id)}
            disabled={id === bookingId}
          >
            <i className="fas fa-times" />
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-left mb-4">Booking list</h1>
        <NubTable data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};
export default BookingList;
