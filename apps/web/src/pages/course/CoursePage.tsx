import { createCourse, getCourses } from 'actions/CourseAction';
import DataFetching from 'components/common/data-fetching/DataFetching';
import ErrorDisplay from 'components/common/error-display/ErrorDisplay';
import CourseForm from 'components/course/CourseForm';
import CourseList from 'components/course/CourseList';
import { useCourseStore } from 'stores';
import EntityName from 'enums/EntityName';
import ICourse from 'interfaces/Course';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';
import { defaultCourse } from '../../components/course/CourseDefaultValue';

const CoursePage = () => {
  const courses = useCourseStore((state) => state.courses);
  const setCourses = useCourseStore((state) => state.setCourses);
  const addCourseToStore = useCourseStore((state) => state.addCourse);

  const { isLoading, isError, isSuccess, data: coursesData } = useQuery({
    queryKey: ['get-courses'],
    queryFn: getCourses,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (coursesData?.data) {
      setCourses(coursesData.data);
    }
  }, [coursesData?.data, setCourses]);

  const [course, setCourse] = useState<ICourse>(defaultCourse);

  const { isPending: isSaving, mutate: addCourse } = useMutation({
    mutationFn: async () => {
      const payload: ICourse = {
        ...course,
        credit: Number(course.credit),
        semester: course.semester ? Number(course.semester) : undefined,
        isAutoAssign: Boolean(course.isAutoAssign),
      };
      return createCourse(payload);
    },
    onSuccess: (response) => {
      setCourse(defaultCourse);
      toastSuccess('Save Successfully');
      addCourseToStore(response.data);
    },
    onError: (err: unknown) => {
      httpErrorDisplay(err, EntityName.Course);
    },
  });
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-3 gap-4 mt-12">
        <div className="col-span-2 ">
          {isError && <ErrorDisplay />}
          {isLoading && <DataFetching />}
          {isSuccess && <CourseList data={courses} />}
        </div>
        <div className="col-span-1">
          <CourseForm
            course={course}
            setCourse={setCourse}
            onSubmitForm={addCourse}
            isLoading={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
