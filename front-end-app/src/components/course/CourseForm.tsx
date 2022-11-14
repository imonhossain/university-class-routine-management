/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
} from '@material-tailwind/react';
import CommonSelect from 'components/common/select/CommonSelect';
import { SemesterConstant } from 'constants/SemesterConstant';
import ICourse from 'interfaces/Course';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  course: ICourse;
  onSubmitForm: () => void;
  setCourse: Dispatch<SetStateAction<ICourse>>;
  isLoading: boolean;
}

const CourseForm: FC<Props> = ({
  course,
  setCourse,
  onSubmitForm,
  isLoading,
}) => {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = e as unknown as any;
    setCourse({ ...course, [event.target.name]: event.target.value });
  };
  const handelChangeSelect = (value: string) => {
    setCourse({ ...course, semester: Number(value) });
  };
  const onChangeSwitch = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e as unknown as any;
    setCourse({ ...course, isAutoAssign: event?.target?.checked });
  };
  const isValidForm = course.code && course.name && course.credit;
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
        <CommonSelect
          label="Select Semester"
          onChange={(e: any) => handelChangeSelect(e.id)}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          value={
            SemesterConstant.find(
              (item) => item.id === course.semester,
              // eslint-disable-next-line @typescript-eslint/ban-types
            ) as Object
          }
          options={SemesterConstant}
        />
        <Switch
          label="Auto assign"
          defaultChecked={course.isAutoAssign}
          name="isAutoAssign"
          onChange={(e) => onChangeSwitch(e)}
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
export default CourseForm;
