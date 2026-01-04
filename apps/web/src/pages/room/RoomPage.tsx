import { createRoom, getRooms } from 'actions/RoomAction';
import DataFetching from 'components/common/data-fetching/DataFetching';
import ErrorDisplay from 'components/common/error-display/ErrorDisplay';
import { defaultRoom } from 'components/room/RoomDefaultValue';
import RoomForm from 'components/room/RoomForm';
import RoomList from 'components/room/RoomList';
import { useRoomStore } from 'stores';
import EntityName from 'enums/EntityName';
import IRoom from 'interfaces/Room';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

const RoomPage = () => {
  const rooms = useRoomStore((state) => state.rooms);
  const setRooms = useRoomStore((state) => state.setRooms);
  const addRoomToStore = useRoomStore((state) => state.addRoom);

  const { isLoading, isError, isSuccess, data: roomsData } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: getRooms,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (roomsData?.data) {
      setRooms(roomsData.data);
    }
  }, [roomsData?.data, setRooms]);

  const [room, setRoom] = useState<IRoom>(defaultRoom);

  const { isPending: isSaving, mutate: addRoom } = useMutation({
    mutationFn: async () => {
      const payload: IRoom = {
        ...room,
        capacity: Number(room.capacity),
        number: room.number.trim(),
        isAutoAssign: Boolean(room.isAutoAssign),
      };
      return createRoom(payload);
    },
    onSuccess: (response) => {
      setRoom(defaultRoom);
      toastSuccess('Save Successfully');
      addRoomToStore(response.data);
    },
    onError: (err: unknown) => {
      httpErrorDisplay(err, EntityName.Room);
    },
  });
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2 ">
          {isError && <ErrorDisplay />}
          {isLoading && <DataFetching />}
          {isSuccess && <RoomList data={rooms} />}
        </div>
        <div className="col-span-1">
          <RoomForm
            room={room}
            setRoom={setRoom}
            onSubmitForm={addRoom}
            isLoading={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
