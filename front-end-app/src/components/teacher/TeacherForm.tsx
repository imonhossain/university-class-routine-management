import { Button, Card, Input } from 'antd';
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
    <Card className="">
      <h1 className="text-center">Teacher Form</h1>
      <div className="flex w-full flex-col gap-3">
        <div>
          <label className="block mb-1">Teacher Name</label>
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
          <label className="block mb-1">Teacher Email</label>
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
          <label className="block mb-1">Teacher Phone</label>
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
            size="small"
            type="primary"
            onClick={onSubmitForm}
            disabled={!isValidForm || isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default TeacherForm;
