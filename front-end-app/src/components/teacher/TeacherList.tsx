import { Card, CardBody, IconButton } from '@material-tailwind/react';
import { deleteTeacher } from 'actions/TeacherAction';
import NubTable from 'components/common/table/NubTable';
import tableColumnTextFilterConfig from 'components/common/table/tableUtils';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import ITeacher from 'interfaces/Teacher';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';

interface Props {
  data: ITeacher[];
}

const TeacherList: FC<Props> = ({ data }) => {
  const appContext = useAppContext() as any;
  const [teacherId, setTeacherId] = useState<string>('');
  const { mutate: deleteMutate } = useMutation(
    async () => {
      return deleteTeacher(teacherId);
    },
    {
      onSuccess: () => {
        toastSuccess('Delete Successfully');
        appContext.dispatch({
          type: actionTypes.DELETE_TEACHER,
          payload: teacherId,
        });
        setTeacherId('');
      },
      onError: (err) => {
        httpErrorDisplay(err, EntityName.Teacher);
        setTeacherId('');
      },
    },
  );
  useEffect(() => {
    if (teacherId) {
      deleteMutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        ...tableColumnTextFilterConfig<ITeacher>(),
        onFilter: (value: string, record: ITeacher) => {
          return record.name
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        ...tableColumnTextFilterConfig<ITeacher>(),
        onFilter: (value: string, record: ITeacher) => {
          return record.email
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        ...tableColumnTextFilterConfig<ITeacher>(),
        onFilter: (value: string, record: ITeacher) => {
          return record.phone
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        },
      },
      {
        title: 'Delete',
        dataIndex: 'id',
        render: (id: string) => (
          <IconButton
            size="sm"
            color="red"
            onClick={() => setTeacherId(id)}
            disabled={id === teacherId}
          >
            <i className="fas fa-times" />
          </IconButton>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Card className="container">
      <CardBody>
        <h1 className="text-left">Teacher list</h1>
        <NubTable data={data} columns={columns} />
      </CardBody>
    </Card>
  );
};
export default TeacherList;
