import { createRoom, getRooms } from 'actions/RoomAction';
import DataFetching from 'components/common/data-fetching/DataFetching';
import ErrorDisplay from 'components/common/error-display/ErrorDisplay';
import { defaultRoom } from 'components/room/RoomDefaultValue';
import RoomForm from 'components/room/RoomForm';
import RoomList from 'components/room/RoomList';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import IRoom from 'interfaces/Room';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

const RoomPage = () => {
  const appContext = useAppContext() as any;
  const { isLoading, isError, isSuccess } = useQuery('get-rooms', getRooms, {
    refetchOnWindowFocus: false,
    onSuccess(rooms) {
      appContext.dispatch({
        type: actionTypes.CACHE_ROOMS,
        payload: rooms.data,
      });
    },
  });

  const [room, setRoom] = useState<IRoom>(defaultRoom);

  const { isLoading: isSaving, mutate: addRoom } = useMutation(
    async () => {
      room.capacity = Number(room.capacity);
      return createRoom(room);
    },
    {
      onSuccess: (response) => {
        setRoom(defaultRoom);
        toastSuccess('Save Successfully');
        appContext.dispatch({
          type: actionTypes.ADD_ROOM,
          payload: response.data,
        });
      },
      onError: (err) => {
        httpErrorDisplay(err, EntityName.Room);
      },
    },
  );
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2 ">
          {isError && <ErrorDisplay />}
          {isLoading && <DataFetching />}
          {isSuccess && <RoomList data={appContext?.rooms} />}
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
