/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, Card, CardBody, Input } from '@material-tailwind/react';
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
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = e as unknown as any;
    setTeacher({ ...teacher, [event.target.name]: event.target.value });
  };
  const isValidForm = teacher.phone && teacher.name && teacher.email;
  return (
    <Card className="">
      <h1 className="text-center">Teacher Form</h1>
      <CardBody className="flex w-full flex-col gap-3">
        <Input
          label="Teacher Name"
          type="text"
          value={teacher.name}
          name="name"
          onChange={onChange}
          required
        />
        <Input
          label="Teacher Email"
          value={teacher.email}
          name="email"
          type="email"
          onChange={onChange}
          required
        />
        <Input
          label="Teacher Phone"
          value={teacher.phone}
          name="phone"
          type="text"
          onChange={onChange}
          required
        />

        <div className="text-center">
          <Button
            size="sm"
            type="button"
            onClick={onSubmitForm}
            disabled={!isValidForm || isLoading}
          >
            Submit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default TeacherForm;
