/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
} from '@material-tailwind/react';
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
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e as unknown as any;
    setRoom({ ...room, [event.target.name]: event.target.value });
  };
  const onChangeSwitch = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e as unknown as any;
    setRoom({ ...room, isAutoAssign: event?.target?.checked });
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
      <CardBody className="flex w-full flex-col gap-3">
        <Input
          label="Room Number"
          type="text"
          value={room.number}
          name="number"
          onChange={onChange}
          required
        />
        <Input
          label="Room Capacity"
          value={room.capacity}
          name="capacity"
          type="number"
          onChange={onChange}
          required
        />
        <Switch
          label="Auto assign"
          defaultChecked={room.isAutoAssign}
          name="isAutoAssign"
          onChange={(e) => onChangeSwitch(e)}
        />

        <div className="text-center">
          <Button
            size="sm"
            type="button"
            onClick={onClickAddRoom}
            disabled={!isValidForm || isLoading}
          >
            Submit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default RoomForm;
