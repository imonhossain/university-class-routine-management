import TeacherReport from 'components/teacher/teacher-report/TeacherReport';
import { useBookingStore } from 'stores';
import IBooking from 'interfaces/Booking';
import ITeacherReportGraph from 'interfaces/TeacherReportGraph';
import { useEffect, useState } from 'react';
import { teacherReportGraph } from 'services/UtilsService';

const TeacherReportPage = () => {
  const bookings = useBookingStore((state) => state.bookings);
  const [teacherReport, setTeacherReport] = useState<ITeacherReportGraph[]>([]);

  useEffect(() => {
    const bookingData: IBooking[] = bookings as IBooking[];
    setTeacherReport(teacherReportGraph(bookingData));
  }, [bookings]);

  return (
    <div className="max-w-screen-2xl mx-auto mt-4">
      <TeacherReport teacherData={teacherReport} />
    </div>
  );
};

export default TeacherReportPage;
