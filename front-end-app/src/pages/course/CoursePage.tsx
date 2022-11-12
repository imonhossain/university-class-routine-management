import { Button } from '@material-tailwind/react';
import { getCourses } from 'actions/CourseAction';
import DataFetching from 'components/common/data-fetching/DataFetching';
import ErrorDisplay from 'components/common/error-display/ErrorDisplay';
import CourseForm from 'components/course/CourseForm';
import CourseList from 'components/course/CourseList';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import ICourse from 'interfaces/Course';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { defaultCourse } from './CourseDefaultValue';

const CoursePage = () => {
  const appContext = useAppContext() as any;
  const { isLoading, isError, isSuccess } = useQuery(
    'get-courses',
    getCourses,
    {
      onSuccess(courses) {
        console.log('courses', courses);
        appContext.dispatch({
          type: actionTypes.CACHE_COURSES,
          payload: courses.data,
        });
      },
    },
  );

  const [course, setCourse] = useState<ICourse>(defaultCourse);
  const addCourse = () => {
    console.log(course);
  };
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
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
