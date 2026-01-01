import { Button, Card, Input, Switch } from 'antd';
import { useAppContext } from 'context/appContext';
import IRoom from 'interfaces/Room';
import { Dispatch, FC, SetStateAction } from 'react';
import { toastError } from 'services/ToasterServices';

interface Props {
  room: IRoom;
  onSubmitForm: () => void;
  setRoom: Dispatch<SetStateAction<IRoom>>;
  isLoading: boolean;
}

const RoomForm: FC<Props> = ({ room, setRoom, onSubmitForm, isLoading }) => {
  const appContext = useAppContext() as any;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };
  const onChangeSwitch = (checked: boolean) => {
    setRoom({ ...room, isAutoAssign: checked });
  };
  const isValidForm = room.capacity && room.number;
  const onClickAddRoom = () => {
    const found = appContext.rooms.find(
      (item: IRoom) => item.number === room.number.trim(),
    );
    if (found) {
      toastError('Room Number already exist. please change room number');
    } else {
      onSubmitForm();
    }
  };
  return (
    <Card className="">
      <h1 className="text-center">Room Form</h1>
      <div className="flex w-full flex-col gap-3">
        <div>
          <label className="block mb-1">Room Number</label>
          <Input
            placeholder="Room Number"
            type="text"
            value={room.number}
            name="number"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Room Capacity</label>
          <Input
            placeholder="Room Capacity"
            value={room.capacity}
            name="capacity"
            type="number"
            onChange={onChange}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={room.isAutoAssign}
            onChange={onChangeSwitch}
          />
          <span>Auto assign</span>
        </div>

        <div className="text-center">
          <Button
            size="small"
            type="primary"
            onClick={onClickAddRoom}
            disabled={!isValidForm || isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default RoomForm;
