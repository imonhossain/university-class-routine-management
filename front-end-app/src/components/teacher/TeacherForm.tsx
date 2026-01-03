import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import ITeacher from 'interfaces/Teacher';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  teacher: ITeacher;
  onSubmitForm: () => void;
  setTeacher: Dispatch<SetStateAction<ITeacher>>;
  isLoading: boolean;
}

const TeacherForm: FC<Props> = ({
  teacher,
  setTeacher,
  onSubmitForm,
  isLoading,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  const isValidForm = teacher.phone && teacher.name && teacher.email;
  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-center mb-4">Teacher Form</h1>
        <div className="flex w-full flex-col gap-3">
          <div>
            <Label className="block mb-1">Teacher Name</Label>
            <Input
              placeholder="Teacher Name"
              type="text"
              value={teacher.name}
              name="name"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label className="block mb-1">Teacher Email</Label>
            <Input
              placeholder="Teacher Email"
              value={teacher.email}
              name="email"
              type="email"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label className="block mb-1">Teacher Phone</Label>
            <Input
              placeholder="Teacher Phone"
              value={teacher.phone}
              name="phone"
              type="text"
              onChange={onChange}
              required
            />
          </div>

          <div className="text-center">
            <Button
              size="sm"
              onClick={onSubmitForm}
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
export default TeacherForm;
