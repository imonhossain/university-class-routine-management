import { create } from 'zustand';
import ICourse from 'interfaces/Course';

interface CourseState {
  courses: ICourse[];
  setCourses: (courses: ICourse[]) => void;
  addCourse: (course: ICourse) => void;
  deleteCourse: (id: string) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  addCourse: (course) =>
    set((state) => ({ courses: [course, ...state.courses] })),
  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),
}));
