import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Switch } from 'components/ui/switch';
import { Label } from 'components/ui/label';
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
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-center mb-4">Room Form</h1>
        <div className="flex w-full flex-col gap-3">
          <div>
            <Label className="block mb-1">Room Number</Label>
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
            <Label className="block mb-1">Room Capacity</Label>
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
              onCheckedChange={onChangeSwitch}
            />
            <span>Auto assign</span>
          </div>

          <div className="text-center">
            <Button
              size="sm"
              onClick={onClickAddRoom}
              disabled={!isValidForm || isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default RoomForm;
