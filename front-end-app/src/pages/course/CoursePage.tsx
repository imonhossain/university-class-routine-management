import { createCourse, getCourses } from 'actions/CourseAction';
import DataFetching from 'components/common/data-fetching/DataFetching';
import ErrorDisplay from 'components/common/error-display/ErrorDisplay';
import CourseForm from 'components/course/CourseForm';
import CourseList from 'components/course/CourseList';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import ICourse from 'interfaces/Course';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastSuccess } from 'services/ToasterServices';
import { httpErrorDisplay } from 'services/UtilsService';
import { defaultCourse } from './CourseDefaultValue';

const CoursePage = () => {
  const appContext = useAppContext() as any;
  const { isLoading, isError, isSuccess } = useQuery(
    'get-courses',
    getCourses,
    {
      refetchOnWindowFocus: false,
      onSuccess(courses) {
        appContext.dispatch({
          type: actionTypes.CACHE_COURSES,
          payload: courses.data,
        });
      },
    },
  );

  const [course, setCourse] = useState<ICourse>(defaultCourse);

  const { isLoading: isSaving, mutate: addCourse } = useMutation(
    async () => {
      course.credit = Number(course.credit);
      return createCourse(course);
    },
    {
      onSuccess: (response) => {
        setCourse(defaultCourse);
        toastSuccess('Save Successfully');
        appContext.dispatch({
          type: actionTypes.ADD_COURSE,
          payload: response.data,
        });
      },
      onError: (err) => {
        httpErrorDisplay(err, EntityName.Course);
      },
    },
  );
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-3 gap-4 mt-12">
        <div className="col-span-2 ">
          {isError && <ErrorDisplay />}
          {isLoading && <DataFetching />}
          {isSuccess && <CourseList data={appContext?.courses} />}
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
