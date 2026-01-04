import IBooking from './Booking';

interface IRoutine extends IBooking {
  startTime: string;
  endTime: string;
  dayGroup: number;
  hour: number;
  startId: number;
}
export default IRoutine;
