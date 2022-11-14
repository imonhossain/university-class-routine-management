import TeacherReport from 'components/teacher/teacher-report/TeacherReport';
import { useAppContext } from 'context/appContext';
import IBooking from 'interfaces/Booking';
import ITeacherReportGraph from 'interfaces/TeacherReportGraph';
import { useEffect, useState } from 'react';
import { teacherReportGraph } from 'services/UtilsService';

const TeacherReportPage = () => {
  const appContext = useAppContext() as any;
  const [teacherReport, setTeacherReport] = useState<ITeacherReportGraph[]>([]);

  useEffect(() => {
    const bookings: IBooking[] = appContext?.bookings as IBooking[];
    setTeacherReport(teacherReportGraph(bookings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext?.bookings?.length]);
  return (
    <div className="max-w-screen-2xl mx-auto mt-4">
      <TeacherReport teacherData={teacherReport} />
    </div>
  );
};

export default TeacherReportPage;
