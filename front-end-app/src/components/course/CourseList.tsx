import { Button, Card } from 'antd';
import { deleteCourse } from 'actions/CourseAction';
import NubTable from 'components/common/table/NubTable';
import tableColumnTextFilterConfig from 'components/common/table/tableUtils';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import ICourse from 'interfaces/Course';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

interface Props {
  data: ICourse[];
}

const CourseList: FC<Props> = ({ data }) => {
  const appContext = useAppContext() as any;
  const [courseId, setCourseId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation({
    mutationFn: async () => {
      return deleteCourse(courseId);
    },
    onSuccess: () => {
      toastSuccess('Delete Successfully');
      appContext.dispatch({
        type: actionTypes.DELETE_COURSE,
        payload: courseId,
      });
      setCourseId('');
    },
    onError: (err: unknown) => {
      httpErrorDisplay(err, EntityName.Course);
      setCourseId('');
    },
  });
  useEffect(() => {
    if (courseId) {
      deleteMutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        ...tableColumnTextFilterConfig<ICourse>(),
        onFilter: (value: string, record: ICourse) => {
          return record.name
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Credit',
        dataIndex: 'credit',
      },
      {
        title: 'Course Code',
        dataIndex: 'code',
        ...tableColumnTextFilterConfig<ICourse>(),
        onFilter: (value: string, record: ICourse) => {
          return record.code
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
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
          <Button
            size="small"
            danger
            onClick={() => setCourseId(id)}
            disabled={id === courseId}
          >
            <i className="fas fa-times" />
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Card className="container">
      <h1 className="text-left">Course list</h1>
      <NubTable data={data} columns={columns} />
    </Card>
  );
};
export default CourseList;
