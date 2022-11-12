import { Card, CardBody, IconButton } from '@material-tailwind/react';
import { deleteCourse } from 'actions/CourseAction';
import NubTable from 'components/common/table/NubTable';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import ICourse from 'interfaces/Course';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

interface Props {
  data: ICourse[];
}

const CourseList: FC<Props> = ({ data }) => {
  const appContext = useAppContext() as any;
  const [courseId, setCourseId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation(
    async () => {
      return deleteCourse(courseId);
    },
    {
      onSuccess: () => {
        toastSuccess('Delete Successfully');
        appContext.dispatch({
          type: actionTypes.DELETE_COURSE,
          payload: courseId,
        });
        setCourseId('');
      },
      onError: (err) => {
        httpErrorDisplay(err, EntityName.Course);
        setCourseId('');
      },
    },
  );
  useEffect(() => {
    if (courseId) {
      deleteMutate();
    }
  }, [courseId]);
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Credit',
        dataIndex: 'credit',
      },
      {
        title: 'Course Code',
        dataIndex: 'code',
      },
      {
        title: 'Auto Assign',
        dataIndex: 'isAutoAssign',
        render: (isAutoAssign: boolean) => (isAutoAssign ? 'Yes' : 'No'),
      },
      {
        title: 'Delete',
        dataIndex: 'id',
        render: (id: string) => (
          <IconButton
            size="sm"
            color="red"
            onClick={() => setCourseId(id)}
            disabled={id === courseId}
          >
            <i className="fas fa-times" />
          </IconButton>
        ),
      },
    ],
    [],
  );

  return (
    <Card className="container">
      <CardBody>
        <h1 className="text-left">Course list</h1>
        <NubTable data={data} columns={columns} />
      </CardBody>
    </Card>
  );
};
export default CourseList;
