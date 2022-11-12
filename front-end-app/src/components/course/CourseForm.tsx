import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
} from '@material-tailwind/react';
import ICourse from 'interfaces/Course';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  course: ICourse;
  onSubmitForm: () => void;
  setCourse: Dispatch<SetStateAction<ICourse>>;
}

const CourseForm: FC<Props> = ({ course, setCourse, onSubmitForm }) => {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = e as unknown as any;
    setCourse({ ...course, [event.target.name]: event.target.value });
  };
  return (
    <Card className="">
      <h1 className="text-center">Course Form</h1>
      <CardBody className="flex w-full flex-col gap-3">
        <Input
          label="Course Name"
          type="text"
          value={course.name}
          name="name"
          onChange={onChange}
          required
        />
        <Input
          label="Course Code"
          value={course.code}
          name="code"
          type="text"
          onChange={onChange}
          required
        />
        <Input
          label="Course Credit"
          value={course.credit}
          name="credit"
          type="number"
          max={4}
          onChange={onChange}
          required
        />
        <Switch
          label="Auto assign"
          defaultChecked={course.isAutoAssign}
          name="isAutoAssign"
          onChange={onChange}
        />
        <div className="text-center">
          <Button size="sm" type="button" onClick={onSubmitForm}>
            Submit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default CourseForm;
