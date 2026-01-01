import { Button, Card, Input, Switch } from 'antd';
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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
  const handelChangeSelect = (value: string) => {
    setCourse({ ...course, semester: Number(value) });
  };
  const onChangeSwitch = (checked: boolean) => {
    setCourse({ ...course, isAutoAssign: checked });
  };
  const isValidForm = course.code && course.name && course.credit;
  return (
    <Card className="">
      <h1 className="text-center">Course Form</h1>
      <div className="flex w-full flex-col gap-3">
        <div>
          <label className="block mb-1">Course Name</label>
          <Input
            placeholder="Course Name"
            type="text"
            value={course.name}
            name="name"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Course Code</label>
          <Input
            placeholder="Course Code"
            value={course.code}
            name="code"
            type="text"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Course Credit</label>
          <Input
            placeholder="Course Credit"
            value={course.credit}
            name="credit"
            type="number"
            max={4}
            onChange={onChange}
            required
          />
        </div>
        <CommonSelect
          label="Select Semester"
          onChange={(e: { id: number }) => handelChangeSelect(String(e.id))}
          getOptionLabel={(option: { name: string }) => option.name}
          getOptionValue={(option: { id: number }) => option.id}
          value={
            SemesterConstant.find(
              (item) => item.id === course.semester,
            ) as object
          }
          options={SemesterConstant}
        />
        <div className="flex items-center gap-2">
          <Switch
            checked={course.isAutoAssign}
            onChange={onChangeSwitch}
          />
          <span>Auto assign</span>
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
export default CourseForm;
