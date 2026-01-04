import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { deleteCourse } from 'actions/CourseAction';
import NubTable from 'components/common/table/NubTable';
import tableColumnTextFilterConfig from 'components/common/table/tableUtils';
import { useCourseStore } from 'stores';
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
  const deleteCourseFromStore = useCourseStore((state) => state.deleteCourse);
  const [courseId, setCourseId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation({
    mutationFn: async () => {
      return deleteCourse(courseId);
    },
    onSuccess: () => {
      toastSuccess('Delete Successfully');
      deleteCourseFromStore(courseId);
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
            size="sm"
            variant="destructive"
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
      <CardContent className="pt-6">
        <h1 className="text-left mb-4">Course list</h1>
        <NubTable data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};
export default CourseList;
