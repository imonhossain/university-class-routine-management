import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { deleteRoom } from 'actions/RoomAction';
import NubTable from 'components/common/table/NubTable';
import tableColumnTextFilterConfig from 'components/common/table/tableUtils';
import { useRoomStore } from 'stores';
import EntityName from 'enums/EntityName';
import IRoom from 'interfaces/Room';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

interface Props {
  data: IRoom[];
}

const RoomList: FC<Props> = ({ data }) => {
  const deleteRoomFromStore = useRoomStore((state) => state.deleteRoom);
  const [roomId, setRoomId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation({
    mutationFn: async () => {
      return deleteRoom(roomId);
    },
    onSuccess: () => {
      toastSuccess('Delete Successfully');
      deleteRoomFromStore(roomId);
      setRoomId('');
    },
    onError: (err: unknown) => {
      httpErrorDisplay(err, EntityName.Room);
      setRoomId('');
    },
  });
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
        ...tableColumnTextFilterConfig<IRoom>(),
        onFilter: (value: string, record: IRoom) => {
          return record.number
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
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
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setRoomId(id)}
            disabled={id === roomId}
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
    <Card className="container">
      <CardContent className="pt-6">
        <h1 className="text-left mb-4">Room list</h1>
        <NubTable data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};
export default RoomList;
