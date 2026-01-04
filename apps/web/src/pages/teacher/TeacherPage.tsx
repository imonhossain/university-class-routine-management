import { createTeacher, getTeachers } from 'actions/TeacherAction';
import DataFetching from 'components/common/data-fetching/DataFetching';
import ErrorDisplay from 'components/common/error-display/ErrorDisplay';
import TeacherForm from 'components/teacher/TeacherForm';
import TeacherList from 'components/teacher/TeacherList';
import { useTeacherStore } from 'stores';
import EntityName from 'enums/EntityName';
import ITeacher from 'interfaces/Teacher';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';
import { defaultTeacher } from '../../components/teacher/TeacherDefaultValue';

const TeacherPage = () => {
  const teachers = useTeacherStore((state) => state.teachers);
  const setTeachers = useTeacherStore((state) => state.setTeachers);
  const addTeacherToStore = useTeacherStore((state) => state.addTeacher);

  const { isLoading, isError, isSuccess, data: teachersData } = useQuery({
    queryKey: ['get-teachers'],
    queryFn: getTeachers,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (teachersData?.data) {
      setTeachers(teachersData.data);
    }
  }, [teachersData?.data, setTeachers]);

  const [teacher, setTeacher] = useState<ITeacher>(defaultTeacher);

  const { isPending: isSaving, mutate: addTeacher } = useMutation({
    mutationFn: async () => {
      return createTeacher(teacher);
    },
    onSuccess: (response) => {
      setTeacher(defaultTeacher);
      toastSuccess('Save Successfully');
      addTeacherToStore(response.data);
    },
    onError: (err: unknown) => {
      httpErrorDisplay(err, EntityName.Teacher);
    },
  });
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2 ">
          {isError && <ErrorDisplay />}
          {isLoading && <DataFetching />}
          {isSuccess && <TeacherList data={teachers} />}
        </div>
        <div className="col-span-1">
          <TeacherForm
            teacher={teacher}
            setTeacher={setTeacher}
            onSubmitForm={addTeacher}
            isLoading={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
