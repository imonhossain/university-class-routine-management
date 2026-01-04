import { create } from 'zustand';
import ITeacher from 'interfaces/Teacher';

interface TeacherState {
  teachers: ITeacher[];
  setTeachers: (teachers: ITeacher[]) => void;
  addTeacher: (teacher: ITeacher) => void;
  deleteTeacher: (id: string) => void;
}

export const useTeacherStore = create<TeacherState>((set) => ({
  teachers: [],
  setTeachers: (teachers) => set({ teachers }),
  addTeacher: (teacher) =>
    set((state) => ({ teachers: [teacher, ...state.teachers] })),
  deleteTeacher: (id) =>
    set((state) => ({
      teachers: state.teachers.filter((teacher) => teacher.id !== id),
    })),
}));
