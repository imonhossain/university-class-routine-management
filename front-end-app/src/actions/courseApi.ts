/* eslint-disable @typescript-eslint/no-unsafe-return */
import ICourse from 'interfaces/Course';
import api from './api';
import { ApiRequestConfig } from './api.types';

export type TopCoursesResponse = {
  courses: ICourse[];
};

export const fetchTopCourses = (config: ApiRequestConfig = {}) =>
  api
    .get<TopCoursesResponse>('courses', config)
    .then((res) => res.data.courses);

export type CoursesData = {
  quotes: ICourse[];
  hasMore?: boolean;
};

export const postCourse = (quote: Omit<ICourse, 'id'>) =>
  api.post('courses', quote);

export type CoursesDataWithCursor = {
  quotes: ICourse[];
  nextCursor: number | null;
};

export const fetchCoursesByCursor = (cursor: number) =>
  api
    .get<CoursesDataWithCursor>('quotes', { params: { cursor } })
    .then((res) => res.data);
