import { Card, CardBody, IconButton } from '@material-tailwind/react';
import NubTable from 'components/common/table/NubTable';
import ICourse from 'interfaces/Course';
import { FC, useMemo } from 'react';

interface Props {
  data: ICourse[];
}

const CourseList: FC<Props> = ({ data }) => {
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
        title: 'Edit',
        dataIndex: 'id',
        render: (id: string) => (
          <>
            <IconButton size="sm" className="mr-2">
              <i className="far fa-edit" />
            </IconButton>
            <IconButton size="sm" color="red">
              <i className="fas fa-times" />
            </IconButton>
          </>
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
