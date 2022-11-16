import { Card, CardBody, IconButton } from '@material-tailwind/react';
import { deleteBooking } from 'actions/BookingAction';
import NubTable from 'components/common/table/NubTable';
import tableColumnTextFilterConfig from 'components/common/table/tableUtils';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import IBooking from 'interfaces/Booking';
import IBookingResponse from 'interfaces/BookingResponse';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

interface Props {
  data: IBooking[];
}

const BookingList: FC<Props> = ({ data }) => {
  const appContext = useAppContext() as any;
  const [bookingId, setBookingId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation(
    async () => {
      return deleteBooking(bookingId);
    },
    {
      onSuccess: () => {
        toastSuccess('Delete Successfully');
        appContext.dispatch({
          type: actionTypes.DELETE_BOOKING,
          payload: bookingId,
        });
        setBookingId('');
      },
      onError: (err) => {
        httpErrorDisplay(err, EntityName.Booking);
        setBookingId('');
      },
    },
  );
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
          <IconButton
            size="sm"
            color="red"
            onClick={() => setBookingId(id)}
            disabled={id === bookingId}
          >
            <i className="fas fa-times" />
          </IconButton>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Card className="container">
      <CardBody>
        <h1 className="text-left">Booking list</h1>
        <NubTable data={data} columns={columns} />
      </CardBody>
    </Card>
  );
};
export default BookingList;
