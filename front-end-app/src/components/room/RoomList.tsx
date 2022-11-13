/* eslint-disable @typescript-eslint/require-await */
import { Card, CardBody, IconButton } from '@material-tailwind/react';
import { deleteRoom } from 'actions/RoomAction';
import NubTable from 'components/common/table/NubTable';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import IRoom from 'interfaces/Room';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

interface Props {
  data: IRoom[];
}

const RoomList: FC<Props> = ({ data }) => {
  const appContext = useAppContext() as any;
  const [roomId, setRoomId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation(
    async () => {
      return deleteRoom(roomId);
    },
    {
      onSuccess: () => {
        toastSuccess('Delete Successfully');
        appContext.dispatch({
          type: actionTypes.DELETE_ROOM,
          payload: roomId,
        });
        setRoomId('');
      },
      onError: (err) => {
        httpErrorDisplay(err, EntityName.Room);
        setRoomId('');
      },
    },
  );
  useEffect(() => {
    if (roomId) {
      deleteMutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);
  const columns = useMemo(
    () => [
      {
        title: 'Room number',
        dataIndex: 'number',
      },
      {
        title: 'Room Capacity',
        dataIndex: 'capacity',
      },
      {
        title: 'Auto Assign',
        dataIndex: 'isAutoAssign',
        render: (isAutoAssign: boolean) => (isAutoAssign ? 'Yes' : 'No'),
      },
      {
        title: 'Delete',
        dataIndex: 'id',
        render: (id: string) => (
          <IconButton
            size="sm"
            color="red"
            onClick={() => setRoomId(id)}
            disabled={id === roomId}
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
        <h1 className="text-left">Room list</h1>
        <NubTable data={data} columns={columns} />
      </CardBody>
    </Card>
  );
};
export default RoomList;
